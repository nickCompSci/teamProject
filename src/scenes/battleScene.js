import { CST } from "../CST.js";
import Button from '../helpers/classes/button.js';
import { gameOptions, enemy } from "../helpers/config.js";
import Zone from "../helpers/classes/zone.js";
import Player from "../helpers/classes/player.js";
import Enemy from "../helpers/classes/enemy.js";
import DamageCard from "../helpers/classes/cards/damageCard.js";
import ComboCard from "../helpers/classes/cards/comboCard.js";
import ReloadCard from "../helpers/classes/cards/reloadCard.js";
import HealingCard from "../helpers/classes/cards/healingCard.js";
import { Tooltip } from "../helpers/classes/cards/toolTip.js";


export class BattleScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.BATTLE
        })
    }

    init(data) {
        // data returns a list of preloaded cards
        let cards = data;
    }

    preload() {
        this.load.image("HUD", "./assets/hud_bg.png");
        this.load.image("background", "./assets/background.png");
        this.load.image("card_holder", "./assets/card_holder.jpg");
        this.load.image("guy", "./assets/sprites/player_green_glasses.png");
        this.load.image("heart", "./assets/sprites/heart.png");
        this.load.image("cardBack", "./assets/sprites/cardBack.png");
        this.load.image("discardPile", "./assets/sprites/discardPile.png")
        this.load.spritesheet("enemy", "./assets/sprites/enemySpritesheet.png", {
            frameWidth: enemy.spriteWidth,
            frameHeight: enemy.spriteHeight
        });
    }

    create() {
        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;

        let interactiveHandler = new InteractHandler(this);

        let hud_bg = this.add.tileSprite(0, 0, gameWidth, gameHeight, "HUD");
        let card_bg = this.add.image(0, 0, "card_holder");
        let bg = this.add.sprite(0, 0, "background");
        hud_bg.setScale(2);

        card_bg.setPosition(gameWidth/2, gameHeight);
        card_bg.setScale(0.325);
        bg.setPosition(gameWidth/2, gameHeight/2.6);
        bg.setScale(0.65);
        
        this.player = new Player(this, 0, 0, "guy");
        this.player.setPosition(gameWidth/4, gameHeight/1.65);
        this.player.setScale(3);

        let heart = this.add.image(0, 0, "heart");
        this.heartext = this.add.text(0,0, this.player.getHealth(), {color: "black", fontSize: "30px"});
        heart.setScale(4);
        this.heartext.setPosition(-18, -18);
        let health = this.add.container(0, 0, [heart, this.heartext]);
        health.setPosition(gameWidth/20, gameHeight/2.2);

        let chamber = this.add.circle(0, 0, 30, 0xffcc00);
        this.actiontext = this.add.text(0,0, this.player.getActionPoints(), {color: "black", fontSize: "30px"});
        this.actiontext.setPosition(-10, -18);
        let actions = this.add.container(0, 0, [chamber, this.actiontext]);
        actions.setPosition(gameWidth/20, gameHeight/1.75);

        let discardPile = this.add.sprite(-35, gameHeight, "discardPile").setOrigin(0, 1);
        discardPile.setScale(1.5).setInteractive({useHandCursor: true});
        discardPile.on('pointerdown', function (event) {
            this.scene.start(CST.SCENES.DISCARD_PILE, graveYardArray);
        }, this);
        
        // loads all the different types of cards
        this.loadCards();

        let endTurnButton = new Button(gameWidth, gameHeight/2, 'End Turn', this, this.endTurn.bind(this), '#202529');

        // zone where cards can be dropped and activated
        let dropZone = new Zone(this, 500, 400, 300, 600);

        // shuffles the deck and sets up the visual for the deck cards
        this.player.shuffle();
        this.player.deckSetUp(this);

        // loading in every enemy sprite
        for (let i=0; i < enemy.numberOfSprites; i++) {
            let enemySprite = new Enemy(this, 0, 0, 'enemy', i);
            enemy.enemyList.push(enemySprite);
        }
        this.spawnEnemyOnScene();

        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.tooltip.removeTooltip();
            this.tweens.add({
                targets: gameObject,
                angle: 0,
                x: pointer.x,
                y: pointer.y,
                duration: 50
            });
            this.tweens.add({
                targets: this.background,
                alpha: 0.3,
                duration: 50
            });
            
            let index = this.player.handArray.indexOf(gameObject);
            if (index !== -1) {
                this.player.handArray.splice(index, 1);
            }

            this.arrangeCardsInCenter(this.player.handArray);

        }, this);

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // hover over listener
        this.input.on('gameobjectover', function(pointer, gameObject) {
            if (gameObject.type === "Sprite" && this.player.handArray.includes(gameObject)) {
                let yOffSet = 50;
                this.tweens.add({
                    targets: gameObject,
                    angle: 0,
                    y: gameObject.startPosition.y - yOffSet,
                    displayWidth: gameOptions.cardWidth * 2,
                    displayHeight: gameOptions.cardHeight * 2,
                    depth: 100,
                    duration: 10
                });
                gameObject.tooltip.showTooltip();
                gameObject.tooltip.setLabelCoordinates(gameObject.x + gameOptions.cardWidth, gameObject.y - gameOptions.cardHeight * 2 - yOffSet + 10);

            }
        }, this);

        // hover out listener
        this.input.on('gameobjectout', function(pointer, gameObject) {
            if (gameObject.type === "Sprite" && this.player.handArray.includes(gameObject)) {
                this.tweens.add({
                    targets: gameObject,
                    y: gameObject.startPosition.y,
                    angle: gameObject.startPosition.angle,
                    displayWidth: gameOptions.cardWidth,
                    displayHeight: gameOptions.cardHeight,
                    depth: gameObject.startPosition.depth,
                    duration: 10
                });
                gameObject.tooltip.removeTooltip();
            }
       }, this);

        this.input.on('dragenter', function(pointer, gameObject, dropZone) {
            dropZone.renderActiveOutline();
        });

        this.input.on('dragleave', function(pointer, gameObject, dropZone) {
            dropZone.renderNormalOutline();
        }); 

        this.input.on('drop', (pointer, gameObject, dropZone) => {
            if (this.player.getActionPoints() >= gameObject.getCost()) {
                gameObject.input.enabled = false;
                gameObject.tooltip.removeTooltip();
        
                // setting card in the middle 
                gameObject.displayHeight = gameOptions.cardHeight;
                gameObject.displayWidth = gameOptions.cardWidth;
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y + dropZone.y / 3;
                
                this.player.graveYardArray.push(gameObject);
        
                // remove the card from the scene after 500ms
                setTimeout(function() { 
                    gameObject.activateCard(this);
                    gameObject.setActive(false).setVisible(false); 
                }, 500);
        
                this.player.actionPoints = this.player.getActionPoints() - gameObject.getCost();
                this.actiontext.text = this.player.getActionPoints();
                dropZone.renderNormalOutline(this);
        
                this.cameras.main.shake(100, 0.02);
            } else {
                this.dragend(pointer, gameObject, false);
            }
        });

        this.input.on("dragend", this.dragend, this);
    }

    dragend(pointer, gameObject, dropped) {
        
        if (!dropped) {
            this.player.handArray.push(gameObject);
            gameObject.displayHeight = gameOptions.cardHeight;
            gameObject.displayWidth = gameOptions.cardWidth;
            this.arrangeCardsInCenter(this.player.handArray);
        }
    }

    loadCards() {
        // damage cards
        let cannon = new DamageCard("cannon", 2, "damage", {damage: 3, target: "all"}, this, 0, 0, "cannon");
        let grenade = new DamageCard("grenade", 2, "damage", {damage: 6, target: "single"}, this, 0, 0, "grenade");

        // combo cards
        let headshot = new ComboCard("headshot", 1, "combo", {target: "damage", effect: "doubles"}, this, 0, 0, "headshot");
        
        // reload cards
        let reload = new ReloadCard("reload", 0, "reload", {amount: 2, sideEffects: null}, this, 0, 0, "reload");
        let overload = new ReloadCard("overload", 0, "reload", {amount: 4, sideEffects: -1}, this, 0, 0, "overload");

        // healing cards
        let medkit = new HealingCard("medkit", 1, "healing", {target: "health", amount: 3}, this, 0, 0, "medkit");
        let kevlar = new HealingCard("kevlar", 2, "healing", {target: "armour", amount: 6}, this, 0, 0, "kevlar");

        this.player.deckArray.push(cannon);
        this.player.deckArray.push(grenade);
        this.player.deckArray.push(headshot)
        this.player.deckArray.push(reload);
        this.player.deckArray.push(overload);
        this.player.deckArray.push(medkit);
        this.player.deckArray.push(kevlar);
    }

    arrangeCardsInCenter(handArray) {
        // arranges for the cards to be organised around the bottom middle of the screen
        let bottomOfScreen = this.game.config.height;
        let screenCenterX = this.game.config.width / 2;
        let yDelta = gameOptions.cardYOffset * (Math.floor(handArray.length / 2));

        for (let i=0; i < handArray.length; i++) {
            let card = handArray[i];
            let cardX = screenCenterX + (i - (handArray.length - 1) / 2) * gameOptions.cardDistance;
            let cardAngle = (i - (handArray.length - 1) / 2) * gameOptions.cardAngle;

            card.x = cardX;
            card.y = bottomOfScreen + yDelta;
            card.angle = cardAngle;
            if (i > handArray.length / 2 - 1) {
                yDelta += gameOptions.cardYOffset;
            } else {
                yDelta -= gameOptions.cardYOffset;
            }

            // cards remember their original coordinates for events that make the cards leave and renter the hand
            card.startPosition = {
                x: card.x,
                y: card.y,
                angle: card.angle,
                depth: card.depth
            }

            // sets card to the right in front
            card.setDepth(2);
        }
    }

    // simulate a drawing feature
    endTurn() {
        if (this.player.deckArray.length > 0) {
            let lastCard = this.player.deckTrackerArray.pop();
            lastCard.destroy();

            let drawCard = this.player.deckArray.pop();
            this.player.handArray.push(drawCard);
            drawCard.cardInHand(this);
            this.arrangeCardsInCenter(this.player.handArray);
        }

        for (let i=0; i < enemy.enemyOnScene.length; i++) {
            enemy.enemyOnScene[i].action(this);
        }
        this.heartext.text = this.player.getHealth();
    }

    // spawning in enemies and their life
    spawnEnemyOnScene() {
        let minEnemies = 1;
        let maxEnemies = 2;
        let numberOfEnemies = Math.floor(Math.random() * (maxEnemies - minEnemies + 1)) + minEnemies;

        let spawnEnemyDistanceX = 0;
        let spawnHeartDistanceY = 0;

        for (let i=0; i < numberOfEnemies; i++) {
            let randomEnemy = enemy.enemyList[Math.floor(Math.random() * enemy.enemyList.length)];

            // For some reason, enemies spawn invisible, no clue.
            randomEnemy.enemySpawn();
            randomEnemy.x += spawnEnemyDistanceX;
            randomEnemy.heartText.y += spawnHeartDistanceY;

            spawnEnemyDistanceX += 150;
            spawnHeartDistanceY += 100;
            randomEnemy.setDepth(1);

            enemy.enemyOnScene.push(randomEnemy);
        }
    }
}
import { CST } from "../CST.js";
import Button from '../helpers/classes/button.js';
import { gameOptions, enemy} from "../helpers/config.js";
import HealthBar from "../helpers/classes/healthBar.js";
import Player from "../helpers/classes/player.js";
import Enemy from "../helpers/classes/enemy.js";
import DamageCard from "../helpers/classes/cards/damageCard.js";
import ComboCard from "../helpers/classes/cards/comboCard.js";
import ReloadCard from "../helpers/classes/cards/reloadCard.js";
import HealingCard from "../helpers/classes/cards/healingCard.js";

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
        this.load.image("HUD", "../assets/resources/hud_bg.png");
        this.load.image("backgroundBattle", "../assets/resources/background.png");
        this.load.image("card_holder", "../assets/resources/card_holder.jpg");
        this.load.image("guy", "../assets/resources/sprites/player_green_glasses.png");
        this.load.image("cardBack", "../assets/resources/sprites/cardBack.png");
        this.load.image("discardPile", "../assets/resources/sprites/discardPile.png")
        this.load.spritesheet("enemy", "../assets/resources/sprites/enemySpritesheet.png", {
            frameWidth: enemy.spriteWidth,
            frameHeight: enemy.spriteHeight
        });
    }

    create() {
        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;

        let hud_bg = this.add.tileSprite(0, 0, gameWidth, gameHeight, "HUD");
        let card_bg = this.add.image(0, 0, "card_holder");
        let bg = this.add.sprite(0, 0, "backgroundBattle");
        hud_bg.setScale(2);

        card_bg.setPosition(gameWidth/2, gameHeight);
        card_bg.setScale(0.325);
        bg.setPosition(gameWidth/2, gameHeight/2.6);
        bg.setScale(0.65);
        
        this.player = new Player(this, 0, 0, "guy");
        this.player.setPosition(gameWidth/3.5, gameHeight/1.7);
        this.player.setScale(3);
        this.playerHealth = new HealthBar(this, this.player.x - 40, this.player.y + 100, this.player.maxHealth, this.player.health)

        let chamber = this.add.circle(0, 0, 30, 0xffcc00);
        this.actiontext = this.add.text(0,0, this.player.getActionPoints(), {color: "black", fontSize: "30px"});
        this.actiontext.setPosition(-10, -18);
        let actions = this.add.container(0, 0, [chamber, this.actiontext]);
        actions.setPosition(gameWidth/20, gameHeight/1.75);

        // launch the discard pile scene in parallel
        let discardPile = this.add.sprite(-35, gameHeight, "discardPile").setOrigin(0, 1);
        discardPile.setScale(1.5).setInteractive({useHandCursor: true});
        discardPile.on('pointerdown', (event) => {
            this.scene.launch(CST.SCENES.DISCARD_PILE, this.player.graveYardArray);
        }, this);
        
        // loads all the different types of cards
        this.loadCards();
        
        this.endTurnButton = new Button(gameWidth, gameHeight/2, "End Turn", this, this.endTurn.bind(this, this.player, this.endTurnButton), '#202529');
        this.keepCardButton = new Button(gameWidth, gameHeight/2, "Keep Cards", this, this.keepCard.bind(this, this.player, this.keepCardButton), '#202529');

        let dropZone = this.add.zone(500, 250, 665, 665).setRectangleDropZone(665, 665);

        // shuffles the deck and sets up the visual for the deck cards
        this.player.shuffle();
        this.player.deckSetUp(this);
        this.player.drawCard(gameOptions.startCards, this);

        // spawning enemies according to spritesheet randomly
        for (let i=0; i < enemy.numberOfSprites; i++) {
            let enemySprite = new Enemy(this, 0, 0, 'enemy', i);
            enemy.enemyList.push(enemySprite);
        }
        this.spawnEnemyOnScene();

        // card event listeners for pointer interactions
        this.input.on('dragstart', (pointer, gameObject) => {
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

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // hover over listener
        this.input.on('gameobjectover', (pointer, gameObject) => {
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
        this.input.on('gameobjectout', (pointer, gameObject) => {
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

        this.input.on('dragenter', (pointer, gameObject, dropZone) => {
            gameObject.setTint(0xffa500);
        });

        this.input.on('dragleave', (pointer, gameObject, dropZone) => {
            gameObject.clearTint();
            if (gameObject.cost > this.player.actionPoints) {
                gameObject.setTint(0xff0000);
            }
        }); 

        this.input.on('drop', (pointer, gameObject, dropZone) => {
            if (this.player.getActionPoints() >= gameObject.getCost()) {
                gameObject.input.enabled = false;
                gameObject.tooltip.removeTooltip();
                gameObject.clearTint();
        
                // setting card in the middle 
                gameObject.displayHeight = gameOptions.cardHeight;
                gameObject.displayWidth = gameOptions.cardWidth;
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y + dropZone.y / 3;
                
                this.player.graveYardArray.push(gameObject);
                gameObject.activateCard(this);

                // remove the card from the scene after 500ms
                setTimeout(function() { 
                    gameObject.setActive(false).setVisible(false); 
                }, 500);
        
                this.player.actionPoints = this.player.getActionPoints() - gameObject.getCost();
                this.actiontext.text = this.player.getActionPoints();
        
                this.cameras.main.shake(100, 0.02);
                for (let card of this.player.handArray){
                    if (card.cost > this.player.actionPoints){
                        card.setTint(0xff0000);
                    }
                }
            } else {
                gameObject.setTint(0xff0000);
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

    damage_calculation(character, damage, modifiers) {
        for (let modifier of modifiers){
            damage = damage * modifier;
        }
        console.log(damage);
        character.health = character.health - damage;
        character.setTint(0xff0000);
        let damage_num = this.add.text(0,0, "-" + damage, {color: "red", fontSize: "30px"});
        damage_num.setPosition(character.x + 40, character.y - 80);
        this.time.delayedCall(450, this.damage_event, [character, damage_num], this);
    }

    damage_event(character, damage_num){
        character.clearTint();
        damage_num.destroy();
    }

    loadCards() {
        // damage cards
        let cannon = new DamageCard("cannon", 1, "damage", {damage: 3, target: "all"}, this, 0, 0, "cannon");
        let grenade = new DamageCard("grenade", 2, "damage", {damage: 6, target: "single"}, this, 0, 0, "grenade");

        // combo cards
        let headshot = new ComboCard("headshot", 1, "combo", {target: "damage", effect: "doubles"}, this, 0, 0, "headshot");
        
        // reload cards
        let reload = new ReloadCard("reload", 0, "reload", {amount: 2, sideEffects: null}, this, 0, 0, "reload");
        let overload = new ReloadCard("overload", 0, "reload", {amount: 4, sideEffects: -15}, this, 0, 0, "overload");

        // healing cards
        let medkit = new HealingCard("medkit", 0, "healing", {target: "health", amount: 3}, this, 0, 0, "medkit");
        let kevlar = new HealingCard("kevlar", 1, "healing", {target: "armour", amount: 6}, this, 0, 0, "kevlar");

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


    // start keep cards and make keep cards button appear
    keepCard(player) {
        this.keepCardButton.visible = false;
        this.endTurnButton.visible = true;
        for (let card of this.player.handArray){
            card.clearTint();
        }
        this.player.selectCardInHand(player);
    }
    
    
    // ends the player's turn
    endTurn() {
        this.keepCardButton.visible = true;
        this.endTurnButton.visible = false;
        this.player.moveCardsBackInDeck(this);
        
        // simulate enemies attacking
        for (let i=0; i < enemy.enemyOnScene.length; i++) {
            let base_damage = enemy.enemyOnScene[i].action();
            this.damage_calculation(this.player, base_damage, [1]);
        }
        this.playerHealth.health = this.player.health;
        this.playerHealth.show_health();
        
        // automatic drawing goes here and checking if needing to reshuffle the deck
        this.player.drawCard(5 - this.player.handArray.length, this);
        this.player.resetDeck(this);
        for (let card of this.player.handArray){
            if (card.cost > this.player.actionPoints){
                card.setTint(0xff0000);
            }
        }
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
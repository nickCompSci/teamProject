import { CST } from "../CST.js";
import Button from '../helpers/classes/button.js';
import { gameOptions, enemy} from "../helpers/config.js";
import Zone from "../helpers/classes/zone.js";
import Player from "../helpers/classes/player.js";
import Enemy from "../helpers/classes/enemy.js";
import {handArray, deckArray, deckTrackerArray, graveYardArray, shuffle, deckSetUp} from "../helpers/classes/deck.js";
import InteractHandler from "../helpers/classes/interactHandler.js";
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
        let cards = data;
        // make these class variables to turn them off on click
        this.endTurnButton;
        this.keepCardButton;
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
        
        let player = new Player(this, 0, 0, "guy", handArray);
        player.setPosition(gameWidth/4, gameHeight/1.65);
        player.setScale(3);

        let heart = this.add.image(0, 0, "heart");
        let heartext = this.add.text(0,0, player.getHealth(), {color: "black", fontSize: "30px"});
        heart.setScale(4);
        heartext.setPosition(-18, -18);
        let health = this.add.container(0, 0, [heart, heartext]);
        health.setPosition(gameWidth/20, gameHeight/2.2);

        let chamber = this.add.circle(0, 0, 30, 0xffcc00);
        let actiontext = this.add.text(0,0, player.getActionPoints(), {color: "black", fontSize: "30px"});
        actiontext.setPosition(-10, -18);
        let actions = this.add.container(0, 0, [chamber, actiontext]);
        actions.setPosition(gameWidth/20, gameHeight/1.75);

        // set it so a rectangular zone appear with overflow
        let discardPile = this.add.sprite(-35, gameHeight, "discardPile").setOrigin(0, 1);
        discardPile.setScale(1.5).setInteractive({useHandCursor: true});
        discardPile.on('pointerdown', function (event) {
            this.scene.start(CST.SCENES.DISCARD_PILE, graveYardArray);
        }, this);
        
        // load cards
        this.loadCards();
        
        this.endTurnButton = new Button(gameWidth, gameHeight/2, "End Turn", this, this.endTurn.bind(this, player, this.endTurnButton), '#202529');
        this.keepCardButton = new Button(gameWidth, gameHeight/2, "Keep Cards", this, this.keepCard.bind(this, player, this.keepCardButton), '#202529');

        // zone where cards can be dropped and activated
        let dropZone = new Zone(this, 200, 200, 500, 500);

        // shuffle the deck, draw it and set up the cards in hand;
        shuffle(deckArray);
        deckSetUp(this, deckArray, deckTrackerArray);
        this.drawCard(gameOptions.startCards);

        // spawning enemies according to spritesheet randomly
        for (let i=0; i < enemy.numberOfSprites; i++) {
            let enemySprite = new Enemy(this, 0, 0, 'enemy', i);
            enemy.enemyList.push(enemySprite);
        }
        this.spawnEnemyOnScene();
    }


    loadCards() {
        // damage cards
        let cannon = new DamageCard("cannon", 1, "damage", {damage: 3, target: "all"}, this, 0, 0, "cannon");
        let grenade = new DamageCard("grenade", 2, "damage", {damage: 6, target: "single"}, this, 0, 0, "grenade");

        // combo cards
        let headshot = new ComboCard("headshot", 1, "combo", {target: "damage", effect: "doubles"}, this, 0, 0, "headshot");
        
        // reload cards
        let reload = new ReloadCard("reload", 0, "reload", {amount: 2, sideEffects: null}, this, 0, 0, "reload");
        let overload = new ReloadCard("overload", 0, "reload", {amount: 4, sideEffects: -1}, this, 0, 0, "overload");

        // healing cards
        let medkit = new HealingCard("medkit", 1, "healing", {target: "health", amount: 3}, this, 0, 0, "medkit");
        let kevlar = new HealingCard("kevlar", 2, "healing", {target: "armour", amount: 6}, this, 0, 0, "kevlar");

        deckArray.push(cannon);
        deckArray.push(grenade);
        deckArray.push(headshot)
        deckArray.push(reload);
        deckArray.push(overload);
        deckArray.push(medkit);
        deckArray.push(kevlar);
    }
    

    // draw an amount of cards
    drawCard(amountOfCards) {
        for (let i=0; i < amountOfCards; i++) {
            let lastCard = deckTrackerArray.pop();
            lastCard.destroy();

            let drawCard = deckArray.pop();
            handArray.push(drawCard);
            drawCard.cardInHand(this);
            this.arrangeCardsInCenter(handArray);
        }
    }


    arrangeCardsInCenter(handArray) {
        // organise code based on the bottom middle of screen
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
        player.selectCardInHand(player);
    }
    
    
    // ends the player's turn
    endTurn(player) {
        this.keepCardButton.visible = true;
        this.endTurnButton.visible = false;
        player.moveCardsBackInDeck(this);
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
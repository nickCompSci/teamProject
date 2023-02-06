import { CST } from "../CST.js";
import Button from '../helpers/classes/button.js';
import VisualCard from "../helpers/classes/VisualCard.js"
import { gameOptions, cardBackDimensions } from "../helpers/config.js";
import Zone from "../helpers/classes/Zone.js";
import Player from "../helpers/classes/player.js";
import {handArray, deckArray, deckTrackerArray, graveYardArray, shuffle, deckSetUp} from "../helpers/classes/deck.js";


export class BattleScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.BATTLE
        })
    }

    preload() {
        this.load.image("HUD", "./assets/hud_bg.png");
        this.load.image("background", "./assets/background.png");
        this.load.image("card_holder", "./assets/card_holder.jpg");
        this.load.image("guy", "./assets/sprites/player_green_glasses.png");
        this.load.image("heart", "./assets/sprites/heart.png")
        this.load.spritesheet("cards", "./assets/sprites/spritesheet.png", {
            frameWidth: gameOptions.cardWidth,
            frameHeight: gameOptions.cardHeight
        });
        this.load.image("cardBack", "./assets/sprites/cardBack.png");
        this.load.image("sword", "./assets/sprites/sword.png");
    }

    create() {
        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;

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
         
        for (let i = 0; i < gameOptions.startCards; i ++) {
            // creates cards from spritesheet and makes them draggable
            let card = new VisualCard(this.game.config.width / 2 - gameOptions.cardDistance,
            this.game.config.height, this, 'cards', i, i, 2);
            deckArray.push(card);
        }

        let card1 = new VisualCard(this.game.config.width / 2 - gameOptions.cardDistance,
        this.game.config.height, this, 'cards', 0, 6, 2);
        deckArray.push(card1);

        // Button to end turn
        let endTurnButton = new Button(this.game.config.width, this.game.config.height/2, 'End Turn', this, this.endTurn.bind(this));

        // zone where cards can be dropped and activated
        let dropZone = new Zone(this, 500, 300, 300, 300);

        shuffle(deckArray);
        deckSetUp(this, deckArray, deckTrackerArray);

        this.input.on('dragstart', function (pointer, gameObject) {
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
            
            let index = handArray.indexOf(gameObject);
            if (index !== -1) {
                handArray.splice(index, 1);
            }

            this.arrangeCardsInCenter(handArray);

        }, this);

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // hover over listener
        this.input.on('gameobjectover', function(pointer, gameObject) {
            if (gameObject.type === "Sprite" && handArray.includes(gameObject)) {
                this.tweens.add({
                    targets: gameObject,
                    angle: 0,
                    displayWidth: gameOptions.cardWidth,
                    displayHeight: gameOptions.cardHeight,
                    depth: 100,
                    duration: 10
                });
            }
        }, this);

        // hover out listener
        this.input.on('gameobjectout', function(pointer, gameObject) {
            if (gameObject.type === "Sprite" && handArray.includes(gameObject)) {
                this.tweens.add({
                    targets: gameObject,
                    angle: gameObject.startPosition.angle,
                    displayWidth: gameOptions.cardWidth/2,
                    displayHeight: gameOptions.cardHeight/2,
                    depth: gameObject.startPosition.depth,
                    duration: 10,
                });
            }
       }, this);

        this.input.on('dragenter', function(pointer, gameObject, dropZone) {
            dropZone.renderActiveOutline();
        });

        this.input.on('dragleave', function(pointer, gameObject, dropZone) {
            dropZone.renderNormalOutline();
        }); 

        this.input.on('drop', function(pointer, gameObject, dropZone) {
            gameObject.input.enabled = false;

            // setting card in the middle 
            gameObject.displayWidth = gameOptions.cardWidth / 2;
            gameObject.displayHeight = gameOptions.cardHeight / 2;
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y + dropZone.y / 3;
            
            graveYardArray.push(gameObject);

            // remove the card from the scene after 500ms
            setTimeout(function() { gameObject.destroy(); }, 500);

            dropZone.renderNormalOutline(this);

            this.cameras.main.shake(100, 0.02);
        });

        this.input.on("dragend", function(pointer, gameObject, dropped) {
        
            if (!dropped) {
                handArray.push(gameObject);
                gameObject.displayHeight = gameOptions.cardHeight / 2;
                gameObject.displayWidth = gameOptions.cardWidth / 2;
                this.arrangeCardsInCenter(handArray);
            }
        }, this);
    }

    arrangeCardsInCenter(handArray) {
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
                angle: card.angle,
                depth: card.depth
            }

            // sets card to the right in front
            card.setDepth(i);
        }
    }

   // simulate a drawing feature
    endTurn() {
        if (deckArray.length > 0) {
            let lastCard = deckTrackerArray.pop();
            lastCard.destroy();

            let drawCard = deckArray.pop();
            handArray.push(drawCard);
            drawCard.cardInHand(this);
            this.arrangeCardsInCenter(handArray);
        }

    }
}
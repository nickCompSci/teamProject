import { CST } from "../CST.js";
import Button from '../helpers/classes/button.js';
import VisualCard from "../helpers/classes/VisualCard.js"
import { gameOptions, cardBackDimensions } from "../helpers/config.js";
import Card from "../helpers/classes/card.js"
import Zone from "../helpers/classes/Zone.js";

let handArray;
let deckArray;
let deckTrackerArray;
let graveYardArray;

export class BattleScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.BATTLE
        })
    }

    preload() {
        this.load.image("background", "./assets/background.jpg");
        this.load.spritesheet("cards", "./assets/sprites/spritesheet.png", {
            frameWidth: gameOptions.cardWidth,
            frameHeight: gameOptions.cardHeight
        });
        this.load.image("cardBack", "./assets/sprites/cardBack.png");
        this.load.image("sword", "./assets/sprites/sword.png");
    }

    create() {
        let bg = this.add.sprite(0, 0, "background");
        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;
        bg.setPosition(gameWidth/2, gameHeight/2);
        
        deckArray = [];
        deckTrackerArray = [];
        handArray = [];
        graveYardArray = [];
        
        for (let i = 0; i < gameOptions.startCards; i ++) {
            // creates cards from spritesheet and makes them draggable
            let card = new VisualCard(this.game.config.width / 2 - gameOptions.cardDistance,
            this.game.config.height, this, 'cards', i, i, 2);
            deckArray.push(card);
        }

        let card1 = new VisualCard(this.game.config.width / 2 - gameOptions.cardDistance,
        this.game.config.height, this, 'cards', 0, 6, 2);
        deckArray.push(card1);

        this.shuffle();
        this.deckSetUp();

        let endTurnButton = new Button(this.game.config.width, this.game.config.height/2, 'End Turn', this, this.endTurn.bind(this));
        // zone where cards can be dropped and activated
        let dropZone = new Zone(this, 500, 300, 300, 300);

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

    deckSetUp() {
        let x = this.game.config.width - 200;
        let y = this.game.config.height - 50;
        for (let i=0; i < deckArray.length; i++) {
            let cardBack = this.add.sprite(x,
            y, 'cardBack');
            cardBack.setOrigin(0.5, 1);
            cardBack.displayWidth = cardBackDimensions.backWidth / 2;
            cardBack.displayHeight = cardBackDimensions.backHeight / 2;
            
            deckTrackerArray.push(cardBack);
            x += 4;
        }
    }

    // implementing Durstenfeld shffle, an optimised version of Fisher-Yates
    shuffle() {
        for (let i = deckArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i+1));
            [deckArray[i], deckArray[j]] = [deckArray[j], deckArray[i]]
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
import { CST } from "../CST.js";
import Button from '../helpers/classes/Button.js';
import HandCard from "../helpers/classes/cards/HandCard";
import { gameOptions } from "../helpers/config.js";
import Zone from "../helpers/classes/Zone.js";
import Player from "../helpers/classes/Player.js";
import {handArray, deckArray, deckTrackerArray, graveYardArray, shuffle, deckSetUp} from "../helpers/classes/Deck.js";
import InteractHandler from "../helpers/classes/InteractHandler.js";


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
         
        for (let i = 0; i < gameOptions.startCards; i++) {
            // creates cards from spritesheet and makes them draggable
            let card = new HandCard(this, gameWidth/2, gameHeight/2, 'cards', i);
            deckArray.push(card);
        }

        let card1 = new HandCard(this, gameWidth/2, gameHeight/2, 'sword', 0);
        deckArray.push(card1);

        // Button to end turn
        let endTurnButton = new Button(gameWidth, gameHeight/2, 'End Turn', this, this.endTurn.bind(this), '#202529');
        endTurnButton.changeCursor();

        // zone where cards can be dropped and activated
        let dropZone = new Zone(this, 500, 400, 300, 600);

        shuffle(deckArray);
        deckSetUp(this, deckArray, deckTrackerArray);
        
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
            card.setDepth(50);
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
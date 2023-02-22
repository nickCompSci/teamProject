import {cardBackDimensions} from "../config.js";


export default class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, sprite, frame) {
        super(scene, x, y, sprite, frame);
        this.health = 50;
        this.actionPoints = 6;
        this.handArray = [];
        this.deckArray = [];
        this.deckTrackerArray = [];
        this.graveYardArray = [];
        this.spriteType = "player";
        scene.add.existing(this);
    }

    deckSetUp(scene) {
        let x = scene.game.config.width / 25;
        let y = scene.game.config.height / 1.24;
        for (let i=0; i < this.deckArray.length; i++) {
            let cardBack = scene.add.sprite(x,
            y, 'cardBack');
            cardBack.setOrigin(0.5, 1);
            cardBack.displayWidth = cardBackDimensions.backWidth / 2;
            cardBack.displayHeight = cardBackDimensions.backHeight / 2;
            
            this.deckTrackerArray.push(cardBack);
            x += 4;
        }
    }
    
    // implementing Durstenfeld shffle, an optimised version of Fisher-Yates
    shuffle() {
        for (let i = this.deckArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i+1));
            [this.deckArray[i], this.deckArray[j]] = [this.deckArray[j], this.deckArray[i]]
        }
    }

    getHealth() {
        return this.health;
    }

    setHealth(health) {
        this.health = health;
    }

    getActionPoints() {
        return this.actionPoints;
    }

    setActionPoints(actionPoints) {
        this.actionPoints = actionPoints;
    }

    getSpriteType() {
        return this.spriteType;
    }
}
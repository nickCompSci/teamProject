import Deck from "./deck.js"

export default class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, sprite, frame) {
        super(scene, x, y, sprite, frame);
        this.health = 50;
        this.actionPoints = 6;
        this.deck = new Deck();
        this.spriteType = "player";
        scene.add.existing(this);
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

    getDeck() {
        return this.deck;
    }

    getSpriteType() {
        return this.spriteType;
    }
}
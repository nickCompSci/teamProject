import Character from "./Characters";

export default class Player extends Character {

    constructor(scene, x, y, sprite, deck) {
        super(scene, x, y, sprite);
        this.actionPoints = 6;
        this.deck = deck;
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
}
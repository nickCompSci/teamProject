import Enemy from "./enemy.js";

export default class Boss extends Enemy {
    constructor(scene, x, y, sprite, frame, health) {
        super(scene, x, y, sprite, frame, health);
        this.maxArmour = 50;
        this.maxHealth = health;
        this.setScale(1);
    }

    action() {
        return Math.floor((Math.random() * 15) + 1);
    }

    updateArrow() {
        super.updateArrow();
    }
}
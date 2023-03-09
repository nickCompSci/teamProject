import Enemy from "./enemy.js";

export default class Boss extends Enemy {
    constructor(scene, x, y, sprite, frame, health) {
        super(scene, x, y, sprite, frame, health);
        this.x = scene.game.config.width * 0.65;
        this.y = scene.game.config.height * 0.58;
        this.maxArmour = 50;
        this.maxHealth = health;
        this.enemyArrow.x += 100;
        this.setScale(2);
    }

    action(scene) {
        let chance = Math.floor((Math.random() * 10) + 1);
        if (chance === 1) {
            this.heal(scene);
        } else {
            this.attack(scene);
        }
    }

    attack(scene) {
        let attackDamage = Math.floor((Math.random() * 22) + 12);
        scene.damage_calculation(scene.player, attackDamage);
    }

    heal(scene) {
        let heal = Math.floor((Math.random() * 15) + 10);
        scene.healing_calculation(this, heal);
    }

    updateArrow() {
        super.updateArrow();
    }

    spawn() {
        super.spawn();
    }
}
export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, health, minDamage, maxDamage, level, frame) {
        super(scene, x, y, sprite, frame);
        this.x = scene.game.config.width * 0.6;
        this.y = scene.game.config.height * 0.6;
        this.setScale(2);
        this.health = health;
        this.maxArmour = 20;
        this.armour = 0;
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
        this.level = level;
        this.damageModifiers = [1];
        this.spriteType = "enemy";
        this.setInteractive();
        this.setVisible(false);
        this.enemyArrow = scene.add.image(this.x, this.y - this.height - 25, "enemyArrow").setScale(2).setVisible(false);
    
        scene.add.existing(this);
    }
  
    // generates a random number between min and max parameters
    // min and max included
    action() {
        return ((Math.floor(Math.random() * (this.maxDamage - this.minDamage + 1)) + this.minDamage) + (this.level + 1));
    }

    updateArrow() {
        this.enemyArrow.x = this.x;
        this.enemyArrow.y = this.y - this.height - 25;
    }

    spawn() {
        this.setVisible(true);
    }

    getSpriteType() {
        return this.spriteType;
    }

    getHealth() {
        return this.health;
    }

    setHealth(health) {
        this.health = health;
    }
}
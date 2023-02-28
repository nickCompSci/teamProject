export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, frame, health) {
        super(scene, x, y, sprite, frame);
        this.x = scene.game.config.width * 0.6;
        this.y = scene.game.config.height * 0.6;
        this.setScale(2);
        this.health = health;
        this.spriteType = "enemy";
        this.setInteractive();
    
        scene.add.existing(this);
    }
  
    // generates a random number between min and max parameters
    // min and max included
    action() {
        return Math.floor(Math.random() * 10);
    }

    spawn() {
        this.visible = true;
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
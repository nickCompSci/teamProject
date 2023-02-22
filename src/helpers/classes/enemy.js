export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, frame) {
        super(scene, x, y, sprite, frame);
        this.setScale(2);
        this.health = this.getRandomHealth(50, 70);
        this.spriteType = "enemy";
        this.setInteractive();

        this.heartText = scene.add.text(scene.game.config.width - 20, 0, this.health, {color: "red", fontSize: "45px"});
        this.heartText.setOrigin(1, 0);
        
        scene.add.existing(this);

        this.setEnemyCoordinates(scene);
        this.enemySpawn();

        // this.heart = scene.add.image(0, 0, "heart");
    }
  
    // generates a random number between min and max parameters
    // min and max included
    action(scene) {
        scene.player.health = scene.player.getHealth() - 5;
    }

    getRandomHealth(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    setEnemyCoordinates(scene) {
        this.y = scene.game.config.height * 0.6;
        this.x = scene.game.config.width * 0.6;
    }

    enemySpawn() {
        this.visible = !this.visible;
        this.heartText.visible = !this.heartText.visible;
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
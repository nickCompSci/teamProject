export default class HealthBar{

    constructor(scene, x, y, maxHealth, health){
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.maxHealth = maxHealth;
        this.health = health;

        this.show_health();

        scene.add.existing(this.bar);
    }

    show_health(){
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x, this.y, 104, 16);

        //  Health
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x + 2, this.y + 2, 100, 12);


        let percentage = 100 * (this.health / this.maxHealth);
        this.bar.fillStyle(0xff0000);
        this.bar.fillRect(this.x + 2, this.y + 2, percentage, 12);
    }
    
}
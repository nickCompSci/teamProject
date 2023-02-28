export default class HealthBar{

    constructor(scene, x, y, health, maxHealth){
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.maxHealth = maxHealth;

        this.healthbartext = scene.add.text(this.x - 22, this.y - 4, health, {color: "white", fontSize: "20px"});
        this.bar.fillStyle(0xffffff);
        this.bar.fillCircle(this.x - 10, this.y + 7, 20);
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x, this.y, 104, 16);

        this.show_health(health);

        scene.add.existing(this.bar);
    }

    show_health(health){

        this.bar.fillStyle(0xff0000);
        this.bar.fillCircle(this.x - 10, this.y + 7, 18);

        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x + 2, this.y + 2, 100, 12);

        if (health >= this.maxHealth){
            health = this.maxHealth;
            this.bar.fillStyle(0xff0000);
            this.bar.fillRect(this.x + 2, this.y + 2, 100, 12);
        } else if (health > 0){
            let percentage = 100 * (health / this.maxHealth);
            this.bar.fillStyle(0xff0000);
            this.bar.fillRect(this.x + 2, this.y + 2, percentage, 12);
        }

        this.healthbartext.setDepth(1);
        this.healthbartext.text = health;
    }
    
}
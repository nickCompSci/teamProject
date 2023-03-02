export default class HealthBar{

    constructor(scene, x, y, health, maxHealth, armour, maxArmour){
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.maxHealth = maxHealth;
        this.maxArmour = maxArmour;

        this.healthText = scene.add.text(this.x - 27, this.y - 2, health, {color: "white", fontSize: "20px"});
        this.armourText = scene.add.text(x, y, maxArmour, {colour: "black", fontSize: "20px"});

        this.show_health(scene, health, armour);

        scene.add.existing(this.bar);
    }

    show_health(scene, health, armour){
        this.bar.clear();
        this.armourText.destroy();

        this.bar.fillStyle(0xffffff);
        this.bar.fillCircle(this.x - 15, this.y + 7, 20);
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x, this.y, 104, 16);

        this.bar.fillStyle(0xff0000);
        this.bar.fillCircle(this.x - 15, this.y + 7, 18);

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
        } else {
            this.bar.fillStyle(0x000000);
            this.bar.fillRect(this.x + 2, this.y + 2, 100, 12);
        }

        this.healthText.setDepth(1);
        this.healthText.text = health;

        if (armour > 0){
            this.bar.fillStyle(0xC0C0C0);
            this.bar.fillCircle(this.x + 110, this.y + 7, 14);

            let percentage = 100 * (armour / this.maxArmour)
            this.bar.fillStyle(0xC0C0C0);
            this.bar.fillRect(this.x + 2, this.y + 2, percentage, 12);
            this.armourText = scene.add.text(this.x + 100, this.y - 4, armour, {color: "black", fontSize: "18px"});
            this.armourText.setDepth(1);
        }
    }
}
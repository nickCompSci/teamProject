import { loadFont } from "../font"
// loadFont("font1", "./assets/PixelboyFont.ttf");

export default class Button extends Phaser.GameObjects.Text {

    constructor(x, y, label, scene, callback, bgColour) {
       super(scene, x, y, label);
        this.padding = {
            x: 8,
            y: 15
        }
        this.setOrigin(1, 0.5);
        this.setPadding(this.padding.x, this.padding.y);
        this.setStyle({ backgroundColor: bgColour});
        this.on('pointerdown', () => callback());
        scene.add.existing(this);
    }

    changeCursor() {
        this.setInteractive({ useHandCursor: true });
    }

    changePadding(newX, newY) {
        this.padding = {
            x: newX,
            y: newY
        }
        this.setPadding(this.padding.x, this.padding.y);
    }

    changeOrigin(newX, newY) {
        if (0 <= newX <= 1 && 0 <= newY <= 1) {
            this.setOrigin(newX, newY);
        }
    }
}

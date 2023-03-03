// import { loadFont } from "../font"
// loadFont("font1", "./assets/PixelboyFont.ttf");

export default class Button extends Phaser.GameObjects.Text {

    constructor(x, y, xPadding, yPadding, label, scene, callback, bgColour) {
        super(scene, x, y, label);
        this.setOrigin(0, 0.5);
        this.setPadding(xPadding, yPadding);
        this.setStyle({ backgroundColor: bgColour});
        this.setInteractive( { useHandCursor: true});
        this.on('pointerdown', () => callback());
        scene.add.existing(this);
    }

    setFontColour(fontColour) {
        this.setStyle({color: fontColour});
    }

    changePadding(newX, newY) {
        this.setPadding(newX, newY);
    }

    changeOrigin(newX, newY) {
        if (0 <= newX <= 1 && 0 <= newY <= 1) {
            this.setOrigin(newX, newY);
        }
    }
}

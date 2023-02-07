import { gameOptions } from "../../config";

export default class HandCard extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, frame) {
        super(scene, x, y, sprite, frame);
        scene.add.existing(this);
        this.cardInHand(scene);
    }

    cardInHand(scene) {
        this.visible = !this.visible;
        this.setInteractive();
        scene.input.setDraggable(this);
        this.setOrigin(0.5, 1);

        // Minimises the cards initial display size
        this.displayWidth = gameOptions.cardWidth / 2;
        this.displayHeight = gameOptions.cardHeight / 2 ;
    }
}
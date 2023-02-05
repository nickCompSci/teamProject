// import Card from './card.js'
import { gameOptions, cardBackDimesions } from '../config.js'

export default class VisualCard extends Phaser.GameObjects.Sprite {
    
    constructor(x, y, scene, sprite, frame, id, cost) {
        super(scene, x, y, sprite, frame);
        this.id = id;
        this.cost = cost;
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
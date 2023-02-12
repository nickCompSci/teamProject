import { gameOptions } from "../../config";

export default class HandCard extends Phaser.GameObjects.Sprite {
    constructor(name, cost, effect, cardType, scene, x, y, sprite) {
        super(scene, x, y, sprite);
        this.name = name;
        this.cost = cost;
        this.effect = effect;
        this.cardType = cardType;

        scene.add.existing(this);
        this.cardInHand(scene);
    }

    cardInHand(scene) {
        this.visible = !this.visible;
        this.setInteractive();
        scene.input.setDraggable(this);
        this.setOrigin(0.5, 1);

        // Minimises the cards initial display size
        this.displayWidth = gameOptions.cardWidth;
        this.displayHeight = gameOptions.cardHeight;
    }

    activateCard() {
        
    }
    
    getName() {
        return this.name;
    }

    getCost() {
        return this.cost;
    }

    getEffect() {
        return this.effect;
    }

    getType() {
        return this.cardType;
    }

    setCost(cost) {
        this.cost = cost;
    }


}
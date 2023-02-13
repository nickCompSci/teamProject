import { gameOptions } from "../../config";

export default class HandCard extends Phaser.GameObjects.Sprite {
    constructor(name, cost, cardType, effect, scene, x, y, sprite) {
        super(scene, x, y, sprite);
        this.name = name;
        this.cost = cost;
        this.effect = effect;
        this.cardType = cardType;
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
import { gameOptions } from "../../config.js";

// Cards that appear in the player's hand
export default class HandCard extends Phaser.GameObjects.Sprite {
    constructor(name, cost, cardType, effect, rarity, scene, x, y, sprite) {
        super(scene, x, y, sprite);
        this.name = name;
        this.cost = cost;
        this.effect = effect;
        this.cardType = cardType;
        this.rarity = rarity;
    }

    // edits card's appearances in hand
    cardInHand(scene) {
        this.setVisible(true);
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

    getRarity() {
        return this.rarity;
    }

    setCost(cost) {
        this.cost = cost;
    }
}
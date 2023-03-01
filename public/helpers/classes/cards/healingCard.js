import HandCard from "./handCard.js";
import { Tooltip } from "./toolTip.js";

export default class HealingCard extends HandCard {
    constructor(name, cost, cardType, effect, rarity, scene, x, y, sprite) {
        super(name, cost, cardType, effect, rarity, scene, x, y, sprite);
        this.tooltip = new Tooltip(scene, x+this.displayWidth, y, this.getLabel());
        this.originalAmount = this.effect.amount;
        this.originalTarget = this.effect.target;
        scene.add.existing(this);
        this.cardInHand(scene);
    }

    cardInHand(scene) {
        super.cardInHand(scene);
    } 

    activateCard(scene) {
        if (this.effect.target === "health") {
            scene.healing_calculation(scene.player, this.effect.amount, [1]);
        } else if (this.effect.target === "armour") {
            scene.armour_calculation(scene.player, this.effect.amount);
        }

        if ("discard" in this.effect) {
            scene.player.discardCard(this.effect.discard, scene);
        }

        if ("cards" in this.effect) {
            scene.player.drawCard(this.effect.cards, scene);
        }

        this.resetCard();
    }

    getLabel() {
        if (this.effect.target === "armour") {
            return "Armour: \nRemoved before health when receiving damage.";
        } else if (this.effect.target === "health") {
            return "Health: \nIf this reaches zero, you die."
        }
    }    

    resetCard() {
        this.effect.amount = this.originalAmount;
        this.effect.target = this.originalTarget;
    }
}
import HandCard from "./handCard.js";
import { Tooltip } from "./toolTip.js";

export default class ReloadCard extends HandCard {
    constructor(name, cost, cardType, effect, rarity, scene, x, y, sprite) {
        super(name, cost, cardType, effect, rarity, scene, x, y, sprite);
        this.tooltip = new Tooltip(scene, x+this.displayWidth, y, this.getLabel());
        scene.add.existing(this);
        this.cardInHand(scene);
    }

    cardInHand(scene) {
        super.cardInHand(scene);
    } 

    // nned to account for next turn side effects
    // such as losing action points next turn
    activateCard(scene) {
        scene.player.actionPoints += this.effect.amount;
        if (!("overload" in this.effect) && scene.player.actionPoints > scene.player.maxActionPoints) {
            scene.player.actionPoints = scene.player.maxActionPoints;
        }

        if ("cards" in this.effect) {
            scene.player.drawCard(this.effect.cards, scene);
        }

        if ("sideEffects" in this.effect) {
            scene.damage_calculation(scene.player, this.effect.sideEffects, [1]);
        }

    }

    

    getLabel() {
        return "AP: \nAction Points are used when activating a card."
    }

}
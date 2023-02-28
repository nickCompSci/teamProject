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
        if (this.effect.sideEffects !== null) {
            // removing health if its overloading card
            scene.player.setHealth(this.effect.sideEffects);
            scene.heartext.setText(scene.player.health);
            // add function here to kill the player if health goes to 0
        }

        scene.player.setActionPoints(this.effect.amount);
    }

    getLabel() {
        return "AP: \nAction Points are used when activating a card."
    }

}
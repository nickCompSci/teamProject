import { gameOptions, enemy } from "../../config";
import HandCard from "./handCard";
import { Tooltip } from "./tooltip";

export default class HealingCard extends HandCard {
    constructor(name, cost, cardType, effect, scene, x, y, sprite) {
        super(name, cost, cardType, effect, scene, x, y, sprite);
        this.tooltip = new Tooltip(scene, x+this.displayWidth, y, this.getLabel());
        scene.add.existing(this);
        this.cardInHand(scene);
    }

    cardInHand(scene) {
        super.cardInHand(scene);
    } 

    // needs to access the player's health and armour
    activateCard(scene) {
        let card = this;
        if (card.effect.target == "health") {
            console.log(this);
        }
    }

    getLabel() {
        if (this.effect.target == "armour") {
            return "Armour: \nRemoved before health when receiving damage.";
        } else if (this.effect.target == "health") {
            return "Health: \nIf this reaches zero, you die."
        }
    }    

}
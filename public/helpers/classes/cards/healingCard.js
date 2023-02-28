import HandCard from "./handCard.js";
import { Tooltip } from "./toolTip.js";

export default class HealingCard extends HandCard {
    constructor(name, cost, cardType, effect, rarity, scene, x, y, sprite) {
        super(name, cost, cardType, effect, rarity, scene, x, y, sprite);
        this.tooltip = new Tooltip(scene, x+this.displayWidth, y, this.getLabel());
        scene.add.existing(this);
        this.cardInHand(scene);
    }

    cardInHand(scene) {
        super.cardInHand(scene);
    } 

    activateCard(scene) {
        if (this.effect.target == "health") {
            scene.player.setHealth(this.effect.amount);
            scene.heartext.setText(scene.player.health);
        }
        // include bottom when armour is introduced
        // } else (this.effect.target == "armour") {
        //     scene.player.setArmour(this.effect.amount);
        //     scene.armourText.setText(scene.player.armour);
        // }
    }

    getLabel() {
        if (this.effect.target == "armour") {
            return "Armour: \nRemoved before health when receiving damage.";
        } else if (this.effect.target == "health") {
            return "Health: \nIf this reaches zero, you die."
        }
    }    

}
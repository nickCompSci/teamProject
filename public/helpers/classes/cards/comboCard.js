import { gameOptions, enemy } from "../../config.js";
import HandCard from "./handCard.js";
import { Tooltip } from "./toolTip.js";

export default class ComboCard extends HandCard {
    constructor(name, cost, cardType, effect, scene, x, y, sprite) {
        super(name, cost, cardType, effect, scene, x, y, sprite);
        this.tooltip = new Tooltip(scene, x+this.displayWidth, y, this.getLabel());
        scene.add.existing(this);
        this.cardInHand(scene);
    }

    cardInHand(scene) {
        super.cardInHand(scene);
    } 

    activateCard(scene) {
        let card = this;
        console.log(this);   
    }

    getLabel() {
        return "Combo: \nAffects the next card played through amplifying the effect."
    }
    
   
}
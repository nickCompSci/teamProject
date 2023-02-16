import { gameOptions, enemy } from "../../config";
import HandCard from "./handCard";
import { Tooltip } from "./tooltip";

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
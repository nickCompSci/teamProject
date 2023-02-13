import { gameOptions, enemy } from "../../config";
import HandCard from "./HandCard";

export default class ComboCard extends HandCard {
    constructor(name, cost, cardType, effect, scene, x, y, sprite) {
        super(name, cost, cardType, effect, scene, x, y, sprite);
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

}
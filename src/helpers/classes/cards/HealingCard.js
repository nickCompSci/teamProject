import { gameOptions, enemy } from "../../config";
import HandCard from "./HandCard";

export default class HealingCard extends HandCard {
    constructor(name, cost, cardType, effect, scene, x, y, sprite) {
        super(name, cost, cardType, effect, scene, x, y, sprite);
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

}
import { gameOptions, enemy } from "../../config";
import HandCard from "./HandCard";

export default class ReloadCard extends HandCard {
    constructor(name, cost, cardType, effect, scene, x, y, sprite) {
        super(name, cost, cardType, effect, scene, x, y, sprite);
        scene.add.existing(this);
        this.cardInHand(scene);
    }

    cardInHand(scene) {
        super.cardInHand(scene);
    } 

    // nned to account for next turn side effects
    // such as losing action points next turn
    activateCard(scene) {
        let card = this;
    }

}
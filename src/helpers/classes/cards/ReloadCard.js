import { gameOptions, enemy } from "../../config";
import HandCard from "./HandCard";
import { Tooltip } from "./Tooltip";

export default class ReloadCard extends HandCard {
    constructor(name, cost, cardType, effect, scene, x, y, sprite) {
        super(name, cost, cardType, effect, scene, x, y, sprite);
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
        let card = this;
    }

    getLabel() {
        return "AP: \nAction Points are used when activating a card."
    }

}
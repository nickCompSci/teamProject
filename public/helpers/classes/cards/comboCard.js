import Enemy from "../enemy.js";
import HandCard from "./handCard.js";
import { Tooltip } from "./toolTip.js";

export default class ComboCard extends HandCard {
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
        let card = this;
        if ("target" in this.effect) {
            scene.player.disableDragOnCards();
            for (let card of scene.player.handArray) {
                // remove the event listener from the card
                card.removeListener("pointerdown", card.comboHandler);

                // flag on card to keep track on whether it's being cicked
                card.isBeingCombo = true;

                // add the event listener back to the card
                card.comboHandler = this.comboCards.bind(this, card, scene);
                card.on("pointerdown", card.comboHandler);
            }
        }

        // take away health from player 
        if ("sideEffects" in this.effect) {
            scene.damage_calculation(scene.player, this.effect.sideEffects, [1]);
        }

        // need to add a duration to see the card being drawn and discarded
        // player draws 
        if ("cards" in this.effect) {
            scene.player.drawCard(this.effect.cards, scene);
        }

        // player discards
        if ("discard" in this.effect) {
            scene.player.discardCard(this.effect.discard, scene);
        }

        // enable cards to be interactable
        scene.player.enableDragOnCards();
    }

    comboCards(card, scene) {
        // check if combo card is targetting damage cards
        if ((card.isBeingCombo && this.effect.target === "damage") && (card.cardType === this.effect.target)) {
            // multiply the chosen card's damage
            if (this.effect.effect === "multiply") {
                card.effect.damage *= this.effect.amount;
            // add the chosen card's damage
            } else if (this.effect.effect === "addition") {
                card.effect.damage += this.effect.amount;
            }

            // convert the chosen card's target to replace single
            if (this.effect.effect === "convert") {
                card.effect.target = "all";
            }

        // this is just for nanotech
        } else if ((card.isBeingCombo && this.effect.target === "healing") && (card.cardType === this.effect.target)) {
            console.log("it works");
            if (this.effect.effect === "multiply") {
                card.effect.amount *= this.effect.amount;
                // set the card's effect armour to be the new health amount
                card.effect.otherTarget = "armour";
                card.effect.otherAmount = card.effect.amount;
            }
        }
        
        // lightblue
        card.setTint(0x86C5D8);

        // reset the click flag and add back the event listener
        for (let cards of scene.player.handArray) {
            cards.isBeingCombo = false;
            cards.comboHandler = this.comboCards.bind(this, card, scene);
            cards.on("pointerdown", cards.comboHandler);
        }
        
        scene.arrangeCardsInCenter(scene.player.handArray);
    }

    getLabel() {
        return "Combo: \nAffects the next card played through amplifying the effect."
    }
    
   
}
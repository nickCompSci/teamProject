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

        // if combo cards is the only card in your hand
        if (scene.player.handArray.length === 0) {
            this.bringBackComboCard(this, scene);
            return; 
        }

        if ("target" in this.effect) {
            scene.player.disableDragOnCards();
            scene.disableInteractionDuringCard();
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

    }

    comboCards(card, scene) {
        // check if combo card is targetting damage cards
        if ((card.isBeingCombo && this.effect.target === "damage") && (card.cardType === this.effect.target)) {
            // modify the card's damage to the target of the combo
            if (this.effect.effect === "multiply") {
                card.effect.damage *= this.effect.amount;
                card.setTint(0x86C5D8); //lightblue
            } else if (this.effect.effect === "addition") {
                card.effect.damage += this.effect.amount;
                card.setTint(0x86C5D8); //lightblue
            } else if (this.effect.effect === "convert") {
                if (card.effect.target === "all") {
                    // if damage card is already targetting all
                    this.bringBackComboCard(card, scene);
                } else {
                    // convert single to all
                    card.effect.target = "all";
                    card.setTint(0x86C5D8); //lightblue
                }
            }
            card.isBeingCombo = false;

        // doubling healing cards
        } else if ((card.isBeingCombo && this.effect.target === "healing") && (card.cardType === this.effect.target)) {
            card.effect.amount *= this.effect.amount;
            card.isBeingCombo = false;
            card.setTint(0x86C5D8);
        } else if (card.isBeingCombo) {
            this.bringBackComboCard(card, scene);
        }
        
        // remove the event listener from all cards
        for (let cards of scene.player.handArray) {
            cards.removeListener("pointerdown", cards.comboHandler);
        }

        // reset the click flag and add back the event listener
        for (let cards of scene.player.handArray) {
            cards.isBeingCombo = false;
            cards.comboHandler = this.comboCards.bind(this, card, scene);
            cards.on("pointerdown", cards.comboHandler);
        }
        
        scene.arrangeCardsInCenter(scene.player.handArray);
        // enable interaction of all elements
        scene.enableInteractionAfterCard();
        scene.player.enableDragOnCards();
    }

    // if selected non-valid card, brings back the card and adds back AP
    // sets the card back to interactive as well
    bringBackComboCard(card, scene) {
        scene.sound.play("comboWrong");
        card.isBeingCombo = false;
        scene.player.graveYardArray.splice(scene.player.graveYardArray.indexOf(this), 1);
        scene.player.handArray.push(this);
        scene.arrangeCardsInCenter(scene.player.handArray);
        this.setVisible(true);
        this.setInteractive();
        scene.player.actionPoints += this.cost;
        scene.actiontext.text = scene.player.actionPoints; 
        scene.ap.setFrame(7 - scene.player.actionPoints);
        scene.player.discardPileUpdate(scene);

        // if combo card takes away health, add it back
        if ("sideEffects" in this.effect) {
            scene.healing_calculation(scene.player, this.effect.sideEffects, [1]);
        }
    }

    getLabel() {
        return "Combo: \nWhen played, clicking a valid card amplifies its effect."
    }
    
   
}
import Character from "./characters";
import { deckArray, handArray, deckTrackerArray, shuffle, deckSetUp } from "./deck";

export default class Player extends Character {

    constructor(scene, x, y, sprite, deck) {
        super(scene, x, y, sprite);
        this.actionPoints = 6;
        this.deck = deck;
        this.spriteType = "player";
        this.keepCards = [];
        this.keepCardsLimit = 2;
        scene.add.existing(this);
    }

    selectCardInHand(player) {
        // disable drag first on all cards
        this.disableDragOnCards();
        
        for (let cards of handArray) {
            cards.on("pointerdown", function(pointer) {
                // this is referring to the clicked object rather than player now
                if (player.keepCards.includes(this)) {
                        // removes the card from list 
                    player.keepCards.splice(player.keepCards.indexOf(this), 1);
                    this.clearTint();
                } else {
                    if (player.keepCards.length < player.keepCardsLimit) {
                        player.keepCards.push(this);
                        // add a visual effect when clicked
                        this.setTint(0x999999);
                    }
                }
            });
        }

    }

    moveCardsBackInDeck(scene) {
        // remove the keep cards button 

        // get indexes of cards not in this.keepCards List
        let indexList = [];
        for (let cards of handArray) {
            if (!this.keepCards.includes(cards)) {
                let index = handArray.indexOf(cards);
                indexList.push(index);
            }
        }

        // remove the indexes in reverse order not to mess up the loop
        for (let index=indexList.length-1; index >= 0; index--) {
            deckArray.push(handArray[indexList[index]]);
            handArray[indexList[index]].setActive(false).setVisible(false);
            handArray.splice(indexList[index], 1);
        }

        // remove tint of cards remaining in hand
        for (let cards of handArray) {
            cards.clearTint();
        }

        // set up the deck sprites and deckArray and organise the cards on screen
        shuffle(deckArray);
        deckSetUp(scene, deckArray, deckTrackerArray);
        scene.arrangeCardsInCenter(handArray);
        this.enableDragOnCards();

        // rest of turn ensues
    }

    disableDragOnCards() {
        for (let i=0; i < handArray.length; i++) {
            handArray[i].input.draggable = false;
        }
    }

    enableDragOnCards() {
        for (let i=0; i < handArray.length; i++) {
            handArray[i].input.draggable = true;
        }
    }

    getHealth() {
        return this.health;
    }

    setHealth(health) {
        this.health = health;
    }

    getActionPoints() {
        return this.actionPoints;
    }

    setActionPoints(actionPoints) {
        this.actionPoints = actionPoints;
    }

    getDeck() {
        return this.deck;
    }

    getSpriteType() {
        return this.spriteType;
    }
}
import DamageCard from "./cards/damageCard.js";
import HealingCard from "./cards/healingCard.js";
import ComboCard from "./cards/comboCard.js";
import ReloadCard from "./cards/reloadCard.js";

export default class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, sprite, frame) {
        super(scene, x, y, sprite, frame);
        this.maxHealth = 50;
        this.health = this.maxHealth;
        this.armour = 0;
        this.maxActionPoints = 6;
        this.actionPoints = this.maxActionPoints;
        this.maxArmour = 25;
        this.armour = 0;
        this.damageModifiers = [1];
        this.handArray = [];
        this.deckArray = [];
        this.graveYardArray = [];
        this.spriteType = "player";
        this.keepCards = [];
        this.keepCardsLimit = 2;
        scene.add.existing(this);

        // generate a starter deck for the player
        this.starterDeck(scene);
    }

    selectCardInHand(scene) {
        // disable drag first on all cards
        this.disableDragOnCards();
        scene.keepCardsText.setVisible(true);
        for (let card of this.handArray) {
            // remove the event listener from the card
            card.removeListener("pointerdown", card.clickHandler);

            // flag on card to keep track on whether it's being clicked
            card.isBeingClicked = false;

            // add the event listener back to the card
            card.clickHandler = this.keepingCards.bind(this, card, scene);
            card.on("pointerdown", card.clickHandler);
        }
    }

    keepingCards(card, scene) {
        if (card.isBeingClicked) {
            // removes the card from list 
            this.keepCards.splice(this.keepCards.indexOf(card), 1);
            card.clearTint();
            card.isBeingClicked = false;
            scene.keepCardsText.text = this.keepCards.length + " / " + this.keepCardsLimit;
        } else {
            if (this.keepCards.length < this.keepCardsLimit) {
                this.keepCards.push(card);
                card.isBeingClicked = true;
                // add a visual effect when clicked
                card.setTint(0x999999);
                scene.keepCardsText.text = this.keepCards.length + " / " + this.keepCardsLimit;
            }
        }
    }

    moveCardsBackInDeck(scene) {
        // remove event listener from all cards
        for (let cards of this.handArray) {
            cards.removeListener("pointerdown", cards.clickHandler);
        }

        // get indexes of cards not in this.keepCards List
        let indexList = [];
        for (let cards of this.handArray) {
            if (!this.keepCards.includes(cards)) {
                let index = this.handArray.indexOf(cards);
                indexList.push(index);
            }
        }

        // remove the indexes in reverse order not to mess up the loop
        // pushes non-chosen cards to discard pile
        for (let index=indexList.length-1; index >= 0; index--) {
            // if modified by combo and not kept, revert back to original stats
            if (this.handArray[indexList[index]].cardType === "healing" || this.handArray[indexList[index]].cardType === "damage") {
                this.handArray[indexList[index]].resetCard();
            }
            
            this.graveYardArray.push(this.handArray[indexList[index]]);
            this.handArray[indexList[index]].setVisible(false);
            this.handArray.splice(indexList[index], 1);
        }

        // set up the deck sprites and deckArray and organise the cards on screen
        this.shuffle();
        this.deckUpdate(scene);
        this.discardPileUpdate(scene);
        scene.arrangeCardsInCenter(this.handArray);
        scene.keepCardsText.setVisible(false);
        this.enableDragOnCards();
        this.keepCards = [];
        
        // remove tint of cards remaining in hand 
        // reset the click flag and add back the event listener 
        for (let cards of this.handArray) {
            cards.isBeingClicked = false;
            cards.clickHandler = this.keepingCards.bind(this, cards);
            cards.on("pointerdown", cards.clickHandler);
            cards.clearTint();
        }
    }
    
    // draw an amount of cards
    drawCard(amountOfCards, scene) {
        for (let i=0; i < amountOfCards; i++) {
            this.resetDeck(scene);

            let drawCard = this.deckArray.pop();
            this.handArray.push(drawCard);
            drawCard.cardInHand(scene);
            scene.arrangeCardsInCenter(this.handArray);
            this.deckUpdate(scene);
        }
    }

    discardCard(amountOfCards, scene) {
        for (let i=0; i < amountOfCards; i++) {
            let randomIndex = Math.floor(Math.random() * this.handArray.length); 
            let randomCard = this.handArray[randomIndex];

            randomCard.setActive(false).setVisible(false).clearTint();
            this.handArray.splice(randomIndex, 1);
            this.graveYardArray.push(randomCard);
            scene.arrangeCardsInCenter(this.handArray);
            this.discardPileUpdate(scene);
        }
    }

    disableDragOnCards() {
        for (let i=0; i < this.handArray.length; i++) {
            this.handArray[i].input.draggable = false;
        }
    }

    enableDragOnCards() {
        for (let i=0; i < this.handArray.length; i++) {
            this.handArray[i].input.draggable = true;
        }
    }
    
    deckUpdate(scene) {
        scene.deckAmount.text = this.deckArray.length;
    }

    discardPileUpdate(scene) {
        scene.discardPileAmount.text = this.graveYardArray.length;
    }
    
    // implementing Durstenfeld shffle, an optimised version of Fisher-Yates
    shuffle() {
        for (let i = this.deckArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i+1));
            [this.deckArray[i], this.deckArray[j]] = [this.deckArray[j], this.deckArray[i]]
        }
    }

    resetDeck(scene) {
        if (this.deckArray.length <= 0) {
            // push all the cards in graveYard array back to the deck
            for (let i=this.graveYardArray.length; i > 0; i--) {
                let card = this.graveYardArray.shift();
                this.deckArray.push(card);
            }
            this.shuffle();
            this.deckUpdate(scene);
            this.discardPileUpdate(scene);
        }
    }

    getHealth() {
        return this.health;
    }

    setHealth(health) {
        this.health += health;

        // setting it back to max health if going over
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }

    getActionPoints() {
        return this.actionPoints;
    }

    setActionPoints(actionPoints) {
        this.actionPoints += actionPoints;

        // setting it back to max AP if going over
        if (this.actionPoints > this.maxActionPoints) {
            this.actionPoints = this.maxActionPoints
        }
    }

    getSpriteType() {
        return this.spriteType;
    }

    starterDeck(scene) {
        let high_noon = new DamageCard("high_noon", 1, "damage", {damage: 5, target: "single"}, "white", scene, 0, 0, "high_noon");
        let medkit = new HealingCard("medkit", 0, "healing", {target: "health", amount: 7}, "white", scene, 0, 0, "medkit");
        let kevlar = new HealingCard("kevlar", 1, "healing", {target: "armour", amount: 5}, "white", scene, 0, 0, "kevlar");
        let headshot = new ComboCard("headshot", 1, "combo", {target: "damage", effect: "multiply", amount: 2}, "white", scene, 0, 0, "headshot");
        let reload = new ReloadCard("reload", 0, "reload", {amount: 2}, "white", scene, 0, 0, "reload");

        this.generateDuplicateCard(4, high_noon);
        this.generateDuplicateCard(1, headshot);
        this.generateDuplicateCard(1, medkit);
        this.generateDuplicateCard(1, kevlar);
        this.generateDuplicateCard(2, reload);
    }

    generateDuplicateCard(numOfDuplicates, card) {
        for (let i=0; i < numOfDuplicates; i++) {
            let newCard;
            if (card.cardType === "damage") {
                newCard = new DamageCard(card.name, card.cost, card.cardType, card.effect, card.rarity, card.scene, card.x, card.y, card.texture);
            } else if (card.cardType === "healing") {
                newCard = new HealingCard(card.name, card.cost, card.cardType, card.effect, card.rarity, card.scene, card.x, card.y, card.texture);
            } else if (card.cardType === "combo") {
                newCard = new ComboCard(card.name, card.cost, card.cardType, card.effect, card.rarity, card.scene, card.x, card.y, card.texture);
            } else if (card.cardType === "reload") {
                newCard = new ReloadCard(card.name, card.cost, card.cardType, card.effect, card.rarity, card.scene, card.x, card.y, card.texture);
            }
            this.deckArray.push(newCard);
        }
    }
}
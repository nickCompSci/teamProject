import {cardBackDimensions} from "../config.js";

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
        this.deckTrackerArray = [];
        this.graveYardArray = [];
        this.spriteType = "player";
        this.keepCards = [];
        this.keepCardsLimit = 2;
        scene.add.existing(this);
    }

    selectCardInHand(player) {
        // disable drag first on all cards
        this.disableDragOnCards();

        for (let card of this.handArray) {
            // remove the event listener from the card
            card.removeListener("pointerdown", card.clickHandler);

            // flag on card to keep track on whether it's being clicked
            card.isBeingClicked = false;

            // add the event listener back to the card
            card.clickHandler = this.keepingCards.bind(this, card);
            card.on("pointerdown", card.clickHandler);
        }
    }

    keepingCards(card) {
        if (card.isBeingClicked) {
            // removes the card from list 
            this.keepCards.splice(this.keepCards.indexOf(card), 1);
            card.clearTint();
            card.isBeingClicked = false;
        } else {
            if (this.keepCards.length < this.keepCardsLimit) {
                this.keepCards.push(card);
                card.isBeingClicked = true;
                // add a visual effect when clicked
                card.setTint(0x999999);
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
        this.deckSetUp(scene);
        scene.arrangeCardsInCenter(this.handArray);
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
            //this.resetDeck(scene);
            let lastCard = this.deckTrackerArray.pop();
            lastCard.setActive(false).setVisible(false);

            let drawCard = this.deckArray.pop();
            this.handArray.push(drawCard);
            drawCard.cardInHand(scene);
            scene.arrangeCardsInCenter(this.handArray);
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
    
    deckSetUp(scene) {
        let x = scene.game.config.width / 25;
        let y = scene.game.config.height / 1.24;

        // need to remove all sprites currently active
        if (this.deckTrackerArray.length > 0) {
            for (let j=0; j < this.deckTrackerArray.length; j++) {
                this.deckTrackerArray[j].destroy();
            }
        }

        for (let i=0; i < this.deckArray.length; i++) {
            let cardBack = scene.add.sprite(x, y, 'cardBack');
            cardBack.setOrigin(0.5, 1);
            cardBack.displayWidth = cardBackDimensions.backWidth / 2;
            cardBack.displayHeight = cardBackDimensions.backHeight / 2;
            
            this.deckTrackerArray.push(cardBack);
            x += 3;
        }
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
            this.deckSetUp(scene);
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
}
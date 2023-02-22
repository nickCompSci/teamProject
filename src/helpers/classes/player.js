import {cardBackDimensions} from "../config.js";

export default class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, sprite, frame) {
        super(scene, x, y, sprite, frame);
        this.maxHealth = 50;
        this.health = this.maxHealth;
        this.maxActionPoints = 6;
        this.actionPoints = this.maxActionPoints;
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
        
        for (let cards of this.handArray) {
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
        // get indexes of cards not in this.keepCards List
        let indexList = [];
        for (let cards of this.handArray) {
            if (!this.keepCards.includes(cards)) {
                let index = this.handArray.indexOf(cards);
                indexList.push(index);
            }
        }

        // remove the indexes in reverse order not to mess up the loop
        for (let index=indexList.length-1; index >= 0; index--) {
            this.deckArray.push(this.handArray[indexList[index]]);
            this.handArray[indexList[index]].setActive(false).setVisible(false);
            this.handArray.splice(indexList[index], 1);
        }

        // remove tint of cards remaining in hand
        for (let cards of this.handArray) {
            cards.clearTint();
        }

        // set up the deck sprites and deckArray and organise the cards on screen
        this.shuffle();
        this.deckSetUp(scene);
        scene.arrangeCardsInCenter(this.handArray);
        this.enableDragOnCards();

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
        for (let i=0; i < this.deckArray.length; i++) {
            let cardBack = scene.add.sprite(x,
            y, 'cardBack');
            cardBack.setOrigin(0.5, 1);
            cardBack.displayWidth = cardBackDimensions.backWidth / 2;
            cardBack.displayHeight = cardBackDimensions.backHeight / 2;
            
            this.deckTrackerArray.push(cardBack);
            x += 4;
        }
    }
    
    // implementing Durstenfeld shffle, an optimised version of Fisher-Yates
    shuffle() {
        for (let i = this.deckArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i+1));
            [this.deckArray[i], this.deckArray[j]] = [this.deckArray[j], this.deckArray[i]]
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
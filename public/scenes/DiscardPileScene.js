import { CST } from "../CST.js";
import Button from "../helpers/classes/button.js";
import { gameOptions } from "../helpers/config.js";


export class DiscardPileScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.DISCARD_PILE
        })
    }

    init(data) {
        this.graveYardArray = data.cardsInDiscardPile;
        this.amountOfRepeats = data.cardsInDeck;
    }

    preload() {
        this.load.image("backgroundBattle", "../assets/resources/background.png");
        this.load.image("reload", "../assets/resources/cards/Reload.png");
    }

    create() {
        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;

        let cam = this.cameras.main;
        
        let repeat = this.checkCardsInDiscardPile(this.amountOfRepeats);

        let bg = this.add.tileSprite(0, 0, gameWidth * repeat, gameHeight * repeat, "backgroundBattle").setOrigin(0,0);
        bg.setScale(1);

        cam.setBounds(0, 0, gameWidth, gameHeight * repeat);

        let title = this.add.text(gameWidth/2, 5, "Discard Pile", {fontSize: "45px"});
        title.setOrigin(0.5, 0);

        let backButton = new Button(gameWidth/2, gameHeight - 50, 20, 20, "Go Back", this, this.goBackToBattleScene.bind(this), "#FD722A");
        backButton.setFontColour("#202529");

        backButton.setOrigin(0.5, 1);
        backButton.setScrollFactor(0); //make button stick on screen
        backButton.setDepth(3);

        let startX = 30;
        let startY = 40;
        let xOffset = gameOptions.cardWidth + 50;
        let yOffSet = gameOptions.cardHeight + 60;
        let xCounter = 0;
        let yCounter = 0;


        if (this.graveYardArray.length > 0) {
            for (let cards of this.graveYardArray) {
                cards.setVisible(true);
                let discardCard = this.add.existing(cards);
                discardCard.angle = 0;
                discardCard.x = startX + (xCounter * xOffset);
                discardCard.y = startY + (yCounter * yOffSet);
                discardCard.setOrigin(0, 0);
                discardCard.displayWidth = gameOptions.cardWidth * 1.3;
                discardCard.displayHeight = gameOptions.cardHeight * 1.3;

                xCounter++;
                if (xCounter === 5) {
                    xCounter = 0;
                    yCounter++;
                }
            }
        }

        this.input.on("pointermove", function (pointer) {
            if (!pointer.isDown) {
                return;
            }

            cam.scrollY -= (pointer.y - pointer.prevPosition.y) / cam.zoom;
        })
    }

    goBackToBattleScene() {
        this.scene.stop(CST.SCENES.DISCARD_PILE);
        this.scene.resume(CST.SCENES.BATTLE);
    }

    checkCardsInDiscardPile(amountOfRepeats) {
        if (amountOfRepeats < 10) {
            return 1;
        }

        return Math.floor(amountOfRepeats / 10);
    }
}
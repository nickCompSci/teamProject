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
        this.graveYardArray = data;
    }

    preload() {
        this.load.image("backgroundBattle", "../assets/resources/background.png");
        this.load.image("reload", "../assets/resources/cards/Reload.png");
    }

    create() {
        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;

        let bg = this.add.image(-20, 0, "backgroundBattle").setOrigin(0,0);
        bg.setScale(1);

        let title = this.add.text(gameWidth/2, 5, "Discard Pile", {fontSize: "45px"});
        title.setOrigin(0.5, 0);

        let backButton = new Button(gameWidth/2, gameHeight - 50, "Go Back", this, this.goBackToBattleScene.bind(this), "#202529");
        backButton.setOrigin(0, 1);

        let startX = 10;
        let startY = 50;
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
    }

    goBackToBattleScene() {
        this.scene.stop(CST.SCENES.DISCARD_PILE);
        this.scene.resume(CST.SCENES.BATTLE);
    }
}
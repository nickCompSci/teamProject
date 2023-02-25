import { CST } from "../CST";
import Button from "../helpers/classes/button";
import { gameOptions } from "../helpers/config";


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
        this.load.image("background", "./assets/background.png");
        this.load.image("reload", "./assets/cards/Reload.png");
    }

    create() {
        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;

        let bg = this.add.image(-20, 0, "background").setOrigin(0,0);
        bg.setScale(1);

        let title = this.add.text(gameWidth/2, 5, "Discard Pile", {fontSize: "45px"});
        title.setOrigin(0.5, 0);

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

        this.input.on("pointerdown", function() {
            this.scene.stop(CST.SCENES.DISCARD_PILE);
        }, this);
    }

}
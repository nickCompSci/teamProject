import { CST } from "../CST";
import { gameOptions } from "../helpers/config";

let graveYardArray;

export class DiscardPileScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.DISCARD_PILE
        })
    }

    init(data) {
        graveYardArray = data;
    }

    preload() {
        this.load.spritesheet("cards", "./assets/sprites/spritesheet.png", {
            frameWidth: gameOptions.cardWidth,
            frameHeight: gameOptions.cardHeight
        });
        this.load.image("background", "./assets/background.png")
    }

    create() {
        let bg = this.add.sprite(-110, 0, "background").setOrigin(0,0);
        bg.setScale(1);
        bg.alpha = 0.3;

        let startX = 0;
        let startY = 0;

        
        if (graveYardArray.length == 0 ) {
            console.log("You have no discarded or used cards.")
        } else {
            for (let i=0; i < graveYardArray.length; i++) {
                graveYardArray[i].setVisible(true);
                let discardCard = this.add.existing(graveYardArray[i]);
                discardCard.x = startX + (i * 150);
                discardCard.y = startY;
                discardCard.setOrigin(0, 0);
                discardCard.displayWidth = gameOptions.cardWidth;
                discardCard.displayHeight = gameOptions.cardHeight;
            }
        }

        this.input.once("pointerdown", function() {
            this.scene.start(CST.SCENES.BATTLE);
        }, this);
    }
}
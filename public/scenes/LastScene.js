/**
This file is used to create the initiatePVP scene.
*/
import { CST } from "../CST.js";

export class LastScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.LASTSCENE
        })
    }

    init(data){
        this.playerData = data.playerObj;
        this.network = data.networkObj;
        this.playerUsername = data.playerUsername;
    }

    create(){
        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;

        // play final sound
        this.sound.stopAll();
        this.sound.play("endOfTrail",{volume: 0.6});

        this.cameras.main.backgroundColor.setTo(0, 0, 5);

        let throne = this.add.image(gameWidth/2, gameHeight/2, "fuseThrone");
        throne.alpha = 0;
        this.tweens.add({
            targets: throne,
            alpha: {from: 0, to: 1},
            ease: 'Sine.InOut',
            duration: 6000,
            yoyo: false
        })


    }

}
/**
This file is used to create the initiatePVP scene.
*/
import { CST } from "../CST.js";
import Button from "../helpers/classes/button.js";

export class initiatePVPScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.INITIATEPVPSCENE
        })
    }

    init(data){
        this.playerData = data.playerObj;
        this.network = data.networkObj;
        this.playerUsername = data.playerUsername;
    }

    // Creates any images, text, etc.
    create(){
        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;

        // play epic sound
        this.sound.stopAll();
        this.sound.play("beginGame",{volume: 0.4});

        let throne = this.add.image(gameWidth/2, gameHeight/2, "throne");
        throne.alpha = 0;
        this.tweens.add({
            targets: throne,
            alpha: {from: 0, to: 1},
            ease: 'Sine.InOut',
            duration: 3000,
            yoyo: false
        })

        this.cameras.main.backgroundColor.setTo(0, 0, 5);
        this.button = new Button(throne.x, throne.y + throne.height / 2 + 50, 20, 20, "Claim the Throne", this, this.startFinalBattle.bind(this), '#202529');
        this.button.setOrigin(0.5, 0.5);

        this.button.alpha = 0;
        this.tweens.add({
            targets: this.button,
            alpha: {from: 0, to: 1},
            ease: 'Sine.InOut',
            duration: 5000,
            yoyo:false
        })
    }

    startFinalBattle() {  
        this.network.send('{"type": "finalBattleCall"}'); 
        this.scene.start(CST.SCENES.PVPSCENE, {networkObj: this.network, playerUsername: this.playerUsername, playerObj: this.playerData, yourTurn: true });
    }
}
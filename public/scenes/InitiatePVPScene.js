/**
This file is used to create the initiatePVP scene.
*/
import { CST } from "../CST.js";
import Button from "../helpers/classes/button.js";
import Player from "../helpers/classes/player.js";

export class initiatePVPScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.INITIATEPVPSCENE
        })
    }

    init(data){
        this.playerData = data.playerObj;
        this.currentPlayer;
        this.enemyPlayer;
        this.network = data.networkObj;
        this.playerUsername = data.playerUsername;
    }

    // Creates any images, text, etc.
    create(){
        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;

        // play epic sound
        this.sound.stopAll();
        this.sound.play("beginGame",{volume: 0.01});


        this.cameras.main.backgroundColor.setTo(0, 0, 5);
        this.button = new Button(gameWidth/2, gameHeight/2, 20, 20, "Claim the Throne", this, this.startFinalBattle.bind(this), '#202529');
    }

    startFinalBattle() {  
       
        // this.healPlayerHealth();
        // send players data activated PVP flag
        // on opposite side when detect this flag via interval,
        // it needs to load them a battle scene with the same layout as this one no matter what
        this.network.send('{"type": "finalBattleCall"}');
        
        this.scene.start(CST.SCENES.PVPSCENE, {networkObj: this.network, playerUsername: this.playerUsername, playerObj: this.playerData, yourTurn: true });
    }

    healPlayerHealth() {
        this.currentPlayer.health = this.currentPlayer.maxHealth;
        this.enemyPlayer.health = this.enemyPlayer.maxHealth;
    }
}
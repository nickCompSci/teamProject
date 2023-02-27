/**
This file is used to load all the assets for the game.
*/
import { CST } from "../CST.js";
import { MenuScene } from "./MenuScene.js";
import { OptionsScene } from "./OptionsScene.js";
import { CreditsScene } from "./CreditsScene.js";
import { JoinGameScene } from "./JoinGameScene.js";
import { CreateGameScene } from "./CreateGameScene.js";
import { LobbyScene } from "./LobbyScene.js";
import { friendScene } from "./FriendScene.js";
import { BattleScene } from "./BattleScene.js";
import { MapScene } from "./MapScene.js";
import { Network } from "../Network.js";

// Creates the LoadScene class
export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }

    // Used to initialize variables (currently not used)
    init(){
    }

    // Used to load all the assets
    preload(){

        // Load images
        this.load.image("background", "../assets/resources/tower2.jpg");
        this.load.image("arrow", "../assets/resources/arrow.png")
        this.load.image("tower", "../assets/resources/background.png");
        // Load audio
        this.load.audio("soundtrack", "../assets/resources/soundtrack.mp3");
        this.load.html("searchFriendForm", "../searchFriendForm.html");
        this.load.html("pendingAndFriends", "../pendingAndFriends.html");

        this.load.image("player2", "../assets/resources/player2.png");
        this.load.image("player", "../assets/resources/player.png");
        this.load.image("player_map", "../assets/resources/player_map.png")

        this.load.image("map", "../assets/resources/tower_floor_map.png");
        this.load.image("shop", "../assets/resources/shop.png");
        this.load.image("random", "../assets/resources/random.png");
        this.load.image("cards", "../assets/resources/cards_new.png");
        this.load.image("door", "../assets/resources/doorway.png");
        this.load.image("up", "../assets/resources/up_arrow.png")
        this.load.image("pointer", "../assets/resources/pointer.png")
        // Load plugins
        // this.load.scenePlugin({
        //     key: 'rexuiplugin',
		//     url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
		//     sceneKey: 'rexUI'
        // });

        // this.load.plugin('rextexteditplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', true)
        // this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);


        // Progress Bar
        let loadingBar = this.add.graphics({
            fillStyle: {
                colour: 0xffffff
            }
        })

        /*
        The following code is used to add functionality to the progress bar (will add a more complex progress bar later)
        Loader Events:
            complete - when everything is loaded
            progress - when something is loading
        */

        // Simulate load times (for testing)
        for(let i = 0; i < 200; i++){
            this.load.image("background" + i, "../assets/resources/tower2.jpg");
        }

        // Used to create the progress bar
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.45, 'Loading game...', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)
        this.load.on("progress", (percent)=>{
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 40);
            console.log(percent);
            })

        // instantiate network object
        var network = new Network();

        // Loads menu when everything is loaded
        this.load.on("complete", ()=>{
            this.scene.start(CST.SCENES.MENU, {network: network});
        })
    }
}
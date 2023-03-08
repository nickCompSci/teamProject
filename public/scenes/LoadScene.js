/**
This file is used to load all the assets for the game.
*/
import { CST } from "../CST.js";
import { Network } from "../Network.js";
import { MenuScene } from "./MenuScene.js";
import { OptionsScene } from "./OptionsScene.js";
import { CreditsScene } from "./CreditsScene.js";
import { JoinGameScene } from "./JoinGameScene.js";
// import { CreateGameScene } from "./CreateGameScene.js";
import { LobbyScene } from "./LobbyScene.js";
import { friendScene } from "./FriendScene.js";
import { BattleScene } from "./BattleScene.js";
import { MapScene } from "./MapScene.js";
import { ProfileScene } from "./ProfileScene.js";
import { PlayGameScene } from "./PlayGameScene.js";

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
        this.load.image("cannonball", "../assets/resources/cards/Cannonball.png");
        this.load.image("grenade", "../assets/resources/cards/Grenade.png");
        this.load.image("ballistic", "../assets/resources/cards/Ballistic.png");
        this.load.image("blast", "../assets/resources/cards/Blast.png");
        this.load.image("fire_rain", "../assets/resources/cards/Fire_Rain.png");
        this.load.image("high_noon", "../assets/resources/cards/High_Noon.png");
        this.load.image("launcher", "../assets/resources/cards/Launcher.png");
        this.load.image("missile", "../assets/resources/cards/Missile.png");
        this.load.image("molotov", "../assets/resources/cards/Molotov.png");
        this.load.image("minigun", "../assets/resources/cards/Minigun.png");
        this.load.image("reinforce", "../assets/resources/cards/Reinforce.png");

        // healing
        this.load.image("kevlar", "../assets/resources/cards/Kevlar.png");
        this.load.image("medkit", "../assets/resources/cards/Medkit.png");
        this.load.image("armour_plate", "../assets/resources/cards/Armour_Plate.png");
        this.load.image("stim_pack", "../assets/resources/cards/Stim_Pack.png");
        this.load.image("morphine", "../assets/resources/cards/Morphine.png");
        this.load.image("bourbon", "../assets/resources/cards/Bourbon.png");

        // reload
        this.load.image("overload", "../assets/resources/cards/Overload.png");
        this.load.image("reload", "../assets/resources/cards/Reload.png");
        this.load.image("ammo_cache", "../assets/resources/cards/Ammo_Cache.png");
        this.load.image("bandolier", "../assets/resources/cards/Bandolier.png");
        this.load.image("holster", "../assets/resources/cards/Holster.png");
        this.load.image("lock_and_load", "../assets/resources/cards/Lock_and_Load.png");

        // combo
        this.load.image("headshot", "../assets/resources/cards/Headshot.png");
        this.load.image("bayonet", "../assets/resources/cards/Bayonet.png");
        this.load.image("load", "../assets/resources/cards/Load.png");
        this.load.image("pinpoint", "../assets/resources/cards/Pinpoint.png");
        this.load.image("nanotech", "../assets/resources/cards/Nanotech.png");
        this.load.image("ricochet", "../assets/resources/cards/Ricochet.png");

        // Load images
        this.load.image("background", "../assets/resources/tower2.jpg");
        this.load.image("arrow", "../assets/resources/arrow.png");
        this.load.image("tower", "../assets/resources/background.png");
        this.load.image("map", "../assets/resources/tower_floor_map.png");
        this.load.image("shop", "../assets/resources/shop.png");
        this.load.image("random", "../assets/resources/random.png");
        this.load.image("cards", "../assets/resources/cards_new.png");
        this.load.image("door", "../assets/resources/doorway.png");
        this.load.image("up", "../assets/resources/up_arrow.png");
        this.load.image("pointer", "../assets/resources/pointer.png");
        this.load.image("chest", "../assets/resources/chest.png");
        // Load audio
        this.load.html("searchFriendForm", "../searchFriendForm.html");
        this.load.html("pendingAndFriends", "../pendingAndFriends.html");
        this.load.html("enterCodeForm", "../enterCodeForm.html");
        this.load.image("player_map", "../assets/resources/sprites/player_map.png");
        // Soundtrack
        this.load.audio("menuMusic", "../assets/resources/soundtrack.mp3");
        this.load.audio('mapMusic', "../assets/resources/soundtrack/Map.mp3");
        this.load.audio('doorOpen', "../assets/resources/sounds/doorOpen.wav");
        this.load.audio('shop', "../assets/resources/soundtrack/shop.mp3");
        this.load.audio('battleMusic', "../assets/resources/soundtrack/battle/battle.mp3");
        this.load.audio('bossMusic', "../assets/resources/soundtrack/battle/boss.mp3");


        // Load plugins
        // this.load.scenePlugin({
        //     key: 'rexuiplugin',
		//     url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
		//     sceneKey: 'rexUI'
        // });

        // this.load.plugin('rextexteditplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', true)
        // this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);
        this.load.audio("sentFriendRequest", ['../assets/resources/sounds/sentRequest.mp3', '../assets/resources/sounds/sentRequest.ogg']);
        this.load.audio("failedToSendFriendRequest", ['../assets/resources/sounds/failedSentRequest.mp3', '../assets/resources/sounds/failedSentRequest.ogg']);
        this.load.audio("menuButtonPress","../assets/resources/sounds/menuButtonPress.mp3");
        this.load.audio("menuButtonHover","../assets/resources/sounds/menuButtonHover.mp3");
        this.load.audio("beginGame","../assets/resources/sounds/beginGame.mp3");
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
        // for(let i = 0; i < 10; i++){
        //     this.load.image("background" + i, "../assets/resources/tower2.jpg");
        // }

        // Used to create the progress bar
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.45, 'Loading game...', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)
        this.load.on("progress", (percent)=>{
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 40);
            console.log(percent);
            })

            let network;
            let playerUsername;
            var data = {
                refreshToken: getCookie('refreshJwt')
            };

            $.ajax({
                type: 'POST',
                url: '/obtainUserId',
                data,
                // on success call the callback function
                success: function (result) {
                    playerUsername = result.username;
                    network = new Network(result.encrypted);
                    var data = {
                        refreshToken: getCookie('refreshJwt')
                    };
                    $.ajax({
                        type: 'POST',
                        url: '/cleanup',
                        data,
                        // on success call the callback function
                        success: function (result) {

                        },
                        // on error return to game page 
                        error: function (xhr) {
                            window.alert(JSON.stringify(xhr));
                            window.location.replace('/');
                        }
                    });   
                },
                // on error return to game page 
                error: function (xhr) {
                    window.alert(JSON.stringify(xhr));
                    window.location.replace('/');
                }
            });   
        // instantiate network object


        // Loads menu when everything is loaded
        this.load.on("complete", ()=>{
            this.sound.add("menuMusic", {loop: true, volume: 0.05});
            this.sound.add("mapMusic", {loop: true, volume: 0.05});
            this.sound.add("shop", {loop: true, volume: 0.05});
            this.sound.add("battleMusic", {loop: true, volume: 0.05});
            this.sound.add("bossMusic", {loop: true, volume: 0.05});
            this.sound.add("doorOpen", {loop: false, volume: 0.05});
            this.scene.start(CST.SCENES.MENU, {networkObj: network, playerUsername: playerUsername});
        })
    }
}
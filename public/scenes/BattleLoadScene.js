import { CST } from "../CST.js";

export class BattleLoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.BATTLE_LOAD
        })
    }

    init(data){
        this.network = data.networkObj;
        this.playerData = data.playerObj;
        this.level = data.level;
    }

    preload() {
        // damage
        // this.load.image("cannonball", "../assets/resources/cards/Cannonball.png");
        // this.load.image("grenade", "../assets/resources/cards/Grenade.png");
        // this.load.image("ballistic", "../assets/resources/cards/Ballistic.png");
        // this.load.image("blast", "../assets/resources/cards/Blast.png");
        // this.load.image("fire_rain", "../assets/resources/cards/Fire_Rain.png");
        // this.load.image("high_noon", "../assets/resources/cards/High_Noon.png");
        // this.load.image("launcher", "../assets/resources/cards/Launcher.png");
        // this.load.image("missile", "../assets/resources/cards/Missile.png");
        // this.load.image("molotov", "../assets/resources/cards/Molotov.png");
        // this.load.image("minigun", "../assets/resources/cards/Minigun.png");
        // this.load.image("reinforce", "../assets/resources/cards/Reinforce.png");

        // // healing
        // this.load.image("kevlar", "../assets/resources/cards/Kevlar.png");
        // this.load.image("medkit", "../assets/resources/cards/Medkit.png");
        // this.load.image("armour_plate", "../assets/resources/cards/Armour_Plate.png");
        // this.load.image("stim_pack", "../assets/resources/cards/Stim_Pack.png");
        // this.load.image("morphine", "../assets/resources/cards/Morphine.png");
        // this.load.image("bourbon", "../assets/resources/cards/Bourbon.png");

        // // reload
        // this.load.image("overload", "../assets/resources/cards/Overload.png");
        // this.load.image("reload", "../assets/resources/cards/Reload.png");
        // this.load.image("ammo_cache", "../assets/resources/cards/Ammo_Cache.png");
        // this.load.image("bandolier", "../assets/resources/cards/Bandolier.png");
        // this.load.image("holster", "../assets/resources/cards/Holster.png");
        // this.load.image("lock_and_load", "../assets/resources/cards/Lock_and_Load.png");

        // // combo
        // this.load.image("headshot", "../assets/resources/cards/Headshot.png");
        // this.load.image("bayonet", "../assets/resources/cards/Bayonet.png");
        // this.load.image("load", "../assets/resources/cards/Load.png");
        // this.load.image("pinpoint", "../assets/resources/cards/Pinpoint.png");
        // this.load.image("nanotech", "../assets/resources/cards/Nanotech.png");
        // this.load.image("ricochet", "../assets/resources/cards/Ricochet.png");

    }

    create() {
        this.scene.start(CST.SCENES.BATTLE, {networkObj: this.network, playerObj: this.playerData, level: this.level});
    }
}
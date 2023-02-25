import { CST } from "../CST.js";
import HandCard from "../helpers/classes/cards/handCard.js";
import { BattleScene } from "./BattleScene.js";

export class BattleLoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.BATTLE_LOAD
        })
    }

    preload() {
        this.load.image("cannon", "../assets/resources/cards/Cannon.png");
        this.load.image("grenade", "../assets/resources/cards/Grenade.png");
        this.load.image("headshot", "../assets/resources/cards/Headshot.png");
        this.load.image("kevlar", "../assets/resources/cards/Kevlar.png");
        this.load.image("medkit", "../assets/resources/cards/Medkit.png");
        this.load.image("overload", "../assets/resources/cards/Overload.png");
        this.load.image("reload", "../assets/resources/cards/Reload.png");
    }

    create() {
        this.scene.start(CST.SCENES.BATTLE);
    }
}
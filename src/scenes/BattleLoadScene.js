import { CST } from "../CST";
import HandCard from "../helpers/classes/cards/handCard";
import { BattleScene } from "./BattleScene";

export class BattleLoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.BATTLE_LOAD
        })
    }

    preload() {
        this.load.image("cannon", "./assets/cards/Cannon.png");
        this.load.image("grenade", "./assets/cards/Grenade.png");
        this.load.image("headshot", "./assets/cards/Headshot.png");
        this.load.image("kevlar", "./assets/cards/Kevlar.png");
        this.load.image("medkit", "./assets/cards/Medkit.png");
        this.load.image("overload", "./assets/cards/Overload.png");
        this.load.image("reload", "./assets/cards/Reload.png");
    }

    create() {
        this.scene.start(CST.SCENES.BATTLE);
    }
}
import { CST } from "../CST";
import HandCard from "../helpers/classes/cards/HandCard";
import { BattleScene } from "./BattleScene";

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }

    preload() {
        this.load.image("cannon", "./assets/cards/Cannon.png");
        this.load.image("grenade", "./assets/cards/Grenade.png");
        this.load.image("headshot", "./assets/cards/Headshot.png");
        this.load.image("kevlar", "./assets/cards/Kevlar.png");
        this.load.image("medkit", "./assets/cards/Medkit.png");
        this.load.image("overload", "./assets/cards/overload.png");
        this.load.image("reload", "./assets/cards/reload.png");
    }

    create() {
        this.scene.add(CST.SCENES.BATTLE, BattleScene, false);
        this.scene.start(CST.SCENES.BATTLE);
    }
}
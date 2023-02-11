import { CST } from "../CST";
import Card from "../helpers/classes/cards/Card";
import { BattleScene } from "./BattleScene";

let cards = [];

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
        // damage cards
        let cannon = new Card("cannon", 2, "damage", {damage: 3, target: "all"});
        let grenade = new Card("grenade", 2, "damage", {damage: 6, target: "single"});

        // combo cards
        let headshot = new Card("headshot", 1, "combo", {target: "damage", effect: "doubles"});
        
        // reload cards
        let reload = new Card("reload", 0, "reload", {amount: 2, sideEffects: null});
        let overload = new Card("overload", 0, "overload", {amount: 4, sideEffects: -1});

        // healing cards
        let medkit = new Card("medkit", 1, "healing", {target: "health", amount: 3});
        let kevlar = new Card("kevlar", 2, "healing", {target: "armour", amount: 6});

        cards.push(cannon);
        cards.push(grenade);
        cards.push(headshot);
        cards.push(reload);
        cards.push(overload);
        cards.push(medkit);
        cards.push(kevlar);

        this.scene.add(CST.SCENES.BATTLE, BattleScene, false);
        this.scene.start(CST.SCENES.BATTLE, cards);
    }
}
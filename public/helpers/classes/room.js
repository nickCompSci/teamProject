import { gameOptions } from "../config.js";
import shuffle from "./shuffle.js";
import DamageCard from "./cards/damageCard.js";
import ComboCard from "./cards/comboCard.js";
import ReloadCard from "./cards/reloadCard.js";
import HealingCard from "./cards/healingCard.js";
import Enemy from "./enemy.js";

export default class Room {

    constructor(scene, number, encounter, level, visited=false) {
        this._number = number;
        this._encounter = encounter;
        this._visited = visited;
        this.generateEnemies(scene, level);
        this.generateRewards(scene, level);
    }

    generateEnemies(scene, level){
        this.enemies = [];

        let chance = Math.floor(Math.random() * 100);
        if (level === 1) {
            if (chance <= 50){
                let enemy1 = new Enemy(scene, 0, 0, "snake", gameOptions.snake[0], gameOptions.snake[1], gameOptions.snake[2], level);
                let enemy2 = new Enemy(scene, 0, 0, "snake", gameOptions.snake[0], gameOptions.snake[1], gameOptions.snake[2], level);
                this.enemies.push(enemy1);
                this.enemies.push(enemy2);
            } else if (chance > 50 && chance <= 90){
                let enemy1 = new Enemy(scene, 0, 0, "snake", gameOptions.snake[0], gameOptions.snake[1], gameOptions.snake[2], level);
                let enemy2 = new Enemy(scene, 0, 0, "scorpion", gameOptions.scorpion[0], gameOptions.scorpion[1], gameOptions.scorpion[2], level);
                this.enemies.push(enemy1);
                this.enemies.push(enemy2);
            } else {
                let enemy1 = new Enemy(scene, 0, 0, "scorpion", gameOptions.scorpion[0], gameOptions.scorpion[1], gameOptions.scorpion[2], level);
                let enemy2 = new Enemy(scene, 0, 0, "scorpion", gameOptions.scorpion[0], gameOptions.scorpion[1], gameOptions.scorpion[2], level);
                this.enemies.push(enemy1);
                this.enemies.push(enemy2);
            }
        } else if (level === 2){
            if (chance <= 20){
                let enemy1 = new Enemy(scene, 0, 0, "snake", gameOptions.snake[0], gameOptions.snake[1], gameOptions.snake[2], level);
                let enemy2 = new Enemy(scene, 0, 0, "scorpion", gameOptions.scorpion[0], gameOptions.scorpion[1], gameOptions.scorpion[2], level);
                this.enemies.push(enemy1);
                this.enemies.push(enemy2);
            } else if (chance > 20 && chance <= 55){
                let enemy1 = new Enemy(scene, 0, 0, "scorpion", gameOptions.scorpion[0], gameOptions.scorpion[1], gameOptions.scorpion[2], level);
                let enemy2 = new Enemy(scene, 0, 0, "scorpion", gameOptions.scorpion[0], gameOptions.scorpion[1], gameOptions.scorpion[2], level);
                this.enemies.push(enemy1);
                this.enemies.push(enemy2);
            } else if (chance > 55 && chance <= 95){
                let enemy1 = new Enemy(scene, 0, 0, "hyena", gameOptions.hyena[0], gameOptions.hyena[1], gameOptions.hyena[2], level);
                let enemy2 = new Enemy(scene, 0, 0, "scorpion", gameOptions.scorpion[0], gameOptions.scorpion[1], gameOptions.scorpion[2], level);
                this.enemies.push(enemy1);
                this.enemies.push(enemy2);
            } else {
                let enemy1 = new Enemy(scene, 0, 0, "vulture", gameOptions.vulture[0], gameOptions.vulture[1], gameOptions.vulture[2], level);
                this.enemies.push(enemy1);
            }
        } else {
            if (chance <= 20){
                let enemy1 = new Enemy(scene, 0, 0, "scorpion", gameOptions.scorpion[0], gameOptions.scorpion[1], gameOptions.scorpion[2], level);
                let enemy2 = new Enemy(scene, 0, 0, "scorpion", gameOptions.scorpion[0], gameOptions.scorpion[1], gameOptions.scorpion[2], level);
                this.enemies.push(enemy1);
                this.enemies.push(enemy2);
            } else if (chance > 20 && chance <= 70){
                let enemy1 = new Enemy(scene, 0, 0, "hyena", gameOptions.hyena[0], gameOptions.hyena[1], gameOptions.hyena[2], level);
                let enemy2 = new Enemy(scene, 0, 0, "scorpion", gameOptions.scorpion[0], gameOptions.scorpion[1], gameOptions.scorpion[2], level);
                this.enemies.push(enemy1);
                this.enemies.push(enemy2);
            } else if (chance > 70 && chance <= 90){
                let enemy1 = new Enemy(scene, 0, 0, "vulture", gameOptions.vulture[0], gameOptions.vulture[1], gameOptions.vulture[2], level);
                this.enemies.push(enemy1);
            } else {
                let enemy1 = new Enemy(scene, 0, 0, "gorilla", gameOptions.gorilla[0], gameOptions.gorilla[1], gameOptions.gorilla[2], level);
                this.enemies.push(enemy1);
            }
        }
    }

    generateRewards(scene, level){
        this.rewards = [];
        this.loadRewards(scene, level);
        this.allCards = shuffle(this.allCards);
        this.rewards.push(this.allCards[0]);
        this.rewards.push(this.allCards[1]);
    }

    loadRewards(scene, level){
        this.allCards = [];

        if (level >= 1){
            let grenade = new DamageCard("grenade", 1, "damage", {damage: 3, target: "all"}, "white", scene, 0, 0, "grenade");
            let high_noon = new DamageCard("high_noon", 1, "damage", {damage: 5, target: "single"}, "white", scene, 0, 0, "high_noon");
            let ballistic = new DamageCard("ballistic", 1, "damage", {damage: 0, target: "single"}, "white", scene, 0, 0, "ballistic");
            let reinforce = new DamageCard("reinforce", 2, "damage", {damage: 5, target: "single", "armour": 5}, "white", scene, 0, 0, "reinforce");
            let headshot = new ComboCard("headshot", 1, "combo", {target: "damage", effect: "multiply", amount: 2}, "white", scene, 0, 0, "headshot");
            let ricochet = new ComboCard("ricochet", 1, "combo", {target: "damage", effect: "convert"}, "white", scene, 0, 0, "ricochet");
            let reload = new ReloadCard("reload", 0, "reload", {amount: 2}, "white", scene, 0, 0, "reload");
            let holster = new ReloadCard("holster", 0, "reload", {amount: 1, cards: 1}, "white", scene, 0, 0, "holster");
            let medkit = new HealingCard("medkit", 0, "healing", {target: "health", amount: 7}, "white", scene, 0, 0, "medkit");
            let kevlar = new HealingCard("kevlar", 1, "healing", {target: "armour", amount: 6}, "white", scene, 0, 0, "kevlar");

            this.allCards.push(grenade);
            this.allCards.push(high_noon);
            this.allCards.push(ballistic);
            this.allCards.push(reinforce);
            this.allCards.push(headshot);
            this.allCards.push(ricochet);
            this.allCards.push(reload);
            this.allCards.push(holster);
            this.allCards.push(medkit);
            this.allCards.push(kevlar);

        } 
        
        if (level > 1){
            let cannonball = new DamageCard("cannonball", 1, "damage", {damage: 8, target: "single"}, "blue", scene, 0, 0, "cannonball");
            let fire_rain = new DamageCard("fire_rain", 3, "damage", {damage: 8, target: "random", randomAmount: 3, discard: 1}, "blue", scene, 0, 0, "fire_rain");
            let launcher = new DamageCard("launcher", 2, "damage", {damage: 6, target: "all"}, "blue", scene, 0, 0, "launcher");
            let blast = new DamageCard("blast", 2, "damage", {damage: 10, target: "single", cards: 1}, "blue", scene, 0, 0, "blast");
            let pinpoint = new ComboCard("pinpoint", 1, "combo", {target: "damage", effect: "multiply", amount: 3}, "blue", scene, 0, 0, "pinpoint");
            let bayonet = new ComboCard("bayonet", 2, "combo", {target: "damage", effect: "addition", amount: 6, sideEffects: -8}, "blue", scene, 0, 0, "bayonet");
            let load = new ComboCard("load", 2, "combo", {cards: 2, discard: 1}, "blue", scene, 0, 0, "load");
            let lock_and_load = new ReloadCard("lock_and_load", 0, "reload", {amount: 2, cards: 2}, "blue", scene, 0, 0, "lock_and_load");
            let bandolier = new ReloadCard("bandolier", 0, "reload", {amount: 4}, "blue", scene, 0, 0, "bandolier");
            let stim_pack = new HealingCard("stim_pack", 1, "healing", {target: "health", amount: 14}, "blue", scene, 0, 0, "stim_pack");
            let armour_plate = new HealingCard("armour_plate", 2, "healing", {target: "armour", amount: 10}, "blue", scene, 0, 0, "armour_plate");
            let morphine = new HealingCard("morphine", 2, "healing", {target: "health", amount: 8, cards: 1}, "blue", scene, 0, 0, "morphine");

            this.allCards.push(cannonball);
            this.allCards.push(fire_rain);
            this.allCards.push(launcher);
            this.allCards.push(blast);
            this.allCards.push(pinpoint);
            this.allCards.push(bayonet);
            this.allCards.push(load);
            this.allCards.push(lock_and_load);
            this.allCards.push(bandolier);
            this.allCards.push(stim_pack)
            this.allCards.push(armour_plate);
            this.allCards.push(morphine);

        }
        
        if (level > 2){
            let missile = new DamageCard("missile", 3, "damage", {damage: 4, target: "random", randomAmount: 4}, "purple", scene, 0, 0, "missile");
            let molotov = new DamageCard("molotov", 3, "damage", {damage: 10, target: "all", discard: 1}, "purple", scene, 0, 0, "molotov");
            let nanotech = new ComboCard("nanotech", 3, "combo", {target: "healing", effect: "multiply", amount: 2}, "purple", scene, 0, 0, "nanotech");
            let overload = new ReloadCard("overload", 0, "reload", {amount: 4, sideEffects: -10, overload: true}, "purple", scene, 0, 0, "overload");
            let ammo_cache = new ReloadCard("ammo_cache", 0, "reload", {amount: 6}, "purple", scene, 0, 0, "ammo_cache");
            let bourbon = new HealingCard("bourbon", 2, "healing", {target: "health", amount: 30, discard: 1}, "purple", scene, 0, 0, "bourbon");

            this.allCards.push(missile);   
            this.allCards.push(molotov);
            this.allCards.push(nanotech);
            this.allCards.push(overload);
            this.allCards.push(ammo_cache);
            this.allCards.push(bourbon);

        }
    }

    setVisited() {
        this._visited = true;
        this._encounter.setDepth(-1);
    }

    getNumber() {
        return this._number;
    }

    getEncounter() {
        return this._encounter;
    }

    getVisited() {
        return this._visited
    }

}
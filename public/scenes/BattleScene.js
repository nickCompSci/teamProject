import { CST } from "../CST.js";
import Button from '../helpers/classes/button.js';
import { gameOptions } from "../helpers/config.js";
import HealthBar from "../helpers/classes/healthBar.js";
import Player from "../helpers/classes/player.js";
import DamageCard from "../helpers/classes/cards/damageCard.js";
import ComboCard from "../helpers/classes/cards/comboCard.js";
import ReloadCard from "../helpers/classes/cards/reloadCard.js";
import HealingCard from "../helpers/classes/cards/healingCard.js";
import Enemy from "../helpers/classes/enemy.js";
import Boss from "../helpers/classes/boss.js";

export class BattleScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.BATTLE
        })
    }

    init(data) {
        // data returns a list of preloaded cards
        let cards = data;
        this.enemies = [];
    }

    preload() {
        this.load.image("HUD", "../assets/resources/hud_bg.png");
        this.load.image("backgroundBattle", "../assets/resources/background.png");
        this.load.image("card_holder", "../assets/resources/card_holder.jpg");
        this.load.image("player", "../assets/resources/sprites/otherplayer.png");
        this.load.image("cardBack", "../assets/resources/sprites/cardBack.png");
        this.load.image("discardPile", "../assets/resources/sprites/discardPile.png");
        this.load.image("deck", "../assets/resources/sprites/deck.png");
        this.load.spritesheet("ap", '../assets/resources/sprites/actionPointsSprites.png', { frameWidth: 128, frameHeight: 128 });
        
        // enemies
        this.load.image("vulture", "../assets/resources/sprites/enemy/vulture.png");
        this.load.image("snake", "../assets/resources/sprites/enemy/snake.png");
        this.load.image("hyena", "../assets/resources/sprites/enemy/hyena.png");
        this.load.image("scorpion", "../assets/resources/sprites/enemy/scorpion.png");
        this.load.image("gorilla", "../assets/resources/sprites/enemy/gorilla.png");
        this.load.image("boss", "../assets/resources/sprites/enemy/boss.png");
        this.load.image("enemyArrow", "../assets/resources/sprites/enemy/enemyArrow.png");
    }

    create() {
        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;

        let hud_bg = this.add.tileSprite(0, 0, gameWidth, gameHeight, "HUD");
        let card_bg = this.add.image(0, 0, "card_holder");
        let bg = this.add.sprite(0, 0, "backgroundBattle");
        hud_bg.setScale(2);

        card_bg.setPosition(gameWidth/2, gameHeight);
        card_bg.setScale(0.325);
        card_bg.displayWidth = 777;
        bg.setPosition(gameWidth/2, gameHeight/2.6);
        bg.setScale(0.65);
        bg.displayWidth = 777;
        
        this.player = new Player(this, 0, 0, "player");
        this.player.setPosition(gameWidth/3.5, gameHeight/1.7);
        this.player.setScale(1.5);
        this.playerHealth = new HealthBar(this, this.player.x - 40, this.player.y + 100, this.player.health, this.player.maxHealth, this.player.armour, this.player.maxArmour)

        this.deck = this.add.sprite(20, 550, "deck");
        this.deck.setOrigin(0, 0);
        this.deckAmount = this.add.text(this.deck.x + this.deck.width, this.deck.y + this.deck.height, this.player.deckArray.length, {fontSize: "20px"});
        this.deckAmount.setOrigin(0, 0);

        // loads all the different types of cards
        // this.loadCards();

        // shuffles the deck and sets up the visual for the deck cards
        this.player.shuffle();
        this.player.drawCard(gameOptions.startCards, this);

        this.ap = this.add.image(0, 0, "ap", 1);
        this.ap.setOrigin(0,0);
        this.ap.setPosition(gameWidth/27, gameHeight/2 + 225);
        this.ap.setScale(1.5);
        this.actiontext = this.add.text(0,0, this.player.getActionPoints(), {color: "#FFFFFF", fontSize: "30px"});
        this.actiontext.setOrigin(0,0);
        this.actiontext.setPosition(gameWidth/8.2, gameHeight/2 + 300);

        // indicator for player when keeping cards
        this.keepCardsText = this.add.text(this.ap.x + this.ap.width, this.ap.y + this.ap.height, this.player.keepCards.length +  " / " + this.player.keepCardsLimit).setVisible(false);

        // launch the discard pile scene in parallel
        this.discardPile = this.add.sprite(20, 750, "discardPile").setOrigin(0, 1);
        this.discardPile.setInteractive({useHandCursor: true});
        this.discardPile.on('pointerdown', (event) => {
            this.scene.launch(CST.SCENES.DISCARD_PILE, this.player.graveYardArray);
        }, this);
        this.discardPileAmount = this.add.text(this.discardPile.x + this.discardPile.width, this.discardPile.y, this.player.graveYardArray.length, {fontSize: "20px"});
        
        this.endTurnButton = new Button(0, gameHeight/2, "End Turn", this, this.endTurn.bind(this, this.player, this.endTurnButton), '#202529');
        this.keepCardButton = new Button(0, gameHeight/2, "Keep Cards", this, this.keepCard.bind(this, this.player, this.keepCardButton), '#202529');

        let dropZone = this.add.zone(500, 250, 665, 665).setRectangleDropZone(665, 665);

        //this.loadEnemies();
        this.spawnEnemyOnScene();

        // trying to fix the clicking on cards issue where the card goes out of bounds
        // this.input.on("pointerdown", (pointer, gameObject) => {
        //     if (scene.player.handArray.includes(gameObject)) {
        //         scene.arrangeCardsInCenter(scene.player.handArray);
        //     }
        // });

        // this.input.on("pointerup", (pointer, gameObject) => {
        //     handArray.push(gameObject);
        //     scene.arrangeCardsInCenter(scene.player.handArray)
        // }) 

        // card event listeners for pointer interactions
        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.tooltip.removeTooltip();
            this.tweens.add({
                targets: gameObject,
                angle: 0,
                x: pointer.x,
                y: pointer.y,
                duration: 50
            });
            this.tweens.add({
                targets: this.background,
                alpha: 0.3,
                duration: 50
            });
            
            let index = this.player.handArray.indexOf(gameObject);
            if (index !== -1) {
                this.player.handArray.splice(index, 1);
            }

            this.arrangeCardsInCenter(this.player.handArray);

        }, this);

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // hover over listener
        this.input.on('gameobjectover', (pointer, gameObject) => {
            if (gameObject.type === "Sprite" && this.player.handArray.includes(gameObject)) {
                let yOffSet = 50;
                this.tweens.add({
                    targets: gameObject,
                    angle: 0,
                    y: gameObject.startPosition.y - yOffSet,
                    displayWidth: gameOptions.cardWidth * 2,
                    displayHeight: gameOptions.cardHeight * 2,
                    depth: 100,
                    duration: 10
                });
                gameObject.tooltip.showTooltip();
                gameObject.tooltip.setLabelCoordinates(gameObject.x + gameOptions.cardWidth, gameObject.y - gameOptions.cardHeight * 2 - yOffSet + 10);

            }
        }, this);

        // hover out listener
        this.input.on('gameobjectout', (pointer, gameObject) => {
            if (gameObject.type === "Sprite" && this.player.handArray.includes(gameObject)) {
                this.tweens.add({
                    targets: gameObject,
                    y: gameObject.startPosition.y,
                    angle: gameObject.startPosition.angle,
                    displayWidth: gameOptions.cardWidth,
                    displayHeight: gameOptions.cardHeight,
                    depth: gameObject.startPosition.depth,
                    duration: 10
                });
                gameObject.tooltip.removeTooltip();
            }
       }, this);

        this.input.on('dragenter', (pointer, gameObject, dropZone) => {
            gameObject.setTint(0x32CD32);
        });

        this.input.on('dragleave', (pointer, gameObject, dropZone) => {
            gameObject.clearTint();
            if (gameObject.cost > this.player.actionPoints) {
                gameObject.setTint(0xff0000);
            }
        }); 

        this.input.on('drop', (pointer, gameObject, dropZone) => {
            if (this.player.getActionPoints() >= gameObject.getCost()) {
                gameObject.input.enabled = false;
                gameObject.tooltip.removeTooltip();
                gameObject.clearTint();
        
                // setting card in the middle 
                gameObject.displayHeight = gameOptions.cardHeight;
                gameObject.displayWidth = gameOptions.cardWidth;
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y + dropZone.y / 3;
                
                this.player.graveYardArray.push(gameObject);
                this.player.discardPileUpdate(this);
                gameObject.activateCard(this);

                // remove the card from the scene after 500ms
                setTimeout(function() { 
                    gameObject.setActive(false).setVisible(false).clearTint(); 
                }, 500);
        
                this.player.actionPoints = this.player.getActionPoints() - gameObject.getCost();
                if (this.player.actionPoints > 6){
                    this.ap.setFrame(0);
                } else {
                    this.ap.setFrame(7 - this.player.actionPoints);
                }
                this.actiontext.text = this.player.getActionPoints();
        
                this.cameras.main.shake(100, 0.02);
                for (let card of this.player.handArray){
                    if (card.cost > this.player.actionPoints){
                        card.setTint(0xff0000);
                    } else {
                        card.clearTint();
                    }
                }
            } else {
                gameObject.setTint(0xff0000);
                this.dragend(pointer, gameObject, false);
            }
        });

        this.input.on("dragend", this.dragend, this);
    }

    dragend(pointer, gameObject, dropped) {
        
        if (!dropped) {
            this.player.handArray.push(gameObject);
            gameObject.displayHeight = gameOptions.cardHeight;
            gameObject.displayWidth = gameOptions.cardWidth;
            this.arrangeCardsInCenter(this.player.handArray);
        }
    }

    damage_calculation(character, damage) {
        for (let modifier of character.damageModifiers){
            damage = damage * modifier;
        }
        character.health = character.health - damage;
        character.setTint(0xff0000);
        let damage_num = this.add.text(0,0, "-" + damage, {color: "red", fontSize: "30px"});
        damage_num.setPosition(character.x + 40, character.y - 80);
        this.time.delayedCall(450, this.clearNumAndTintEvent, [character, damage_num], this);

        this.playerCalculation(character);

    }

    healing_calculation(character, healing, modifiers) {
        // list of 1 for empty modifiers
        for (let modifier of modifiers) {
            healing = healing * modifier;
        }

        character.health += healing;
        if (character.health > character.maxHealth) {
            character.health = character.maxHealth;
        }
        character.setTint(0x90EE90);
        let healing_num = this.add.text(0, 0, "+" + healing, {color: "#90EE90", fontSize: "30px"});
        healing_num.setPosition(character.x - 40, character.y - 80);
        this.time.delayedCall(450, this.clearNumAndTintEvent, [character, healing_num], this);

        this.playerCalculation(character);
    }

    armour_calculation(character, armour) {
        character.armour += armour;
        if (character.armour > character.maxArmour) {
            character.armour = character.maxArmour
        }
        character.setTint(0x808080);
        let armour_num = this.add.text(0, 0, "+" + armour, {color: "#808080", fontSize: "30px"});
        armour_num.setPosition(character.x - 40, character.y - 80);
        this.time.delayedCall(450, this.clearNumAndTintEvent, [character, armour_num], this);
        console.log("Player's armour: " + character.armour);

        this.playerCalculation(character);
    } 

    clearNumAndTintEvent(character, num) {
        character.clearTint();
        num.destroy();
    }

    playerCalculation(character) {
        if (character.spriteType === "player") {
            this.playerHealth.show_health(this, character.health, character.armour);
        }
    }

    loadCards() {
        // damage cards
        let cannonball = new DamageCard("cannonball", 1, "damage", {damage: 8, target: "single", discard: 1}, "blue", this, 0, 0, "cannonball");
        let grenade = new DamageCard("grenade", 1, "damage", {damage: 3, target: "all"}, "white", this, 0, 0, "grenade");
        let high_noon = new DamageCard("high_noon", 1, "damage", {damage: 5, target: "single"}, "white", this, 0, 0, "high_noon");
        let fire_rain = new DamageCard("fire_rain", 3, "damage", {damage: 8, target: "random", randomAmount: 3, discard: 1}, "blue", this, 0, 0, "fire_rain");
        let minigun = new DamageCard("minigun", 6, "damage", {damage: 4, target: "random", randomAmount: 8}, "orange", this, 0, 0, "minigun");
        let launcher = new DamageCard("launcher", 2, "damage", {damage: 6, target: "all"}, "blue", this, 0, 0, "launcher");
        let ballistic = new DamageCard("ballistic", 1, "damage", {damage: this.player.armour, target: "single"}, "white", this, 0, 0, "ballistic");
        let reinforce = new DamageCard("reinforce", 2, "damage", {damage: 5, target: "single", armour: 5}, "white", this, 0, 0, "reinforce");
        let blast = new DamageCard("blast", 2, "damage", {damage: 10, target: "single", cards: 1}, "blue", this, 0, 0, "blast");
        let missile = new DamageCard("missile", 3, "damage", {damage: 4, target: "random", randomAmount: 4}, "purple", this, 0, 0, "missile");
        let molotov = new DamageCard("molotov", 3, "damage", {damage: 10, target: "all", discard: 1}, "purple", this, 0, 0, "molotov");

        this.player.deckArray.push(cannonball);
        this.player.deckArray.push(grenade);
        this.player.deckArray.push(high_noon);
        this.player.deckArray.push(fire_rain);
        this.player.deckArray.push(minigun);
        this.player.deckArray.push(launcher);
        this.player.deckArray.push(ballistic);
        this.player.deckArray.push(reinforce);
        this.player.deckArray.push(blast);
        this.player.deckArray.push(missile);
        this.player.deckArray.push(molotov);

        // combo cards
        let headshot = new ComboCard("headshot", 1, "combo", {target: "damage", effect: "multiply", amount: 2}, "white", this, 0, 0, "headshot");
        let ricochet = new ComboCard("ricochet", 1, "combo", {target: "damage", effect: "convert"}, "white", this, 0, 0, "ricochet");
        let pinpoint = new ComboCard("pinpoint", 1, "combo", {target: "damage", effect: "multiply", amount: 3}, "blue", this, 0, 0, "pinpoint");
        let bayonet = new ComboCard("bayonet", 2, "combo", {target: "damage", effect: "addition", amount: 6, sideEffects: 8}, "blue", this, 0, 0, "bayonet");
        let load = new ComboCard("load", 2, "combo", {cards: 2, discard: 1}, "blue", this, 0, 0, "load");
        let nanotech = new ComboCard("nanotech", 1, "combo", {target: "healing", effect: "multiply", amount: 2}, "purple", this, 0, 0, "nanotech");

        this.player.deckArray.push(headshot);
        this.player.deckArray.push(ricochet);
        this.player.deckArray.push(pinpoint);
        this.player.deckArray.push(bayonet);
        this.player.deckArray.push(load);
        this.player.deckArray.push(nanotech);
       
        // reload cards
        let reload = new ReloadCard("reload", 0, "reload", {amount: 2}, "white", this, 0, 0, "reload");
        let overload = new ReloadCard("overload", 0, "reload", {amount: 4, sideEffects: 10, overload: true}, "purple", this, 0, 0, "overload");
        let lock_and_load = new ReloadCard("lock_and_load", 0, "reload", {amount: 2, cards: 2}, "blue", this, 0, 0, "lock_and_load");
        let bandolier = new ReloadCard("bandolier", 0, "reload", {amount: 4}, "blue", this, 0, 0, "bandolier");
        let holster = new ReloadCard("holster", 0, "reload", {amount: 1, cards: 1}, "white", this, 0, 0, "holster");
        let ammo_cache = new ReloadCard("ammo_cache", 0, "reload", {amount: 6}, "purple", this, 0, 0, "ammo_cache");

        this.player.deckArray.push(reload);
        this.player.deckArray.push(overload);
        this.player.deckArray.push(bandolier);
        this.player.deckArray.push(lock_and_load);
        this.player.deckArray.push(holster);
        this.player.deckArray.push(ammo_cache);

        // healing cards
        let medkit = new HealingCard("medkit", 0, "healing", {target: "health", amount: 7}, "white", this, 0, 0, "medkit");
        let kevlar = new HealingCard("kevlar", 1, "healing", {target: "armour", amount: 5}, "white", this, 0, 0, "kevlar");
        let stim_pack = new HealingCard("stim_pack", 1, "healing", {target: "health", amount: 14}, "white", this, 0, 0, "stim_pack");
        let armour_plate = new HealingCard("armour_plate", 2, "healing", {target: "armour", amount: 10}, "blue", this, 0, 0, "armour_plate");
        let bourbon = new HealingCard("bourbon", 2, "healing", {target: "health", amount: 30, discard: 1}, "purple", this, 0, 0, "bourbon");
        let morphine = new HealingCard("morphine", 2, "healing", {target: "health", amount: 8, cards: 1}, "blue", this, 0, 0, "morphine");

        this.player.deckArray.push(medkit);
        this.player.deckArray.push(kevlar);
        this.player.deckArray.push(stim_pack)
        this.player.deckArray.push(armour_plate);
        this.player.deckArray.push(bourbon);
        this.player.deckArray.push(morphine);
    
    }
    
    
    arrangeCardsInCenter(handArray) {
        // arranges for the cards to be organised around the bottom middle of the screen
        let bottomOfScreen = this.game.config.height;
        let screenCenterX = this.game.config.width / 2;
        let yDelta = gameOptions.cardYOffset * (Math.floor(handArray.length / 2));

        for (let i=0; i < handArray.length; i++) {
            let card = handArray[i];
            let cardX = screenCenterX + (i - (handArray.length - 1) / 2) * gameOptions.cardDistance;
            let cardAngle = (i - (handArray.length - 1) / 2) * gameOptions.cardAngle;

            card.x = cardX;
            card.y = bottomOfScreen + yDelta;
            card.angle = cardAngle;
            if (i > handArray.length / 2 - 1) {
                yDelta += gameOptions.cardYOffset;
            } else {
                yDelta -= gameOptions.cardYOffset;
            }

            // cards remember their original coordinates for events that make the cards leave and renter the hand
            card.startPosition = {
                x: card.x,
                y: card.y,
                angle: card.angle,
                depth: card.depth
            }

            // sets card to the right in front
            card.setDepth(2);
        }
    }


    // start keep cards and make keep cards button appear
    keepCard() {
        this.keepCardButton.visible = false;
        this.endTurnButton.visible = true;
        for (let card of this.player.handArray){
            card.clearTint();
        }
        this.player.selectCardInHand(this);
    }
    
    
    // ends the player's turn
    endTurn() {
        this.keepCardButton.visible = true;
        this.endTurnButton.visible = false;
        this.player.moveCardsBackInDeck(this);
        
        // simulate enemies attacking
        for (let i=0; i < this.enemies.length; i++) {
            let base_damage = this.enemies[i].action();
            this.damage_calculation(this.player, base_damage);
        }
        this.playerHealth.show_health(this, this.player.health, this.player.armour);
        
        // automatic drawing goes here and checking if needing to reshuffle the deck
        this.player.drawCard(5 - this.player.handArray.length, this);

        // checking if newly drawn cards are available to play
        for (let card of this.player.handArray){
            if (card.cost > this.player.actionPoints){
                card.setTint(0xff0000);
            }
        }
    }

    spawnBossOnScene() {
        let boss = new Boss(this, 0, 0, "boss", 0 , 120);
        this.enemies.push(boss);
        let bosshealth = new HealthBar(this, boss.x - 40, boss.y + 100, boss.health, boss.maxHealth, boss.armour, boss.maxArmour);
        this.healthbars.push(bosshealth);
        boss.updateArrow();
    }
    
    // // spawning in enemies and their life
    spawnEnemyOnScene() {
        let snake1 = new Enemy(this, 0, 0, "snake", 0, 10);
        let snake2 = new Enemy(this, 0, 0, "snake", 0, 10);

        this.enemies.push(snake1);
        this.enemies.push(snake2);
        this.healthbars = [];

        let spawnEnemyDistanceX = 0;

        for (let enemy of this.enemies) {

            // For some reason, enemies spawn invisible, no clue.
            enemy.spawn();
            enemy.x += spawnEnemyDistanceX;
            let enemyhealth = new HealthBar(this, enemy.x - 40, this.player.y + 100, enemy.health, enemy.health, enemy.armour, enemy.maxArmour);
            this.healthbars.push(enemyhealth);

            spawnEnemyDistanceX += 200;
            enemy.setDepth(1);
           
            enemy.updateArrow();
        }
    }

    disableInteractionDuringCard() {
        this.keepCardButton.disableInteractive();
        this.endTurnButton.disableInteractive();
        this.discardPile.disableInteractive();
    }

    enableInteractionAfterCard() {
        this.keepCardButton.setInteractive();
        this.endTurnButton.setInteractive();
        this.discardPile.setInteractive();
    }
}
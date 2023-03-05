import { CST } from "../CST.js";
import { gameOptions} from "../helpers/config.js";
import Player from "../helpers/classes/player.js";
import DamageCard from "../helpers/classes/cards/damageCard.js";
import ComboCard from "../helpers/classes/cards/comboCard.js";
import ReloadCard from "../helpers/classes/cards/reloadCard.js";
import HealingCard from "../helpers/classes/cards/healingCard.js";
import Enemy from "../helpers/classes/enemy.js";
import shuffle from "../helpers/classes/shuffle.js";

export class ExtraScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.EXTRA
        })
    }

    init(data) {
        // data returns a list of preloaded cards
        this.room = data.room;
        this.enemies = [];
    }

    preload() {
        this.load.image("HUD", "../assets/resources/hud_bg.png");
        this.load.image("backgroundBattle", "../assets/resources/background.png");
        this.load.image("card_holder", "../assets/resources/card_holder.jpg");
        this.load.image("player", "../assets/resources/sprites/player.png");
        this.load.image("vending_machine", "../assets/resources/vending_machine.png");
        this.load.image("chest", "../assets/resources/chest.png");

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
        this.load.image("armour_plate", "../assets/resources/cards/Armour_plate.png");
        this.load.image("stim_pack", "../assets/resources/cards/Stim_Pack.png");
        this.load.image("morphine", "../assets/resources/cards/Morphine.png");
        this.load.image("bourbon", "../assets/resources/cards/Bourbon.png");

        // reload
        this.load.image("overload", "../assets/resources/cards/Overload.png");
        this.load.image("reload", "../assets/resources/cards/Reload.png");
        this.load.image("ammo_cache", "../assets/resources/cards/Ammo_cache.png");
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

    }

    
    checkCardsInDiscardPile(amountOfRepeats) {
        if (amountOfRepeats < 10) {
            return 1;
        }

        return Math.floor(amountOfRepeats / 10);
    }

    create() {
        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;

        this.setPicked = 0;
        this.payment = []

        let hud_bg = this.add.tileSprite(0, 0, gameWidth, gameHeight, "HUD");
        let card_bg = this.add.image(0, 0, "card_holder");
        hud_bg.setScale(2).setScrollFactor(0).setDepth(0);

        card_bg.setPosition(gameWidth/2, gameHeight);
        card_bg.setScale(0.325).setScrollFactor(0).setDepth(1);
        
        this.player = new Player(this, 0, 0, "player");
        this.player.setPosition(gameWidth/3.5, gameHeight/1.7);
        this.player.setScale(1.5).setScrollFactor(0).setDepth(2);
        
        // loads all the different types of cards
        this.loadCards();

        this.spawnEnemyOnScene()
        
        let arrowSprite = this.add.sprite(100, 100, "arrow");
        arrowSprite.setVisible(false).setScrollFactor(0);
        
        let return2rarity = this.add.text(this.game.renderer.width / 2, this.game.renderer.height - 90 , 'Re-Choose Rarity', {fontFamily: 'font1', fill:"#ffffff", fontSize: '60px' }).setDepth(-1).setOrigin(0.5).setScrollFactor(0).disableInteractive();

        this.pointer = this.add.sprite(100, 100, "pointer");
        this.pointer.setVisible(false);

        if (this.room == "chest") {
            this.chestRandomizer();

            this.arrangeCardsInCenter(this.chestCards);
        } else {

            this.help = this.add.text(this.game.renderer.width / 2, 600 , 'Choose a rarity', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(2).setOrigin(0.5).setScrollFactor(0);

            let blue = this.add.text(this.game.renderer.width / 2, 660 , 'Blue Rarity', {fontFamily: 'font1', fill: '#007fff', fontSize: '60px'}).setDepth(3).setOrigin(0.5)
            blue.setInteractive();
    
            blue.on("pointerover", ()=>{
                this.pointer.setVisible(true).setDepth(3);
                this.pointer.x = blue.x - blue.width + 500;
                this.pointer.y = blue.y + blue.height / 4;
            })
    
            let purple = this.add.text(this.game.renderer.width / 2, 710, 'Purple Rarity', {fontFamily: 'font1', fill: '#540099', fontSize: '60px'}).setDepth(3).setOrigin(0.5)
    
            purple.setInteractive();
            purple.on("pointerover", ()=>{
                this.pointer.setVisible(true).setDepth(3);
                this.pointer.x = purple.x - purple.width + 600;
                this.pointer.y = purple.y + purple.height / 4;
            })
    
            purple.on("pointerup", ()=>{
                purple.disableInteractive();
                blue.disableInteractive();
                purple.setDepth(-1);
                blue.setDepth(-1);
                this.pointer.setDepth(-2);
                return2rarity.setInteractive();
                return2rarity.setDepth(2);

                this.getRarityCards("purple");

                this.displayCards(this.rarityCards);

                this.help.text = "Pick two to trade.";

                this.setCardsInteractive();

            })

            blue.on("pointerup", ()=>{
                purple.disableInteractive();
                blue.disableInteractive();
                purple.setDepth(-1);
                blue.setDepth(-1);
                this.pointer.setDepth(-2);
                return2rarity.setInteractive();
                return2rarity.setDepth(2);


                this.getRarityCards("blue");

                this.displayCards(this.rarityCards);

                this.help.text = "Pick two to trade.";

                this.setCardsInteractive();

            })

        }

        return2rarity.on("pointerover", ()=>{
            return2rarity.setStyle({fill: '#fd722a'});
        })

        return2rarity.on("pointerup", ()=>{
            this.scene.start(CST.SCENES.EXTRA);
        })

        // Back Button for navigating back to the main menu
        let backButton = this.add.text(this.game.renderer.width / 2, 30 , 'Return to Map', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(3).setOrigin(0.5).setScrollFactor(1);


        // Back Button
        backButton.setInteractive();
        backButton.on("pointerover", ()=>{
            this.pointer.setVisible(true).setDepth(3);
            this.pointer.x = backButton.x - backButton.width + 600;
            this.pointer.y = backButton.y + backButton.height / 4;
        })

        backButton.on("pointerup", ()=>{
            // Moves back to the main menu when the back button is clicked
            this.scene.start(CST.SCENES.MAP);
        })

        
        let cam = this.cameras.main;

        this.getRarityCards("blue")
        
        let repeat = this.checkCardsInDiscardPile(this.rarityCards);

        let bg = this.add.tileSprite(0, 0, gameWidth * repeat, gameHeight * repeat, "backgroundBattle").setOrigin(0,0);
        bg.setPosition(167, -25).setDepth(1).setScale(0.65).setScrollFactor(0);

        cam.setBounds(0, 0, gameWidth, gameHeight * repeat);

        this.input.on("pointermove", function (pointer) {
            if (!pointer.isDown) {
                return;
            }

            cam.scrollY -= (pointer.y - pointer.prevPosition.y) / cam.zoom;
        })
    }

    setCardsInteractive() {
        this.setPicked += 1;
        for (let i=0; i<this.rarityCards.length; i++) {
            this.rarityCards[i].setInteractive();

            this.rarityCards[i].on("pointerover", ()=>{
                this.pointer.setVisible(true).setDepth(5);
                this.pointer.x = this.rarityCards[i].x - this.rarityCards[i].width + 400;
                this.pointer.y = this.rarityCards[i].y + this.rarityCards[i].height / 2 - 50;
            })

            this.rarityCards[i].on("pointerup", ()=>{
                if (this.setPicked == 1) {
                    if (this.rarityCards[i].getRarity() == "blue") {
                        this.purchase = this.rarityCards[i];
                        this.disableCards()
                        this.getRarityCards("white")
                        this.setCardsInteractive()

                    } else if (this.rarityCards[i].getRarity() == "purple") {
                        this.purchase = this.rarityCards[i];
                        this.disableCards()
                        this.getRarityCards("blue")
                        this.setCardsInteractive()

                        this.help.text = "Pick a card to purchase.";
                    }
                } else {
                    if (this.setPicked < 4) {
                    this.rarityCards[i].setTint(0xff0000);
                    this.payment.push(this.rarityCards[i]);
                    this.setPicked += 1;
                        if (this.setPicked == 4) {
                            console.log(this.payment, this.purchase)
                            this.scene.start(CST.SCENES.MAP);
                        }
                    }
                }
            })
        }

        this.displayCards(this.rarityCards);

    }

    
    

    loadCards() {
        // damage cards
        let cannonball = new DamageCard("cannonball", 1, "damage", {damage: 10, target: "single"}, "blue", this, 0, 0, "cannonball");
        let grenade = new DamageCard("grenade", 1, "damage", {damage: 3, target: "all"}, "white", this, 0, 0, "grenade");
        let high_noon = new DamageCard("high_noon", 1, "damage", {damage: 5, target: "single"}, "white", this, 0, 0, "high_noon");
        let fire_rain = new DamageCard("fire_rain", 3, "damage", {damage: 8, target: "random", randomAmount: 3, discard: 1}, "blue", this, 0, 0, "fire_rain");
        let minigun = new DamageCard("minigun", 6, "damage", {damage: 4, target: "random", randomAmount: 8}, "orange", this, 0, 0, "minigun");
        let launcher = new DamageCard("launcher", 2, "damage", {damage: 6, target: "all"}, "blue", this, 0, 0, "launcher");
        let ballistic = new DamageCard("ballistic", 1, "damage", {damage: this.player.armour, target: "single"}, "white", this, 0, 0, "ballistic");
        let reinforce = new DamageCard("reinforce", 2, "damage", {damage: 5, target: "single"}, "white", this, 0, 0, "reinforce");
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
        let bayonet = new ComboCard("bayonet", 2, "combo", {target: "damage", effect: "addition", amount: 6, sideEffects: -8}, "blue", this, 0, 0, "bayonet");
        let load = new ComboCard("load", 2, "combo", {cards: 2, discard: 1}, "blue", this, 0, 0, "load");
        let nanotech = new ComboCard("nanotech", 3, "combo", {target: "healing", effect: "multiply", amount: 2}, "purple", this, 0, 0, "nanotech");

        this.player.deckArray.push(headshot);
        this.player.deckArray.push(ricochet);
        this.player.deckArray.push(pinpoint);
        this.player.deckArray.push(bayonet);
        this.player.deckArray.push(load);
        this.player.deckArray.push(nanotech);
       
        // reload cards
        let reload = new ReloadCard("reload", 0, "reload", {amount: 2}, "white", this, 0, 0, "reload");
        let overload = new ReloadCard("overload", 0, "reload", {amount: 4, sideEffects: -10}, "purple", this, 0, 0, "overload");
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
        let kevlar = new HealingCard("kevlar", 1, "healing", {target: "armour", amount: 6}, "white", this, 0, 0, "kevlar");
        let stim_pack = new HealingCard("stim_pack", 1, "healing", {target: "health", amount: 14}, "blue", this, 0, 0, "stim_pack");
        let armour_plate = new HealingCard("armour_plate", 2, "healing", {target: "armour", amount: 10}, "blue", this, 0, 0, "armour_plate");
        let bourbon = new HealingCard("bourbon", 2, "healing", {target: "health", amount: 30, discard: 1}, "purple", this, 0, 0, "bourbon");
        let morphine = new HealingCard("morphine", 2, "healing", {target: "health", amount: 8, otherTarget: "armour", otherAmount: 8}, "blue", this, 0, 0, "morphine");

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

            // sets card to the right in front
            card.setDepth(2);
            card.cardInHand(this);

        }
    }

    // // spawning in enemies and their life
    spawnEnemyOnScene() {

        if (this.room == "shop") {
            this.icon = new Enemy(this, 0, 0, "vending_machine", 0, 10);
            this.icon.setScale(2.4);
        } else if (this.room == "chest") {
            this.icon = new Enemy(this, 0, 0, "chest", 0, 10);
        } 

        this.enemies.push(this.icon.setScrollFactor(0));

        let spawnEnemyDistanceX = 0;

        for (let enemy of this.enemies) {

            // For some reason, enemies spawn invisible, no clue.
            enemy.spawn();
            enemy.x += spawnEnemyDistanceX;
            enemy.y += 25;

            spawnEnemyDistanceX += 150;
            enemy.setDepth(2);

            if (this.room == "shop") {
                enemy.x += 40;
                enemy.y -= 65;
            }
        }
    }

    chestRandomizer() {
        this.times = Math.floor(Math.random() * 100);

        switch(true) {
            case (this.times >= 0 && this.times <= 9):
                this.times = 1;
                break;
            case (this.times >= 10 && this.times <= 89):
                this.times = 2;
                break;
            case (this.times >= 90 && this.times <= 99):
                this.times = 3;
                break;
        }

        this.rarityCards = [];
        this.chestCards = [];

        for (let i=0; i<this.times; i++) {
            this.choice = Math.floor(Math.random() * 100);

            switch(true) {
                case (this.choice >= 0 && this.choice <= 64):
                    this.choice = "white";
                    break;
                case (this.choice >= 65 && this.choice <= 89):
                    this.choice = "blue";
                    break;
                case (this.choice >= 90 && this.choice <= 99):
                    this.choice = "purple";
                    break;
            }

            for (let i=0; i<this.player.deckArray.length; i++) {
            if (this.player.deckArray[i].getRarity() == this.choice) {
                    this.rarityCards.push(this.player.deckArray[i]);
                }
            }

            this.rarityCards = shuffle(this.rarityCards);
            this.chestCards.push(this.rarityCards[0]);
        }

    }

    getRarityCards(rarity) {
        this.rarityCards = [];
        for (let i=0; i<this.player.deckArray.length; i++) {
            if (this.player.deckArray[i].getRarity() == rarity) {
                    this.rarityCards.push(this.player.deckArray[i]);
                }
            }

    }

    displayCards(choice) {
        let startX = 40;
        let startY = 70;
        let xOffset = gameOptions.cardWidth + 50;
        let yOffSet = gameOptions.cardHeight + 60;
        let xCounter = 0;
        let yCounter = 0;

        for (let cards of choice) {
            cards.setVisible(true);
            cards.setDepth(4);
            cards.x = startX + (xCounter * xOffset);
            cards.y = startY + (yCounter * yOffSet);
            cards.setOrigin(0, 0);
            cards.displayWidth = gameOptions.cardWidth * 1.3;
            cards.displayHeight = gameOptions.cardHeight * 1.3;

            xCounter++;
            if (xCounter === 5) {
                xCounter = 0;
                yCounter++;
            }
        }
    }

    disableCards() {
        for (let cards of this.rarityCards) {

            cards.setVisible(false);
            cards.setDepth(-1);
            cards.disableInteractive(); 
        }
    }

}
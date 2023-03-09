import { CST } from "../CST.js";
import Button from '../helpers/classes/button.js';
import { gameOptions, eventsCentre } from "../helpers/config.js";
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
        this.network = data.networkObj;
        this.playerData = data.playerObj;   
        this.enemyData = data.enemies;
        this.rewardData = data.rewards;
        
        this.enemies = [];
        this.healthbars = [];
        this.rewards = [];
        this.network.handleDataBattleScene({playerObj: this.playerData, networkObj: this.network}, this, this.returnCardsToPlayer)
        this.boss;
        this.otherPlayer;
        //this.network.send('{"type":"activityUpdate", "activity":"In Battle"}');
    }

    create() {
        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;

        this.hud_bg = this.add.tileSprite(0, 0, gameWidth, gameHeight, "HUD");
        this.card_bg = this.add.image(0, 0, "card_holder");
        this.bg = this.add.sprite(0, 0, "backgroundBattle");
        this.hud_bg.setScale(2);

        this.card_bg.setPosition(gameWidth/2, gameHeight);
        this.card_bg.setScale(0.325);
        this.card_bg.displayWidth = 777;
        this.bg.setPosition(gameWidth/2, gameHeight/2.6);
        this.bg.setScale(0.65);
        this.bg.displayWidth = 777;
    
        this.player = new Player(this, 0, 0, "player");
        this.player.setEqual(this.playerData);
        for (let card of this.player.deckArray) {
            let newCard;
            if (card.cardType === "damage"){
                newCard = new DamageCard(card.name, card.cost, card.cardType, card.effect, card.rarity, this, 0, 0, card.name);
            } else if (card.cardType === "healing") {
                newCard = new HealingCard(card.name, card.cost, card.cardType, card.effect, card.rarity, this, 0, 0, card.name);
            } else if (card.cardType === "reload") {
                newCard = new ReloadCard(card.name, card.cost, card.cardType, card.effect, card.rarity, this, 0, 0, card.name);
            } else {
                newCard = new ComboCard(card.name, card.cost, card.cardType, card.effect, card.rarity, this, 0, 0, card.name);
            }
            let cardIndex = this.player.deckArray.indexOf(card);
            this.player.deckArray[cardIndex] = newCard;
        }
        this.player.setPosition(gameWidth/3.5, gameHeight/1.7);
        this.playerHealth = new HealthBar(this, this.player.x - 40, this.player.y + 100, this.player.health, this.player.maxHealth, this.player.armour, this.player.maxArmour)

        this.deck = this.add.sprite(20, 550, "deck");
        this.deck.setOrigin(0, 0);
        this.deckAmount = this.add.text(this.deck.x + this.deck.width, this.deck.y + this.deck.height, this.player.deckArray.length, {fontSize: "20px"});
        this.deckAmount.setOrigin(0, 0);

        // loads all the different types of cards
        let cardsInDeck = this.player.deckArray.length // set discardPile amount of repeats

        console.log("HERE");
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

        // launch the discard pile scene in parallel
        this.discardPile = this.add.sprite(20, 750, "discardPile").setOrigin(0, 1);
        this.discardPileAmount = this.add.text(this.discardPile.x + this.discardPile.width, this.discardPile.y, this.player.graveYardArray.length, {fontSize: "20px"});
        this.discardPile.setInteractive({useHandCursor: true});
        this.discardPile.on('pointerdown', (event) => {
            let cardsInDiscardPile = this.player.graveYardArray;
            this.scene.pause().launch(CST.SCENES.DISCARD_PILE, {cardsInDiscardPile, cardsInDeck});
        }, this);
        
        this.endTurnButton = new Button(0, gameHeight/2, 18, 15, "End Turn", this, this.endTurn.bind(this, this.player, this.endTurnButton), '#202529');
        this.keepCardButton = new Button(0, gameHeight/2, 8, 15, "Keep Cards", this, this.keepCard.bind(this, this.player, this.keepCardButton), '#202529');

        let dropZone = this.add.zone(500, 250, 665, 665).setRectangleDropZone(665, 665);

        // soundtracks
        if (this.level === 3) {
            this.spawnBossOnScene();
            this.sound.sounds[4].play();
        } else {
            this.spawnEnemyOnScene();
            this.sound.sounds[3].play();
        }

        // trying to fix the clicking on cards issue where the card goes out of bounds
        // this.input.on("pointerdown", (pointer, gameObject) => {
        //     if (scene.player.handArray.includes(gameObject)) {
        //         scene.arrangeCardsInCenter(scene.player.handArray);
        //     }
        // });

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
                this.sound.play("cardHover", {volume: 0.7});
                let yOffSet = 50;
                this.tweens.add({
                    targets: gameObject,
                    angle: 0,
                    y: gameObject.startPosition.y - yOffSet,
                    displayWidth: gameOptions.cardWidth * 2,
                    displayHeight: gameOptions.cardHeight * 2,
                    depth: 100,
                    duration: 10,
                    useHandCursor: true
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

                this.sound.play("playCard", {volume: 0.5});

                // setting card in the middle 
                gameObject.displayHeight = gameOptions.cardHeight;
                gameObject.displayWidth = gameOptions.cardWidth;
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y + dropZone.y / 3;

                this.player.graveYardArray.push(gameObject);
                this.player.discardPileUpdate(this);
                
                // destroy breaks combo cards
                gameObject.setActive(false).setVisible(false); 
                gameObject.activateCard(this);

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


    check_enemy_death(){
        for (let enemy_index=this.enemies.length-1; enemy_index >= 0; enemy_index--) {
            if (this.enemies[enemy_index].health <= 0){
                this.healthbars[enemy_index].bar.destroy();
                this.healthbars[enemy_index].healthText.destroy();
                this.healthbars[enemy_index].armourText.destroy();
                delete this.healthbars[enemy_index];
                this.tweens.add({
                    targets: this.enemies[enemy_index],
                    alpha: {from: 1, to: 0},
                    ease: 'Sine.InOut',
                    duration: 500,
                    yoyo: false
                });
                this.time.delayedCall(500, this.enemies[enemy_index].destroy);
                this.sound.play("enemyDeath", {volume: 0.5});
                this.enemies[enemy_index].enemyArrow.destroy();
                this.enemies.splice(enemy_index, 1);
                this.healthbars.splice(enemy_index, 1);
            }
        }

        if (this.enemies.length === 0){
            this.win();
        }
    }

    check_player_death() {
        if (this.player.health <= 0) {
            this.die();
        }
    }

    win() {
        this.showRewards();
    }

    die() {
        // this.sound.play("playerDeath", {volume: 0.7});
        this.sound.stopAll();
        this.sound.play("died", {volume: 0.7});
        this.playerHealth.show_health(this, this.player.health, this.player.armour);
        this.cameras.main.fadeOut(5000);
        this.lose_text = this.add.text(this.game.config.width/ 2, this.game.config.height/2, "YOU DIED", {color: "red", backgroundColor: "black", fontSize: "100px"});
        this.lose_text.alpha = 0;
        this.tweens.add({
            targets: this.lose_text,
            alpha: {from: 0, to: 1},
            ease: 'Sine.InOut',
            duration: 4000,
            yoyo: false
        })
        this.time.delayedCall(6000, this.load_out, [], this);
    }

    load_out() {
        this.lose_text.destroy();
        for (let card of this.player.graveYardArray){
            this.player.deckArray.push(card);
        }
        for (let card of this.player.handArray){
            this.player.deckArray.push(card);
        }
        this.player.handArray = [];
        this.player.graveYardArray = [];
        this.player.health = this.player.maxHealth;
        this.playerData.setEqual(this.player);
        this.sound.stopAll();
        this.sound.sounds[1].play();
        eventsCentre.emit("death");
        this.scene.stop(CST.SCENES.BATTLE);
        this.scene.resume(CST.SCENES.MAP);
    }

    damage_calculation(character, damage) {
        for (let modifier of character.damageModifiers) {
            damage = damage * modifier;
        }
        let checkCharacter = this.checkArmour(character, damage);
        character.setTint(0xff0000);
        let damage_num = this.add.text(0,0, "-" + damage, {color: "red", fontSize: "30px"});
        damage_num.setPosition(character.x + 40, character.y - 80);
        this.time.delayedCall(450, this.clearNumAndTintEvent, [character, damage_num], this);

        this.characterHealthbarCalculation(checkCharacter);

        if (this.enemies.includes(character)) {
            this.check_enemy_death();
        }
        
        if (character.spriteType === "enemy") {
            this.sound.play("enemyHurt", {volume: 0.1});
        } else if (character.spriteType === "player") {
            this.check_player_death();
            this.sound.play("playerHurt", {volume: 0.5});
        }
    }

    healing_calculation(character, healing) {
        this.sound.play("heal", {volume: 0.6});
        character.health += healing;
        if (character.health > character.maxHealth) {
            character.health = character.maxHealth;
        }
        character.setTint(0x90EE90);
        let healing_num = this.add.text(0, 0, "+" + healing, {color: "#90EE90", fontSize: "30px"});
        healing_num.setPosition(character.x - 40, character.y - 80);
        this.time.delayedCall(450, this.clearNumAndTintEvent, [character, healing_num], this);

        this.characterHealthbarCalculation(character);
    }

    armour_calculation(character, armour) {
        this.sound.play("armour", {volume: 0.6});
        character.armour += armour;
        if (character.armour > character.maxArmour) {
            character.armour = character.maxArmour
        }
        // 30% damage reduction from attacks
        if (!character.damageModifiers.includes(0.7)) {
            character.damageModifiers.push(0.7);
        }
        character.setTint(0x808080);
        let armour_num = this.add.text(0, 0, "+" + armour, {color: "#808080", fontSize: "30px"});
        armour_num.setPosition(character.x - 40, character.y - 80);
        this.time.delayedCall(450, this.clearNumAndTintEvent, [character, armour_num], this);

        this.characterHealthbarCalculation(character);
    } 

    clearNumAndTintEvent(character, num) {
        character.clearTint();
        num.destroy();
    }

    characterHealthbarCalculation(character) {
        if (this.enemies.includes(character)) {
            this.healthbars[this.enemies.indexOf(character)].show_health(this, character.health, character.armour)
        } else if (character.spriteType === "player") {
            this.playerHealth.show_health(this, character.health, character.armour);
        }
    }

    // check if character has armour to reduce damage
    checkArmour(character, damage) {
        if (damage > character.armour) {
            let damageLeft = Math.floor(damage - character.armour);
            character.armour = 0;
            character.health = character.health - damageLeft;
        } else {
            character.armour = Math.floor(character.armour - damage);
        }

        // remove the armour damage modifier if there is no armour
        if (character.armour === 0) {
            if (character.damageModifiers.includes(0.7)) {
                character.damageModifiers.splice(character.damageModifiers.indexOf(0.7), 1);
            }
        }

        return character;
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
            if (this.enemies[i].spriteType === "player") {
            } else if (this.enemies.includes(this.boss)) {
                this.enemies[i].action(this);
            } else {
                let base_damage = this.enemies[i].action();
                this.damage_calculation(this.player, base_damage);
                
            }
            if (this.player.health <= 0) {
                this.die();
            }
        }
        this.playerHealth.show_health(this, this.player.health, this.player.armour);
        
        // automatic drawing goes here and checking if needing to reshuffle the deck
        this.player.drawCard(5 - this.player.handArray.length, this);

        // checking if newly drawn cards are available to play
        for (let card of this.player.handArray) {
            if (card.cost > this.player.actionPoints){
                card.setTint(0xff0000);
            }
        }
    }

    win() {
        this.showRewards();
    }

    spawnOtherPlayerOnScene() {
        // equal to otherPlayer passed in
        let x = this.game.config.width * 0.7;
        let y = this.game.config.height * 0.6;
        this.otherPlayer = new Player(this, x, y, "otherPlayer", 0);
        this.enemies.push(this.otherPlayer);
        let otherPlayerHealth = new HealthBar(this, this.otherPlayer.x - 40, this.otherPlayer.y + 100, this.otherPlayer.health, this.otherPlayer.maxHealth, this.otherPlayer.armour, this.otherPlayer.maxArmour)
        this.healthbars.push(otherPlayerHealth);
    }

    spawnBossOnScene() {
        this.boss = new Boss(this, 0, 0, "boss", 0 , 120);
        this.enemies.push(this.boss);
        let bosshealth = new HealthBar(this, this.boss.x , this.boss.y + 120, this.boss.health, this.boss.maxHealth, this.boss.armour, this.boss.maxArmour);
        this.healthbars.push(bosshealth);
        this.boss.setDepth(1);
    }
    
    // // spawning in enemies and their life
    spawnEnemyOnScene() {
        for (let temp_enemy of this.enemyData){
            let enemy = new Enemy(this, 0, 0, temp_enemy.texture.key, temp_enemy.health, temp_enemy.minDamage, temp_enemy.maxDamage, temp_enemy.level);
            this.enemies.push(enemy);
        }

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

    showRewards() {
        // disable interaction of all elements besides hover
        this.sound.play("playerWin");
        this.disableInteractionDuringCard();
        this.disableHover();
        this.player.disableDragOnCards();

        let centerX = this.game.config.width / 2;
        let centerY = this.game.config.height / 2;

        let pickCardsText = this.add.text(centerX, 100, "Pick One Card", {color:"#FD722A" , fontSize: "40px"});
        pickCardsText.setOrigin(0.5, 0.5);
        let player = this.player;
        let scene = this;

        for (let card of this.rewardData){
            let newCard;
            if (card.cardType === "damage"){
                newCard = new DamageCard(card.name, card.cost, card.cardType, card.effect, card.rarity, this, 0, 0, card.name);
            } else if (card.cardType === "healing") {
                newCard = new HealingCard(card.name, card.cost, card.cardType, card.effect, card.rarity, this, 0, 0, card.name);
            } else if (card.cardType === "reload") {
                newCard = new ReloadCard(card.name, card.cost, card.cardType, card.effect, card.rarity, this, 0, 0, card.name);
            } else {
                newCard = new ComboCard(card.name, card.cost, card.cardType, card.effect, card.rarity, this, 0, 0, card.name);
            }
            this.rewards.push(newCard);
        }

        for (let i=0; i < this.rewards.length; i++) {
            let cards = this.rewards[i];
            let cardXOffset = centerX + (i - (this.rewards.length - 1) / 2) * 300;

            cards.setOrigin(0.5, 0.5);
            cards.x = cardXOffset;
            cards.y = centerY;
            cards.angle = 0;
            cards.displayWidth = gameOptions.cardWidth * 2;
            cards.displayHeight = gameOptions.cardHeight * 2;
            cards.setDepth(5);

            cards.setVisible(true);
            this.add.existing(cards);

            // add the card to deckArray when clicked 
            cards.on('pointerdown', function (event) {
                // this refers to the card btw here, not the scene
                player.deckArray.push(this);

                for (let cards of scene.rewards) {
                    cards.destroy();
                }
                pickCardsText.destroy();
                scene.rewards=[];

                for (let card of scene.player.graveYardArray){
                    scene.player.deckArray.push(card);
                }
                for (let card of scene.player.handArray){
                    scene.player.deckArray.push(card);
                }
                scene.player.handArray = [];
                scene.player.graveYardArray = [];
                scene.playerData.setEqual(scene.player);
                scene.sound.stopAll();
                scene.sound.sounds[1].play();

                // if (scene.level === 3) {
                //     scene.scene.start(CST.SCENES.INITIATEPVPSCENE, {networkObj: scene.network, playerUsername: scene.playerUsername, playerObj: scene.player });
                // } else {
                scene.scene.stop(CST.SCENES.BATTLE);
                scene.scene.resume(CST.SCENES.MAP);
                // }
            })
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

    disableHover() {
        this.input.off('gameobjectover');
        this.input.off('gameobjectout');
    }

    returnCardsToPlayer(scene){
        for (let card of scene.player.graveYardArray){
            scene.player.deckArray.push(card);
        }
        for (let card of scene.player.handArray){
            scene.player.deckArray.push(card);
        }
        scene.player.handArray = [];
        scene.player.graveYardArray = [];
        scene.playerData.setEqual(scene.player);
    }

}
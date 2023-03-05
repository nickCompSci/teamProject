import HandCard from "./handCard.js";
import { Tooltip } from "./toolTip.js";

export default class DamageCard extends HandCard {
    constructor(name, cost, cardType, effect, rarity, scene, x, y, sprite) {
        super(name, cost, cardType, effect, rarity, scene, x, y, sprite);
        this.tooltip = new Tooltip(scene, x+this.displayWidth, y, this.getLabel());
        this.originalDamage = this.effect.damage;
        this.originalTarget = this.effect.target;
        scene.add.existing(this);
        this.cardInHand(scene);
    }

    cardInHand(scene) {
        super.cardInHand(scene);
    } 

    activateCard(scene) {
        let card = this;
        if (this.effect.target === "single") {
            for (let enemy of scene.enemies) {
                // remove all interaction when playing a single target card
                scene.player.disableDragOnCards();
                scene.disableInteractionDuringCard();

                // remove event listener from enemy
                enemy.enemyArrow.setVisible(true);
                enemy.removeListener("pointerdown", enemy.clickHandler);

                // flag on enemy to keep track on whether it's being clicked
                enemy.isBeingClicked = true;

                // add the event listener back to the enemy
                enemy.clickHandler = this.damageEnemy.bind(this, enemy, scene);
                enemy.on("pointerdown", enemy.clickHandler);

            }
        } else if (this.effect.target === "all") {
            this.dealDamageToAllEnemies(scene);
            scene.check_enemy_death();
            this.resetCard();
        } else if (this.effect.target === "random") {
            for (let i=0; i < this.effect.randomAmount; i++) {
                let randomIndex = Math.floor(Math.random() * scene.enemies.length);
                let randomEnemy = scene.enemies[randomIndex];

                scene.damage_calculation(randomEnemy, this.effect.damage, [1]);
                // check if enemy died between each attack to update list
            }
            this.resetCard();
            scene.check_enemy_death();
        }
        // check enemy dead here

        if ("cards" in this.effect) {
            scene.player.drawCard(this.effect.cards, scene);
        }

        if ("discard" in this.effect) {
            scene.player.discardCard(this.effect.discard, scene);
        }

        if ("armour" in this.effect) {
            scene.armour_calculation(scene.player, this.effect.armour);
        }
        
    }

    damageEnemy(enemy, scene) {
        if (enemy.isBeingClicked) {
            if (this.name === "ballistic") {
                this.effect.damage = scene.player.armour;
            }
            scene.damage_calculation(enemy, this.effect.damage, [1]);
            enemy.isBeingClicked = false;
            this.resetCard();
        }

        for (let enemy of scene.enemies) {
            enemy.enemyArrow.setVisible(false);
            enemy.isBeingClicked = false;
            enemy.clickHandler = this.damageEnemy.bind(this, enemy, scene);
            enemy.on("pointerdown", enemy.clickHandler);
        }

        scene.player.enableDragOnCards();
        scene.enableInteractionAfterCard();

        scene.check_enemy_death();
    }

    // if being comboed, will reset 
    resetCard() {
        this.effect.damage = this.originalDamage;
        this.effect.target = this.originalTarget;
    }

    dealDamageToAllEnemies(scene) {
        for (let enemy of scene.enemies) {
            scene.damage_calculation(enemy, this.effect.damage, [1]);
        }

    }

    getLabel() {
        return "Damage: It deals damage...DUH";
    }

}
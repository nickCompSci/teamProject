import HandCard from "./handCard.js";
import { Tooltip } from "./toolTip.js";

export default class DamageCard extends HandCard {
    constructor(name, cost, cardType, effect, rarity, scene, x, y, sprite) {
        super(name, cost, cardType, effect, rarity, scene, x, y, sprite);
        this.tooltip = new Tooltip(scene, x+this.displayWidth, y, this.getLabel());
        scene.add.existing(this);
        this.cardInHand(scene);
    }

    cardInHand(scene) {
        super.cardInHand(scene);
    } 

    activateCard(scene) {
        let card = this;
        if (this.effect.target === "single") {
            for (let enemy of scene.enemy.enemyOnScene) {
                // remove event listener from enemy
                enemy.removeListener("pointerdown", enemy.clickHandler);

                // flag on enemy to keep track on whether it's being clicked
                enemy.isBeingClicked = true;

                // add the event listener back to the enemy
                enemy.clickHandler = this.damageEnemy.bind(this, enemy, scene);
                enemy.on("pointerdown", enemy.clickHandler);
            }

        } else if (this.effect.target === "all") {
            for (let enemy of scene.enemy.enemyOnScene) {
                scene.damage_calculation(enemy, card.effect.damage, [1]);
            }

        } else if (this.effect.target === "random") {
            for (let i=0; i < this.effect.randomAmount; i++) {
                let randomIndex = Math.floor(Math.random() * scene.enemy.enemyOnScene.length);
                let randomEnemy = scene.enemy.enemyOnScene[randomIndex];

                scene.time.delayedCall(250, scene.damage_calculation, [randomEnemy, this.effect.damage, [1]], scene);
                // check if enemy died between each attack to update list
            }
        }
        // check enemy dead here

        if ("cards" in this.effect) {
            scene.player.drawCard(this.effect.cards, scene);
        }

        if ("discard" in this.effect) {
            scene.player.discardCard(this.effect.discard, scene);
        }
    }

    damageEnemy(enemy, scene) {
        if (enemy.isBeingClicked) {
            scene.damage_calculation(enemy, this.effect.damage, [1]);
            enemy.isBeingClicked = false;
        }

        for (let enemy of scene.enemy.enemyOnScene) {
            enemy.isBeingClicked = false;
            enemy.clickHandler = this.damageEnemy.bind(this, enemy, scene);
            enemy.on("pointerdown", enemy.clickHandler);
        }
    }

    getLabel() {
        return "Damage: Inflicted damage is on the enemy's health.";
    }
    

}
import { gameOptions, enemy } from "../../config.js";
import HandCard from "./handCard.js";
import { Tooltip } from "./toolTip.js";

export default class DamageCard extends HandCard {
    constructor(name, cost, cardType, effect, scene, x, y, sprite) {
        super(name, cost, cardType, effect, scene, x, y, sprite);
        this.tooltip = new Tooltip(scene, x+this.displayWidth, y, this.getLabel());
        scene.add.existing(this);
        this.cardInHand(scene);
    }

    cardInHand(scene) {
        super.cardInHand(scene);
    } 

    activateCard(scene) {
        let card = this;
        if (this.effect.target == "single") {
            for (let i=0; i < scene.enemy.enemyOnScene.length; i++) {
                scene.enemy.enemyOnScene[i].once("pointerdown", function(pointer) {
                    this.setHealth(this.getHealth() - card.effect.damage);
                    this.heartText.setText(this.getHealth());

                    for (let j=0; j < scene.enemy.enemyOnScene.length; j++) {
                        scene.enemy.enemyOnScene[j].input.enabled = false;
                    }
                })
            }
        } else if (this.effect.target == "all") {
            for (let i=0; i < scene.enemy.enemyOnScene.length; i++) {
                scene.enemy.enemyOnScene[i].setHealth(scene.enemy.enemyOnScene[i].getHealth() - card.effect.damage);
                scene.enemy.enemyOnScene[i].heartText.setText(scene.enemy.enemyOnScene[i].getHealth());
            }
        }
    }

    getLabel() {
        return "Damage: Inflicted damage is on the enemy's health.";
    }
    

}
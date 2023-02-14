import { gameOptions, enemy } from "../../config";
import HandCard from "./HandCard";
import { Tooltip } from "./Tooltip";

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
            for (let i=0; i < enemy.enemyOnScene.length; i++) {
                enemy.enemyOnScene[i].once("pointerdown", function(pointer) {
                    console.log(this);
                    this.setHealth(this.getHealth() - card.effect.damage);
                    this.heartText.setText(this.getHealth());

                    for (let j=0; j < enemy.enemyOnScene.length; j++) {
                        enemy.enemyOnScene[j].input.enabled = false;
                    }
                })
            }
        } else if (this.effect.target == "all") {
            for (let i=0; i < enemy.enemyOnScene.length; i++) {
                enemy.enemyOnScene[i].setHealth(enemy.enemyOnScene[i].getHealth() - card.effect.damage);
                enemy.enemyOnScene[i].heartText.setText(enemy.enemyOnScene[i].getHealth());
            }
        }
    }

    getLabel() {
        return "Damage: Inflicted damage is on the enemy's health.";
    }
    

}
/**
This file is used to create the options scene.
*/
import { CST } from "../CST";
export class MapScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MAP
        })
    }

    // Creates any images, text, etc.
    create(){

        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'map').setSize(this.game.renderer.width, this.game.renderer.height).setDepth(0)

        // Back Button for navigating back to the main menu
        let backButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Back', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        let arrowSprite = this.add.sprite(100, 100, "arrow");
        arrowSprite.setVisible(false);

        // Back Button
        backButton.setInteractive();

        backButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = backButton.x - backButton.width + 60;
            arrowSprite.y = backButton.y + backButton.height / 4;
            console.log("hover")
        })

        backButton.on("pointerup", ()=>{
            // Moves back to the main menu when the back button is clicked
            this.scene.start(CST.SCENES.MENU);
            console.log("click")
        })

        let battle = this.add.image(this.game.renderer.width / 2-215, this.game.renderer.height / 2-70, 'cards').setDepth(0)
        let shop = this.add.image(this.game.renderer.width / 2-55, this.game.renderer.height / 2-150, 'shop').setDepth(0)
        let random = this.add.image(this.game.renderer.width / 2-75, this.game.renderer.height / 2-20, 'random').setDepth(0)
        let random2 = this.add.image(this.game.renderer.width / 2+80, this.game.renderer.height / 2+110, 'random').setDepth(0)
        let battle2 = this.add.image(this.game.renderer.width / 2+60, this.game.renderer.height / 2-20, 'cards').setDepth(0)
        let battle3 = this.add.image(this.game.renderer.width / 2+90, this.game.renderer.height / 2-150, 'cards').setDepth(0)
        let battle4 = this.add.image(this.game.renderer.width / 2-85, this.game.renderer.height / 2+110, 'cards').setDepth(0)
        let battle5 = this.add.image(this.game.renderer.width / 2-215, this.game.renderer.height / 2+170, 'cards').setDepth(0)
        let battle6 = this.add.image(this.game.renderer.width / 2+120, this.game.renderer.height / 2+230, 'cards').setDepth(0)
        let battle7 = this.add.image(this.game.renderer.width / 2+200, this.game.renderer.height / 2-60, 'cards').setDepth(0)

        let encounters = [battle, battle2, battle3, battle4, battle5, battle6, battle7, shop, random, random2];

        function shuffle(array) {
            let currentIndex = array.length,  randomIndex;
          
            // While there remain elements to shuffle.
            while (currentIndex != 0) {
          
              // Pick a remaining element.
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
          
              // And swap it with the current element.
              [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
          
            return array;
        }
        
        shuffle(encounters);

        console.log(encounters)

        let positions = [
            {x : this.game.renderer.width / 2-215, y : this.game.renderer.height / 2-70},
            {x : this.game.renderer.width / 2-55, y : this.game.renderer.height / 2-150},
            {x : this.game.renderer.width / 2-75, y : this.game.renderer.height / 2-20},
            {x : this.game.renderer.width / 2+80, y : this.game.renderer.height / 2+110},
            {x : this.game.renderer.width / 2+60, y : this.game.renderer.height / 2-20},
            {x : this.game.renderer.width / 2+90, y : this.game.renderer.height / 2-150},
            {x : this.game.renderer.width / 2-85, y : this.game.renderer.height / 2+110},
            {x : this.game.renderer.width / 2-215, y : this.game.renderer.height / 2+170},
            {x : this.game.renderer.width / 2+120, y : this.game.renderer.height / 2+230},
            {x : this.game.renderer.width / 2+200, y : this.game.renderer.height / 2-60}
        ]

        for (let i=0; i<encounters.length; i++) {
            console.log(positions[i].x)
            encounters[i].x = positions[i].x;
            encounters[i].y = positions[i].y;
        }

        battle.setInteractive();
        
        battle.on("pointerup", ()=>{
            // Moves back to the main menu when the back button is clicked
            this.scene.start(CST.SCENES.BATTLE);
            console.log("click")
        })

    }
}
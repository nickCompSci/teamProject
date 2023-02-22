/**
This file is used to create the map scene.
*/
import { shuffle } from "../classes/shuffle.js"
import { Map } from "../classes/map.js";
import { CST } from "../CST";
export class MapScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MAP
        })
    }

    // Creates any images, text, etc.
    create(){

        // Loads background
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'map').setSize(this.game.renderer.width, this.game.renderer.height).setDepth(0)
        this.add.image(205, 435, "up").setDepth(2).setInteractive().on("pointerup", ()=>{
            // Moves back to the main menu when the back button is clicked
            this.scene.start(CST.SCENES.MAP);
        })
        // Back Button for navigating back to the main menu
        let backButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Back', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        let arrowSprite = this.add.sprite(100, 100, "arrow");
        arrowSprite.setVisible(false);

        let pointer = this.add.sprite(100, 100, "pointer");
        pointer.setVisible(false);

        // Back Button
        backButton.setInteractive();

        backButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = backButton.x - backButton.width + 60;
            arrowSprite.y = backButton.y + backButton.height / 4;
        })

        backButton.on("pointerup", ()=>{
            // Moves back to the main menu when the back button is clicked
            this.scene.start(CST.SCENES.MENU);
        })

        //  ** BEGINS HERE ** 

        // adds icons for map
        let battle = this.add.image( 0,0, 'cards')
        let shop = this.add.image(  0,0, 'shop')
        let random = this.add.image(  0,0,  'random')
        let random2 = this.add.image(  0,0,  'random')
        let battle2 = this.add.image(  0,0,  'cards')
        let battle3 = this.add.image(  0,0,  'cards')
        let battle4 = this.add.image(  0,0,  'cards')
        let battle5 = this.add.image(  0,0,  'cards')
        let battle6 = this.add.image(  0,0,  'cards')
        let battle7 = this.add.image(  0,0,  'cards')

        let encounters = [battle, battle2, battle3, battle4, battle5, battle6, battle7, shop, random, random2];

        //Door images and their respective set of positions
        let door1 = this.add.image(0,0,"door");

        let door_pos1 = [
            {x : 280, y : 383, l : 11, r : 9},
            {x : 320, y : 335, l : 9, r : 7},
            {x : 320, y : 240, l : 9, r : 8}
        ]

        let door2 = this.add.image(0,0,"door");

        let door_pos2 = [
            {x : 320, y : 417, l : 11, r : 9},
            {x : 320, y : 483}
        ]

        let door3 = this.add.image(0,0,"door");

        let door_pos3 = [
            {x : 280, y : 518},
            {x : 320, y : 560}
        ]

        let door4 = this.add.image(0,0,"door");

        let door_pos4 = [
            {x : 400, y : 288}
        ]

        let door5 = this.add.image(0,0,"door");

        let door_pos5 = [
            {x : 450, y : 450}
        ]

        let door6 = this.add.image(0,0,"door");

        let door_pos6 = [
            {x : 503, y : 240},
            {x : 503, y : 335},
            {x : 503, y : 505},
            {x : 503, y : 610}
        ]

        let door7 = this.add.image(0,0,"door");

        let door_pos7 = [
            {x : 566, y : 288},
            {x : 670, y : 288}
        ]

        let door8 = this.add.image(0,0,"door");

        let door_pos8 = [
            {x : 618, y : 335}
        ]

        let door9 = this.add.image(0,0,"door");

        let door_pos9 = [
            {x : 566, y : 450}
        ]

        let door10 = this.add.image(0,0,"door");

        let door_pos10 = [
            {x : 566, y : 560},
            {x : 730, y : 560}
        ]

        let door11 = this.add.image(0,0,"door");

        let door_pos11 = [
            {x : 730, y : 382},
            {x : 680, y : 500}
        ]

        let doors = [
            door1, door2, door3, door4, door5, door6, door7, door8, door9, door10, door11
        ]

        doors = [
            door1, door2, door3, door4, door5, door6, door7, door8, door9, door10, door11
        ]

        shuffle(encounters);

        let door_positions = [
            door_pos1, door_pos2, door_pos3, door_pos4, door_pos5, door_pos6, door_pos7, door_pos8, door_pos9, door_pos10, door_pos11
        ]

        for (let i=0; i<door_positions.length; i++) {
            shuffle(door_positions[i]);
        }

        door_positions = [
            door_pos1[0], door_pos2[0], door_pos3[0], door_pos4[0], door_pos5[0], door_pos6[0], door_pos7[0], door_pos8[0], door_pos9[0], door_pos10[0], door_pos11[0]
        ]

        // room positions for encounter icons
        let positions = [
            {x : this.game.renderer.width / 2-225, y : this.game.renderer.height / 2-70, room : 9},
            {x : this.game.renderer.width / 2-75, y : this.game.renderer.height / 2-170, room : 8},
            {x : this.game.renderer.width / 2-75, y : this.game.renderer.height / 2-20, room : 7},
            {x : this.game.renderer.width / 2+80, y : this.game.renderer.height / 2+110, room : 2},
            {x : this.game.renderer.width / 2+60, y : this.game.renderer.height / 2-20, room : 5},
            {x : this.game.renderer.width / 2+90, y : this.game.renderer.height / 2-165, room : 4},
            {x : this.game.renderer.width / 2-75, y : this.game.renderer.height / 2+130, room : 6},
            {x : this.game.renderer.width / 2-225, y : this.game.renderer.height / 2+170, room : 10},
            {x : this.game.renderer.width / 2+120, y : this.game.renderer.height / 2+230, room : 3},
            {x : this.game.renderer.width / 2+200, y : this.game.renderer.height / 2-60, room : 1}
        ]

        // for assigning the positions to the icons
        function assignLocations(icon, locations) {
           for (let i=0; i<icon.length; i++) {
                icon[i].x = locations[i].x;
                icon[i].y = locations[i].y;
                icon[i].setDepth(1);
            }
        }

        for (let i=0; i<encounters.length; i++) {

            encounters[i].setInteractive();
            encounters[i].setDepth(2);

            encounters[i].on("pointerup", ()=>{
                // Moves back to the main menu when the back button is clicked
                this.scene.start(CST.SCENES.BATTLE);
                console.log("click");
            })

            encounters[i].on("pointerover", ()=>{
                pointer.setVisible(true).setDepth(3);
                pointer.x = encounters[i].x+60;
                pointer.y = encounters[i].y-30;
            })
        }

        assignLocations(encounters, positions);
        assignLocations(doors, door_positions);

    }
}
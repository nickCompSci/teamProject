/**
This file is used to create the map scene.
*/
import Map from "../helpers/classes/map.js";
import { CST } from "../CST.js";
export class MapScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MAP
        })
    }

    init(data){
        this.network = data.networkObj;
        this.playerUsername = data.playerUsername;
    }

    // Creates any images, text, etc.
    create(){

        // Loads background
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'map').setSize(this.game.renderer.width, this.game.renderer.height).setDepth(0)

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
            this.scene.start(CST.SCENES.MENU, {networkObj: this.network, playerUsername: this.playerUsername });
        })

        // adds icons for map
        let battle = this.add.image( 0,0, 'cards').setDepth(2);
        let shop = this.add.image(  0,0, 'shop').setDepth(2);
        let random = this.add.image(  0,0,  'random').setDepth(2);
        let random2 = this.add.image(  0,0,  'random').setDepth(2);
        let random3 = this.add.image(  0,0,  'random').setDepth(2);
        let battle2 = this.add.image(  0,0,  'cards').setDepth(2);
        let battle3 = this.add.image(  0,0,  'cards').setDepth(2);
        let battle4 = this.add.image(  0,0,  'cards').setDepth(2);
        let battle5 = this.add.image(  0,0,  'cards').setDepth(2);
        let chest = this.add.image(  0,0,  'chest').setDepth(2);
        let start = this.add.image( 740,490, 'door').setDepth(2);
        let end = this.add.image( 270,460, 'door').setDepth(2);

        let encounters = [battle, battle2, battle3, battle4, battle5, random3, chest, shop, random, random2];
        let startEnd = [start, end];

        //Door images and their respective set of positions
        let door1 = this.add.image(0,0,"door");

        let door_pos1 = [
            {x : 280, y : 383, room : 9, adjacent : 11},
            {x : 320, y : 335, room : 9, adjacent : 7},
            {x : 320, y : 240, room : 9, adjacent : 8}
        ]

        let door2 = this.add.image(0,0,"door");

        let door_pos2 = [
            {x : 320, y : 417, room : 11, adjacent : 7},
            {x : 320, y : 483, room : 11, adjacent : 6}
        ]

        let door3 = this.add.image(0,0,"door");

        let door_pos3 = [
            {x : 280, y : 518, room : 10, adjacent : 11},
            {x : 320, y : 560, room : 10, adjacent : 6}
        ]

        let door4 = this.add.image(0,0,"door");

        let door_pos4 = [
            {x : 400, y : 288, room : 8, adjacent : 7}
        ]

        let door5 = this.add.image(0,0,"door");

        let door_pos5 = [
            {x : 450, y : 450, room : 7, adjacent : 6}
        ]

        let door6 = this.add.image(0,0,"door");

        let door_pos6 = [
            {x : 503, y : 240, room : 8, adjacent : 4},
            {x : 503, y : 335, room : 7, adjacent : 5},
            {x : 503, y : 505, room : 6, adjacent : 2},
            {x : 503, y : 610, room : 6, adjacent : 3}
        ]

        let door7 = this.add.image(0,0,"door");

        let door_pos7 = [
            {x : 566, y : 288, room : 4, adjacent : 5},
            {x : 670, y : 288, room : 4, adjacent : 1}
        ]

        let door8 = this.add.image(0,0,"door");

        let door_pos8 = [
            {x : 618, y : 335, room : 5, adjacent : 1}
        ]

        let door9 = this.add.image(0,0,"door");

        let door_pos9 = [
            {x : 566, y : 450, room : 5, adjacent : 2}
        ]

        let door10 = this.add.image(0,0,"door");

        let door_pos10 = [
            {x : 566, y : 560, room : 3, adjacent : 2},
            {x : 730, y : 560, room : 3, adjacent : 0}
        ]

        let door11 = this.add.image(0,0,"door");

        let door_pos11 = [
            {x : 730, y : 382, room : 0, adjacent : 1},
            {x : 680, y : 500, room : 0, adjacent : 2}
        ]

        let doors = [
            door1, door2, door3, door4, door5, door6, door7, door8, door9, door10, door11
        ]

        let door_positions = [
            door_pos1, door_pos2, door_pos3, door_pos4, door_pos5, door_pos6, door_pos7, door_pos8, door_pos9, door_pos10, door_pos11
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

        const map = new Map(encounters, positions, doors, door_positions, startEnd)

        // level counter top in the left
        let level = this.add.text(220, 100, map._level.toString(), {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)
    
        // N.B. *** VERY IMPORTANT FUNCTION *** 
        encountersInteractive(this)

        // for moving to next level (only works when in final room)
        let next_floor = this.add.image(205, 435, "up").setDepth(2).setInteractive().on("pointerup", ()=>{
            if (map.currentLocation == 11) {
                for (let i=0; i<map.adjacent.length; i++) {
                    map.adjacent[i].getEncounter().disableInteractive();
                }
                map.levelInc();
                level.text = map._level.toString();
                encountersInteractive(this);
                player.x = map._current_room.x;
                player.y = map._current_room.y;
            }
        })

        /* 
        N.B. *** IMPORTANT AGAIN KEVIN ***
        This up arrow needs to be hovered over when moving to a new room.

        THIS SIMULATES RETURNING TO THE MAP SCREEN FROM THE BATTLE SCENE CURRENTLY.

        */

        this.events.on ("resume", () => {
            encountersInteractive(this);
        });

        // player icon on the map
        let player = this.add.image(map._current_room.x, map._current_room.y, 'player_map').setDepth(4)
        
        /*
        THIS IS WHERE THE INTERACTIVITY FOR THE ENCOUNTERS SHOULD BE DONE.

        DECIDING ON THE SCENE DEPENDING ON THE ENCOUNTER SHOULD BE DONE HERE.

        HANDLES ALL OF THE REASSIGNING OF THE ADJACENT ROOMS AND THE CURRENT LOCATION OF THE PLAYER.

        ALSO LOGS THE ROOMS THAT HAVE BEEN VISITED.
        */

        function encountersInteractive(scene) {
            let adjacent = map.adjacent;

            for (let i=0; i<adjacent.length; i++) {
                adjacent[i].getEncounter().setInteractive();

                adjacent[i].getEncounter().on("pointerup", ()=>{
                    // Moves back to the main menu when the back button is clicked
                    map.playerLocation(adjacent[i]);
                    player.x = map._current_room.x;
                    player.y = map._current_room.y;
                    if (adjacent[i].getEncounter().texture.key == "cards") {
                        scene.scene.pause().launch(CST.SCENES.BATTLE_LOAD, {networkObj: scene.network, playerUsername: scene.playerUsername });
                    } else if (adjacent[i].getEncounter().texture.key == "end") {
                        scene.scene.start(CST.SCENES.EXTRA,  {room : "end"});
                    } else if (adjacent[i].getEncounter().texture.key == "random") {
                        let choice = Math.floor(Math.random() * 2);
                        if (choice == 0) {
                            scene.scene.start(CST.SCENES.EXTRA, {room : "chest"});
                        } else {
                            scene.scene.start(CST.SCENES.BATTLE_LOAD, {networkObj: scene.network, playerUsername: scene.playerUsername });
                        }
                    }  else if (adjacent[i].getVisited() == true) {
                        scene.resume_map();
                    } else {
                        scene.scene.start(CST.SCENES.EXTRA, {room : adjacent[i].getEncounter().texture.key});
                    }
                    for (let i=0; i<adjacent.length; i++) {
                        adjacent[i].getEncounter().disableInteractive();
                    }
                    map.setAdjacent();

                    adjacent[i].setVisited();
                })

                adjacent[i].getEncounter().on("pointerover", ()=>{
                    pointer.setVisible(true).setDepth(3);
                    pointer.x = adjacent[i].getEncounter().x+60;
                    pointer.y = adjacent[i].getEncounter().y-30;

                })
            }
        }
        
    }
}
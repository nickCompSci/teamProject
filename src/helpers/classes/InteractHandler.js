import { handArray, graveYardArray } from "./Deck";
import { gameOptions } from "../config";

export default class InteractHandler {
    constructor(scene) {

        scene.input.on('dragstart', function (pointer, gameObject) {
            scene.tweens.add({
                targets: gameObject,
                angle: 0,
                x: pointer.x,
                y: pointer.y,
                duration: 50
            });
            scene.tweens.add({
                targets: scene.background,
                alpha: 0.3,
                duration: 50
            });
            
            let index = handArray.indexOf(gameObject);
            if (index !== -1) {
                handArray.splice(index, 1);
            }

            scene.arrangeCardsInCenter(handArray);

        }, scene);

        scene.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // hover over listener
        scene.input.on('gameobjectover', function(pointer, gameObject) {
            if (gameObject.type === "Sprite" && handArray.includes(gameObject)) {
                scene.tweens.add({
                    targets: gameObject,
                    angle: 0,
                    displayWidth: gameOptions.cardWidth,
                    displayHeight: gameOptions.cardHeight,
                    depth: 100,
                    duration: 10
                });
            }
        }, scene);

        // hover out listener
        scene.input.on('gameobjectout', function(pointer, gameObject) {
            if (gameObject.type === "Sprite" && handArray.includes(gameObject)) {
                scene.tweens.add({
                    targets: gameObject,
                    angle: gameObject.startPosition.angle,
                    displayWidth: gameOptions.cardWidth/2,
                    displayHeight: gameOptions.cardHeight/2,
                    depth: gameObject.startPosition.depth,
                    duration: 10,
                });
            }
       }, scene);

        scene.input.on('dragenter', function(pointer, gameObject, dropZone) {
            dropZone.renderActiveOutline();
        });

        scene.input.on('dragleave', function(pointer, gameObject, dropZone) {
            dropZone.renderNormalOutline();
        }); 

        scene.input.on('drop', function(pointer, gameObject, dropZone) {
            gameObject.input.enabled = false;

            // setting card in the middle 
            gameObject.displayWidth = gameOptions.cardWidth / 2;
            gameObject.displayHeight = gameOptions.cardHeight / 2;
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y + dropZone.y / 3;
            
            graveYardArray.push(gameObject);

            // remove the card from the scene after 500ms
            setTimeout(function() { gameObject.destroy(); }, 500);

            dropZone.renderNormalOutline(scene);

            scene.cameras.main.shake(100, 0.02);
        });

        scene.input.on("dragend", function(pointer, gameObject, dropped) {
        
            if (!dropped) {
                handArray.push(gameObject);
                gameObject.displayHeight = gameOptions.cardHeight / 2;
                gameObject.displayWidth = gameOptions.cardWidth / 2;
                scene.arrangeCardsInCenter(handArray);
            }
        }, scene);
    }

}
import { CST } from "../CST.js";
// https://medium.com/@leferreyra/first-blog-building-an-interactive-card-fan-with-css-c79c9cd87a14

let gameOptions = {
    startCards: 5,
    cardWidth: 260,
    cardHeight: 410,
    cardDistance: 100,
    cardAngle: 3,
    cardYOffset: 20
}

let handArray;

export class BattleScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.BATTLE
        })
    }

    preload() {
        this.load.image("background", "./assets/background.jpg");
        this.load.spritesheet("cards", "./assets/spritesheet.png", {
            frameWidth: gameOptions.cardWidth,
            frameHeight: gameOptions.cardHeight
        });
    }

    create() {
        let bg = this.add.sprite(0, 0, "background");
        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;
        bg.setPosition(gameWidth/2, gameHeight/2);
        
        handArray = [];
        let graveYardArray = [];

        for (let i = 0; i < gameOptions.startCards; i ++) {

            // creates cards from spritesheet and makes them draggable
            let card = this.add.sprite(this.game.config.width / 2 - i * gameOptions.cardDistance, this.game.config.height, 'cards', i).setInteractive();
            this.input.setDraggable(card);
            // Minimises the cards initial display size
            handArray.push(card);
            card.setOrigin(0.5, 1);
            card.displayWidth = gameOptions.cardWidth / 2;
            card.displayHeight = gameOptions.cardHeight / 2 ;
            card.setDepth(gameOptions.startCards - i);

            card.startPosition = {
                angle: card.angle,
                x: card.x,
                y: card.y
            }
        }

        this.arrangeCardsInCenter(handArray);

        let dropZone = this.add.zone(500, 300, 300, 300).setRectangleDropZone(300, 300);
        let normalZone = 0xffff00; // yellow
        let activeZone = 0x00ffff; // lightblue / turquoise 
        
        let graphics = this.add.graphics();
        graphics.lineStyle(2, normalZone);
        graphics.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height);

        this.input.on('dragstart', function (pointer, gameObject) {
            this.tweens.add({
                targets: gameObject,
                angle: 0,
                x: pointer.x,
                y: pointer.y,
                displayWidth: gameOptions.cardWidth,
                displayHeight: gameOptions.cardHeight,
                duration: 50
            });
            this.tweens.add({
                targets: this.background,
                alpha: 0.3,
                duration: 50
            });
            
            let index = handArray.indexOf(gameObject);
            if (index !== -1) {
                handArray.splice(index, 1);
            }

            this.arrangeCardsInCenter(handArray);

        }, this);

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // this.input.on('pointerover', function(pointer, gameObject) {
        //     this.tweens.add({
        //         targets: gameObject,
        //         angle: 0,
        //         x: pointer.x,
        //         y: pointer.y,
        //         displayWidth: gameOptions.cardWidth,
        //         displayHeight: gameOptions.cardHeight,
        //         duration: 50
        //     });
            
        // }, this);

        // this.input.on('pointerout', function(pointer, gameObject) {
        //     this.tweens.add({
        //         targets: gameObject,
        //         angle: gameObject.startPosition.angle,
        //         x: gameObject.startPosition.x,
        //         y: gameObject.startPosition.y,
        //         displayWidth: gameOptions.cardWidth/2,
        //         displayHeight: gameOptions.cardHeight/2,
        //         duration: 50
        //     });
        // }, this);

        this.input.on('dragenter', function(pointer, gameObject, dropZone) {
            graphics.clear();
            graphics.lineStyle(2, activeZone);
            graphics.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height);
        });

        this.input.on('dragleave', function(pointer, gameObject, dropZone) {
            graphics.clear();
            graphics.lineStyle(2, normalZone);
            graphics.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height);
        }); 

        this.input.on('drop', function(pointer, gameObject, dropZone) {
            gameObject.input.enabled = false;

            // setting card in the middle 
            gameObject.displayWidth = gameOptions.cardWidth / 2;
            gameObject.displayHeight = gameOptions.cardHeight / 2;
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y + dropZone.y / 3;
            
            graveYardArray.push(gameObject);

            // remove the card from the scene after 500ms
            // setTimeout(function() { gameObject.destroy(); }, 500);

            graphics.clear();
            graphics.lineStyle(2, normalZone);
            graphics.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height);

            this.cameras.main.shake(100, 0.02);
        });

        this.input.on("dragend", function(pointer, gameObject, dropped) {
        
            if (!dropped) {
                handArray.push(gameObject);
                gameObject.displayHeight = gameOptions.cardHeight / 2;
                gameObject.displayWidth = gameOptions.cardWidth / 2;
                this.arrangeCardsInCenter(handArray);
            }
        }, this);
    }

    arrangeCardsInCenter(handArray) {
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
            card.setDepth(i);
        }
    }
}
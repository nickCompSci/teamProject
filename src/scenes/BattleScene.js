import { CST } from "../CST.js";
// https://medium.com/@leferreyra/first-blog-building-an-interactive-card-fan-with-css-c79c9cd87a14

let gameOptions = {
    startCards: 5,
    cardWidth: 260,
    cardHeight: 410,
    cardDistance: 100,
    cardAngle: 3,
    cardYOffset: 12
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
        
        let startAngle = gameOptions.cardAngle;
        handArray = [];
        let graveYardArray = [];

        for (let i = 0; i < gameOptions.startCards; i ++) {

            // creates cards from spritesheet and makes them draggable
            let card = this.add.sprite(this.game.config.width / 2 - i * gameOptions.cardDistance, this.game.config.height + gameOptions.cardHeight/10, 'cards', i).setInteractive();
            this.input.setDraggable(card);
            // Minimises the cards initial display size
            handArray.push(card);
            card.setOrigin(0.5, 1);
            card.displayWidth = gameOptions.cardWidth / 2;
            card.displayHeight = gameOptions.cardHeight / 2 ;
            card.setDepth(gameOptions.startCards - i);
            
            this.organiseCardsInCenter(card);

            card.startPosition = {
                angle: card.angle,
                x: card.x,
                y: card.y
            }
        }

        // Calls angling function for cards
        this.angleCardsInHand(handArray);


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

            this.arrangeCardsInHand();
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
            setTimeout(function() { gameObject.destroy(); }, 500);

            graphics.clear();
            graphics.lineStyle(2, normalZone);
            graphics.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height);

            this.cameras.main.shake(100, 0.02);
        });

        this.input.on("dragend", function(pointer, gameObject, dropped) {
        
            if (!dropped) {
                handArray.push(gameObject);
                this.arrangeCardsInHand();
            }
        }, this);
    }

    // method to set card in hand coordinates
    // n = card number
    // totalCards = amount of cards on hand
    setHandCoordinates(n, totalCards) {
        let rotation = Math.PI / 4 / totalCards * (totalCards - n - 1);
        let xPosition = this.game.config.width / 2 + 200 * Math.cos(rotation + Math.PI / 2);
        let yPosition = this.game.config.height + 200 - 200 * Math.sin(rotation + Math.PI / 2);
        return {
            x: xPosition,
            y: yPosition,
            r: -rotation
        }
    }

    arrangeCardsInHand() {
        handArray.forEach(function(card, i) {
            card.setDepth(i);
            let coordinates = this.setHandCoordinates(i, handArray.length);
            this.tweens.add({
                targets: card,
                rotation: coordinates.r,
                x: coordinates.x,
                y: coordinates.y,
                displayWidth: gameOptions.cardWidth / 2,
                displayHeight: gameOptions.cardHeight / 2, 
                duration: 150
            });
        }, this);
    }

    organiseCardsInCenter(card) {
        // offset the cards back to the middle

        let xOffset = Math.floor(gameOptions.startCards / 2);
        card.x += gameOptions.cardDistance * xOffset;

        // if even number of cards, then offset the x slighly for centering
        if (gameOptions.startCards % 2 == 0) {
            card.x -= gameOptions.cardDistance / 2;
        }
    }

    // angling cards from center card
    angleCardsInHand(handArray) {
        let lengthArray = handArray.length
        let middleCard = Math.floor(lengthArray / 2);
        let j = middleCard - 1;
        let l;
        if (lengthArray % 2 === 0) {
            l = middleCard;
        } else {
            l = middleCard + 1;
        }
        let i = 1;

        for (j; j >= 0; j--) {
            handArray[j].angle += gameOptions.cardAngle * i;
            handArray[j].y += gameOptions.cardYOffset * i;
            handArray[l].angle -= gameOptions.cardAngle * i;
            handArray[l].y += gameOptions.cardYOffset * i;
            i++; 

            // if even number, then it won't increment l for error.
            if (l != handArray.length-1) {
                l++;
            }
        }   
       
    }
}
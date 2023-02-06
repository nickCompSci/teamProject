import {cardBackDimensions} from "../config.js";

let handArray = [];
let deckArray = [];
let deckTrackerArray = [];
let graveYardArray = [];

function deckSetUp(scene, array, arrayTracker) {
    let x = scene.game.config.width / 25;
    let y = scene.game.config.height / 1.24;
    for (let i=0; i < array.length; i++) {
        let cardBack = scene.add.sprite(x,
        y, 'cardBack');
        cardBack.setOrigin(0.5, 1);
        cardBack.displayWidth = cardBackDimensions.backWidth / 2;
        cardBack.displayHeight = cardBackDimensions.backHeight / 2;
        
        arrayTracker.push(cardBack);
        x += 4;
    }
}

// implementing Durstenfeld shffle, an optimised version of Fisher-Yates
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]]
    }
}

export {handArray, deckArray, deckTrackerArray, graveYardArray};
export {deckSetUp, shuffle};


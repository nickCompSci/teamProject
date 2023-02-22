import shuffle from './shuffle';

export default class Door {

    /*
    Positions should be a list of positions.
    Position should include x, y, l and r.
    l and r are left and right or up and down respectively depending on where the door is situated.
    */

    constructor(image, positions) {
        this._image = image;
        this._positions = positions;
        this._position = shuffle(positions)[0];
        this._image.x = this._position.x
        this._image.y = this._position.y
        this._room = this._position.room
        this._adjacent = this._position.adjacent
    }

    randomizePosition() {
        this._position = shuffle(this._positions)[0];
        this._image.x = this._position.x
        this._image.y = this._position.y
        this._adjacent = this._position.adjacent
        this._room = this._position.room 
    }

    get image() {
        return this._image
    }

    get adjacent() {
        return this._adjacent
    }

    get room() {
        return this._room
    }

}

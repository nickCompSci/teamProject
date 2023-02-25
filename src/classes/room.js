export default class Room {

    constructor(number, encounter, visited=false) {
        this._number = number;
        this._encounter = encounter;
        this._visited = visited;
    }

    setVisited() {
        this._visited = true;
        this._encounter.setDepth(-1);
    }

    getNumber() {
        return this._number;
    }

    getEncounter() {
        return this._encounter;
    }

    getVisited() {
        return this._visited
    }

}
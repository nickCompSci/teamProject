import shuffle from './shuffle';
import Door from "./door";
import Room from "./room";

export default class Map {
    constructor(encounters, positions, doors, door_positions, startEnd) {
        this._encounters = encounters;
        this._positions = positions;
        this._doors = doors;
        this._doors_temp = [];
        this._current_room = startEnd[0];

        for (let i=0; i<doors.length; i++) {
            this._doors_temp.push(new Door(doors[i], door_positions[i]));
        }

        this._doors = this._doors_temp;

        this._level = 0;
        this._current_location = 0;
        this._adjacent = [];
        this._rooms = [];

        shuffle(encounters);

        this.assignLocations(encounters, positions);
        this._rooms.push(new Room (0, startEnd[0], true));
        this._rooms.push(new Room(11, startEnd[1]));
        this.setAdjacent();
    }

    playerLocation(room) {
        this._current_location = room.getNumber();
        this._current_room = room.getEncounter();
    }

    get level() {
        return this._level;
    }

    get currentLocation() {
        return this._current_location;
    }

    set currentLocation(encounter) {
        this._current_location = encounter;
    }

    get adjacent() {
        return this._adjacent;
    }

    setAdjacent() {
        this._adjacent = [];
        let room = 0;
        let door = 0;

        for (let i=0; i<this._doors.length; i++) {
            door = this._doors[i];

            if (door._room == this._current_location) {
                room = door._adjacent;
                this._adjacent.push(room);
            }
            if (door._adjacent == this._current_location) {
                room = door._room;
                this._adjacent.push(room);
            }
            
        }

        let adjacent_temp = [];

        for (let i=0; i<this._adjacent.length; i++) {
            for (let j=0; j<this._rooms.length; j++) {
                if (this._adjacent[i] == this._rooms[j].getNumber()) {
                    adjacent_temp.push(this._rooms[j]);
                }
            }
        }

        this._adjacent = adjacent_temp;

    }

    levelInc() {
        this._level++;
        this._current_location = Math.floor(Math.random() * 12);

        shuffle(this._encounters);

        this.assignLocations(this._encounters, this._positions);

        for (let i=0; i<this._doors.length; i++) {
            this._doors[i].randomizePosition();
        }

        this.setAdjacent();

    }

    // for assigning the positions to the icons
    assignLocations(icon, locations) {
        this._rooms = []
        for (let i=0; i<icon.length; i++) {
            console.log(icon[i])
            icon[i].x = locations[i].x;
            icon[i].y = locations[i].y;
            icon[i].setDepth(1);

            this._rooms.push(new Room (locations[i].room, icon[i]))
        }
    }

    randomizePlayerLocation() {
        this._current_location = Math.floor(Math.random() * 12);
    }

}

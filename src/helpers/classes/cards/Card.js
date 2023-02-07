export default class Card {

    constructor(name, cost, effect, type) {
        this.name = name;
        this.cost = cost;
        this.effect = effect;
        this.type = type;
    }

    getName() {
        return this.name;
    }

    getCost() {
        return this.cost;
    }

    getEffect() {
        return this.effect;
    }

    getType() {
        return this.type;
    }

    setCost(cost) {
        this.cost = cost;
    }

    setEffect(effect) {
        this.effect = effect;
    }

    setType(effect) {
        this.type = type;
    }
}
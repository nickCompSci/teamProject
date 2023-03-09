export const gameOptions = {
    deck: 6,
    startCards: 5,
    cardWidth: 130,
    cardHeight: 205,
    cardDistance: 100,
    cardAngle: 3,
    cardYOffset: 10,
    snake: [15, 0, 1],
    scorpion: [20, 2, 4],
    hyena: [25, 3, 8],
    vulture: [40, 6, 12],
    gorilla: [50, 8, 16]
}

export const eventsCentre = new Phaser.Events.EventEmitter(); 
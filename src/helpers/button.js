import { loadFont } from "./font"
// loadFont("font1", "./assets/PixelboyFont.ttf");

export default class Button {

    constructor(x, y, label, scene, callback) {
        const button = scene.add.text(x, y, label)
            .setOrigin(0.5, 1)
            .setPadding(15)
            .setStyle({ backgroundColor: '#202529'})
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
    }
}

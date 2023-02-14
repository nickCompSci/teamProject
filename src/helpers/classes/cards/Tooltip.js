export class Tooltip extends Phaser.GameObjects.Text {
    constructor(scene, x, y, label) {
        super(scene, x, y, label);
        this.padding = {
            x: 20,
            y: 20
        }
        this.setPadding(this.padding.x, this.padding.y);
        this.setStyle({ backgroundColor: "#202529", color: "#ffffff", wordWrap: {width: 150}});
        scene.add.existing(this);
        this.visible = false;
        this.setDepth(2);
    }

    showTooltip() {
        this.visible = true;
    }

    removeTooltip() {
        this.visible = false;
    }
    
    setLabelCoordinates(x, y) {
        this.x = x;
        this.y = y;
    }


}
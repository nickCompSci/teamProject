export default class Zone extends Phaser.GameObjects.Zone {
    constructor(scene, width, height, x, y) {
        super(scene, x, y, width, height).setRectangleDropZone(x, y);
        scene.add.existing(this);
        this.normalZone = 0xffff00; // yellow
        this.activeZone = 0x00ffff; // lightblue / turquoise 

        this.zoneOutline = scene.add.graphics()
        this.renderNormalOutline(scene);
        
        // scene.input.on('dragenter', function(pointer, gameObject, dropZone) {
        //     console.log(this);
        //     this.renderActiveOutline();
        // });

        // scene.input.on('dragleave', function(pointer, gameObject, dropZone) {
        //     this.renderNormalOutline();
        // }); 

    }

    renderNormalOutline() {
        this.zoneOutline.clear();
        this.zoneOutline.lineStyle(2, this.normalZone);
        this.zoneOutline.strokeRect(this.x - this.input.hitArea.width / 2, this.y - this.input.hitArea.height / 2, this.input.hitArea.width, this.input.hitArea.height);
    }

    renderActiveOutline() {
        this.zoneOutline.clear();
        this.zoneOutline.lineStyle(2, this.activeZone);
        this.zoneOutline.strokeRect(this.x - this.input.hitArea.width / 2, this.y - this.input.hitArea.height / 2, this.input.hitArea.width, this.input.hitArea.height);
    }
}
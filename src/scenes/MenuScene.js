import { CST } from "../CST";
export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }
    init(data){
        console.log(data);
        console.log("I got it")
    }
    create(){

    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "logo").setDepth(1)

    //this.add.image(0,0, "background").setOrigin(0).setDepth(0);

    let startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "start").setDepth(2)

    let optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "options").setDepth(3)

    let creditsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 200, "credits").setDepth(4)

    }
}
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

        let arrowSprite = this.add.sprite(100, 100, "arrow");
        arrowSprite.setVisible(false);

        this.sound.pauseOnBlur = false;
        this.sound.play("soundtrack", {
            loop: true
        })

        /*
            Pointer Events:
                pointerover - hovering
                pointerout - not hovering
                pointerup - click and release
                pointerdown - just click

        */

        // Start Button

        startButton.setInteractive();

        startButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = startButton.x - startButton.width +135;
            arrowSprite.y = startButton.y;
        })
        startButton.on("pointerout", ()=>{
            console.log("no hover")
        })
        startButton.on("pointerup", ()=>{
            console.log("click")
        })

        // Options Button
        optionsButton.setInteractive();

        optionsButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = optionsButton.x - optionsButton.width +100;
            arrowSprite.y = optionsButton.y;
        })
        optionsButton.on("pointerout", ()=>{
            console.log("no hover")
        })
        optionsButton.on("pointerup", ()=>{
            console.log("click")
        })

        // Credits Button
        creditsButton.setInteractive();

        creditsButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = creditsButton.x - creditsButton.width +100;
            arrowSprite.y = creditsButton.y;
        })
        creditsButton.on("pointerout", ()=>{
            console.log("no hover")
        })
        creditsButton.on("pointerup", ()=>{
            console.log("click")
        })
    }
}
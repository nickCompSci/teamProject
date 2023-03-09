import { CST } from "./CST.js";

export class Network{
    constructor(username){  
        this.peer = new Peer(username);
        this._addPeerListeners();
        this.joineesReceiveMessage;
        this.hostRecieveMessage;
        this.test = null;
    }

    tempAlert(message, duration) {
        var tmpElement = document.createElement("div");
        tmpElement.setAttribute("style", "position:absolute;top:10%;left:15%;background-color:white;");
        tmpElement.innerHTML = message;
        tmpElement.style.color = "white"
        tmpElement.style.backgroundColor = "black"
        tmpElement.style.padding = "5%"
        tmpElement.style.fontSize = "25px"
        setTimeout(function () {
            tmpElement.parentNode.removeChild(tmpElement);
            window.location.replace('/game.html');
        }, duration);
        document.body.appendChild(tmpElement);
    }

    _addPeerListeners(){
        let network = this;
        this.peer.on('open', function(id){
            this._id = id;    
        });

        this.peer.on('connection', function(conn){
            this.conn = conn
            let joineesMessage = this;

            this.conn.on('data', (data)=>{
                joineesMessage.hostRecieveMessage = data;
                joineesMessage.test = data;
            });

            this.conn.on('close', function(){
                console.log("DISCONNECTION!!");
                network.tempAlert("Connection interrupted - exiting game.", 1000);
            })
        });

        this.peer.on('error', function(err){
            console.log(err);
        });
    }

    send(data){
        this.peer.conn.send(data);
    }

    connect(id){
        var conn;
        conn = this.peer.connect(id);
        this.peer.conn = conn;
        let netMessage = this;
        this.peer.conn.on('data', function(data){
            netMessage.joineesReceiveMessage = data;
        })
    }

    handleDataMapScene(opponentLevelObj, gameData, phaser) {
        this.peer.conn.off('data');
        this.peer.conn.on('data', function(data){
            var json_data = JSON.parse(data);
            if(json_data['type'] == 'levelUpdate'){
                opponentLevelObj.setText(json_data['level']);
            } else if (json_data['type'] == 'activityUpdate'){
            } if(json_data['type'] == 'finalBattleCall'){
                // start final battle scene
                phaser.scene.start(CST.SCENES.PVPSCENE, {playerObj: gameData.playerObj, networkObj: gameData.networkObj, playerUsername: gameData.playerUsername});
            }
        });
    }

    handleDataBattleScene(gameData, phaser, returnCardsToPlayer){
        this.peer.conn.off('data');
        this.peer.conn.on('data', function(data){
            var json_data = JSON.parse(data);
            if(json_data['type'] == 'levelUpdate'){
                opponentLevelObj.setText(json_data['level']);
            } else if (json_data['type'] == 'activityUpdate'){
            } if(json_data['type'] == 'finalBattleCall'){
                // start final battle scene
                returnCardsToPlayer(phaser);
                phaser.sound.stopAll();
                phaser.scene.start(CST.SCENES.PVPSCENE, {playerObj: gameData.playerObj, networkObj: gameData.networkObj, playerUsername: gameData.playerUsername});
            }
        });
    }

    handleDataFightScene(yourTurnFunction, scene, displayCard){
        this.peer.conn.off('data');
        this.peer.conn.on('data', function(data){
            var json_data = JSON.parse(data);
            if(json_data['type'] == 'cardPlayed'){
                displayCard(scene, json_data);
            } else if(json_data['type'] == 'enemyTurnOver'){
                yourTurnFunction(scene);
            } else if(json_data['type'] == 'cardPlayed'){
            }
        })
    }
}

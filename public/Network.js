export class Network{
    constructor(username){  
        this.peer = new Peer(username);
        this._addPeerListeners();
        this.joineesReceiveMessage;
        this.hostRecieveMessage;
        this.test = null;
    }

    _addPeerListeners(){
        this.peer.on('open', function(id){
            console.log("Connected with id: ", id);
            this._id = id;    
        });

        this.peer.on('connection', function(conn){
            this.conn = conn
            let joineesMessage = this;

            this.conn.on('data', (data)=>{
                console.log("this is the hosts receiver");
                joineesMessage.hostRecieveMessage = data;
                joineesMessage.test = data;
                console.log(joineesMessage.hostRecieveMessage);
                console.log("Data received: ", data);
            })
            console.log('Connected to peer with id: ', conn.peer);
        });

        this.peer.on('error', function(err){
            console.log(err);
        });
    }

    send(data){
        this.peer.conn.send(data);
        console.log("Data sent: ", data);
    }

    connect(id){
        var conn;
        conn = this.peer.connect(id);
        this.peer.conn = conn;
        let netMessage = this;
        this.peer.conn.on('data', function(data){
            console.log("this is the joineees receiving function");
            netMessage.joineesReceiveMessage = data;
            console.log("Data received: ", data);
        })
    }

    handleDataMapScene(opponentLevelObj){
        this.peer.conn.off('data');
        this.peer.conn.on('data', function(data){
            var json_data = JSON.parse(data);
            console.log(json_data);
            if(json_data['type'] == 'levelUpdate'){
                opponentLevelObj.setText(json_data['level']);
            }
        });
    }

    handleDataFightScene(opponent){
        this.peer.conn.off('data');
        this.peer.conn.on('data', function(data){
            var json_data = JSON.parse(data);
            if(json_data['type'] == 'playerMove'){
                console.log(json_data['action']);
            }
        })
    }
}

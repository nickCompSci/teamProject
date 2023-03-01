export class Network{
    constructor(username){   
        this.peer = new Peer(username);
        this._addPeerListeners();
    }

    _addPeerListeners(){
        this.peer.on('open', function(id){
            console.log("Connected with id: ", id);
            this._id = id;    
        });

        this.peer.on('connection', function(conn){
            this.conn = conn
            this.conn.on('data', function(data){
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
        this.peer.conn.on('data', function(data){
            console.log("Data received: ", data);
        })
    }
}

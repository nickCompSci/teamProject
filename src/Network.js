class Network{
    constructor(){
        this.peer = new Peer();
        this._addPeerListeners();
        this.conn;
    }

    _addPeerListeners(){
        this.peer.on('open', function(id){
            console.log("Connected with id: ", id);
            this._id = id;    
        });

        this.peer.on('connection', function(conn){
            console.log("Printing this below:");
            console.log(this);
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
        this.conn.send(data);
        console.log("Data sent: ", data);
    }

    connect(id){
        var conn;
        conn = this.peer.connect(id);
        this.conn = conn;
        this.conn.on('data', function(data){
            console.log("Data received: ", data);
        })
        console.log('Connecting to ', this.conn.peer);
        this.conn = conn;
        console.log("Connected.")
    }
}

export default Network;
/**
 * Network object represents network connection between two players,
 * allowing for connection of players, sending and receiving data.
 */
class Network{
    constructor(){
        this.peer = new Peer();
        this._addPeerListeners();
    }

    /**
     * Add event listeners for peer events, handling instantiation of peer,
     * connection by remote peer, and errors.
     */
    _addPeerListeners(){
        this.peer.on('open', function(id){
            console.log("ID: ", id);
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
        return 
    }

    /**
     * Send data to the connected peer.
     * @param {string} data The data to be sent.
     */
    send(data){
        this.peer.conn.send(data);
        console.log("Data sent: ", data);
    }

    /**
     * Connect to remote peer using PeerJS. The data connection is saved.
     * @param {*} id The peer id of the remote peer.
     */
    connect(id){
        var conn;
        conn = this.peer.connect(id);
        this.peer.conn = conn;
        this.peer.conn.on('data', function(data){
            console.log("Data received: ", data);
        })
    }
}

export default Network;
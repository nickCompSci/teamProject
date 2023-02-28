export class Network{
    constructor(username){
        // var data = {
        //     refreshToken: getCookie('refreshJwt')
        // };
        // $.ajax({
        //     type: 'POST',
        //     url: '/retrieveUsername',
        //     data,
        //     // on success call the callback function
        //     success: function (result) {
        //         console.log("*****************************************");
        //         console.log(result.username);
        //         // this.peer = new Peer();
        //         // this._addPeerListeners();
        //     },
        //     // on error return to game page 
        //     error: function (xhr) {
        //         window.alert(JSON.stringify(xhr));
        //         window.location.replace('/game.html');
        //     }
        // });   
        console.log(username);
        this.peer = new Peer();
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

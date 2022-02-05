
const express = require('express');
var cors = require('cors');
const http = require('http');
const socket = require('socket.io');

const { messagesSocket } = require('../sockets/messages');

class Server{
    constructor(){
        this.port = process.env.PORT;
        this.app = express();
        this.server = http.createServer( this.app );
        this.io = socket( this.server );

        //Middlewares
        this.middlewares();

        //Sockets Events
        this.sockets();
    }

    middlewares(){
        //Cors
        this.app.use(cors());   

        //exponer directorio publico y tener acceso al html
        this.app.use( express.static('public') );

    }

    sockets(){
        this.io.on('connection', messagesSocket);
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log('Server running on the port ' + this.port);
        })
    }
}

module.exports = Server;
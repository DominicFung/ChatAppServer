// var express = require('express');
// var app = express();
// var server = require('http').createServer(app);
// var io = require('socket.io').listen(server);
var ws = require("nodejs-websocket");

var _PORT = 3000;

var server = ws.createServer(function (conn){
    console.log("new connection")
    conn.on("text", function (str){
        console.log("Received: "+str)
        conn.sendText(str.toUpperCase()+"!")
    })
    conn.on("close", function (code, reason){
        console.log("closed: "+code)
    })
}).listen(_PORT)

// server.listen(_PORT);
console.log("server is running on port: " + _PORT);

// io.sockets.on('connection', function(socket){
//     console.log("Connected!");
//     socket.on('message', function(data){
//         console.log("message: "+data);
//         io.sockets.emit('message', data);
//     });
// });

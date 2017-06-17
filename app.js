var express = require('express');
var app = express();
//var server = require('http').createServer(app);

var ws = require("nodejs-websocket");
var _PORT = 3000;

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


app.post('/login', jsonParser, function(){
    console.log(req.body);
    //respond with only information??
});

var server = ws.createServer(function (conn){
    console.log("new connection");
    conn.on("text", function (str){
        console.log("Received: "+str);
        conn.sendText(str.toUpperCase()+"!");
    });
    conn.on("close", function (code, reason){
        console.log("closed: "+code);
    });
}).listen(_PORT);

console.log("websocket is running on port: " + _PORT);

app.listen(_PORT);

console.log("server is running on port: " + _PORT);


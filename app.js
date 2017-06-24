var express = require('express');
var pg = require('pg').Pool;

var pool = new pg({
    user: 'Dominic',
    password: 'CV1234',
    host: 'localhost',
    database: 'ChatDB',
    max: 10,
    idleTimeoutMillis: 1000
});

pool.on('error', function(e, client){
    console.log(e);
});

var query = pool.query('SELECT * FROM Student');
// query.on("row", function (row, result){
//     result.addRow(row);
// });
// query.on("end", function(result){
//     console.log(JSON.stringify(result.rows,null, "   "));
// });

var app = express();
var _exPORT = 3001;
//var server = require('http').createServer(app);

var ws = require("nodejs-websocket");
var _wsPORT = 3000;

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
}).listen(_wsPORT);

console.log("websocket is running on port: " + _wsPORT);

app.listen(_exPORT);

console.log("http interface is running on port: " + (_exPORT));


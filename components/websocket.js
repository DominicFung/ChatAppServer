var ws = require("nodejs-websocket");
var _wsPORT = 3000;

var server = ws
  .createServer(function(conn) {
    console.log("new connection");
    
    conn.on("text", function(str) {
      console.log("Received: " + str);
      conn.sendText(str+JSON.stringify({key: 1}));
    });

    conn.on("close", function(code, reason) {
      console.log("closed: " + code);
    });

    conn.on("error", function(e){
        console.log(e);
    });
  })
  .listen(_wsPORT);

console.log("websocket is running on port: " + _wsPORT);
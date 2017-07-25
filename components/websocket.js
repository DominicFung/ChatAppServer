var ws = require("nodejs-websocket");
var _wsPORT = 3000;

var mongodb = require("./mongo/mg_connection");


var server = ws
    .createServer(function(conn) {
      console.log("new connection");

      conn.on("text", function(str) {
        console.log("Received: " + str);
        var inboundObj = JSON.parse(str);
        inboundObj._id = mongodb.newID();
        mongodb.conn().collection("GlobalChat").insert(inboundObj);

        broadcast(JSON.stringify(inboundObj));
      });

      conn.on("close", function(code, reason) {
        console.log("closed: " + code);
      });

      conn.on("error", function(e) {
        console.log(e);
      });
    })
    .listen(_wsPORT);

function broadcast(msg) {
  server.connections.forEach(function (conn) {
      conn.sendText(msg)
  });
};

  console.log("websocket is running on port: " + _wsPORT);
var express = require("express");
var app = express();
var _exPORT = 3001;

const Student = require("./components/postgres/pg_tables").Student();
const School = require("./components/postgres/pg_tables").School();
require("./components/websocket.js");

var mongodb = require("./components/mongo/mg_connection");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

app.post("/login", jsonParser, function(req, res, next) {
  console.log(JSON.stringify(req.body));
  Student.find({
      where: {
          student_email: req.body.email
      }
  }).then(validateStudent => {
    if(validateStudent){
        console.log("object found, password: " + req.body.password+"  "+validateStudent.password);
        if(validateStudent.password === req.body.password){
            console.log("valid user");
            //console.log(mongodb.conn().collection("GlobalChat").find());
            res.json({ 
                loginStatus: 1,
                username: validateStudent.first_name,
                //chatHist: [ mongodb.conn().collection("GlobalChat").find() ]
            });
        } else {
            console.log("invalid user");
            res.json({ loginStatus : 0 });
        }
    } else {
       console.warn("unable to obtain an object"); 
    }
  });
});

app.listen(_exPORT);

console.log("http interface is running on port: " + _exPORT);

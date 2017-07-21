var express = require("express");
var Sequelize = require('sequelize');
// var pg = require('pg');

// var config = {
//     user: 'postgres',
//     database: 'ChatDB',
//     password: 'CV1234',
//     host: 'localhost',
//     port: '5432',
//     max: 10,
//     idleTimeoutMillis: 30000
// };

// var client = new pg.Client(config);

// client.on('error', function(err,client){
//     console.error('idel client error',err.message, err.stack);
// });

// client.connect();

// client.query("INSERT INTO School (school_name) values($1)", ['Waterloo']);
// //client.query("UPDATE student set first_name = 'Dom2' WHERE last_name = 'Fung'");
// //var query = client.query("SELECT * FROM Student");

// //console.log(query);
// client.end();

const sequelize = new Sequelize("SchoolChatDB", "postgres", "CV1234", {
  host: "localhost",
  dialect: "postgres",
  pool: { max: 5, min: 0, idle: 10000 }
});

//http://docs.sequelizejs.com/manual/tutorial/instances.html
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

const School = sequelize.define('School', {
    school_name: {
        type: Sequelize.STRING
    }
},
{
    timestamps: false,
//    paranoid: true,
    freezeTableName: true,
//    tableName: 'School'
});

const Student = sequelize.define('Student', {
    student_email: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    school_id_fk: {
        type: Sequelize.INTEGER,
        references: {
            model: School,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
},
{
    timestamps: false,
    freezeTableName: true
});

Student.sync({force: true}).then(() => {
    return Student.create({
        student_email: 'fung_dominic@hotmail.com',
        first_name: 'Dominic',
        last_name: 'Fung',
        password: '123a',
        school_id_fk: 5
    });
});

// HARD REFRESH
// School.sync({force: true}).then(() => {
//     return School.create({
//         school_name: 'University of Toronto Mississauga'
//     });
// });

// School.create({
//     school_name: 'University of Waterloo'
// }).then( waterloo => {
//     console.log(waterloo.get({
//         plain: true
//     }));
// });

// School.create({
//     school_name: 'University of Toronto'
// }).then( toronto => {
//     console.log(toronto.get({
//         plain: true
//     }));
// });

var app = express();
var _exPORT = 3001;

var ws = require("nodejs-websocket");
var _wsPORT = 3000;

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
            res.json({ 
                loginStatus: 1,
                username: validateStudent.first_name
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

app.listen(_exPORT);

console.log("http interface is running on port: " + _exPORT);

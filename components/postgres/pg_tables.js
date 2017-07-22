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


module.exports = {
    School: function(){ return School },
    Student: function(){ return Student }
};

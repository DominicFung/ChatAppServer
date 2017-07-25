// mongod --dbpath d:\mongodata\db --port 27017
// runs on port 27017

// var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/myproject';

// MongoClient.connect(url, function(err, db) {

//     if(err){
//         console.log("there was an error: "+err);
//     } else {
//         console.log("connected to mongodb");
//     }

//     insertDocuments(db, function() {
//         db.close();
//     });

// });

// module.exports = {
//     insertChat: function(db, object, group, callback) {
//         var collection = db.collection(group);
//         collection.insertMany([object], function(err, result) {
//             console.log("insert: "+ JSON.stringify(object));
//             callback(result);
//         })
//     }
// }

var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
mongoose.connect(url);

var conn = mongoose.connection;

module.exports = {
    conn: function(){ return conn },
    newID: function() { return new ObjectID() }
};





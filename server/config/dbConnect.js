var MongoClient = require('mongodb').MongoClient;
// var logger = require('./../services/LoggingService.js');
let connection=null;
module.exports.dbConnect = async function () {
    try{
        var url= "mongodb://localhost:27017";
        var client=await MongoClient.connect(url);
        connection=client.db("Chat");
    }
    catch(e){
        // logger.error(e.message);
        console.log(e.message)
        //txt.
    }
  }

  module.exports.get=()=>{
    if(!connection) {
        // logger.error('Call connect first!');
        console.log('Call connect first!')
    }

    return connection;
  }
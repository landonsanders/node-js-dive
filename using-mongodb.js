var Mongo = require('mongodb').MongoClient;

Mongo.connect('mongodb://0.0.0.0:27017/test', function (error, database) {
    if (error) {
        console.log('There was an error. Sorry.');
    }
    
    database.collection('my').insert({name: 'Roe'}, function (error, result) {
        console.log('Hello, Insert!');
        console.log(error);
    });
    
    var collection = database.collection('my').find().toArray(function (error, result) {
        console.log(result);
    });
    
    database.close();
});


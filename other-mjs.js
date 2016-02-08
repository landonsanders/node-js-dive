var mongo = require('mongojs');
var db = mongo('mongodb://0.0.0.0:27017/test', ['my']);

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var data;

app.use(bodyParser.json());

db['my'].find({}, function (error, result) {
    data = result;
});

app.use('/', function (request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    response.json(data);
});

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');
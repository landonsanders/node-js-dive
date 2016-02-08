var mongo = require('mongojs');
var db = mongo('mongodb://0.0.0.0:27017/test', ['my']);
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var express= require('express');
var app = express();
var data;

app.use(express.methodOverride());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

db['my'].insert({user: 'Aoe'}, function (error, result) {
    console.log(result);
});

db['my'].findOne({user: 'Zhoe'}, function (error, result) {
    console.log(result);
});

db['my'].find({}, function (error, result) {
    data = result;
});

app.get('/', function (request, response) {
    console.log(request.headers);
    response.header('Access-Control-Allow-Origin', '*');
    response.json(data);
});

app.get('/user/:id', function (request, response) {
    console.log(request.headers);
    db['my'].find({user: request.params.id}, function (error, result) {
        response.header('Access-Control-Allow-Origin', '*'); 
        response.json(result);
    });
});

app.post('/', function (request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    response.json({msg: request.body.msg});
});

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');



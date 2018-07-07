var url = require('url');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var db = require('./db');


var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'index.html'));
});
app.get('/getdefinition', function (req, res) {
    db.getDefinition().then(function(d){
        res.send(d);
    });
});
app.listen(3000);
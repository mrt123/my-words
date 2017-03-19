var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var proxy = require('express-http-proxy');
var mysql = require('promise-mysql');
var parseWord = require('./backend/src/db-data-parser-1').parseWord;
var dbQuery = require('./backend/src/db-connection').query;

app.use(bodyParser.json());

app.use('/', function (req, res, next) {
  console.log(req.method + ' : ' + req.originalUrl);
  next();
});

app.get('/api/words/:id', function (req, res) {

  dbQuery('select * from entries where word="' + req.params.id + '"').then(function (rows) {
    if (rows.length > 0) {
      res.send(parseWord(rows));
    }
    else {
      res.status(404).send('Word Not found');
    }
  });
});

app.post('/api/favorites', function (req, res) {
  console.log('req.body.favorite =  ' + req.body.favorite);

  setTimeout(function () {
    res.send({
      favorite: req.body.favorite
    });
  }, 500);
});

var httpServer = require('http').createServer(app);
httpServer.listen(1337, function () {
  console.log('server running on port 1337.');
});
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var proxy = require('express-http-proxy');
var mysql = require('promise-mysql');
var parseWord = require('./backend/src/dbAdapter1').parseWord;

app.use(bodyParser.json());

app.use('/', function (req, res, next) {
  console.log(req.method + ' : ' + req.originalUrl);
  next();
});

app.get('/api/words/:id', function (req, res) {

  var connection;

  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'entries'
  }).then(function (conn) {
    connection = conn;
    return connection.query('select * from entries where word="' + req.params.id + '"');
  }).then(function (rows) {

    if (rows.length === 0) {
      res.status(404).send('Word Not found');
    }
    else {
      res.send(parseWord(rows));
    }
  });
});


var oxfordProxy = require('express-http-proxy')('https://od-api.oxforddictionaries.com:443/api', {
  forwardPath: function (req, res) {
    return req.baseUrl.replace('oxfordApi', 'api');
  }
});
app.use("/oxfordApi/*", oxfordProxy);  // TODO: remove

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
  console.log('parse-server running on port 1337.');
});
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var parseWord = require('./src/db-data-parser-1').parseWord;
var responseObj = require('./src/responseObject');
var dbQuery = require('./src/db-connection').query;
var config = require('./src/config').get();

app.use(bodyParser.json());

app.use('/', function (req, res, next) {
  console.log('--> [' + req.method + '] : ' + req.originalUrl);
  next();
});

app.get('/api/words/:id', function (req, res) {

  dbQuery('select * from entries where wordId="' + req.params.id + '"')
    .then((rows) => {
      var parsedWord = parseWord(rows);
      res.send(responseObj.wrapParsedData(rows, parsedWord));
    })
    .catch((error)=> {
      res.status(500).send(responseObj.wrapError('Error: ' + error.code));
    });
});

app.get('/api/favorite/words', function (req, res) {

  dbQuery('select * from favoriteWords where userId="' + '19831119' + '"').then(function (rows) {
    res.send(rows.map((r)=> r.wordId));
  });
});

app.post('/api/favorite/words', function (req, res) {
  var queryString;

  if (req.body.isFavorite) {
    queryString = 'insert INTO favoriteWords values (19831119,"' + req.body.wordId + '")';
  }
  else if (!req.body.isFavorite) {
    queryString = 'delete from favoriteWords where userId=19831119 and wordId="' + req.body.wordId + '"';
  }

  dbQuery(queryString).then(function (dbResp) {

    if (dbResp.affectedRows > 0) {
      res.send({
        wordId: req.body.wordId,
        isFavorite: req.body.isFavorite
      });
    }
    else {
      res.status(500).send('DB QUERY ERROR');
    }
  });
});

app.get('/api/favorite/words/:id', function (req, res) {

  var isFavoriteQueryString = 'SELECT * FROM favoriteWords where wordId="' + req.params.id + '"';

  dbQuery(isFavoriteQueryString).then(function (rows) {
    res.send({
      wordId: req.params.id,
      isFavorite: rows.length > 0
    });
  });
});

var httpServer = require('http').createServer(app);
httpServer.listen(config.api.port, function () {
  console.log('api server running: ' + JSON.stringify(config, null, 2));
});
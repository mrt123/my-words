var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var parseWord = require('./backend/src/db-data-parser-1').parseWord;
var dbQuery = require('./backend/src/db-connection').query;

app.use(bodyParser.json());

app.use('/', function (req, res, next) {
  console.log(req.method + ' : ' + req.originalUrl);
  next();
});

app.get('/api/words/:id', function (req, res) {

  dbQuery('select * from entries where wordId="' + req.params.id + '"').then(function (rows) {
    if (rows.length > 0) {
      res.send(parseWord(rows));
    }
    else {
      res.status(404).send('Word Not found');
    }
  });
});

app.get('/api/favorites/words/:id', function (req, res) {

  var isFavoriteQueryString = 'SELECT * FROM favoriteWords where wordId="' + req.params.id + '"';

  dbQuery(isFavoriteQueryString).then(function (rows) {
    res.send({
      favorite: rows.length > 0
    });
  });
});

app.post('/api/favorite/words', function (req, res) {
  var queryString;

  if(req.body.favorite) {
    queryString = 'insert INTO favoriteWords values (19831119,"' + req.body.id + '")';
  }
  else if(!req.body.favorite) {
    queryString = 'delete from favoriteWords where userId=19831119 and word="'+ req.body.id + '"';
  }

  console.log(queryString);
  dbQuery(queryString).then(function (dbResp) {

    if (dbResp.affectedRows > 0) {
      res.send({
        favorite: req.body.favorite
      });
    }
    else {
      res.status(500).send('DB QUERY ERROR');
    }
  });
});

var httpServer = require('http').createServer(app);
httpServer.listen(1337, function () {
  console.log('server running on port 1337.');
});
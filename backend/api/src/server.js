let express = require('express');
let bodyParser = require("body-parser");
let app = express();
let cors = require('cors');
let parseWord = require('./db-data-parser-1').parseWord;
let responseObj = require('./responseObject');
let dbQuery = require('./db-connection').query;
const { config, sanitize, report } = require('./config');
let auth = require('./auth');

auth.configure(app);
app.use(cors({
  origin: config['api-cors-origin'],
  credentials: true
}));
app.use(bodyParser.json());

app.use('/', function (req, res, next) {
  console.log('--> [' + req.method + '] : ' + req.originalUrl);
  next();
});

app.use('/api', auth.authorise);

app.get('/api/words/:id', function (req, res) {

  dbQuery(`select * from entries where wordId = "${req.params.id}"`)
    .then((rows) => {
      var parsedWord = parseWord(rows);
      res.send(responseObj.wrapParsedWordData(rows, parsedWord));
    })
    .catch((e)=> {
      res.status(500).send();
    });
});

app.get('/api/favorite/words', function (req, res) {
  let userId = req.user.id;

  dbQuery(`select * from favoriteWords where userId = "${userId}"`).then(function (rows) {
    res.send(rows.map((r)=> r.wordId));
  });
});

app.post('/api/favorite/words', function (req, res) {
  let userId = req.user.id;

  var queryString;

  if (req.body.isFavorite) {
    queryString = `insert into favoriteWords values ( ${userId}, "${req.body.wordId}" )`;
  }
  else if (!req.body.isFavorite) {
    queryString = `delete from favoriteWords where userId = ${userId} and wordId = "${req.body.wordId}" `;
  }

  dbQuery(queryString).then(function (dbResp) {

    if (dbResp.affectedRows > 0) {
      res.send({
        wordId: req.body.wordId,
        isFavorite: req.body.isFavorite
      });
    }
    else {
      res.status(500).send();
    }
  });
});

app.get('/api/favorite/words/:id', function (req, res) {
  let userId = req.user.id;
  let isFavoriteQueryString = `select * from favoriteWords where userId = ${userId} and wordId = "${req.params.id}"`;

  dbQuery(isFavoriteQueryString).then(function (rows) {
    res.send({
      wordId: req.params.id,
      isFavorite: rows.length > 0
    });
  }).catch((e)=> {
    res.status(500).send();
  });
});

app.get('/api/users/me',
  function (req, res) {

    if(req.user) {
      res.json(req.user);
    }
    else {
      res.status(401).send(responseObj.wrapError('Error: You are not logged in'));
    }
  }
);

var httpServer = require('http').createServer(app);
httpServer.listen(config['api-port'], function () {
  report('api server running', config);
});
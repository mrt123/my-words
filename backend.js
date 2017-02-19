var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var proxy = require('express-http-proxy');

app.use(bodyParser.json());

app.use('/', function (req, res, next) {
  console.log(req.method + ' : ' + req.originalUrl);
  next();
});

var oxfordProxy = require('express-http-proxy')('https://od-api.oxforddictionaries.com:443/api', {
  forwardPath: function (req, res) {
    return req.baseUrl.replace('oxfordApi', 'api');
  }
});

app.use("/oxfordApi/*", oxfordProxy);

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
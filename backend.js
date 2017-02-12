var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var app = express();

var parseServer = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev',
  appId: 'MY_WORDS',
  masterKey: 'MASTER_KEY', // Keep this key secret!
  serverURL: 'http://localhost:1337/parse'
});

app.use('/api/parse', parseServer);

app.use('/api', function(req, res) {
  console.log('api')
});

var oxfordProxy = require('express-http-proxy')('https://od-api.oxforddictionaries.com:443', {
  forwardPath: function (req, res) {
    return require('url').parse(req.baseUrl).path;
  }
});
app.use("/api/*", oxfordProxy);

var httpServer = require('http').createServer(app);
httpServer.listen(1337, function () {
  console.log('parse-server running on port 1337.');
});
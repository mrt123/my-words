var argv = require('minimist')(process.argv.slice(2));

exports.get = function() {
  return {
    app: {
      protocol: argv['app-protocol'] || 'http://',
      host: argv['app-host'] || 'localhost',
      port: argv['app-port'] || 3000
    },
    api : {
      port: 1337
    },
    db : {
      host: argv['db-host'] || 'localhost',
      user: 'root',
      password: '123',
      name: 'dict'
    },
    auth: {
      words: {
        secret: argv['words-secret']
      },
      facebook: {
        secret: argv['facebook-secret']
      }
    }
  }
};
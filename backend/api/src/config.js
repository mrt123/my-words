var argv = require('minimist')(process.argv.slice(2));

exports.get = function () {

  let developmentConfig = {
    app: {
      protocol: 'http://',
      host: 'localhost',
      port: 3000
    },
    api: {
      port: 1337,
      cors: {
        origin: 'http://localhost:3000'
      }
    },
    db: {
      host: 'localhost',
      user: 'root',
      password: '123',
      name: 'dict'
    },
    auth: {
      words: {
        secret: 'shhh'
      },
      facebook: {
        secret: argv['facebook-secret']
      }
    }
  };

  let productionConfig = {
    app: {
      protocol: argv['app-protocol'],
      host: argv['app-host'],
      port: argv['app-port']
    },
    api: {
      port: 1337,
      cors: {
        origin: 'http://words.dremora.com'
      }
    },
    db: {
      host: argv['db-host'],
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
  };

  return argv['dev'] ? developmentConfig : productionConfig;
};
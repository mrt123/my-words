var argv = require('minimist')(process.argv.slice(2));

exports.get = function () {

  const developmentConfig = {
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
      host: argv['db-host'] || 'localhost',   // usually provided via docker-file
      user: 'root',
      password: '123',
      name: 'dict'
    },
    auth: {
      words: {
        secret: 'usedTOGenerateAuthToken'
      },
      facebook: {
        appId: '128559457697935',
        secret: argv['facebook-secret'] || 'FORGOT TO PROVIDE FB SECRET ?'
      }
    }
  };

  const productionConfig = {
    containerVersion: 'xx',
    app: {
      protocol: 'http://',
      host: 'words.dremora.com',
      port: 80
    },
    api: {
      port: 1337,
      cors: {
        origin: 'http://words.dremora.com'
      }
    },
    db: {
      host: 'words-db-box',
      user: 'root',
      password: '123',
      name: 'dict'
    },
    auth: {
      words: {
        secret: process.env.WORDS_SECRET || 'FORGOT TO PROVIDE FB SECRET ?'
      },
      facebook: {
        appId: '1427136364049190',
        secret: process.env.FB_SECRET || 'FORGOT TO PROVIDE FB SECRET ?'
      }
    }
  };
  return process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;
};
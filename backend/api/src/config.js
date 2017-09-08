const argv = require('minimist')(process.argv.slice(2));
const print = require('pretty-print');
const colors = require('colors/safe');

module.exports = {
  config: _get(),
  sanitize: _sanitize,
  report: _report
};

function _get() {

  const developmentConfig = {
    ui: {
      host: 'http://localhost:3000'
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
        secret: process.env.WORDS_FB_SECRET || 'FORGOT TO PROVIDE FB SECRET ?'
      }
    }
  };

  const productionConfig = {
    ui: {
      host: 'http://words.dremora.com:80'
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
        secret: process.env.WORDS_SECRET || 'FORGOT TO PROVIDE WORDS SECRET ?'
      },
      facebook: {
        appId: '1427136364049190',
        secret: process.env.WORDS_FB_SECRET || 'FORGOT TO PROVIDE FB SECRET ?'
      }
    }
  };
  return process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;
}

function _sanitize(config) {
  let configCopy = cloneObject(config);

  delete configCopy.db.user;
  delete configCopy.db.password;
  delete configCopy.db.name;

  if (process.env.WORDS_SECRET) configCopy.auth.words.secret = '***';
  if (process.env.WORDS_FB_SECRET) configCopy.auth.facebook.secret = '***';

  return configCopy;
}

function _report(reportTitle, config) {
  console.log(`${colors.yellow(reportTitle)} :`);
  const sanitizedConfig = _sanitize(config);
  return print(sanitizedConfig);
}

function cloneObject(a) {
  return JSON.parse(JSON.stringify(a));
}
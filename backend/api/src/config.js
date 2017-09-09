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
    'ui-host': 'http://localhost:3000',
    'api-port': 1337,
    'api-cors-origin': 'http://localhost:3000',
    'db-host': argv['db-host'] || 'localhost',
    'db-name': 'dict',
    'db-user': 'root',
    'db-password': '123',
    'auth-words-secret': 'usedTOGenerateAuthToken',
    'auth-facebook-appId': '128559457697935',
    'auth-facebook-secret': process.env.WORDS_FB_SECRET
  };

  const productionConfig = {
    'ui-host': 'http://words.dremora.com:80',
    'api-port': 1337,
    'api-cors-origin': 'http://words.dremora.com',
    'db-host': 'words-db-box',
    'db-name': 'dict',
    'db-user': 'root',
    'db-password': '123',
    'auth-words-secret': process.env.WORDS_SECRET,
    'auth-facebook-appId': '1427136364049190',
    'auth-facebook-secret': process.env.WORDS_FB_SECRET
  };
  const config = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;
  _validateConfig(config);
  return config;
}

function _sanitize(config) {
  let configCopy = cloneObject(config);
  delete configCopy['db-user'];
  delete configCopy['db-password'];
  delete configCopy['auth-words-secret'];
  delete configCopy['auth-facebook-secret'];
  return configCopy;
}

function _report(reportTitle, config) {
  console.log(`${colors.yellow(reportTitle)} :`);
  const sanitizedConfig = _sanitize(config);
  return print(sanitizedConfig);
}

function _validateConfig(config) {
  Object.entries(config).forEach(([key, value]) => {
    _checkValueForLabel(key, value);
  });
}

function _checkValueForLabel(label, val) {
  if (!val) {
    throw new Error(`API APP CONFIG:  ${label} = ${val}`);
  }
}

function cloneObject(a) {
  return JSON.parse(JSON.stringify(a));
}
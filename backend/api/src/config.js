var argv = require('minimist')(process.argv.slice(2));

exports.get = function() {
  return {
    api : {
      port: 1337
    },
    db : {
      host: argv['db-host'] || 'localhost',
      user: 'root',
      password: '123',
      name: 'dict'
    }
  }
};
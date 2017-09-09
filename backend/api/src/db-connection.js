const mysql = require('promise-mysql');
const { config } = require('./config');
const colors = require('colors/safe');

exports.query = query;

let pool = createConnectionPool();

function query(queryString) {
  console.log('      ', queryString);
  return pool.query(queryString)
    .catch(function (e) {
      let queryHint = queryString.split(' ').slice(0, 4).join(' ');
      let errorMessage = 'query[' + queryHint + '...] failed : ' + e.message;
      console.log(colors.red('       ' + errorMessage));
      throw new Error(errorMessage);
    });
}

function createConnectionPool() {
  return mysql.createPool({
    host: config['db-host'],
    user: config['db-user'],
    password: config['db-password'],
    database: config['db-name'],
    connectionLimit: 10
  });
}

var mysql = require('promise-mysql');
var config = require('./config').get();

exports.query = query;

let pool = createConnectionPool();

function query(queryString) {
  return pool.query(queryString).then(function (rows) {
    console.log('----> ', queryString);
    return rows;
  });
}

function createConnectionPool() {
  return mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
    connectionLimit: 10
  });
}

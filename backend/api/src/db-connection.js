var mysql = require('promise-mysql');
var config = require('./config').get();

exports.query = query;


function query(queryString) {
  return createConnection().then(function (conn) {
    console.log('----> ', queryString);
    return conn.query(queryString).delay(750);
  });
}

function createConnection() {
  return mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name
  });
}

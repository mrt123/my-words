var mysql = require('promise-mysql');

exports.query = query;


function query(queryString) {
  return createConnection().then(function (conn) {
    return conn.query(queryString);
  });
}

function createConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'dict'
  });
}

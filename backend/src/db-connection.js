var mysql = require('promise-mysql');

exports.query = query;


function query(queryString) {
  return createConnection().then(function (conn) {
    console.log('----> ', queryString);
    return conn.query(queryString).delay(500);
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

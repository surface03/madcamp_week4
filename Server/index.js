var mysql = require('mysql');
var connection = mysql.createConnection({
  host: '192.249.30.183', // This should be 'localhost', not 'local'
  user: 'test',
  password: 'test',
  database: 'test'
});

connection.connect(function(error) {
  if (error) {
    console.error('Connection error: ', error);
    return;
  }
  console.log('Connected to the database.');
});

connection.query('SELECT * from USER', function (error, results, fields) {
  if (error) {
    console.error('Query error: ', error);
    return;
  }
  console.log('Users: ', results);
});

connection.end();


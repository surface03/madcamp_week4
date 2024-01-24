const mysql = require('mysql2');

// const db = mysql.createConnection({
//     host: '172.10.7.52',
//     user: 'test2',
//     password: 'password',
//     database: 'login',
//     port: 80
// });

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'login',
  port: 3306
});

db.connect((err) => {
    if (err) {
      console.log('MySQL 연결 오류:', err);
      throw err;
    }
    console.log('MySQL에 연결되었습니다.');
  });

  module.exports = db.promise();

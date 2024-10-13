var mysql = require('mysql2')

const getDBConnection = () => {

  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'crowdfunding_db',
  });

}

module.exports = getDBConnection

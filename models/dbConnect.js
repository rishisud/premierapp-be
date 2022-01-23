var mysql      = require('mysql');
/*
var connection = mysql.createConnection({
  host     : "localhost",
  port	   : "3306",
  user     : "root",
  password : "rishabh14",
  database : "lmsdb"
});
*/

var connection = mysql.createConnection({
  host     : 'premierapp-db.cvqpsge3a5to.ap-south-1.rds.amazonaws.com',
  user     : 'premierapp',
  password : 'Pr3mi3raPP',
  database : 'premierapp'
});


//alter user 'USER'@'localhost' identified with mysql_native_password by 'PASSWORD'

connection.connect();
module.exports = connection;
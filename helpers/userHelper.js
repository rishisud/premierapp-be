CONFIG = require("../config/config.js");
var connection = require("../models/dbConnect.js");
const uuidv1 = require("uuid/v1");

class UserHelper {

  getUserId(userId) {
    return new Promise((resolve, reject) => {
      var inSql = `SELECT UserId from engineer_details where UserId = '${userId}'`;
      connection.query(inSql, function(err, rows, fields) {
        resolve(rows);
      });
    });
  }
}
module.exports = UserHelper;

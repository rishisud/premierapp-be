// Model for User table
var mysql = require('mysql');
const bcrypt = require("bcrypt");
const bcrypt_p = require("bcrypt-promise");
const jwt = require("jsonwebtoken");
const CONFIG = require('../config/config.js');
const uuidv1 = require('uuid/v1');
const UsersModel = require('../Seqmodels/user');
var connection = require('./dbConnect.js');
class User {

  constructor() {}

  /* Method to save User */
  saveUser(userDet) {
    console.log('Inside User', userDet);
    return new Promise((resolve) => {
      var userDetObj = {};
      userDetObj.id =  uuidv1();
      userDetObj.firstName = (userDet.name) ? userDet.name : '';
      userDetObj.Password = (userDet.password) ? userDet.password : '';
      userDetObj.Role = (userDet.role) ? userDet.role : '';
      let response = {};
      console.log(userDetObj);
      (async () => {
        console.log(userDetObj);
        let err;
        let salt, hash;

        bcrypt.genSalt(10).then((res) => {

          bcrypt.hash(userDetObj.Password, res).then(function(hash) {

            console.log(hash);
            userDetObj.Password = hash;

           var inSql = `INSERT INTO user (UserId,Username,Password,Role) values ('${userDetObj.id}','${userDetObj.firstName}','${userDetObj.Password}','${userDetObj.Role}')`;
            console.log(inSql);

               connection.query(inSql, function(err, rows, fields) {
                if (err) {
                  response.error = err;
                } else {
                  response.response = userDetObj.id;
                }
                  resolve(response);
               });

          })
        });

         

      })();
     
      

    });
  }


  
  /* Method to process the login */
/*  login(loginDet) {
    return new Promise((resolve, reject) => {
      const username = loginDet.username;
      const loginpass = loginDet.password;
      var $this = this;
      let response = {};
      connection.query(`SELECT * from user where username = '${username}'`, function(err, rows, fields) {
        if (err) {
          response.error = 'Invalid Username';
          resolve(response);
        }

        if (rows.length > 0) {
          let password = rows[0].Password;
          password = password.toString();
          let UserID = rows[0].UserID;

          $this.comparePassword(password, loginpass).then(function(res) {
            if (res === true) {
              response.success = true;
              $this.getJwtToken(UserID).then(function(token) {
                response.token = token;
                resolve(response);
              })
            } else {
              response.error = 'Wrong Password';
              resolve(response);
            }
          });
        } else {
          response.error = 'Invalid Username';
          resolve(response);
        }
      });
    });
  }*/

  login(loginDet) {
    return new Promise((resolve, reject) => {
		console.log(loginDet);
      const username = loginDet.username;
      const loginpass = loginDet.password;
      var $this = this;
      UsersModel.findOne({where:{Username:username},raw:true}).then((response)=>{
		console.log(response);
        if (response) {
          let password = response.Password;
          password = password.toString();
          let UserID = response.UserId;
		      let role = response.Role;
		      console.log(username, role);
		 
			$this.comparePassword(password, loginpass).then(function(res) {
            if (res === true) {
              response.success = true;
              $this.getJwtToken(UserID).then(function(token) {
                response.token = token;
                resolve(response);
              })
            } else {
              response.error = 'Wrong Password';
              resolve(response);
            }
          });
		  
        } else {
          response.error = 'Invalid Username';
          resolve(response);
        }
      }).catch((e)=>{
        let resp = {};
        resp.error = 'Invalid Username';
        console.log("error at login",e);
        resolve(resp);
      })
	  
    });
  }
  changePwd(req){
    return new Promise((resolve,reject)=>{
      const UserId = JSON.parse(req.UserId);
      
      bcrypt.genSalt(10).then((res) => {

        bcrypt.hash(req.Password, res).then(async function(hash) {
          
          if(req.user === 'admin'){
            const updatePassAdmin = await UsersModel.update({Password:hash},{where:{Role:req.user}})
            resolve(updatePassAdmin)
          }else{
            const updatePass = await UsersModel.update({Password:hash},{where:{UserId:UserId.user_details[0].UserId}})
            resolve(updatePass)
          }
        })
      })
    })
  }
  
  /* Method to get user details */
  getUserDetails(UserID) {
    let response = {};
    return new Promise((resolve, reject) => {
      var $this = this;
      let response = {};
      connection.query(`SELECT * from user where UserID = '${UserID}'`, function(err, rows, fields) {
        if (err) {
          response.error = 'Invalid Username';
          resolve(response);
        } else {
          resolve(rows);
        }
      });
    });
  }

   /* Method to get jwt token */
  getJwtToken(UserID) {
    return new Promise((resolve, reject) => {
      let expiration_time = parseInt(CONFIG.jwt_expiration);
      resolve(
        "Bearer " +
        jwt.sign({ user_id: UserID }, CONFIG.jwt_encryption, {
          expiresIn: expiration_time
        })
      );
    });
  }
  
  /* Method to compare password */
  async comparePassword(password, loginpass) {
    console.log(password, 'X');
    console.log(loginpass, 'Y');
    let err, status;
    try {
      status = await bcrypt_p.compare(loginpass, password);
    } catch (e) {
      status = false;
    }
    return status;
  }
  
  getUserId(enggId) {
	console.log('Inside User');
    return new Promise((resolve, reject) => {
	  let response = {};
      var inSql = `SELECT UserId FROM engineer_details where id = '${enggId}'`;
      connection.query(inSql, function(err, rows, fields) {
		console.log(inSql);
		console.log(rows);
		response.response = rows;
		console.log(response.response);
        resolve(response);
      });
    });
  }
  
  

}

module.exports = User;

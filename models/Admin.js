// Model for User table
var mysql = require('mysql');
CONFIG = require('../config/config.js');
var connection = require('./dbConnect.js');
const uuidv1 = require('uuid/v1');
const UserModel = require("./User.js");
let userObj = new UserModel();
const _ = require('underscore');


class AdminModel {

  constructor() {}


   saveEngineer(engineerDet) {
	console.log(engineerDet)
    return new Promise((resolve) => {
	  //console.log(engineerDet);
      let userDet = {};
	  let username = engineerDet.name;
      userDet.name = (engineerDet.email) ? engineerDet.email : '';
      userDet.role = 'engineer';
      let pwd = username.trim();
      pwd = pwd.toLowerCase();
      userDet.password = pwd;
      userObj.saveUser(userDet).then((res) => {
        //console.log(res);
		resolve(res.response);
        engineerDet.userId = res.response;
		console.log('After user insert', engineerDet);
        this.insertEngineer(engineerDet).then((response)=> {
          resolve(response);
        })
      })
    })
  }
  
  insertEngineer(engineerDet) {
	/*  const replace = "'";
	  const replaceRegExp = new RegExp(replace, 'g');
	  const replaceWith = "\\'";
	  const address1 = engineerDet.address1.replace(replaceRegExp, replaceWith);
	  const address2 = engineerDet.address2.replace(replaceRegExp, replaceWith);*/
	return new Promise((resolve) => {
      var engineerDetObj = {};
      engineerDetObj.id =  uuidv1();
      engineerDetObj.firstName = (engineerDet.name) ? engineerDet.name : '';
      engineerDetObj.email = (engineerDet.email) ? engineerDet.email: '';
      engineerDetObj.phone = (engineerDet.phone) ? engineerDet.phone: '';
	  engineerDetObj.UserId = (engineerDet.userId) ? engineerDet.userId: '';
	  
	  let insValues = '';
      insValues +=  `'${engineerDetObj.id}',`;
      insValues +=  `'${engineerDetObj.firstName}',`;
	  insValues +=  `'${engineerDetObj.phone}',`;
	  insValues +=  `'${engineerDetObj.email}',`;
	  insValues +=  `'${engineerDetObj.UserId}'`;
	  
	   var inSql = 
      `INSERT INTO engineer_details (id,name, mobile, email, UserId) values (${insValues})`;
      console.log(inSql);
      let response = {};
      connection.query(inSql, function(err, rows, fields) {
        if (err) {
          response.error = err;
        } else {
          response.response = 'saved successfully';
        }
        resolve(response);
		})
		
    });
    
  }
    
  engineerDetail(data) {
	console.log('User details Model',data);
	let engineerId = data.userid;
	return new Promise((resolve) => {
    var getSql = `SELECT * FROM engineer_details WHERE UserId='${engineerId}'`;
	let response = {};
      connection.query(getSql, function(err, rows, fields) {
        if (err) {
          response.error = err;
        } else {
		console.log('Get Engineer Details', rows);
        response = rows;  
        }
       resolve(response); 
      });
      
    });
  }
}

module.exports = AdminModel;
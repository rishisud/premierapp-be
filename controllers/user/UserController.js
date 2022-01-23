// Class for UserController
const UserModel = require("../../models/User.js");
const _ = require('underscore');
let user = new UserModel();

const AdminModel = require("../../models/Admin.js");
let admin = new AdminModel();

class UserController {

  constructor() {}
  
  /* Method for login */
  login(req, res) {
    return new Promise((resolve, reject) => {
      user.login(req.body).then(function(res) {
        console.log(res);
        resolve(res);
      });
    });
  }
  changePwd(req, res) {
    return new Promise((resolve, reject) => {
      user.changePwd(req.body).then(function(res) {
        console.log(res);
        resolve(res);
      });
    });
  }
  
  /* Method get get details about logged in user */
  async me(req, res) {
	const userDet = req.user.user;
      const userReq = {};
	  console.log("USERS>>",userDet);
      userReq.userid = userDet[0].UserId;
      let agentDet = {};
      let merchantDet = {};
	  let refAgentDet = {};
      if (userDet[0].Role === 'engineer') {
        agentDet = await admin.engineerDetail(userReq);
      } 
      const result = (JSON.parse(JSON.stringify(userDet)));
      let resArr = {};
      _.each(result, function(res) {
        resArr.username = res.Username;
        resArr.role = res.Role;
      });
      resArr.user_details = agentDet;
      resArr = { response: resArr };
      return resArr; 
  }
  
  save(req, res) {
    return new Promise((resolve, reject) => {
      user.saveAdmin(req.body).then(function(res) {
        resolve(res);
      });
    });
  }

}

module.exports = UserController;

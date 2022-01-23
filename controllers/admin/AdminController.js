const AdminModel = require("../../models/Admin.js");
const path = require("path");
let admin = new AdminModel();

class AdminController {

  constructor() {}

  save(req, res) {
    return new Promise((resolve, reject) => {
	  console.log(req.body);
      admin.saveEngineer(req.body).then(function(res) {
        resolve(res);
      });
    });
  }
  
  
}

module.exports = AdminController;
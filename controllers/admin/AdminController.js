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
  
  saveServiceRequest(req, res) {
    return new Promise((resolve, reject) => {
	  console.log(req.body);
      admin.saveServiceRequest(req.body).then(function(res) {
        resolve(res);
      });
    });
  }
  
  getServiceRequest(req, res) {
    return new Promise((resolve, reject) => {
      admin.getServiceRequest(req.query).then(function(res) {
        resolve(res);
      });
    });
  }
  
  
}

module.exports = AdminController;
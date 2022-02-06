const express = require("express");
const router = express.Router();
const passport = require("passport");
const path = require("path");
const fs = require('fs')
var filesaver = require('file-saver');
//var connection = require("../models/dbConnect.js");

const passportMiddleware = require("../middleware/passport");
passportMiddleware(passport);

const UserController = require("../controllers/user/UserController");
let userObj = new UserController();

const AdminController = require("../controllers/admin/AdminController");
let adminObj = new AdminController();

router.post("/api/login",
 function (req, res) {
    userObj.login(req, res).then(function(response){
        console.log(response);
        if (response.error) {
          res.status(400)
        }
        res.send(response);
    });
});

router.get("/api/me",
 passport.authenticate("jwt", { session: false }),
    function (req, res) {
    userObj.me(req, res).then(function(response){
        console.log(response);
        if (response.error) {
          res.status(400)
        }
        res.send(response);
    });
});

router.post("/api/engineer/save",
 function (req, res) {
	console.log("Inside Route");
    adminObj.save(req, res).then(function(response){
        if (response.error) {
          res.status(400)
        }
        res.send(response);
    });
});

router.post("/api/engineer/update",
 function (req, res) {
    adminObj.updatePM(req, res).then(function(response){
        if (response.error) {
          res.status(400)
        }
        res.send(response);
    });
});

router.post("/api/servicerequest/save",
 function (req, res) {
    adminObj.saveServiceRequest(req, res).then(function(response){
        if (response.error) {
          res.status(400)
        }
        res.send(response);
    });
});

router.get("/api/servicerequest/get",
 function (req, res) {
    adminObj.getServiceRequest(req, res).then(function(response){
        if (response.error) {
          res.status(400)
        }
        res.send(response);
    });
});

router.post("/api/supervisor/save",
 function (req, res) {
    adminObj.saveRefAgent(req, res).then(function(response){
        if (response.error) {
          res.status(400)
        }
        res.send(response);
    });
});

router.post("/api/supervisor/update",
 function (req, res) {
    //console.log(req.body);
    adminObj.updatePM(req, res).then(function(response){
        if (response.error) {
          res.status(400)
        }
        res.send(response);
    });
});

router.post("/api/support-process/save",
 function (req, res) {
    adminObj.updatePM(req, res).then(function(response){
        if (response.error) {
          res.status(400)
        }
        res.send(response);
    });
});

router.get("/api/support-process",
 function (req, res) {
    adminObj.agentleadDetails(req, res).then(function(response){
        if (response.error) {
          res.status(400)
        }
        res.send(response);
    });
});

module.exports = router;

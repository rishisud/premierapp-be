const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const UserModel = require("../models/User.js");
let userModelObj = new UserModel();


module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = 'PleaseChange';
 /* If the proper token sent, get the user related details, that can access thru all controller.. */
  passport.use(
    new JwtStrategy(opts, async function(jwt_payload, done) {
	  //console.log('Passport::', jwt_payload);
      let err;
      let user = {};
      const userID = jwt_payload.user_id;
	  console.log('Passport',userID);
      userModelObj.getUserDetails(userID).then(function(res){
		//console.log('Passport',res);
        return done(null, { user: res });
      });
    })
  );

};
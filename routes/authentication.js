const express         = require("express"),
      passport        = require("passport"),
      bodyParser      = require("body-parser"),
      User            = require("../models/user");

require('../config/passport');
const router = express.Router();

// Registration
router.post('/register', bodyParser.json(), (req, res) => {
    console.log("New user registration");
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save( err => {
        if(err){
            console.log(err);
        }

        else{
            var token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token" : token
            });
        }

    });

});

// Login
router.post('/login',bodyParser.json(), (req,res) => {
    console.log("User Login");
    passport.authenticate('local', ( err, user, info) => {
        var token;
    
        // If Passport throws/catches an error
        if (err) {
          res.status(404).json(err);
          return;
        }
    
        // If a user is found
        if(user){
          token = user.generateJwt();
          res.status(200);
          res.json({
            "token" : token
          });
        } 
        else {
          // If user is not found
          res.status(401).json(info);
        }
      })(req, res);
});

module.exports = router;
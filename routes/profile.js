const   express         = require("express"),
        User            = require("../models/user"),
        jwt             = require("express-jwt"),
        jwtconfig       = require("../config/jwt")
        middleware      = require("../middleware");

const router = express.Router();
const auth = jwt( jwtconfig );

// Get user profile
router.get('/', auth, middleware.isLoggedIn, (req, res) => {
    console.log("Get user details");
        
    const id = req.payload._id; 

    User.findById(id, (err,user) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(user);
        }       
    });

});


module.exports = router;
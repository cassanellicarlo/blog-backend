const   express         = require("express"),
        User            = require("../models/user")

const router = express.Router();

// Get user profile
router.get('/', (req, res) => {
    console.log("Get user details");
    const id = req.payload._id;
    
    if (!id) {
        res.status(401).json({
          "message" : "UnauthorizedError: private profile"
        });
    }

    else{
        User.findById(id, (err,user) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(user);
            }       
        });
    }
    

});


module.exports = router;
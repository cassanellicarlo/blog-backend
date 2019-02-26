const   express         = require("express"),
        bodyParser      = require("body-parser"),
        Comment         = require("../models/comment"),
        Post            = require("../models/post")

const router = express.Router({mergeParams:true});

// Get all comments of a post
router.get('/',  (req, res) => {
    console.log("Get all comments of a post");
    const id = req.params.id; //post id
    
    Post.findById(id).populate("comments").exec( (err,post) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(post);
        }       
    });
});

// Add new comment to a post
router.post('/', bodyParser.json(), (req, res) => {
    console.log("Create a new comment inside a post");
    
    const id = req.params.id; //post id
    
    Post.findById(id, function (err,post){
        if(err){
            console.log(err);
        }
        else{
            const newComment = req.body;
            Comment.create(newComment, function(err,comment){
                if(err){
                    console.log(err);
                }

                else{
                    post.comments.push(comment);
                    post.save();
                    res.send(post);
                }
            });
        }       
    });
});


module.exports = router;
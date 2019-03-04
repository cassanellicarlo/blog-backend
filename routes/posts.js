const   express         = require("express"),
        bodyParser      = require("body-parser"),
        Post            = require("../models/post"),
        jwt             = require("express-jwt"),
        jwtconfig       = require("../config/jwt"),
        middleware      = require("../middleware");

const auth = jwt( jwtconfig );
const router = express.Router();

// Get all posts
router.get('/', (req, res) => {
    console.log("Get All Posts");
    Post.find(function (err,post){
        if(err){
            console.log(err);
        }
        else{
            res.send(post);
        }
    });
});

// Get a single post by id
router.get('/:id', (req, res) => {
    console.log("Get a post");
    const id = req.params.id;
    Post.findById(id).populate("comments").exec( (err,post) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(post);
            res.send(post);
        }
    });
});

// Add a new post
router.post('/', auth, middleware.isLoggedIn, bodyParser.json(), (req, res) => {
    console.log("Insert a new post");
    const newPost = req.body;

    Post.create(newPost, (err,post) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(post);
            res.status(200).json({
                message: 'Post added'
            });
        }

    });
});

// Modify a post
router.put('/:id', auth, middleware.isLoggedIn, middleware.checkPostOwnership, bodyParser.json(), (req, res) => {
    console.log("Update a post");

    const post_id = req.params.id;
    const modifiedPost = req.body;

    Post.findByIdAndUpdate(post_id, modifiedPost, {new:true}, (err, post) => {
        if(err){
            console.log(err);
        }

        else{
            res.status(200).json({
                message: 'Post modified'
            });
        }
    });

});

// Delete a post
router.delete('/:id', auth, middleware.isLoggedIn, middleware.checkPostOwnership, (req, res) => {
    console.log("Update a post");

    const post_id = req.params.id;

    Post.findByIdAndDelete(post_id, (err) => {
        if(err){
            console.log(err);
        }

        else{
            res.status(200).json({
                message: 'Post deleted'
            });
        }
    });

});



module.exports = router;

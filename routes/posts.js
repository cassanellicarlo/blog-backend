const   express         = require("express"),
        bodyParser      = require("body-parser"),
        Post            = require("../models/post");


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
    Post.findById(id).populate("comments").exec( function (err,post){
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
router.post('/', bodyParser.json(), (req, res) => {
    console.log("Insert a new post");
    const newPost = req.body;
    console.log(req.body);

    Post.create(newPost, function (err,post){
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


module.exports = router;

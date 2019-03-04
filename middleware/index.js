const Post = require ("../models/post");

middlewareObject = {};

// Check if user is logged in 
middlewareObject.isLoggedIn = (req, res, next) => {

    const id = req.payload._id;
    
    if (!id) {
        res.status(401).json({
          "message" : "UnauthorizedError: unauthorized operation"
        });
    }

    else{
        next();
    }

}

// Check if the user is the owner of the post
middlewareObject.checkPostOwnership = (req, res, next) => {

    const post_id = req.params.id; 
    const user_id = req.payload._id;
    
    // Search the post by id
    Post.findById(post_id, (err,post) => {
        if(err){
            console.log(err);
        }

        else{
            // If user own the post
            if(post.author.id.equals(user_id)){
                next();
            }

            else{
                res.status(401).json({
                    "message" : "UnauthorizedError: user is not owner of the post"
                }); 
            }
        }
    });
}

module.exports = middlewareObject;
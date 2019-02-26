const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema({
    title: String,
    image: String,
    content: String,
    date: { 
        type: Date, 
        default: Date.now 
    },
    author: { 
        id: {
            type: Schema.Types.ObjectId, 
            ref: 'User' 
        },
        username: String
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]

});

module.exports = mongoose.model("Post", postSchema);

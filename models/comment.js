const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
    text: String,
    author: { 
        id: {
            type: Schema.Types.ObjectId, 
            ref: 'User' 
        },
        username: String
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model("Comment", commentSchema);
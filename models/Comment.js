const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment:{
        type: String,
    },
    author:{
        type: String,
    },
    postId:{
        type: String,
    },
    userId:{
        type: String,
    }
},{timestamps:true})

module.exports = mongoose.model('Comment',commentSchema);
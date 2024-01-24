const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    like:{
        type: Number,
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

module.exports = mongoose.model('likes',likeSchema)
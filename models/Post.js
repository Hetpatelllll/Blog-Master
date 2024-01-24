const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    
    title: {
        type: String,
    },
    desc: {
        type: String,
    },
    photo: {
        type: String,
    },
    username: {
        type: String,
    },
    userId: {
        type: String,
    },
    categories: {
        type: Array,
    }
},{timestamps:true})

module.exports = mongoose.model('Post', postSchema);
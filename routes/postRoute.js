const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const verifyToken = require('../veryfyToken')
const Comment = require('../models/Comment')


// create post
router.post('/create',verifyToken, async (req, res) => {
    try {
        const newPost = new Post(req.body)
        // console.log(req.body)
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)

    } catch (error) {
        console.log(error)
        res.status(500).json(err)
    }
})



// update post
router.put('/:id',verifyToken, async (req, res, next) => {
    try {
        let updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedPost)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

// delete post
router.delete('/:id',verifyToken, async (req, res, next) => {
    try {
        let id = req.params.id
        await Post.findByIdAndDelete(id);
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json("Post Deleted successfully")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

// get post details
router.get('/:id', async (req, res, next) => {

    let id = req.params.id;
    let post;

    try {
        post = await Post.findById(id)
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

// get all post or search post
router.get('/', async (req, res, next) => {
    const query = req.query;
    console.log(query)
    try {
            const searchFilter = {
                title:{$regex:query.search,$options:"i"}
            }

        let posts = await Post.find(query.search?searchFilter:null);
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
    }
})

// get user post
router.get('/user/:userId', async (req, res, next) => {
    try {
        let posts = await Post.find({userId:req.params.userId});
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;
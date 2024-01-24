const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment')
const verifyToken = require('../veryfyToken')

// create comment
router.post('/create',verifyToken, async (req, res) => {
    try {
        const newComment = new Comment(req.body)
        // console.log(req.body)
        const saveComment = await newComment.save()
        res.status(200).json(saveComment)
    } catch (error) {
        console.log(error)
        res.status(500).json(err)
    }
})



// update comment
router.put('/:id',verifyToken,async (req, res, next) => {
    try {
        let updatedComment=await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedComment)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

// delete comment
router.delete('/:id',verifyToken, async (req, res, next) => {
    try {
        let id = req.params.id
        await Comment.findByIdAndDelete(id);
        res.status(200).json("Comment Deleted successfully")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

// get post comments
router.get('/post/:postId', async (req, res, next) => {
    try {
        let comments = await Comment.find({postId:req.params.postId});
        res.status(200).json(comments)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
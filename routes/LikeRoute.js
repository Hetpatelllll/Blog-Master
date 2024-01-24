const express = require('express')
const router = express.Router();
const Like = require('../models/Like')
const verifyToken = require('../veryfyToken')

// do like
router.post('/create',verifyToken, async (req,res) => {
    try {
        const newLikes = new Like(req.body)
        // console.log(req.body)
        const saveLikes = await newLikes.save()
        res.status(200).json(saveLikes) 

    } catch (error) {
        console.log(error)
        res.status(500).json(err)
    }
})

// get likes in post
router.get('/post/:postId',async (req,res)=>{
    try {
        let likes = await Like.find({postId:req.params.postId});
        res.status(200).json(likes)
    } catch (error) {
        console.log(error)
    }
})



module.exports = router
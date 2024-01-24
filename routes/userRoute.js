const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const verifyToken = require('../veryfyToken')



// update profile
router.put('/:id', verifyToken,async (req, res, next) => {
    try {
        const { password } = req.body;
        let id = req.params.id;
        if (password) {

            // if user want to change password then firt bcrypted and then save
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = bcrypt.hashSync(password, salt)
            req.body.password = hashedPassword;
        }
        const updateUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
})

// delete
router.delete('/:id',verifyToken, async (req, res, next) => {
    try {
        let id = req.params.id
        await User.findByIdAndDelete(id);
        await Post.deleteMany({id})
        await Comment.deleteMany({id})
        res.status(200).json("User Deleted successfully")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

// get users
router.get('/:id', async (req, res, next) => {

    let id = req.params.id;
    let user;

    try {
        user = await User.findById(id)
        const {...info} = user._doc;
        res.status(200).json({info})
    } catch (error) {
        console.log(error)
        res.status(500).json(err)   
    }
})


module.exports = router;
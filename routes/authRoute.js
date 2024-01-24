const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// register
router.post('/register', async (req, res, next) => {
    try {

        const { username, email, password } = req.body;

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hashSync(password, salt)

        let newUser = new User({ username, email, password: hashedPassword })
        newUser = await newUser.save();
        res.status(200).json(newUser);

    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
})

// login
router.post('/login', async (req, res, next) => {
    try {
        const { email } = req.body;

        let existUser;
        existUser = await User.findOne({ email })

        if (!existUser) {
            return res.status(404).json({ message: "User Not Found" })
        }

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, existUser.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'password Incorrect' });
        }

        const secretKey = 'This_is_my_secret_key';
        const token = jwt.sign({ _id: existUser._id,username:existUser.username,email:existUser.email},secretKey,{expiresIn: "7d"})
        const { password, ...info } = existUser._doc;
        // return res.status(201).json({ message:'login sucessfully',existUser},secretKey,{expiresIn: "7d"});
        res.cookie("token", token).status(200).json(info)

    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
})



// logout
router.get('/logout',async (req,res,next)=>{
    try {
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User logged out successfully")
    } catch (error) {
        res.json(500).json(error)
    }
})

// refetch user (don't logout autometacally when page is refresh)
router.get("/refetch",(req,res) => {
    const secretKey = 'This_is_my_secret_key';
    const token = req.cookies.token
    jwt.verify(token,secretKey,{},async (err,data) => {
        if(err)
        {
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
})



module.exports = router;
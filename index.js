const express = require('express');                                          
const app = express();                       
const cors = require('cors')                   
const mongoose = require('mongoose');                                          
const authrouter = require('./routes/authRoute');                                          
const userrouter = require('./routes/userRoute');                                          
const postrouter = require('./routes/postRoute');                                          
const commentrouter = require('./routes/commentRoute');                                          
const likerouter = require('./routes/LikeRoute');                                          
const cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('path')
const dotenv = require('dotenv');

app.use(express.json())
app.use(cookieParser())
app.use('/images',express.static(path.join(__dirname,"/images")))
app.use(cors({origin: 'http://localhost:3000',credentials:true}))
app.use('/auth',authrouter)
app.use('/user',userrouter)
app.use('/posts',postrouter)
app.use('/comments',commentrouter)
app.use('/likes',likerouter)

// image upload 
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"photo3.jpg")
    }
})

const upload=multer({storage:storage})
app.post("/upload",upload.single("file"),(req,res) => {
    // console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://hetfadadu123:hetfadadu123@cluster0.lqawdlp.mongodb.net/blog_app?retryWrites=true&w=majority")
        .then(()=>console.log("Connected Db"))
    } catch (error) {
        console.log("Connection Error"+error)
    }
}

app.listen(5000,() => {
    connectDB()
    console.log("app is Running on 5000 port")
})
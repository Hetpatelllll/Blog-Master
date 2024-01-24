import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { BiDislike } from "react-icons/bi";
import Comment from '../components/Comment'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { BiLike } from "react-icons/bi";
import { UserContext } from '../contex/UserContex'
import Loder from '../components/Loder'
import { BiSolidDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";



const PostDetails = () => {

    const postId = useParams().id
    // console.log(postId.id)

    const [post, setPost] = useState({})
    const [loder, setLoder] = useState(false)
    // for get api
    const [comment, setComment] = useState([])
    // for post api
    const [comments, setComments] = useState("")
    // for get like
    const [likes, setLikes] = useState([])
    // for post like
    const [hashLike, setHashLike] = useState(0)

    // setLike only one time
    const [oneLike, setOneLike] = useState(false)

    // setdislike button
    const [disLike, setDislike] = useState(false)


    const { user } = useContext(UserContext)
    const navigate = useNavigate()


    const fetchPost = async () => {
        setLoder(true)
        try {
            const res = await axios.get(`http://localhost:5000/posts/${postId}`)
            // console.log(res.data)
            setPost(res.data)
            setLoder(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeletePost = async () => {
        try {
            const res = await axios.delete("http://localhost:5000/posts/" + postId, { withCredentials: true })
            // console.log(res.data)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    const fetchPostComments = async () => {
        try {
            const res = await axios.get("http://localhost:5000/comments/post/" + postId)
            // console.log(res.data)
            setComment(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const addComment = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post("http://localhost:5000/comments/create", { comment: comments, author: user.username, postId: postId, userId: user._id }, { withCredentials: true })
            // fetchPostComments();                                            
            // setComments("");       
            window.location.reload(true)
        } catch (error) {
            console.log(error)
        }

    }

    const fetchPostLike = async () => {
        try {
            const res = await axios.get("http://localhost:5000/likes/post/" + postId)
            console.log(res.data)
            setLikes(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     fetchPostLike();
    // }, [postId])

    const handleLike = async (e) => {
        if (!oneLike) {
            e.preventDefault();
            try {
                setHashLike(hashLike + 1)
                const res = await axios.post("http://localhost:5000/likes/create", { like: hashLike, author: user.username, postId: postId, userId: user._id },{withCredentials: true})
                window.location.reload(true)
                setOneLike(true)
                localStorage.setItem(postId, 'liked');
            } catch (error) {
                console.log(error)
            }
        }
        else {
            alert("You have already liked this post")
        }
    }

    useEffect(() => {
        const likedStatus = localStorage.getItem(postId, 'liked');
        if (likedStatus === 'liked') {
            setOneLike(true)
        }
    }, [])

    useEffect(() => {
        fetchPost()
        fetchPostComments()
        fetchPostLike()
    }, [postId])

    const handleDislike = () => {
        setDislike(!disLike)
    }

    return (
        <div>
            <Navbar />
            {loder ? <div className="h-[80vh] flex justify-center items-center w-full"><Loder /></div> : <div className='px-8 md:px-[200px] mt-8'>
                <div className="flex justify-between items-center">
                    <h1 className='text-2xl font-bold text-black md:text-3xl'>{post.title}</h1>
                    {/* only post owner only see this buttons */}
                    {
                        user?._id === post?.userId &&

                        <div className="flex items-center justify-center space-x-2">
                            <p onClick={() => navigate(`/edit/${postId}`)} className='cursor-pointer'><BiEdit /></p>
                            <p onClick={handleDeletePost} className='cursor-pointer'><MdDelete /></p>
                        </div>
                    }

                </div>

                <div className="flex items-center justify-between mt-2 md:mt-4">
                    <p>@{post.username}</p>
                    <div className="flex space-x-2 ">
                        <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                        <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
                    </div>
                </div>

                <img src={"http://localhost:5000/images/" + post.photo} className='w-full mx-auto mt-8' alt="" />

                {/* Likes */}
                <div className='flex'>
                    <div onClick={handleLike} className='text-2xl cursor-pointer'>{!oneLike ? <BiLike /> : <BiSolidLike />}{likes.length}</div>
                    <div onClick={handleDislike} className='text-2xl cursor-pointer'>{!disLike ? <BiDislike /> : <BiSolidDislike />}</div>
                </div>

                <p className='mx-auto mt-8'>{post.desc}</p>
                <div className='flex items-center mt-8 space-x-4 font-semibold'>
                    <p>Categories:</p>
                    <div className="flex justify-center items-center space-x-2">
                        {
                            post.categories?.map((element, i) => (
                                <div className="bg-gray-300 rounded-lg px-3 py-1" key={i} >{element}</div>
                            ))
                        }
                    </div>
                </div>
                <div className='flex flex-col mt-4'>
                    <h3 className='mt-6 mb-4 font-semibold'>Comments -</h3>

                    {/* comment */}
                    {
                        comment?.map((commentData) => (
                            <Comment key={commentData._id} post={post} commentData={commentData} />
                        ))
                    }

                </div>

                {/* write a comment */}
                <div className='w-full flex flex-col mt-4 md:flex-row'>
                    <input onChange={(e) => setComments(e.target.value)} type='text' placeholder="Write a comment" className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0" />
                    <button onClick={addComment} className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
                </div>
            </div>}
            <Footer />
        </div>

    )
}

export default PostDetails
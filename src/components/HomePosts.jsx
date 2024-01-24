import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../contex/UserContex'
import '../components/HomePost.css'

const HomePosts = ({ post }) => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const haldleReadMore = () => {
    if (user) {
      navigate(`/post/post/${post._id}`)
    }
    else {
      navigate("/login")
    }
  }

  return (
    <div className='w-full flex mt-8 space-x-4 responsive'>

      {/* left */}
      {/* <div className='w-[35%] h-[200px] flex justify-center items-center'> */}
      <Link className='w-[35%] h-[200px] flex justify-center items-center photo' to={user ? `/post/post/${post._id}` : "/login"} >
        <img src={"http://localhost:5000/images/" + post.photo} className="h-full w-full object-cover" alt="" />
      </Link>
      {/* </div> */}

      {/* right */}

      <div className='flex flex-col w-[65%] photo'>
        <h1 className='text-xl font-bold md:mb-2 mb-1 md:text-2xl' >
          {post.title}
        </h1>

        <div className="flex flex-wrap mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2 ">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className='text-sm md:text-lg'>{post.desc.length < 200 ? post.desc : `${post.desc.slice(0, 200)}`}
          &nbsp;&nbsp;{post.desc.length >= 200 &&
            <button className='button-13' onClick={haldleReadMore}>Read More...</button>
          }
        </p>
      </div>

    </div>

  )
}

export default HomePosts
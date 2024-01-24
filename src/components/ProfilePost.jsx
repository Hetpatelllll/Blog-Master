import React from 'react'
import '../pages/Profile.css'


const ProfilePost = ({ post }) => {
  return (
    <div className='responsive w-full flex mt-8 space-x-4 '>
      {/* left */}
      <div className='w-[35%] h-[200px] flex justify-center items-center photo'>
        <img src={"http://localhost:5000/images/"+post.photo} className="h-full w-full object-cover" alt="" />
      </div>

      {/* right */}

      <div className='flex flex-col w-[65%] photo'>
        <h1 className='text-xl font-bold md:mb-2 mb-1 md:text-2xl' >
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2 ">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className='text-sm md:text-lg'>{post.desc}</p>
      </div>
    </div>
  )
}

export default ProfilePost
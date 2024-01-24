import axios from 'axios'
import React, { useContext } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { UserContext } from '../contex/UserContex'

const Comment = ({ commentData, post }) => {

  const { user } = useContext(UserContext)

  const deleteComment = async (id) => {
    try {
      const res = await axios.delete("http://localhost:5000/comments/"+id,{ withCredentials: true })
      window.location.reload(true) 
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className='px-2 py-2 bg-gray-200 rounded-lg my-2' >
      <div className="flex items-center justify-between">
        <h3 className='font-bold text-gray-600' >@{commentData.author}</h3>
        <div className='flex items-center justify-center space-x-4' >
          <p className='text-gray-600 text-sm'>{new Date(commentData.updatedAt).toString().slice(0, 15)}</p>
          <p className='text-gray-600 text-sm'>{new Date(commentData.updatedAt).toString().slice(16, 24)}</p>
          {
            user?._id === post?.userId  || user?._id === commentData?.userId?
              <div className="flex items-center justify-center space-x-2">
                {/* <p className='cursor-pointer'><BiEdit /></p> */}

                <p onClick={()=>deleteComment(commentData._id)} className='cursor-pointer'><MdDelete/></p>
              </div>:""
          }
        </div>
      </div>
      <p className='px-4 mt-2' >{commentData.comment}</p>
    </div>
  )
}

export default Comment
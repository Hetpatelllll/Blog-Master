import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProfilePost from '../components/ProfilePost'
import axios from 'axios'
import { UserContext } from '../contex/UserContex'
import { useNavigate, useParams } from 'react-router-dom'


const Profile = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [update,setUpdate] = useState(false)
  const [userPosts,setUserPosts] = useState([])
  const { user,setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const params = useParams().id

  // console.log(user)

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/" + user._id)
      setUsername(res.data.info.username)
      setEmail(res.data.info.email)
      setPassword(res.data.info.password)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }

  }

  const handleUserUpdate = async () => {
    try {
      const res = await axios.put("http://localhost:5000/user/" + user._id, { username, email, password }, { withCredentials: true })
      console.log(res.data)
      setUpdate(true)
    } catch (error) {
      console.log(error)
      setUpdate(false)
    }
  }

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete("http://localhost:5000/user/"+user._id,{withCredentials: true })
      // console.log(res.data)
      setUser(null)
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/posts/user/"+user._id)
    console.log(res.data)
    setUserPosts(res.data)
    } catch (error) {
      console.log(error)
    }
  }


useEffect(() => {
  fetchProfile()
}, [params])

useEffect(() => {
  fetchUserPosts()
}, [params])

return (
  <div>
    <Navbar />
    <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">

      {/* left */}
      <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0 ">
        <h1 className="text-xl font-bold mb-4">Your Posts</h1>
        {
          userPosts?.map((post) => (
            <ProfilePost key={post._id} post={post} />
          ))
        }
      </div>

      <div className="md:sticky md:top-12  flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
        <div className='flex flex-col space-y-4 items-start'>
          <h1 className="text-xl font-bold mb-4">Profile</h1>
          <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" className="outline-none px-4 py-2 text-gray-500" placeholder="Your username" />
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className="outline-none px-4 py-2 text-gray-500" placeholder="Your email" />
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="text" className="outline-none px-4 py-2 text-gray-500" placeholder="Your password" />
          <div className="flex items-center space-x-4 mt-8">
            <button onClick={handleUserUpdate} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400" >Update</button>
            <button onClick={handleUserDelete} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Delete</button>
          </div>
          {
            update && <h3 className="text-green-500 text-sm text-center mt-4">User updated successfully!</h3>
          }
        </div>
      </div>
    </div>
    <Footer />
  </div>
)
}

export default Profile
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../contex/UserContex'
import axios from 'axios';

const Menu = () => {
    // const user = true;
    const { user } = useContext(UserContext);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await axios.get('http://localhost:5000/auth/logout',{withCredentials:true})
            setUser(null)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4">
            {!user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/login">Login</Link></h3>}             
            {!user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/register">Register</Link></h3>}             
            {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/profile/"+user._id}>Profile</Link></h3>}             
            {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/write">Create Blogs</Link></h3>}                    
            {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/"}>All blogs</Link></h3>}             
            {user && <h3 onClick={handleLogout} className="text-white text-sm hover:text-gray-500 cursor-pointer">Logout</h3>}             
        </div>
    )
}

export default Menu
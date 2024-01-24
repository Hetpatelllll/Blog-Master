import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import Menu from './Menu';
import { UserContext } from '../contex/UserContex';


const Navbar = () => {

  const [menu, setMenu] = useState(false)
  const [prompt, setPrompt] = useState("")
  const navigate = useNavigate()
  
  const path = useLocation().pathname;
  // console.log(path)

  // console.log(prompt)
  const showMenu = () => {
    setMenu(!menu)
  }

  const {user} = useContext(UserContext) 
  // console.log(user)
  return (
    <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
      <h1 className='text-lg md:text-xl font-extrabold' ><Link to="/">Blog Market</Link></h1>

      {path ==="/" && <div className="flex items-center justify-center space-x-0">
        <input onChange={(e)=>setPrompt(e.target.value)} type="text" className='outline-none px-3 py-1' placeholder='Search A Post' />
        <p onClick={()=>navigate(prompt? "?search="+prompt : navigate("/"))} className='cursor-pointer'><IoSearch /></p>
      </div>}

      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {!user && <h3><Link to="/login">Login</Link></h3>}
        {user ? <div>
          <p onClick={showMenu} className='cursor-pointer relative'><FaBars /></p>
          {menu && <Menu />}
        </div> : <h3><Link to="/register">Register</Link></h3>
        }
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className='cursor-pointer relative'><FaBars /></p>
        {menu && <Menu />}
      </div>
    </div>
  )
}

export default Navbar
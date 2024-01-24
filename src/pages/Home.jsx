import React, { useContext, useState } from 'react'
import HomePosts from '../components/HomePosts'
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import axios from 'axios';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loder from '../components/Loder';
import { UserContext } from '../contex/UserContex';

const Home = () => {

  const [posts, setPosts] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [loder, setLoder] = useState(false)
  const {user}=useContext(UserContext)
// console.log(user)

  // It is for get search query
  // const path = useLocation()
  // console.log(path.search)

  const { search } = useLocation()
  // console.log(search)

  const fetchPosts = async () => {

    setLoder(true)
    try {
      const res = await axios.get('http://localhost:5000/posts'+search)
      // console.log(res.data)
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResults(true)
      }
      else {
        setNoResults(false)
      }
      setLoder(false)

    } catch (error) {
      console.log(error)
      setLoder(true)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [search])

  return (
    <>
      <Navbar />
      <div className='px-8 md:px-[200px] min-h-[80vh]'>
        {
          loder ? <div className='h-[40vh] flex justify-center items-center'><Loder /></div> : !noResults ? posts.map((post) => (
            <>
              {/* <Link to={user?`/post/post/${post._id}`:"/login"} > */}
                <HomePosts key={post._id} post={post} />
              {/* </Link> */}
            </>
          )) : <h3 className='text-center font-bold mt-16'>No Posts Available</h3>
        }
      </div>
      <Footer />
    </>
  )
}

export default Home
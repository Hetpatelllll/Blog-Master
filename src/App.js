import './App.css';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetails from './pages/PostDetails';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';
import { UserContexProvide, UserContext } from './contex/UserContex';
import MyBlogs from './pages/MyBlogs';
import { useContext } from 'react';

function App() {
  const { user } = useContext(UserContext)
  return (
    <div>
      <UserContexProvide>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {<>
            <Route path='/post/post/:id' element={<PostDetails />} />
            <Route path='/write' element={<CreatePost />} />
            <Route path='/edit/:id' element={<EditPost />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/myblogs/:id' element={<MyBlogs />} />
          </>
        }

        </Routes>
      </UserContexProvide>
    </div>
  );
}

export default App;

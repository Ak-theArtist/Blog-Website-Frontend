import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Footer from './components/Footer';
import Post from './components/Post';
import MyPost from './components/MyPost';
import Admin from './components/Admin';
import './App.css';

export const userContext = createContext();

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.interceptors.request.use(config => {
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
      });

      axios.get('https://blog-website-backend.onrender.com/')
        .then(response => {
          const { email, name } = response.data;
          setUser({ email, name });
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []); 

  return (
    <userContext.Provider value={[user, setUser]}>
      <Router>
        <Navbar user={user} title='Mewar Gallery' />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/mypost' element={<MyPost />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/admin' element={<Admin />} />
          <Route exact path='/post/:id' element={<Post />} />
        </Routes>
        <Footer />
      </Router>
    </userContext.Provider>
  );
}

export default App;

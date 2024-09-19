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
import './App.css';
import Admin from './components/Admin';

export const userContext = createContext();

function App() {

  const [user, setUser] = useState({});

  axios.defaults.withCredentials = true;

  const apiBaseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiBaseUrl}/`)
      .then(response => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch(err => console.log(err));
  }, [apiBaseUrl]);

  return (
    <userContext.Provider value={user}>
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

import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/mu_logo.png';
import { userContext } from '../App';
import axios from 'axios';

function Navbar(props) {
    const [user] = useContext(userContext);
    const navigate = useNavigate();
    const adminEmail = "kumarakash91384@gmail.com"; 

    const handleLogout = () => {
        axios.get('https://blog-website-backend-9nth.onrender.com/logout')
            .then(res => {
                if (res.data === "Success") {
                    console.log(res.data);
                    localStorage.removeItem('token');
                    navigate('/');
                    window.location.reload();
                }
            })
            .catch(err => console.log(err));
    };

    // Check if the user is an admin
    const isAdmin = user.email === adminEmail;

    return (
        <nav className="navbar navbar-expand-lg mynavbar-color">
            <div className="container">
                <div className="logo-main">
                    <Link to='/'><img className="logo" src={logo} alt="Logo" /></Link>
                </div>
                <Link to='/'><a className="navbar-brand" href="/">{props.title}</a></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to='/'><a className="nav-link active" aria-current="page">Home</a></Link>
                        </li>
                        {user.name && !isAdmin && (
                            <li className="nav-item">
                                <Link to='/mypost'><a className="nav-link active" aria-current="page">Your Posts</a></Link>
                            </li>
                        )}
                        {isAdmin && (
                            <li className="nav-item">
                                <Link to='/admin'><a className="nav-link active" aria-current="page">Admin Panel</a></Link>
                            </li>
                        )}
                    </ul>
                    <div className="d-flex">
                        {localStorage.getItem('token') ? (
                            <button className="btn btn-outline-light nav-logout-btn" type="button" onClick={handleLogout}>Logout</button>
                        ) : (
                            <>
                                <Link to='/register' className='view'>
                                    <button className="btn btn-outline-light nav-register-btn" type="button">Register</button>
                                </Link>
                                <Link to='/login' className='view'>
                                    <button className="btn btn-outline-light nav-login-btn" type="button">Login</button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

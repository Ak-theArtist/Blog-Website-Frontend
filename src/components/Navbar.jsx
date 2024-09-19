import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/mu_logo.png';
import { userContext } from '../App';
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL;
const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;

function Navbar(props) {
    const user = useContext(userContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get(`${apiBaseUrl}/logout`)
            .then(res => {
                if (res.data === "Success") {
                    console.log(res.data);
                    navigate('/');
                    navigate(0);
                }
            })
            .catch(err => console.log(err));
    };

    // Check if the user is an admin
    const isAdmin = user.email === adminEmail;

    return (
        <>
            <div>
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
                                {
                                    user.name && !isAdmin &&
                                    <li className="nav-item">
                                        <Link to='/mypost'><a className="nav-link active" aria-current="page">Your Posts</a></Link>
                                    </li>
                                }
                                {
                                    isAdmin &&
                                    <li className="nav-item">
                                        <Link to='/admin'><a className="nav-link active" aria-current="page">Admin Panel</a></Link>
                                    </li>
                                }
                            </ul>
                            <div className="d-flex">
                                {
                                    user.name ?
                                    <button className="btn btn-outline-light nav-logout-btn" type="submit" onClick={handleLogout}>Logout</button>
                                    :
                                    <>
                                        <Link to='/register' className='view'>
                                            <button className="btn btn-outline-light nav-register-btn" type="submit">Register</button>
                                        </Link>
                                        <Link to='/login' className='view'>
                                            <button className="btn btn-outline-light nav-login-btn" type="submit">Login</button>
                                        </Link>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Navbar;

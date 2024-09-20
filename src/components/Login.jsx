import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function Login() {
    document.title = 'Mewar Gallery - Login';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please fill in all the fields.");
            return;
        }

        setLoading(true);

        axios.post('https://blog-website-backend-9nth.onrender.com/login', { email, password })
            .then(res => {
                setLoading(false);
                
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token); 
                    
                    const decoded = jwtDecode(res.data.token); 
                    if (decoded.role === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/');
                    }
                } else {
                    alert("Invalid Credentials");
                }
            })
            .catch(err => {
                setLoading(false);
                console.error(err);
                alert("Error during login. Please try again.");
            });
    };

    const showPassword = () => {
        const passwordField = document.getElementById("inputPassword5");
        const checkbox = document.getElementById("check");
        passwordField.type = checkbox.checked ? "text" : "password";
    };

    return (
        <div className='login-container d-flex justify-content-center align-items-center flex-column'>
            <div className="login-box">
                <div>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email Address:</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="exampleFormControlInput1" 
                        placeholder="abc@email.com" 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>

                <label htmlFor="inputPassword5" className="form-label">Password:</label>
                <input 
                    type="password" 
                    id="inputPassword5" 
                    className="form-control" 
                    onChange={(e) => setPassword(e.target.value)} 
                />

                <div className="form-check my-2">
                    <input 
                        className="form-check-input checkbox" 
                        type="checkbox" 
                        id="check" 
                        onClick={showPassword} 
                    />
                    <label className='mb-2 checkbox-style' htmlFor='showpassword'>
                        Show Password
                    </label>
                </div>

                {loading && <div className="alert-wait text-center">Please wait...</div>}
                
                <div className='button-view'>
                    <button 
                        className='login-btn btn btn-primary w-100 mb-3' 
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        Login
                    </button>
                    <Link to='/register'>
                        <span className='text-center'>New user? Register!</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;

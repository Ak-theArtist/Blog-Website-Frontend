import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert("Please fill in all the fields.");
            return;
        }

        let pass1 = document.getElementById('inputPassword');
        let pass2 = document.getElementById('reinputPassword');

        if (pass1.value !== pass2.value) {
            alert("Passwords do not match.");
            return;
        }
        if (password.length < 4) {
            alert("Password must be at least 4 characters long.");
            return;
        }

        axios.post('https://blog-website-backend-9nth.onrender.com/register', { name, email, password })
            .then(() => {
                setSuccessMessage('Registration successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            })
            .catch((error) => {
                alert("Error during registration. Please try again.");
                console.error(error);
            });
    }

    const showPassword = () => {
        let password = document.getElementById("inputPassword");
        let repassword = document.getElementById("reinputPassword");
        let checkbox = document.getElementById("check");

        if (checkbox.checked) {
            password.type = "text";
            repassword.type = "text";
        } else {
            password.type = "password";
            repassword.type = "password";
        }
    }

    document.title = 'Mewar Gallery - Register';

    return (
        <div className='register-container d-flex justify-content-center align-items-center flex-column'>
            {successMessage && (
                <div className="alert alert-success">
                    {successMessage}
                </div>
            )}
            <div className="register-box">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                />

                <div>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email Address:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="name@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <label htmlFor="inputPassword" className="form-label">Password:</label>
                <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="reinputPassword" className='form-label'>Re-enter Password:</label>
                <input
                    type="password"
                    id="reinputPassword"
                    className="form-control"
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

                <div className='button-view'>
                    <button
                        className='register-btn btn btn-primary w-100 mb-3'
                        onClick={handleSubmit}
                    >
                        Register
                    </button>
                    <Link to='/login'>
                        <span className='text-center'>Already have an account?</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;

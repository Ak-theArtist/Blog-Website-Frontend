import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState([]);

    const apiBaseUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${apiBaseUrl}/getAllusers`)
            .then(response => {
                const filteredUsers = response.data.filter(user => user.role === 'user');
                const filteredEmail = response.data.filter(user => user.role === 'user');
                setUsers(filteredUsers);
                setEmail(filteredEmail);
            })
            .catch(err => console.error(err));
    }, [apiBaseUrl]);  

    const handleDelete = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            axios.delete(`${apiBaseUrl}/deleteUser/${userId}`)
                .then(result => {
                    alert(result.data.message);
                    setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
                    setEmail(prevEmail => prevEmail.filter(user => user._id !== userId));
                })
                .catch(err => console.error(err));
        }
    };

    return (
        <>
            <div className='admin-box'>
                <table className='admin-table'>
                    <h2>Admin Panel</h2>
                    <thead>
                        <tr className='heading'>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => handleDelete(user._id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Admin;

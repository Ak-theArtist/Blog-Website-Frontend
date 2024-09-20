import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState([]);

    useEffect(() => {
        axios.get('https://blog-website-backend-9nth.onrender.com/getAllusers')
            .then(response => {
                console.log(response.data);
                const filteredUsers = response.data.filter(user => user.role === 'user');
                setUsers(filteredUsers);
            })
            .catch(err => {
                console.error(err);
                alert("Failed to fetch users. Please check the console for more details.");
            });
    }, []);

    const handleDelete = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            axios.delete(`https://blog-website-backend-9nth.onrender.com/deleteUser/${userId}`)
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
                        {Array.isArray(users) && users.map(user => (
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

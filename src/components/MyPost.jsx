import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { userContext } from '../App';

export default function MyPost() {
  const [userPosts, setUserPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [user] = useContext(userContext);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('https://blog-website-backend-9nth.onrender.com/myposts', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(posts => {
        console.log("Posts:", posts.data);
        setUserPosts(posts.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (postId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      axios.delete(`https://blog-website-backend-9nth.onrender.com/deletepost/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(result => {
          setUserPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
        })
        .catch(err => console.log(err));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('email', user.email);
    formData.append('description', description);
    formData.append('file', file);

    axios.post('https://blog-website-backend-9nth.onrender.com/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.data === 'Success') {
          window.location.href = '/';
        }
      })
      .catch(err => console.log(err));

  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setFile(null);
  };

  console.log('Posts:', user?.posts);

  return (
    <>
      <div className="mypost-container">
        <div className="myModal post_container my-3">
          <div className="post_form">
            <button
              type="button"
              className="btn btn create-post-btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@getbootstrap"
              onClick={resetForm}
            >
              Create a Post
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <form onSubmit={handleSubmit}>
                    <div className="modal-header">
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label htmlFor="recipient-name" className="col-form-label">Title:</label>
                        <input type="text" className="form-control" id="recipient-name" value={title} onChange={(e) => setTitle(e.target.value)} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="message-text" className="col-form-label">Description:</label>
                        <textarea className="form-control" id="message-text" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="file-upload" className="col-form-label">File:</label>
                        <input type="file" className="form-control" id="file-upload" onChange={(e) => {
                          setFile(e.target.files[0]);
                          console.log(e.target.files[0]);
                        }} />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="submit" className="btn btn-primary">Post</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className='mb-3'>Your Posts</h2>
        {userPosts && Array.isArray(userPosts) ? (
          <div className="myposts-list">
            {userPosts.map(post => (
              <div key={post._id} className="mypost-item">
                <Link to={`/post/${post._id}`} className='post-view'>
                  <h5>{post.title}</h5>
                  <p>{post.description}</p>
                  {post.file && <img src={`https://blog-website-backend-9nth.onrender.com/Images/${post.file}`} alt={post.title} />}
                </Link>
                <div className="post-actions">
                  <Link to="#" className='btn btn-success mx-1' data-bs-toggle="modal" data-bs-target={`#editModal-${post._id}`} onClick={() => {
                    setTitle(post.title);
                    setDescription(post.description);
                    setFile(post.file);
                  }}>Edit</Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(post._id)}>Delete</button>
                </div>

                <div className="modal fade" id={`editModal-${post._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData();
                        formData.append('title', title);
                        formData.append('description', description);
                        formData.append('file', file);
                        axios.put(`https://blog-website-backend-9nth.onrender.com/editpost/${post._id}`, formData)
                          .then(res => {
                            if (res.data === 'Success') {
                              window.location.href = '/';
                            }
                          })
                          .catch(err => console.log(err));
                      }}>
                        <div className="modal-header">
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <div className="mb-3">
                            <label htmlFor="edit-recipient-name" className="col-form-label">Title:</label>
                            <input type="text" className="form-control" id="edit-recipient-name" value={title} onChange={(e) => setTitle(e.target.value)} />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="edit-message-text" className="col-form-label">Description:</label>
                            <textarea className="form-control" id="edit-message-text" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="edit-file-upload" className="col-form-label">File:</label>
                            <input type="file" className="form-control" id="edit-file-upload" onChange={(e) => setFile(e.target.files[0])} />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts found or error loading posts.</p>
        )}
      </div>
    </>
  );
}

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { userContext } from '../App';

export default function MyPost() {
  const [userPosts, setUserPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const user = useContext(userContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://blog-website-backend-9nth.onrender.com/myposts', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('API Response:', response.data);
        setUserPosts(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.log('Error fetching posts:', err.response ? err.response.data : err.message);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      try {
        await axios.delete(`https://blog-website-backend-9nth.onrender.com/deletepost/${postId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
      } catch (err) {
        console.log('Error deleting post:', err.response ? err.response.data : err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.post('https://blog-website-backend-9nth.onrender.com/create', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data === 'Success') {
        window.location.href = '/';
      }
    } catch (err) {
      console.log('Error creating post:', err.response ? err.response.data : err.message);
    }
  };

  const handleEdit = async (postId) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.put(`https://blog-website-backend-9nth.onrender.com/editpost/${postId}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data === 'Success') {
        window.location.href = '/';
      }
    } catch (err) {
      console.log('Error updating post:', err.response ? err.response.data : err.message);
    }
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setFile(null);
  };

  return (
    <div className="mypost-container">
      <button
        type="button"
        className="btn btn create-post-btn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={resetForm}
      >
        Create a Post
      </button>
      {/* Modal for creating a post */}
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
                  <input type="text" className="form-control" id="recipient-name" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">Description:</label>
                  <textarea className="form-control" id="message-text" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="file-upload" className="col-form-label">File:</label>
                  <input type="file" className="form-control" id="file-upload" onChange={(e) => setFile(e.target.files[0])} />
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

      <h2 className='mb-3'>Your Posts</h2>
      {userPosts.length > 0 ? (
        <div className="myposts-list">
          {userPosts.map(post => (
            <div key={post._id} className="mypost-item">
              <Link to={`/post/${post._id}`} className='post-view'>
                <h5>{truncateText(post.title, 17)}</h5>
                <p>{truncateText(post.description, 20)}</p>
                <img src={`https://blog-website-backend-9nth.onrender.com/Images/${post.file}`} alt="" />
              </Link>
              <div className="post-actions">
                <Link to="#" className='btn btn-success mx-1' data-bs-toggle="modal" data-bs-target={`#editModal-${post._id}`} onClick={() => {
                  setTitle(post.title);
                  setDescription(post.description);
                  setFile(null);
                  setEditingPostId(post._id);
                }}>Edit</Link>
                <button className="btn btn-danger" onClick={() => handleDelete(post._id)}>Delete</button>
              </div>

              {/* Modal for editing a post */}
              <div className="modal fade" id={`editModal-${post._id}`} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleEdit(post._id);
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
        <p>No posts found.</p>
      )}
    </div>
  );
}

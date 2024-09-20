import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { userContext } from '../App';

document.title = 'Mewar Gallery - Your Posts';

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const [user] = useContext(userContext);

  useEffect(() => {
    axios.get(`https://blog-website-backend-9nth.onrender.com/getpostbyid/${id}`)
      .then(result => {
        setPost(result.data);
        setTitle(result.data.title);
        setDescription(result.data.description);
        setFile(result.data.file);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleDelete = (_id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      axios.delete(`https://blog-website-backend-9nth.onrender.com/deletepost/${_id}`)
        .then(result => {
          navigate('/');
        })
        .catch(err => console.log(err));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);
    axios.put(`https://blog-website-backend-9nth.onrender.com/editpost/${id}`, formData)
      .then(res => {
        if (res.data === 'Success') {
          window.location.href = '/';
        }
      })
      .catch(err => console.log(err));
  };

  const resetForm = () => {
    setTitle(post.title);
    setDescription(post.description);
    setFile(post.file);
  };

  return (
    <div className='postview_container'>
      <div className='postview'>
        <img src={`https://blog-website-backend-9nth.onrender.com/Images/${post.file}`} alt="" />
        <div className='poststext-view'>
          <h2>{post.title}</h2>
          <h5 className='text-center'>{post.description}</h5>
          <div className='post-view-btns d-flex justify-content-center'>
            {/* {user.email === post.email && (
              <>
                <button
                  className='btn btn-success mx-1'
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  onClick={resetForm}
                >
                  Edit
                </button>
                <button className='btn btn-danger' onClick={() => handleDelete(post._id)}>Delete</button>
              </>
            )} */}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="col-form-label">Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="col-form-label">Description:</label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="file" className="col-form-label">File:</label>
                  <input
                    type="file"
                    className="form-control"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
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
  );
}

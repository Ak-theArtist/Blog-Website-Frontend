import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);
  document.title = 'Mewar Gallery - Home';

  useEffect(() => {
    axios.get('https://blog-website-backend-9nth.onrender.com/getposts')
      .then(response => {
        if (Array.isArray(response.data)) {
          const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setPosts(sortedPosts);
        } else {
          console.error('Response data is not an array:', response.data);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="home-main">
      <div className='home-view'>
        {Array.isArray(posts) && posts.map(post => (
          <Link key={post._id} to={`/post/${post._id}`} className='post-view'>
            <img src={`https://blog-website-backend-9nth.onrender.com/Images/${post.file}`} alt="" />
            <div className="posttext-view">
              <h5>{post.title}</h5>
              <p>{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

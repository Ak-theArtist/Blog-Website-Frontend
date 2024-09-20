import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  document.title = 'Mewar Gallery - Home';

  useEffect(() => {
    axios.get('https://blog-website-backend-9nth.onrender.com/getposts')
      .then(response => {
        const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load posts.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-main">
      <div className='home-view'>
        {loading && <p>Loading posts...</p>}
        {error && <p>{error}</p>}
        {!loading && posts.map(post => (
          <Link key={post._id} to={`/post/${post._id}`} className='post-view'>
            <img src={`https://blog-website-backend-9nth.onrender.com/Images/${post.file}`} alt="" />
            <div className="posttext-view">
              <h5>{truncateText(post.title, 14)}</h5>
              <p>{truncateText(post.description, 40)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

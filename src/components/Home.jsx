import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);
  document.title = 'Mewar Gallery - Home';

  const apiBaseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get('https://blog-website-backend-9nth.onrender.com/getposts')
      .then(response => {
        const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
      })
      .catch(err => console.log(err));
  }, []);  

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="home-main">
      <div className='home-view'>
        {posts.map(post => (
          <Link key={post._id} to={`/post/${post._id}`} className='post-view'>
            <img src={`${apiBaseUrl}/Images/${post.file}`} alt="" />
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

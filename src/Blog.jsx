import { useState, useEffect } from "react";
import './Blog.css';
import axios from 'axios';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom";

function Blog() {
  const [data, setData] = useState([]);
  const [userid, setUserid] = useState('');
  const [currentp, setCurrentp] = useState(1);
  const [perPageData, setPerPageData] = useState(6);
  const [record, setRecord] = useState([]);
  const [category, setCategory] = useState('');
  const [interest, setInterest] = useState([]);
  const [mostInterest, setMostInterest] = useState('');

  // Pagination pages
  const pages = [];

  useEffect(() => {
    const getBlogs = async () => {
      const storedInterest = localStorage.getItem('interest');
      if (storedInterest) {
        setMostInterest(storedInterest);
        handleSelect(storedInterest); 
      } else {
        const token = Cookies.get('token');
        const userid = Cookies.get('userid');
        try {
          const res = await axios.get('https://blog-backend7729.vercel.app/user/blog', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUserid(userid);
          setData(res.data);
        } catch (error) {
          console.error('Error fetching all blogs:', error);
        }
      }
    };

    getBlogs();
  }, []);

  // Paginate data whenever 
  useEffect(() => {
    const lastpage = currentp * perPageData;
    const firstpage = lastpage - perPageData;
    if (data && data.length > 0) {
      setRecord(data.slice(firstpage, lastpage));
    }
  }, [data, currentp, perPageData]);

  // Create pagination numbers
  useEffect(() => {
    for (let i = 1; i <= Math.ceil(data.length / perPageData); i++) {
      pages.push(i);
    }
  }, [data, perPageData]);

  // Delete blog
  const deleteBlog = async (_id, img) => {
    const confirmDelete = window.confirm('Are you sure you want to delete ' + _id);
    if (confirmDelete) {
      const token = Cookies.get('token');
      try {
        const response = await axios.delete('http://localhost:3002/user/deleteblog', {
          headers: { Authorization: `Bearer ${token}` },
          data: { _id, img }
        });
        if (response.status === 200) {
          setRecord(data.filter(data => data._id !== _id));
        } else if (response.status === 400) {
          alert('Blog not found');
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete the blog');
      }
    }
  };

  // Filter by category and store interest
  const handleSelect = async (selectedCategory) => {
    setCategory(selectedCategory);
    const updatedInterest = [...interest, selectedCategory];
    setInterest(updatedInterest);

    // Find the most frequent interest
    const counts = updatedInterest.reduce((acc, interest) => {
      acc[interest] = (acc[interest] || 0) + 1;
      return acc;
    }, {});
    const mostViewedCategory = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));

    localStorage.setItem('interest', mostViewedCategory); // Store most viewed category
    setMostInterest(mostViewedCategory);

    try {
      const token = Cookies.get('token');
      const userid = Cookies.get('userid');
      const res = await axios.get(`https://blog-backend7729.vercel.app/user/blogviewC/${selectedCategory}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 200 && res.data.length > 0) {
        setData(res.data);
        setUserid(userid);
      } else {
        setData([]);
        alert('No blog found for this category');
      }
    } catch (err) {
      console.log('Error fetching category blogs:', err);
    }
  };

  return (
    <div className="blog">
      <div className="blogbanner">
        <h3>Create Your Blog - Share Your Story with the World!</h3>
        <div>
          <NavLink to="/Addblog" type="button" className="btn-add-blog">Add More Blog</NavLink>
        </div>
      </div>

      <div className="divsearchblog">
        <button onClick={() => handleSelect('Programming')}>Programming</button>
        <button onClick={() => handleSelect('Health')}>Health</button>
        <button onClick={() => handleSelect('Fitness')}>Fitness</button>
        <button onClick={() => handleSelect('Food')}>Food</button>
      </div>

      <div className="d-flex flex-wrap allblog">
        {record.length === 0 ? (
          <p>No blogs available</p>
        ) : (
          record.map((item) => (
            <div className="blogs" key={item._id}>
              {userid === item.userid && (
                <FontAwesomeIcon icon={faTrash} size="2x" className="icontrash" onClick={() => deleteBlog(item._id, item.img)} />
              )}
              <img src={`https://blog-backend7729.vercel.app/${item.img}`} alt={item.name} />
              <h3>{item.name}</h3>
              <p dangerouslySetInnerHTML={{ __html: item.discription }} />
              <NavLink className="btn-viewblog" to={`/ViewBlog/${item._id}`}>Read More</NavLink>
            </div>
          ))
        )}
      </div>

      <div style={{ textAlign: 'center' }}>
        {pages.map((num, ind) => (
          <button
            className="btn btn-primary"
            key={ind}
            onClick={() => setCurrentp(num)}>
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Blog;

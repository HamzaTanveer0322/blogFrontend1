import { useState } from 'react'
import './Account.css';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faTrash,  } from "@fortawesome/free-solid-svg-icons";
import { logout } from './AuthSlice';
import {  useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import img from './assets/banner.png'
import { useNavigate } from 'react-router-dom';
function Account() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
 
    const [data,setdata]=useState([])
    const [name,setname]=useState('')
    const [userid,setuserid]=useState('')

   

    useEffect(() =>{
        const getblog=async()=>{
          const token =Cookies.get('token');
          const user =Cookies.get('user');
          const uid =Cookies.get('userid');
          setuserid(uid)
          setname(user)
        const res=await  axios.get(`http://localhost:3002/user/blog`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        setdata(res.data)
        }
        getblog()
      },[]);
     
      
    //delete blog
    const deleteblog = async (_id, img) => {
      const confirmDelete = confirm('Are you sure you want to delete ' + _id);
      if (confirmDelete) {
        const token = Cookies.get('token');
        try {
          const response = await axios.delete('https://blog-backend7729.vercel.app/user/deleteblog', {
            headers: { Authorization: `Bearer ${token}` },
            data: {
              _id,
              img
            }
          });
          if (response.status === 200) {
            setdata(data.filter(data => data._id !==_id));
          }
          if(response.status ===400){
            alert('Blog not found');
          }
        } catch (error) {
          console.error('Error deleting blog:', error);
          alert('Failed to delete the blog');
        }
      }
    };
//logout
const { isAuthenticated, user } = useSelector((state) => state.auth);
const handleLogout = () => {
  Cookies.remove('token');
 
  Cookies.remove('user');
  dispatch(logout());
  navigate('/login') 
};

  return (
   <>
   <div className="main">
    <div className="aboutSection">
        <img src={img} alt='img'/>
       <p>{name}</p>
<button className='btn' onClick={()=>{handleLogout()}}>Logout</button>
<button  className='btn'>Setting</button>

        </div>

    <div className='mainblogmanu'>
        <h4>My Blog</h4>
        {data.length === 0 ? (
  <p>No Blog</p>
) : (
  data.filter((item) => item.userid === userid).length === 0 ? ( // Check if no blogs match userid
    <p>No Blog</p>
  ) : (
    data.map((item) => (
      item.userid === userid && (  // Display blog only if userid matches
        <div className="blogmenu" key={item._id}>
          <div className='blogaimg'>
            <img src={`https://blog-backend7729.vercel.app/${item.img}`} className='img' alt={item.name || 'Blog Image'} />
          </div>
          <div>
            <p>{item.name}</p>
          </div>
          <div>
            <p>{item.date}</p>
          </div>
          <button className='btns'>Edit</button>
          <div>
            <FontAwesomeIcon icon={faTrash} onClick={() => deleteblog(item._id, item.img)} className="trash" />
          </div>
        </div>
      )
    ))
  )
)}

       

        </div>
   </div>
   </>
  )
}

export default Account
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEdit,  } from "@fortawesome/free-solid-svg-icons";
import blog from './assets/blogbanner.png'
import axios from "axios";
import 'react-quill/dist/quill.snow.css';
import  './Addblog.css';
import ReactQuill from 'react-quill';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
 import { useState } from "react";
function Addblog() {
  const navigate=useNavigate()
  const [file, setFile] = useState();
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [name,setname]=useState('');
  const [auth,setauth]=useState('');
  const [userid,setuserid]=useState('');
const [check,setcheck]=useState(false)
const [discription,setdata]=useState('');
const modules = {
  toolbar: [
    [{'header':[1,2,3,4,5,6] }, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['image'] // Add image icon
  ]
};
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleUpload = async (event) => {
    event.preventDefault();
  
    
console.log(file)
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
const data={
  name,
  discription,
  auth,
  userid,
  category,

}
    const formData = new FormData();
    formData.append('blogimg', file);
    formData.append('data', JSON.stringify({
      ...data,
      discription: value // store the HTML content
    }));
    try {
      const token =Cookies.get('token');
  console.log(token);
      const response = await axios.post('http://localhost:3002/user/upload', formData, {
        
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}` 
        },

      });
      if(response.status===200){
      navigate('/')
      }
      if(response.status===400){
        alert('auth or Discription are required')
      }
      
  
    

  
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('Auth or Description');
        navigate('/Login'); // Navigate to login if 401 Unauthorized
      } else {
        console.error('An error occurred:', error.message);
      }
    }
  }

//discription value update
const handleChange = (content) => {
  const Auth=Cookies.get('user')  ;
  const userid=Cookies.get('userid')  ;
  if(!Auth){
  console.log('author no existing');
  return;
  }

 setauth(Auth)

 setuserid(userid)
 setValue(content)
  // Update the description field in the data object
  setdata( content );

};
  // const [blogs,setblogs]=useState({
  //   name:'',
  //   discription:'',
  // })
 function handleSelect(setC){
  setCategory(setC);
 
setcheck(false)
 }
  return (
   <>
 
 <div className="container">
      {/* Image Section */}
      <div className="d-flex justify-content-center align-items-center">
        <img
          src={blog} 
          className="img-fluid addblogimg"
          
          alt="Centered"
        />
      </div>

      {/* Form and Edit Icon Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between mt-4">
        <form onSubmit={handleUpload} className="mb-3 mb-md-0">
          <input type="file" onChange={handleFileChange} />
          <button type="submit" className="btn btn-primary mt-2">Upload</button>
        </form>
      
      </div>
<div><button className="btn btn-dark" onClick={()=>setcheck(!check)}>{category?`${category}`:'Select Catagory'}</button>
<div className={`${check?'actives':''} catogarylist`}>



<button onClick={() => handleSelect('Programming')}>Programming</button>
      <button onClick={() => handleSelect('Health')}>Health</button>
      <button onClick={() => handleSelect('Fitness')}>Fitness</button>
      <button onClick={() => handleSelect('Food')}>Food</button>

  </div>
  </div>
      {/* Author Input Section */}
      <div className="container mt-3 blognamecss">
        <input
          type="text"
          placeholder="Blog Name"
          name="name"
          value={name}
          onChange={(e) =>setname(e.target.value) }
        
         
          className="form-control formc"
        />
      </div>

      {/* Text Editor Section */}
   
      <div className="containers">

      <div className="row">
     
      <ReactQuill theme="snow"  modules={modules}value={value}  onChange={handleChange} />
      </div>
     

      </div>

    </div>
   </>
  
  )}


export default Addblog
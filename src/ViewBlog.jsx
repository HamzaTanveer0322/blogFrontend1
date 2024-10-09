import { useParams } from "react-router-dom"
import axios from "axios";
import Cookies from 'js-cookie';
import './ViewBLog.css';
import {  faTrash,  } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
 FacebookIcon

} from 'react-share';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';
function ViewBlog() {
    const [data,setdata]=useState([]);
    
  const [discription, setDescription] = useState('');
 
 const[showC,setshowC]=useState(false)
const [comit,setcomit]=useState([])
const [Users,setuser]=useState('')
const [uid,setuid]=useState('')
const {_id}=useParams();
useEffect (()=>{
  const user = Cookies.get('user');
  const userid = Cookies.get('userid');
  if (user) {
    setuid(userid)
    console.log(user,userid)
    setuser(user);}
  const  getBlog=async()=>{
const token=Cookies.get('token')
      const response=await axios.get(`https://blog-backend7729.vercel.app/user/viewblog/${_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if(response.status===200)
     {
     
         setdata(response.data)
      
     }
    }
    const  getcommit=async()=>{
      const token=Cookies.get('token')
            const response=await axios.get(`https://blog-backend7729.vercel.app/user/viewcomment/${_id}`, {
              headers: { Authorization: `Bearer ${token}` }
            })
            if(response.status===200)
           {
            console.log(response.data)
               setcomit(response.data)
              
           }
          }
        

          getcommit()
    getBlog()
},[])


    const postcommit=async()=>{
try {
  const token = Cookies.get('token');
  
  if (!token) {
    throw new Error('Token is missing!');
  }

  const res = await axios.post('https://blog-backend7729.vercel.app/user/blogcommit', {discription,Users,_id,uid}, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (res.status === 200) {
    console.log('Comment submitted successfully!');
  }
} catch (err) {
  console.log(err.response ? err.response.data : err.message);
}

}




//deletecommit

    //delete blog
    const deleteComment = async (_id) => {
      const confirmDelete = confirm('Are you sure you want to delete ' + _id);
      if (confirmDelete) {
        const token = Cookies.get('token');
        try {
          const response = await axios.delete('https://blog-backend7729.vercel.app/user/deletecommit', {
            headers: { Authorization: `Bearer ${token}` },
            data: {
              _id
            }
          });
          if (response.status === 200) {
            setcomit(comit.filter(comment => comment._id !==_id));
          }
          if(response.status ===400){
            alert('comment not found');
          }
        } catch (error) {
          console.error('Error deleting comments:', error);
          alert('Failed to delete the comment');
        }
      }
    };
    const url = window.location.href; // Current page URL
      const title = data.name;
  return (
   
   <div className=" img-fluid viewblog">
   { data.length===0? <p>something went wrong </p>:
  <> <img  className="bimg"src={`https://blog-backend7729.vercel.app/${data.img}`}  alt={data.name}/>
   <h2>{data.name}</h2>
  <div dangerouslySetInnerHTML={{__html:data.discription}}/>
  <p style={{ textAlign: 'right' }}>
  <small style={{ color: '#c0c0c0' }}>{data.date}</small>
</p>
<div style={{ textAlign: 'right' }}>
     
      
      <FacebookShareButton url={url} title={title}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>


            <WhatsappShareButton url={url} title={title}>
    <WhatsappIcon size={32} round />
</WhatsappShareButton>
    </div>

  </>
   }

     <div className="comment-section">
      <h3>Write a Comment</h3>
     
      <textarea
        placeholder="Comment Description"
        value={discription}
        onChange={(e) => setDescription(e.target.value)}
        className="input-field"
      />
      <button onClick={()=>postcommit()} className="btn-add-comment curser-pointer">Add Comment</button>

    </div>
    <button className="showCommentbtn"onClick={()=>setshowC(!showC)}>{showC?<p className="showcom">^</p>:<p>v </p>}</button>
   {showC? <div className="comments-list ">
        {comit.length > 0 ? (
          comit.map(comment => (
            <div key={comment._id} className="comment-item d-flex">
              <div className="comment-details">
                <p><strong>{comment.user}</strong></p>
              
                <p>{comment.discription}</p>
                <p><small>{comment.date}</small></p>
              </div>
           {uid===comment.uid?  <button className="btn-delete" onClick={() => deleteComment(comment._id)}>
                <FontAwesomeIcon icon={faTrash}  />
              </button>:console.log(uid,comment.blogid)}
            </div>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div> :null}
    
   </div>
   
  )
}

export default ViewBlog

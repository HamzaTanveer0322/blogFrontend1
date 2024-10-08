import {useState,useEffect} from 'react'
import { NavLink ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { login, logout } from './AuthSlice';
 function Login () {
  const dispatch = useDispatch();


const navigate=useNavigate()
const [err,seterr]=useState(false)


  const [data, setData] = useState({
    password: '',
    email: ''
  });



  useEffect(() => {
    const token = Cookies.get('token');
 
    if (token && isTokenValid(token)) {
      console.log("Token is valid");


    } else {
      console.log("Token is no valid");

      // Token is invalid or does not exist
      Cookies.remove('token'); // Clear any invalid token
    }
  }, []);

  // Function to check if the token is valid
  function isTokenValid(token) {
  
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        const oneMinuteAfter = currentTime + 60; // 1 minute later
      const buffer=10
        return decoded.exp > (oneMinuteAfter+buffer);
    } catch (error) {
      console.error("Invalid token format", error);
      return false;
    }
  }


 
  function changedata(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }
  

  const submit = async (e) => {
    e.preventDefault();
    try{
      const result = await axios.post('https://blog-backend7729.vercel.app/user/login', data,{ withCredentials: true});

      if (result.status === 200) {
        const User={
        name: result.data.user.name  
        }
        dispatch(login(User));
        navigate('/');
        const token = result.data.acesstoken  
        const user = result.data.user.name  
        const userid = result.data.user._id  
        if (token) {
     
          console.log("Token:", token); 
        } else {
          console.log("Token not found in the response");
        }
     
    Cookies.set('token', token, { secure: true, sameSite: 'strict' });
    Cookies.set('user', user, { secure: true, sameSite: 'strict' });
    Cookies.set('userid', userid, { secure: true, sameSite: 'strict' });
      setData({
        password: '',
        email: '',
      });

      console.log("Login successful!");
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('error');
     seterr(true) // Navigate to login if 401 Unauthorized
    } else {
      console.error('An error occurred:', error.message);
    }
    console.error("Login failed:", error);
  }
  };
 
  return (
  <>
    <section className="h-90" style={{ backgroundColor: '#fff' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-80">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-4 p-lg-5 text-black">
                <form onSubmit={submit}>
                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                    <span className="h1 fw-bold mb-0">Blogs</span>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Login</h5>
{err?<p style={{color:'red'}}>username or password incorrect</p>:null}
                  <div className="form-outline mb-4">
                    <input type="email" className="form-control form-control-lg" required name="email" value={data.email} onChange={changedata} />
                    <label className="form-label" htmlFor="form2Example17">Email address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example27" className="form-control form-control-lg" name="password" value={data.password} onChange={changedata} />
                    <label className="form-label" htmlFor="form2Example27">Password</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                  
                  </div>

                  <a className="small text-muted" href="#!">Forgot password?</a>
                  <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}></p>
                  <p>   Dont have account : 
                  <NavLink to='/Signup'>Register</NavLink><br></br></p>
                  <a href="#!" className="small text-muted">Terms of use.</a>
                  <a href="#!" className="small text-muted">Privacy policy</a>
                </form>
                {/* Show the email after successful login */}
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section></>
  )
}

export default Login
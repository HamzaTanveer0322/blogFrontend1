
import axios from "axios";
import { NavLink,useNavigate } from 'react-router-dom';
import { useState } from "react";

function Signup() {
  const navigate=useNavigate();
  const [data, setData] = useState({
    name: '',
    password: '',
    email: ''
  });
  
  function changedata(e) { 
    setData({
      ...data,
      [e.target.name]: e.target.value

    });
    console.log(data.email)
  }
  
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://blog-backend7729.vercel.app/user/signup', data);
  
      // Check for status 201, which is the correct status code for user creation
      if (res.status === 201) {
        const token = res.data.token;
       console.log(token);
        setData({
          password: '',
          name: '',
          email: ''
        });
        navigate('/login');
      }
    } catch (err) {
     
      console.log("Error message: ", err);
    }
  
  
}
  return (
    <section className="h-90" style={{ backgroundColor: '#fff' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-80">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-4 p-lg-5 text-black">
                <form>
                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                    <span className="h1 fw-bold mb-0">Blogs</span>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>SignUp </h5>
                  <div className="form-outline mb-4">
                    <input type="username"  className="form-control form-control-lg"   name="name"value={data.name} onChange={changedata} />
                    <label className="form-label" htmlFor="form2Example17">UserName</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="email"  className="form-control form-control-lg"name="email" value={data.email}onChange={changedata} />
                    <label className="form-label" htmlFor="form2Example17">Email address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example27" className="form-control form-control-lg" name="password" value={data.password} onChange={changedata}/>
                    <label className="form-label" htmlFor="form2Example27">Password</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" type="button" onClick={submit}>Signup</button>
                  </div>

                  <a className="small text-muted" href="#!">Forgot password?</a>
                  <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                  <p>  Already have account :  
                  <NavLink to='/Login'>Login</NavLink><br></br></p>
                  
                  </p>
                  <a href="#!" className="small text-muted">Terms of use.</a>
                  <a href="#!" className="small text-muted">Privacy policy</a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;

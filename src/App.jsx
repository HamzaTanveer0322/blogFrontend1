
import { BrowserRouter ,  Route,  Routes } from 'react-router-dom';
import Navigation from './Navigation'
import Login from './Login';
import './App.css';
import SignUp from './Signup';
import Blog from './Blog';
import Addblog from './Addblog';
import PrivateRoute from '../Privateroute';
import ViewBlog from './ViewBlog';
import Account from './Account';
import Footer from './Footer';
import Contact from './Contact';
function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Navigation />
        <div className="content">
          <Routes>
            <Route path='/Login' element={<Login />} />
            <Route path='/Signup' element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path='/Account' element={<Account />} />
              <Route path='/' element={<Blog />} />
              <Route path='/Contact' element={<Contact />} />
              <Route path='/Addblog' element={<Addblog />} />
              <Route path='/ViewBlog/:_id' element={<ViewBlog />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}


export default App;

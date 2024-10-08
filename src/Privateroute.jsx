import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
const PrivateRoute = () => {
  const isAuthenticated = !!Cookies.get('token'); // Check if token exists in localStorage

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

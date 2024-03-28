import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { checkSession } from '../services/user';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    checkSession((isAuthenticated) => {
      if (!isAuthenticated) {
        navigate('/login', { replace: true });
      }
    });
  }, []);

  return children;
};

export default ProtectedRoute;

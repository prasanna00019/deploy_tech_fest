import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthenticationCheck = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Authentication protected routes
  const protectedRoutes = ['/events', '/event-details', '/profile', '/event-registration', '/events', '/admin'];

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const initials = localStorage.getItem('userInitials');
      const isAuthenticated = token && initials;
      const currentPath = location.pathname;

      // For authenticated users
      if (isAuthenticated) {
        // Prevent accessing login/register pages when authenticated
        if (['/login', '/register'].includes(currentPath)) {
          navigate('/', { replace: true });
          return;
        }
      } 
      // For non-authenticated users
      else {
        // Allow only public routes
        const isProtectedRoute = protectedRoutes.some(route => 
          currentPath.startsWith(route)
        );
        
        if (isProtectedRoute) {
          navigate('/login', { replace: true });
          return;
        }
      }
    };

    checkAuth();
  }, [navigate, location]);

  return children;
};

export default AuthenticationCheck;
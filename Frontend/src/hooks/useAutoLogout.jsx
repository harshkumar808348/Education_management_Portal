import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem('adminToken');
      const loginTime = localStorage.getItem('loginTime');

      if (token && loginTime) {
        const currentTime = Date.now();
        const loginTimeMs = parseInt(loginTime);
        const timeDiff = currentTime - loginTimeMs;
        
        // Check if 10 minutes (600000 ms) have passed
        if (timeDiff > 600000) {
          // Clear storage and redirect to login
          localStorage.removeItem('adminToken');
          localStorage.removeItem('loginTime');
          navigate('/admin/login');
        }
      }
    };

    // Check every minute
    const interval = setInterval(checkSession, 60000);
    
    // Initial check
    checkSession();

    return () => clearInterval(interval);
  }, [navigate]);
};
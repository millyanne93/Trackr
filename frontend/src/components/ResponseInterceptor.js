import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Cookies from 'js-cookie';

const ResponseInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          Cookies.remove('token');
          localStorage.removeItem('userData');
          navigate('/');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);

  return null;
};

export default ResponseInterceptor;

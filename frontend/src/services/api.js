import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'https://trackr-sooty.vercel.app',
  withCredentials: true,
  timeout: 6000,
  headers: {
    Accept: 'application/json',
  },
});

// Request interceptor to add the token
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  console.error('Error in request interceptor:', error);
  return Promise.reject(error);
});

// Response interceptor to handle errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Unauthorized access:', error.response.data.message || 'Session expired. Redirecting to home page.');
        alert('Session expired. Redirecting to home page.');

        Cookies.remove('token');
        localStorage.removeItem('userData');

        setTimeout(() => {
          window.location.href = '/'; // Redirect to login or home page
        }, 3000); // 3-second delay
      } else {
        console.error('Error:', error.response.data.message || 'An error occurred.');
        alert(error.response.data.message || 'An error occurred.');
      }
    } else {
      console.error('Error:', error.message);
      alert(error.message);
    }

    return Promise.reject(error);
  }
);

export default api;

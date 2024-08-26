import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
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
});

// Response interceptor to handle errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      Cookies.remove('token');
      localStorage.removeItem('userData');
      window.location.href = '/'; // Redirect to login or home page
    }
    return Promise.reject(error);
  }
);

export default api;

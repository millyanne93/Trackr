import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
    withCredentials: true,
    timeout: 60000,
    headers: {
        Accept: 'application/json',
    },
});

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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        console.warn('Session expired or unauthorized:', data.message);

        Cookies.remove('token');
        localStorage.removeItem('userData');

        alert('Your session has expired. Please log in again.');
        await new Promise(resolve => setTimeout(resolve, 2000));
        window.location.href = '/login';
        return Promise.reject(error);
      }

      if (status === 413) {
        console.warn('Payload too large:', data.message);
        alert('The file or data you are trying to upload is too large.');
        return Promise.reject(error);
      }

      if (status === 429) {
        console.warn('Rate limit exceeded:', data.message);
        alert('Too many requests. Please try again later.');
        return Promise.reject(error);
      }

      console.error(`API Error (${status}):`, data.message || 'An error occurred.');

      if (status !== 401) {
        alert(data.message || 'An error occurred. Please try again.');
      }

    } else if (error.request) {

      console.error('Network error:', error.message);
      alert('Network error. Please check your connection and try again.');
    } else {

      console.error('Unexpected error:', error.message);
      alert('An unexpected error occurred. Please try again.');
    }

    return Promise.reject(error);
  }
);

export default api;

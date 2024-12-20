import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError('Username and password are required.');
      return;
    }

    try {
      const response = await axios.post('https://trackr-sooty.vercel.app/api/login', formData);
      const { token, user } = response.data;
      const { role, username } = user;

      if (response.status === 200) {
        setSuccess('Login successful!');
        Cookies.set('token', token, { expires: 1 }); // Store token in cookies
        localStorage.setItem('role', role); // Store role in localStorage
        localStorage.setItem('userName', username); // Store username in localStorage

        if (role === 'admin') {
          navigate('/admin-home');
        } else {
          navigate('/user-home');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-200 to-teal-100 bg-cover bg-center p-4"> {/* Apply your custom background class here */}
      <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded shadow">
        <h2 className="text-2xl text-teal-700 mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-teal-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-teal-700 text-white px-4 py-2 rounded-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

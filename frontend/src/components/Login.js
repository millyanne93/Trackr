import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      const response = await axios.post('http://localhost:5000/api/login', formData);
      const { role, token, username } = response.data.user; // Extract username

      console.log('Role received:', role);  // Debugging line

      if (response.status === 200) {
        setSuccess('Login successful!');
        localStorage.setItem('authToken', token);
        localStorage.setItem('role', role); // Store role in localStorage
        localStorage.setItem('userName', username); // Store username in localStorage

        if (role === 'admin') {
          navigate('/admin-home');
        } else {
          navigate('/user-home');
        }
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Login failed.');
      } else {
        setError('An error occurred.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded shadow">
      <h2 className="text-2xl text-green-700 mb-4">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
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
        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

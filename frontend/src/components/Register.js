import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import Cookies to manage token
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

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
      const response = await axios.post('http://localhost:5000/api/register', formData);

      if (response.status === 201) {
        setSuccess('Registration successful!');
        setFormData({ username: '', password: '', role: 'user' });
        setError('');

        // Store token in cookies
        const { token } = response.data;
        if (token) {
          Cookies.set('token', token, { expires: 1 }); // Store token in cookies for 1 day
        }

        // Store additional user info
        const { role, username } = response.data.user;
        localStorage.setItem('role', role);
        localStorage.setItem('userName', username);

        // Redirect user based on role or to a default page
        if (role === 'admin') {
          navigate('/admin-home');
        } else {
          navigate('/user-home');
        }
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Registration failed.');
      } else {
        setError('An error occurred. Please check your connection.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded shadow">
      <h2 className="text-2xl text-green-700 mb-4">Register</h2>
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
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user',
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
      const response = await axios.post('https://trackr-sooty.vercel.app/api/register', formData);

      if (response.status === 201) {
        const { token } = response.data; // Extract the token from response

        // If token exists, store it in cookies
        if (token) {
          Cookies.set('token', token, { expires: 1 }); // Token will be stored in cookies for 1 day
        }

        setSuccess('Registration successful!');
        setFormData({ username: '', password: '', role: 'user' });
        setError('');

        navigate('/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-custom-background bg-cover bg-center p-4"> {/* Apply your custom background class here */}
      <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded shadow">
        <h2 className="text-2xl text-teal-700 mb-4">Register</h2>
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
          <button type="submit" className="bg-teal-700 text-white px-4 py-2 rounded-full">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

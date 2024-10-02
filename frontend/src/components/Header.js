import React from 'react';
import { Link } from 'react-router-dom'; // Import React Router for navigation
import Cookies from 'js-cookie'; // Import Cookies to check authentication

const Header = () => {
  const token = Cookies.get('token'); // Check if user is logged in
  const role = localStorage.getItem('role'); // Get role from localStorage

  const handleLogout = () => {
    Cookies.remove('token'); // Remove token
    localStorage.removeItem('role'); // Clear role
    localStorage.removeItem('userName'); // Clear username
    window.location.href = '/login'; // Redirect to login
  };

  return (
    <header className="bg-teal-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl">Trackr</h1>
      <nav>
        <ul className="flex space-x-4">
          {/* General navigation links */}
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/about" className="hover:underline">About</Link></li>
          <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          
          {/* Role-based dashboard navigation */}
          {token ? (
            <>
              <li>
                <Link to={role === 'admin' ? '/admin-home' : '/user-home'} className="hover:underline">
                  Dashboard
                </Link>
              </li>
              <li><button onClick={handleLogout} className="hover:underline">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:underline">Login</Link></li>
              <li><Link to="/register" className="hover:underline">Register</Link></li> {/* Add Register link */}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

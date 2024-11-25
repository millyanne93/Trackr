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
    <header className="bg-gradient-to-r from-teal-200 to-teal-100 p-4 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="font-bold text-2xl text-teal-700">Trackr</h1>
        <nav>
          <ul className="flex space-x-4">
            {/* General navigation links */}
            <li>
              <Link
                to="/"
                className="bg-white text-teal-700 px-4 py-2 rounded-lg shadow hover:bg-teal-100 transition"
              >
                Home
              </Link>
            </li>
            {/* Role-based dashboard navigation */}
            {token ? (
              <>
                <li>
                  <Link
                    to={role === 'admin' ? '/admin-home' : '/user-home'}
                    className="bg-white text-teal-700 px-4 py-2 rounded-lg shadow hover:bg-teal-100 transition"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-white text-teal-700 px-4 py-2 rounded-lg shadow hover:bg-teal-100 transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="bg-white text-teal-700 px-4 py-2 rounded-lg shadow hover:bg-teal-100 transition"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="bg-white text-teal-700 px-4 py-2 rounded-lg shadow hover:bg-teal-100 transition"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

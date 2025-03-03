import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = Cookies.get('token');
  const role = localStorage.getItem('role');
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    window.location.href = '/login';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-teal-600 to-teal-800 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl tracking-tight">Trackr</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-teal-700 transition">
              Home
            </Link>
            
            {token ? (
              <>
                <Link 
                  to={role === 'admin' ? '/admin-home' : '/user-home'} 
                  className="px-3 py-2 rounded-md hover:bg-teal-700 transition"
                >
                  Dashboard
                </Link>
                
                <div className="relative group">
                  <button className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-teal-700 transition">
                    <FontAwesomeIcon icon={faUser} className="mr-1" />
                    <span>{userName || 'Account'}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-white text-teal-700 font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-white focus:outline-none"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-teal-700">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md hover:bg-teal-700 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {token ? (
              <>
                <Link 
                  to={role === 'admin' ? '/admin-home' : '/user-home'} 
                  className="block px-3 py-2 rounded-md hover:bg-teal-700 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md hover:bg-teal-700 transition"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md hover:bg-teal-700 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

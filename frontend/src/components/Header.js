import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, role, userName, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">

          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl tracking-tight text-forest-700">
              Trackr
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-ink hover:text-forest-700 hover:bg-forest-50 transition"
            >
              Home
            </Link>

            {token ? (
              <>
                <Link
                  to={role === 'admin' ? '/admin-home' : '/user-home'}
                  className="px-3 py-2 rounded-md text-ink hover:text-forest-700 hover:bg-forest-50 transition"
                >
                  Dashboard
                </Link>

                <div className="relative group">
                  <button className="flex items-center space-x-1 px-3 py-2 rounded-md text-ink hover:text-forest-700 hover:bg-forest-50 transition">
                    <FontAwesomeIcon icon={faUser} className="mr-1" />
                    <span>{userName || 'Account'}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block border border-forest-100">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-ink hover:bg-forest-50 transition"
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
                className="bg-forest-600 text-white font-medium px-4 py-2 rounded-md hover:bg-forest-700 transition"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-ink focus:outline-none"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-forest-100">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-ink hover:text-forest-700 hover:bg-forest-50 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {token ? (
              <>
                <Link
                  to={role === 'admin' ? '/admin-home' : '/user-home'}
                  className="block px-3 py-2 rounded-md text-ink hover:text-forest-700 hover:bg-forest-50 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-ink hover:text-forest-700 hover:bg-forest-50 transition"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-ink hover:text-forest-700 hover:bg-forest-50 transition"
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

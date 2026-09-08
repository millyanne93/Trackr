import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-700 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <div>
            <Link to="/" className="text-xl font-bold tracking-tight">
              Trackr
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link to="/" className="hover:text-forest-200 transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-forest-200 transition-colors">
              About
            </Link>
            <Link to="/contact" className="hover:text-forest-200 transition-colors">
              Contact
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/millyanne93"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-forest-200 transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
            <a
              href="https://linkedin.com/in/millyanne-wanjala-5365306b"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-forest-200 transition-colors"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-forest-200 transition-colors"
            >
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-forest-600 mt-6 pt-4 text-center">
          <p className="text-sm text-forest-200">
            &copy; {currentYear} Trackr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-gray-200">
      {/* Main Footer */}
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Trackr</h3>
            <p className="mb-4 text-gray-300">
              Seamlessly track and manage your equipment with our comprehensive solution.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-teal-400 transition">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-teal-400 transition">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-teal-400 transition">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-teal-400 transition">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-teal-400 transition flex items-center">
                  <span className="mr-2">›</span> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-teal-400 transition flex items-center">
                  <span className="mr-2">›</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-300 hover:text-teal-400 transition flex items-center">
                  <span className="mr-2">›</span> Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-teal-400 transition flex items-center">
                  <span className="mr-2">›</span> Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-teal-400 transition flex items-center">
                  <span className="mr-2">›</span> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-teal-400 transition flex items-center">
                  <span className="mr-2">›</span> FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-300 hover:text-teal-400 transition flex items-center">
                  <span className="mr-2">›</span> Support
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-teal-400 transition flex items-center">
                  <span className="mr-2">›</span> Blog
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-teal-400 transition flex items-center">
                  <span className="mr-2">›</span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-teal-400 transition flex items-center">
                  <span className="mr-2">›</span> Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-teal-400 mr-3 mt-1" />
                <span>123 Trackr Street, Technology Park, TechCity, 12345</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="text-teal-400 mr-3" />
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-teal-400 mr-3" />
                <span>info@trackr.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} Trackr. All rights reserved.
            </p>
            <div className="mt-2 md:mt-0">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-teal-400 transition mr-4">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-teal-400 transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

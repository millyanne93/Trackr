import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-400 text-black py-footer-padding mt-auto">
    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
      <div>
        <h3 className="font-semibold text-base">Trackr</h3>
        <p className="text-sm">Seamlessly track and manage your equipment!</p>
      </div>
      <div>
        <h3 className="font-semibold text-base">RESOURCES</h3>
        <ul className="space-y-1">
          <li><Link to="/about" className="hover:text-teal-600 transition">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-teal-600 transition">Contact</Link></li>
          <li><Link to="/faq" className="hover:text-teal-600 transition">FAQ</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-base">COMPANY</h3>
        <ul className="space-y-1">
          <li><Link to="/careers" className="hover:text-teal-600 transition">Careers</Link></li>
          <li><Link to="/blog" className="hover:text-teal-600 transition">Blog</Link></li>
          <li><Link to="/privacy" className="hover:text-teal-600 transition">Privacy Policy</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-base">FOLLOW US</h3>
        <div className="flex space-x-2">
          <a href="https://facebook.com" className="hover:text-teal-600 transition">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://twitter.com" className="hover:text-teal-600 transition">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://linkedin.com" className="hover:text-teal-600 transition">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>
    </div>
    <p className="text-center mt-3 text-sm">&copy; 2024 Trackr. All rights reserved.</p>
  </footer>
);

export default Footer;

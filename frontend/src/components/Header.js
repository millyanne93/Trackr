import React from 'react';
import { Link } from 'react-router-dom'; // Import React Router for navigation

const Header = () => (
  <header className="bg-green-700 text-white p-4 flex justify-between items-center">
    <h1 className="text-2xl">Trackr</h1>
    <nav>
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        <li><Link to="/about" className="hover:underline">About</Link></li>
        <li><Link to="/contact" className="hover:underline">Contact</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;

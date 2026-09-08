import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/trackr.jpg';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          Trackr
        </h1>
        <p className="text-xl md:text-2xl mb-3 font-light">
          Equipment tracking, without the spreadsheet
        </p>
        <p className="text-lg md:text-xl mb-8 text-white/80">
          Know where every asset is, who has it, and when it's due back.
        </p>
        <Link
          to="/register"
          className="inline-block bg-forest-600 hover:bg-forest-700 text-white px-8 py-3 rounded-md font-medium text-lg transition-colors duration-200"
        >
          Start Now
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

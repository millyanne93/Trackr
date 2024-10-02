import React from 'react';

const HomePage = () => (
  <div className="p-4 bg-gray-100">
    {/* Header Section */}
    <header className="text-center mb-8">
      <h1 className="text-4xl font-bold text-teal-700 mb-4">Trackr: Efficient Equipment Tracking for Your Business</h1>
      <p className="text-lg mb-6">Keep track of your organization's equipment effortlessly with our intuitive software solution.</p>
      <a href="/register" className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition">Get Started</a>
    </header>
    
    {/* Features Section */}
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-teal-700 mb-6">Why Trackr Stands Out</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold text-teal-600 mb-3">Centralized Equipment Management</h3>
          <p className="text-gray-700">Easily track and manage all your equipment from a single, centralized platform.</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold text-teal-600 mb-3">Real-Time Tracking and Updates</h3>
          <p className="text-gray-700">Get real-time updates on equipment status and location to stay informed and efficient.</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold text-teal-600 mb-3">Comprehensive Reporting</h3>
          <p className="text-gray-700">Generate detailed reports to monitor equipment usage, maintenance schedules, and more.</p>
        </div>
      </div>
    </section>

    {/* Benefits Section */}
    <section className="bg-white p-6 rounded shadow mb-12">
      <h2 className="text-3xl font-bold text-teal-700 mb-6">What You Gain with Trackr</h2>
      <ul className="list-disc list-inside mb-6">
        <li className="mb-2">Streamlined equipment tracking</li>
        <li className="mb-2">Improved asset management</li>
        <li className="mb-2">Efficient resource utilization</li>
        <li className="mb-2">Enhanced maintenance management</li>
      </ul>
      <a href="/register"  className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition">Start Now</a>
    </section>

    {/* Footer Section */}
    <footer className="text-center text-gray-600 mt-12">
      <p>Providing an intuitive and effective solution for  and managing your organization's equipment.</p>
    </footer>
  </div>
);

export default HomePage;

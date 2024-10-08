import React from 'react';
import { FaTools, FaBell, FaHistory, FaClipboardCheck, FaExchangeAlt, FaEnvelopeOpenText } from 'react-icons/fa';

const HomePage = () => (
  <section className="min-h-screen bg-custom-background bg-cover bg-center">
    <div className="p-4 bg-gray-100 bg-opacity-80">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-teal-700 mb-4">Trackr: Seamless Equipment Tracking for Your Business</h1>
        <p className="text-lg mb-6">Easily manage your equipment and track who has it, along with optional return dates.</p>
        <a href="/register" className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600 transition">Get Started</a>
      </header>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-teal-700 mb-6">Core Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow flex items-start">
            <FaTools className="text-teal-600 text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-bold text-teal-600 mb-3">Effortless Equipment Assignment</h3>
              <p className="text-gray-700">Easily assign equipment with the option to set return dates, making resource management smooth and straightforward.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded shadow flex items-start">
            <FaBell className="text-teal-600 text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-bold text-teal-600 mb-3">Instant Notifications</h3>
              <p className="text-gray-700">Send notifications to keep your team informed about equipment assignments and return schedules.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded shadow flex items-start">
            <FaHistory className="text-teal-600 text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-bold text-teal-600 mb-3">Assignment History</h3>
              <p className="text-gray-700">Track past assignments to maintain clear records of who has held which equipment and when.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white p-6 rounded shadow mb-12">
        <h2 className="text-3xl font-bold text-teal-700 mb-6">Benefits of Using Trackr</h2>
        <ul className="list-disc list-inside mb-6">
          <li className="mb-2 flex items-start">
            <FaClipboardCheck className="text-teal-600 mr-2" />
            Simplified equipment tracking and management
          </li>
          <li className="mb-2 flex items-start">
            <FaExchangeAlt className="text-teal-600 mr-2" />
            Improved transparency and accountability
          </li>
          <li className="mb-2 flex items-start">
            <FaEnvelopeOpenText className="text-teal-600 mr-2" />
            Efficient communication with real-time notifications
          </li>
        </ul>
        <a href="/register" className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600 transition">Start Now</a>
      </section>

      {/* Footer Section */}
      <footer className="text-center text-gray-600 mt-12">
        <p>Trackr: A hassle-free way to manage equipment assignments and return schedules.</p>
      </footer>
    </div>
  </section>
);

export default HomePage;

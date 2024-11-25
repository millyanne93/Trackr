import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faBell, faHistory, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

const Features = () => {
  const features = [
    {
      icon: faTools,
      title: 'Effortless Equipment Management',
      description: 'Assign, track, and manage equipment with ease using intuitive tools.',
    },
    {
      icon: faBell,
      title: 'Real-Time Notifications',
      description: 'Stay updated with instant alerts for equipment assignments and returns.',
    },
    {
      icon: faHistory,
      title: 'Comprehensive History Logs',
      description: 'Maintain detailed records of past assignments and equipment usage.',
    },
    {
      icon: faExchangeAlt,
      title: 'Seamless Returns Process',
      description: 'Simplify the return process with tracking and automated reminders.',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-teal-200 to-teal-100 py-20 px-4">
      <h1 className="text-5xl font-bold text-teal-600 text-center mb-10">Explore Trackr's Key Features</h1>
      <p className="text-lg text-center mb-16">Simplify your equipment tracking and management with these powerful tools.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-teal-300 to-teal-100 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition"
          >
            <div className="bg-teal-600 text-white p-4 rounded-full inline-block mb-4">
              <FontAwesomeIcon icon={feature.icon} size="2x" />
            </div>
            <h3 className="text-2xl font-semibold text-black mb-2">{feature.title}</h3>
            <p className="text-black">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;

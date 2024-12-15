import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faBell, faHistory, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

const Features = () => {
  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

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
    <div className="bg-white py-20 px-4">
      {/* Title Section */}
      <h1 className="text-5xl font-bold text-teal-600 text-center mb-10">Explore Trackr's Key Features</h1>
      <p className="text-lg text-center mb-16">Simplify your equipment tracking and management with these powerful tools.</p>
      
      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="relative bg-gradient-to-r from-teal-300 to-teal-100 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ scale: 1.1, rotate: 3 }}
          >
            {/* Shining Effect */}
            <div
              className="absolute inset-0 rounded-lg animate-glitter pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(45deg, rgba(255, 215, 0, 0.7), rgba(255, 105, 180, 0.7), rgba(0, 255, 255, 0.7), rgba(255, 20, 147, 0.7))',
                backgroundSize: '400% 400%',
                border: '4px solid transparent',
              }}
            ></div>

            {/* Icon and Content */}
            <div className="relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-full inline-block mb-4">
                <FontAwesomeIcon icon={feature.icon} size="2x" />
              </div>
              <h3 className="text-2xl font-semibold text-black mb-2">{feature.title}</h3>
              <p className="text-black">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;

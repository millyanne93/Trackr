import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faBell, faHistory, faExchangeAlt, faChartLine, faUserShield } from '@fortawesome/free-solid-svg-icons';

const Features = () => {
  // Enhanced animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const features = [
    {
      icon: faTools,
      title: 'Equipment Management',
      description: 'Assign, track, and manage equipment with intuitive tools.',
      color: 'from-teal-500 to-emerald-600',
    },
    {
      icon: faBell,
      title: 'Real-Time Notifications',
      description: 'Stay updated with instant alerts for equipment assignments and returns.',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: faHistory,
      title: 'Comprehensive History',
      description: 'Maintain detailed records of past assignments and equipment usage.',
      color: 'from-violet-500 to-purple-600',
    },
    {
      icon: faExchangeAlt,
      title: 'Seamless Returns',
      description: 'Simplify the return process with tracking and automated reminders.',
      color: 'from-pink-500 to-rose-600',
    },
    {
      icon: faChartLine,
      title: 'Advanced Analytics',
      description: 'Get insights into equipment usage patterns and optimize resource allocation.',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: faUserShield,
      title: 'Role-Based Access',
      description: 'Control who can assign, modify, and view equipment with detailed permissions.',
      color: 'from-cyan-500 to-teal-600',
    },
  ];

  return (
    <div className="relative bg-white py-20 px-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-teal-100 rounded-full filter blur-3xl opacity-40"></div>
      <div className="absolute bottom-40 left-0 w-80 h-80 bg-blue-100 rounded-full filter blur-3xl opacity-30"></div>
      
      {/* Title Section with gradient text */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
          Powerful Features
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Simplify your equipment tracking and management with these powerful tools designed for modern businesses.
        </p>
      </motion.div>

      {/* Feature Cards in a grid with staggered animation */}
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`relative overflow-hidden bg-gradient-to-br ${feature.color} p-8 rounded-xl shadow-xl text-white 
                      transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
            variants={cardVariants}
            whileHover={{ y: -5 }}
          >
            {/* Decorative circles */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full"></div>
            
            {/* Icon with enhanced styling */}
            <div className="relative z-10">
              <div className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-lg inline-block mb-6 shadow-lg">
                <FontAwesomeIcon icon={feature.icon} size="2x" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-white/90 text-lg">{feature.description}</p>
            </div>
            
            {/* Add a subtle arrow or indicator for interaction */}
            <div className="absolute bottom-4 right-4 opacity-70">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Additional Feature Highlights Section */}
      <motion.div 
        className="mt-20 bg-gradient-to-r from-teal-50 to-blue-50 p-12 rounded-3xl max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold text-teal-700 mb-8 text-center">Why Choose Trackr Features?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-teal-600 mb-3">Built For Teams</h3>
            <p className="text-gray-700">Our collaborative features allow seamless communication between team members, ensuring everyone stays informed about equipment status.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-teal-600 mb-3">Enterprise-Grade Security</h3>
            <p className="text-gray-700">Rest easy knowing your data is protected with our top-tier security protocols and regular backups.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-teal-600 mb-3">Continuous Updates</h3>
            <p className="text-gray-700">We're constantly improving our platform with new features and enhancements based on user feedback.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-teal-600 mb-3">Seamless Integration</h3>
            <p className="text-gray-700">Connect Trackr with your existing tools through our API and ready-made integrations with popular platforms.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Features;

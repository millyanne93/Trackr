import React from 'react';
import { motion } from 'framer-motion'; // For animation
import { FaEnvelope } from 'react-icons/fa';

const ContactPage = () => (
  <div className="bg-white py-20 px-4">
    {/* Section Title */}
    <motion.h2
      className="text-4xl text-center font-bold text-teal-700 mb-6"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      Contact Us
    </motion.h2>
    
    {/* Introduction */}
    <motion.p
      className="text-lg text-gray-700 mb-6 text-center max-w-2xl mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      We're here to help! Feel free to reach out to us for any inquiries, support requests, or feedback. Our team is ready to assist you.
    </motion.p>

    {/* Contact Details */}
    <motion.section
      className="text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
    >
      <div className="text-gray-700 mb-4">
        <FaEnvelope className="text-teal-600 mr-2 inline-block" />
        Email: <a href="mailto:millyanne254@gmail.com" className="text-teal-600 underline">millyanne254@gmail.com</a>
      </div>
    </motion.section>

    {/* Contact Form */}
    <motion.section
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.6 }}
    >
      <h3 className="text-2xl font-semibold text-teal-600 mb-4 mx-auto">Send Us a Message</h3>
      <form className="bg-white p-6 rounded shadow max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Your Name</label>
          <motion.input
            type="text"
            id="name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            whileFocus={{ scale: 1.05 }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Your Email</label>
          <motion.input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            whileFocus={{ scale: 1.05 }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="message">Your Message</label>
          <motion.textarea
            id="message"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            rows="5"
            whileFocus={{ scale: 1.05 }}
          />
        </div>
        <motion.button
          type="submit"
          className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600 transition transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
        >
          Send Message
        </motion.button>
      </form>
    </motion.section>

    {/* Social Media Links */}
    <motion.section
      className="text-center mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.8 }}
    >
      <h3 className="text-2xl font-semibold text-teal-600 mb-4">Follow Us</h3>
      <p className="text-gray-700 mb-6">Stay connected and follow our updates on social media.</p>
      <a
        href="https://twitter.com/millyanne254"
        className="text-teal-600 mr-4 hover:text-teal-500 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter
      </a>
      <a
        href="https://www.linkedin.com/in/millyanne-wanjala-5365306b/"
        className="text-teal-600 mr-4 hover:text-teal-500 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <a
        href="https://github.com/millyanne93"
        className="text-teal-600 mr-4 hover:text-teal-500 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </motion.section>
  </div>
);

export default ContactPage;


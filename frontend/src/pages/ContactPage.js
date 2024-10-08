import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => (
  <div className="min-h-screen bg-custom-background bg-cover bg-center p-4">
    <h2 className="text-4xl font-bold text-teal-700 mb-6">Contact Us</h2>
    <p className="text-lg text-gray-700 mb-6">
      We're here to help! Feel free to reach out to us for any inquiries, support requests, or feedback. Our team is ready to assist you.
    </p>

    {/* Contact Details */}
    <section className="text-center">
      <h3 className="text-2xl font-semibold text-teal-600 mb-4">Our Contact Information</h3>
      <div className="text-gray-700 mb-4">
        <FaEnvelope className="text-teal-600 mr-2 inline-block" />
        Email: <a href="mailto:millyanne254@gmail.com" className="text-teal-600 underline">millyanne254@gmail.com</a>
      </div>
      <div className="text-gray-700 mb-4">
        <FaPhone className="text-teal-600 mr-2 inline-block" />
        Phone: +254721611705
      </div>
      <div className="text-gray-700">
        <FaMapMarkerAlt className="text-teal-600 mr-2 inline-block" />
        Address: 0100 Trackr, Nairobi City,
      </div>
    </section>

    {/* Contact Form */}
    <section className="text-center">
      <h3 className="text-2xl font-semibold text-teal-600 mb-4 mx-auto">Send Us a Message</h3>
      <form className="bg-white p-6 rounded shadow max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Your Name</label>
          <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Your Email</label>
          <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="message">Your Message</label>
          <textarea id="message" className="w-full p-2 border border-gray-300 rounded" rows="5"></textarea>
        </div>
        <button type="submit" className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600 transition">
          Send Message
        </button>
      </form>
    </section>

    {/* Social Media Links */}
    <section className="text-center">
      <h3 className="text-2xl font-semibold text-teal-600 mb-4">Follow Us</h3>
      <p className="text-gray-700 mb-6">Stay connected and follow our updates on social media.</p>
      <a href="https://twitter.com/millyanne254" className="text-teal-600 mr-4" target="_blank" rel="noopener noreferrer">
        Twitter
      </a>
      <a href="https://www.linkedin.com/in/millyanne-wanjala-5365306b/" className="text-teal-600 mr-4" target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <a href="https://github.com/millyanne93" className="text-teal-600 mr-4" target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
    </section>
  </div>
);

export default ContactPage;

import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="bg-forest-50 min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-ink mb-4">
            Contact
          </h2>
          <div className="w-16 h-1 bg-forest-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-ink-muted leading-relaxed">
            Have a question or need assistance? Fill out the form below and we'll get back to you.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-sm border border-forest-100 p-8">
          {submitted ? (
            <div className="text-center py-8">
              <p className="text-xl font-semibold text-ink mb-2">Thank You</p>
              <p className="text-ink-muted">Your message has been sent. We'll be in touch shortly.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 bg-forest-600 hover:bg-forest-700 text-white px-6 py-2 rounded-md transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-ink mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-forest-100 rounded-md focus:ring-2 focus:ring-forest-500 focus:border-transparent outline-none transition"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-forest-100 rounded-md focus:ring-2 focus:ring-forest-500 focus:border-transparent outline-none transition"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full p-3 border border-forest-100 rounded-md focus:ring-2 focus:ring-forest-500 focus:border-transparent outline-none transition resize-y"
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-forest-600 hover:bg-forest-700 text-white font-medium py-3 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

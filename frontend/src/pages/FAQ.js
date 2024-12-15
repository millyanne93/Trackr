import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // For smooth animations

const FAQ = () => {
  // State to track which question is expanded
  const [activeIndex, setActiveIndex] = useState(null);

  // FAQ data
  const faqs = [
    {
      question: 'What is Trackr?',
      answer: 'Trackr is a platform that helps businesses manage and monitor equipment assignments.',
    },
    {
      question: 'How much does it cost?',
      answer: 'We offer flexible pricing plans to fit your needs. Check out our pricing section for details.',
    },
    {
      question: 'Can I try it for free?',
      answer: 'Yes, we offer a 14-day free trial with access to all features.',
    },
  ];

  // Toggle active question
  const toggleAnswer = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="faq py-16 bg-white">
      <h2 className="text-teal-600 text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="container mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-lg shadow overflow-hidden"
          >
            {/* Question */}
            <div
              className="p-4 bg-gradient-to-r from-teal-300 to-teal-100 cursor-pointer flex justify-between items-center"
              onClick={() => toggleAnswer(index)}
            >
              <h3 className="text-teal-700 font-semibold text-lg">{faq.question}</h3>
              <motion.span
                className="text-teal-700 font-bold"
                initial={{ rotate: 0 }}
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▼
              </motion.span>
            </div>

            {/* Answer */}
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  className="p-4 bg-white text-gray-700"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;

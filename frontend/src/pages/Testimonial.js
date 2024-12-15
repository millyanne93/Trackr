import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const testimonials = [
  {
    name: 'Alex Johnson',
    review: 'Trackr has completely streamlined how we manage our company equipment. It’s user-friendly and efficient!',
    image: '/path/to/alex.jpg',
    rating: 5,
  },
  {
    name: 'Sophia Lee',
    review: 'With Trackr, our team always knows who’s using what and when it’s due back. This has saved us so much time!',
    image: '/path/to/sophia.jpg',
    rating: 4,
  },
  {
    name: 'Michael Brown',
    review: 'The notification feature is a game changer. It keeps everyone in the loop and reduces miscommunication.',
    image: '/path/to/michael.jpg',
    rating: 5,
  },
  {
    name: 'Emma Davis',
    review: 'We love Trackr’s real-time updates and tracking history. It’s been a great asset for our business operations!',
    image: '/path/to/emma.jpg',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials bg-white py-16 overflow-hidden">
      <h2 className="text-teal-600 text-4xl font-bold text-center mb-8">
        What Our Users Say
      </h2>

      <div className="relative flex w-full">
        <motion.div
          className="flex items-center space-x-8"
          initial={{ x: '0%' }}
          animate={{ x: '-100%' }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 20,
          }}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-4 min-w-[300px] mx-4"
            >
              <FontAwesomeIcon icon={faUser} className="text-teal text-3xl" />
              <div>
                <h3 className="text-teal-900 font-semibold">{testimonial.name}</h3>
                <p className="text-gray-900">{testimonial.review}</p>
                <div className="text-yellow-400">
                  {'★'.repeat(testimonial.rating)}
                  {'☆'.repeat(5 - testimonial.rating)}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

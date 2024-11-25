import React from 'react';
import { Link } from 'react-router-dom';
import { FaClipboardCheck, FaExchangeAlt, FaEnvelopeOpenText } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Swiper styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaUser } from 'react-icons/fa'; // Use FaUser from react-icons/fa
import Features from './Features';
import heroBackground from '../assets/images/hero.webp';

const HomePage = () => (
  <div className="flex flex-col min-h-screen"> {/* Ensure full height for proper footer placement */}
    {/* Main Content */}
    <main className="flex-grow"> {/* Allows footer to stick to the bottom */}
      {/* Hero Section with Teal Gradient Background */}
      <header
        className="relative h-screen text-center flex flex-col justify-center items-center bg-gradient-to-r from-teal-500 to-teal-300"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

        {/* Content */}
        <div className="relative z-10 text-white">
          <h1 className="text-6xl font-bold mb-4">Trackr: Seamless Equipment Tracking</h1>
          <p className="text-lg mb-6">
            Easily manage your equipment and track who has it, with optional return dates and real-time updates.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="bg-white text-teal-500 px-8 py-3 rounded-full hover:bg-gray-100 transition transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header> 

      {/* Features Section */}
      <section className="features py-16 bg-gradient-to-r from-teal-200 to-teal-100">
        <Features />
      </section>

      {/* Benefits Section */}
      <section className="benefits bg-gradient-to-r from-teal-200 to-teal-100 py-16">
        <h2 className="text-teal-600 text-4xl font-bold text-center mb-8">Why Choose Trackr?</h2>
        <div className="container mx-auto flex flex-wrap justify-center gap-8">
          {[{
            icon: FaClipboardCheck,
            title: 'Simplified Equipment Tracking',
            description: 'Easily track and manage your equipment, ensuring nothing gets lost or misplaced.',
          },
          {
            icon: FaExchangeAlt,
            title: 'Improved Accountability',
            description: 'Assign responsibility and track return dates to maintain transparency.',
          },
          {
            icon: FaEnvelopeOpenText,
            title: 'Real-Time Notifications',
            description: 'Keep your team updated with notifications for assignments and returns.',
          }].map((benefit, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-white shadow rounded-lg">
              <benefit.icon className="text-teal-600 text-3xl" />
              <div>
                <h3 className="text-teal-600 font-semibold text-lg">{benefit.title}</h3>
                <p className="text-gray-700 text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="testimonials bg-gradient-to-r from-teal-200 to-teal-100 py-16">
        <h2 className="text-teal-600 text-4xl font-bold text-center mb-8">What Our Users Say</h2>
        <Swiper slidesPerView={1} spaceBetween={10} pagination={{ clickable: true }}>
          {[
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
          ].map((testimonial, index) => (
            <SwiperSlide key={index}>
              {/* Boxed testimonial with gradient */}
              <div className="bg-gradient-to-r from-teal-500 via-teal-300 to-teal-200 shadow-lg rounded-lg p-6 flex items-center gap-4 max-w-md mx-auto">
                <FontAwesomeIcon icon={FaUser} className="text-white text-3xl" />
                <div>
                  <h3 className="text-teal-900 font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-900">{testimonial.review}</p>
                  <div className="text-yellow-400">
                    {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      {/* Call to Action */}
      <section className="cta py-16 text-center text-white bg-teal-600">
        <h2 className="text-3xl font-bold mb-4">Effortlessly Manage Your Equipment Today!</h2>
        <p className="mb-6">Join businesses optimizing their resources with Trackr.</p>
        <Link
          to="/register"
          className="bg-white text-teal-500 px-8 py-3 rounded-full hover:bg-gray-100 transition transform hover:scale-105"
        >
          Get Started
        </Link>
      </section>
    </main>
  </div>
);

export default HomePage;

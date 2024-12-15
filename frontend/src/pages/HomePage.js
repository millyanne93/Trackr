import React from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css'; // Swiper styles
import AboutUs from './AboutPage';
import Features from './Features';
import Benefits from './Benefits';
import HowItWorks from './HowItWorks';
import Testimonial from './Testimonial';
import Pricing from './Pricing';
import FAQ from './FAQ';
import heroBackground from '../assets/images/hero2.jpg.png';

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
      {/* About Section */}
      <section className="aboutus py-16 bg-white">
        <AboutUs />
      </section>

      {/* Features Section */}
      <section className="features py-16 bg-white">
        <Features />
      </section>

      {/* Benefits Section */}
      <section className="benefits bg-white py-16">
        <Benefits />
      </section>
      {/* How it works  Section */}
      <section className="how it works py-16 bg-white">
        <HowItWorks />
      </section> 
      {/* Testimonials Section */}
      <section className="testimonials bg-white">
        <Testimonial />
      </section>
      {/* Pricing  Section */}
      <section className="pricing py-16 bg-white">
        <Pricing />
      </section>
      {/* FAQ works  Section */}
      <section className="faq py-16 bg-white">
        <FAQ />
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

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import framer-motion
import 'swiper/css';
import AboutUs from './AboutPage';
import Features from './Features';
import Benefits from './Benefits';
import HowItWorks from './HowItWorks';
import Testimonial from './Testimonial';
import Pricing from './Pricing';
import FAQ from './FAQ';
import heroBackground from '../assets/images/hero2.jpg.png';

const HomePage = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section with Glass Morphism Effect */}
        <header
          className="relative h-screen text-center flex flex-col justify-center items-center bg-gradient-to-r from-teal-600 to-blue-500"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Improved Overlay - More modern with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 backdrop-blur-sm z-0"></div>

          {/* Content with Motion */}
          <motion.div 
            className="relative z-10 text-white max-w-4xl mx-auto px-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">
              Trackr: Seamless Equipment Tracking
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100">
              Easily manage your equipment and track who has it, with optional return dates and real-time updates.
            </p>
            
            {/* Improved CTA Button with Animation */}
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/register"
                className="bg-gradient-to-r from-teal-400 to-teal-500 text-white px-8 py-3 rounded-lg 
                          hover:from-teal-500 hover:to-teal-600 transition shadow-lg
                          hover:shadow-teal-500/50 transform hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                to="/features"
                className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-lg
                          hover:bg-white/30 transition shadow-lg transform hover:scale-105"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
          
          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
              <path fill="#ffffff" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,176C672,192,768,192,864,176C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </header>

        {/* About Section with Improved Styling */}
        <section className="aboutus py-20 bg-white">
          <AboutUs />
        </section>

        {/* Features Section with Accent Background */}
        <section className="features py-20 bg-gradient-to-b from-white to-teal-50">
          <Features />
        </section>

        {/* Benefits Section with Improved Spacing */}
        <section className="benefits py-20 bg-white">
          <Benefits />
        </section>

        {/* How it works Section with Background Pattern */}
        <section className="how-it-works py-20 bg-teal-50"
                style={{
                  backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(0,128,128,0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(0,128,128,0.05) 2%, transparent 0%)',
                  backgroundSize: '100px 100px'
                }}>
          <HowItWorks />
        </section>

        {/* Testimonials Section with Modern Cards */}
        <section className="testimonials py-20 bg-white">
          <Testimonial />
        </section>

        {/* Pricing Section with Card Hover Effects */}
        <section className="pricing py-20 bg-gradient-to-b from-white to-teal-50">
          <Pricing />
        </section>

        {/* FAQ Section */}
        <section className="faq py-20 bg-white">
          <FAQ />
        </section>

        {/* Enhanced Call to Action with Gradient and Motion */}
        <section className="cta relative py-24 text-center text-white overflow-hidden">
          {/* Background with overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 z-0"></div>
          
          {/* Animated geometric shapes for background interest */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Effortlessly Manage Your Equipment Today!
            </motion.h2>
            <motion.p 
              className="mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join thousands of businesses optimizing their resources with Trackr.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/register"
                className="bg-white text-teal-600 px-8 py-4 rounded-lg font-medium
                          hover:bg-teal-50 transition transform hover:scale-105
                          shadow-xl hover:shadow-2xl"
              >
                Get Started — It's Free
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;

import React from "react";
import { motion } from "framer-motion";
import { FaEye, FaClock, FaCheckCircle } from "react-icons/fa";
import teamImage from "../assets/images/team.jpg";

// Centralized animation configurations
const defaultTransition = { duration: 0.8, ease: "easeOut" };

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: defaultTransition },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.2, duration: 0.5 },
  }),
};

const AboutPage = () => {
  return (
    <div className="bg-white py-20 px-4">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-100 rounded-full filter blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-50 rounded-full filter blur-3xl opacity-50 -z-10"></div>
      
      {/* Title with enhanced styling */}
      <motion.h2
        className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        About Trackr
      </motion.h2>

      {/* Introduction Section */}
      <motion.div
        className="mb-16 max-w-4xl mx-auto text-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <p className="text-gray-700 text-xl leading-relaxed">
          At Trackr, we believe in simplifying the complex. Our platform is
          designed to streamline equipment management for businesses of all
          sizes, ensuring transparency, accountability, and efficiency.
        </p>
      </motion.div>

      {/* Core Values Section with enhanced cards */}
      <section className="mb-20">
        <motion.h3
          className="text-3xl font-semibold text-teal-600 mb-8 text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={defaultTransition}
        >
          Our Core Values
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[{
            icon: <FaEye className="text-white text-4xl mb-4" />,
            title: "Transparency",
            description:
              "We ensure open and honest tracking of equipment assignments.",
          },
          {
            icon: <FaClock className="text-white text-4xl mb-4" />,
            title: "Efficiency",
            description: "Our tools are built to save you time and effort.",
          },
          {
            icon: <FaCheckCircle className="text-white text-4xl mb-4" />,
            title: "Accountability",
            description:
              "Trackr promotes responsibility through detailed records.",
          }].map((value, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden bg-gradient-to-br from-teal-500 to-teal-600 shadow-xl rounded-xl
                        hover:shadow-2xl hover:shadow-teal-300/20 hover:scale-105 transition-all duration-300
                        p-8 w-full h-64 flex flex-col justify-center items-center text-white"
              custom={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {/* Decorative circle in background */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full"></div>
              
              <div className="relative z-10">
                {value.icon}
                <h4 className="text-white text-2xl font-bold mb-3">
                  {value.title}
                </h4>
                <p className="text-teal-50 text-center text-lg">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Meet the Founder Section with modern styling */}
      <section className="mb-20 relative">
        <div className="absolute inset-0 bg-teal-50 rounded-3xl -z-10 mx-8 my-4"></div>
        <motion.h3
          className="text-3xl font-semibold text-teal-600 mb-10 text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={defaultTransition}
        >
          Meet the Founder
        </motion.h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 p-8">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={defaultTransition}
          >
            {/* Image with decorative border */}
            <div className="absolute inset-0 border-4 border-teal-400 rounded-lg transform rotate-3 -z-10"></div>
            <img
              src={teamImage}
              alt="Founder"
              className="rounded-lg shadow-2xl max-w-xs object-cover h-80 hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
          <motion.div
            className="text-gray-700 max-w-md text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={defaultTransition}
          >
            <p className="text-xl leading-relaxed">
              Hi, I'm{" "}
              <span className="font-semibold text-teal-600 text-2xl">
                Millyanne Wanjala
              </span>
              , the creator of Trackr. I built Trackr to simplify how businesses
              manage their equipment. My goal is to foster accountability,
              transparency, and efficiency in the workplace.
            </p>
            <p className="mt-6 text-xl">
              Thank you for exploring this project! Together, we can bring
              order and efficiency to your organization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Statement with enhanced styling */}
      <section className="text-center mt-16 max-w-4xl mx-auto bg-gradient-to-br from-teal-500 to-teal-600 p-12 rounded-2xl text-white shadow-xl">
        <motion.h3
          className="text-3xl font-semibold mb-6"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={defaultTransition}
        >
          Our Vision
        </motion.h3>
        <motion.p
          className="text-xl mx-auto leading-relaxed"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          We envision a world where businesses operate with complete clarity
          and efficiency. Our goal is to empower organizations with tools that
          make equipment management effortless.
        </motion.p>
      </section>
    </div>
  );
};

export default AboutPage;

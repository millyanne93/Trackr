import React from "react";
import { motion } from "framer-motion";
import { FaEye, FaClock, FaCheckCircle } from "react-icons/fa"; // Import icons
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
    <div className="bg-white py-16 px-4">
      {/* Title */}
      <motion.h2
        className="text-4xl font-bold text-teal-700 mb-6 text-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        About Trackr
      </motion.h2>

      {/* Introduction Section */}
      <motion.div
        className="mb-12 max-w-4xl mx-auto text-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <p className="text-gray-700 text-lg leading-relaxed">
          At Trackr, we believe in simplifying the complex. Our platform is
          designed to streamline equipment management for businesses of all
          sizes, ensuring transparency, accountability, and efficiency.
        </p>
      </motion.div>

      {/* Core Values Section */}
      <section className="mb-16">
        <motion.h3
          className="text-2xl font-semibold text-teal-600 mb-4 text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={defaultTransition}
        >
          Our Core Values
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[{
            icon: <FaEye className="text-teal-600 text-4xl mb-4" />,
            title: "Transparency",
            description:
              "We ensure open and honest tracking of equipment assignments.",
          },
          {
            icon: <FaClock className="text-teal-600 text-4xl mb-4" />,
            title: "Efficiency",
            description: "Our tools are built to save you time and effort.",
          },
          {
            icon: <FaCheckCircle className="text-teal-600 text-4xl mb-4" />,
            title: "Accountability",
            description:
              "Trackr promotes responsibility through detailed records.",
          }].map((value, index) => (
            <motion.div
              key={index}
              className="relative bg-gradient-to-r from-teal-300 to-teal-100 shadow-lg rounded-lg
                          hover:shadow-xl hover:scale-105 transition-transform duration-300
                          p-6 w-full h-48 flex flex-col justify-center items-center"
              custom={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {value.icon}
              <h4 className="text-teal-600 text-xl font-bold mb-2">
                {value.title}
              </h4>
              <p className="text-gray-700 text-center">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section className="mb-16">
        <motion.h3
          className="text-2xl font-semibold text-teal-600 mb-6 text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={defaultTransition}
        >
          Meet the Founder
        </motion.h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <motion.img
            src={teamImage}
            alt="Founder"
            className="rounded-lg shadow-lg max-w-xs hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={defaultTransition}
          />
          <motion.div
            className="text-gray-700 max-w-md text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={defaultTransition}
          >
            <p>
              Hi, I’m{" "}
              <span className="font-semibold text-teal-600">
                Millyanne Wanjala
              </span>
              , the creator of Trackr. I built Trackr to simplify how businesses
              manage their equipment. My goal is to foster accountability,
              transparency, and efficiency in the workplace.
            </p>
            <p className="mt-4">
              Thank you for exploring this project! Together, we can bring
              order and efficiency to your organization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="text-center mt-12">
        <motion.h3
          className="text-2xl font-semibold text-teal-600 mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={defaultTransition}
        >
          Our Vision
        </motion.h3>
        <motion.p
          className="text-gray-700 max-w-3xl mx-auto leading-relaxed"
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

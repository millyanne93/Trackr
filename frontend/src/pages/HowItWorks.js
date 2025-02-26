import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClipboardCheck, FaChartPie, FaUser, FaArrowRight, FaRegLightbulb } from 'react-icons/fa';

const steps = [
  {
    step: 1,
    title: "Register and Log In",
    description: "Create an account by filling in your details. Once registered, log in to your dashboard to access Trackr's powerful tools.",
    icon: <FaUser className="text-white text-5xl mb-4" />,
    color: "from-teal-500 to-teal-600",
    tip: "Pro tip: Use a strong password and enable two-factor authentication for added security."
  },
  {
    step: 2,
    title: "Add Equipment",
    description: "Navigate to the 'Add Equipment' section. Fill out the equipment details such as name, description, serial number, and save.",
    icon: <FaClipboardCheck className="text-white text-5xl mb-4" />,
    color: "from-blue-500 to-blue-600",
    tip: "Pro tip: Upload photos of your equipment to make identification easier."
  },
  {
    step: 3,
    title: "Monitor and Optimize",
    description: "View all equipment status in real-time, assign them to users, and generate insightful reports for better management.",
    icon: <FaChartPie className="text-white text-5xl mb-4" />,
    color: "from-purple-500 to-purple-600",
    tip: "Pro tip: Set up email notifications for overdue returns to improve equipment recovery rates."
  },
];

const HowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
    else setCurrentStep(1); // Loop back to first step
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    else setCurrentStep(steps.length); // Loop to last step
  };

  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } }
  };

  return (
    <section className="how-it-works py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-40 right-20 w-72 h-72 bg-teal-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-20 -z-10"></div>
      
      <motion.h2 
        className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        How Trackr Works
      </motion.h2>
      
      <motion.p 
        className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Get started with Trackr in just a few simple steps and transform how you manage equipment
      </motion.p>

      <div className="container mx-auto flex flex-col items-center">
        {/* Progress indicator */}
        <div className="flex justify-center items-center mb-12 relative w-full max-w-md">
          <div className="absolute h-1 bg-gray-200 w-full rounded-full"></div>
          {steps.map((item, index) => (
            <div 
              key={index} 
              className="relative z-10 flex flex-col items-center"
              style={{ width: `${100 / steps.length}%` }}
            >
              <button 
                onClick={() => setCurrentStep(index + 1)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep >= index + 1 
                    ? `bg-gradient-to-r ${steps[index].color} text-white` 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </button>
              <span className={`mt-2 text-sm font-medium ${
                currentStep >= index + 1 ? 'text-teal-600' : 'text-gray-500'
              }`}>
                Step {index + 1}
              </span>
            </div>
          ))}
        </div>
        
        {/* Step content with animation */}
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            {steps.map((item) =>
              item.step === currentStep ? (
                <motion.div
                  key={item.step}
                  className={`p-10 w-full bg-gradient-to-r ${item.color} shadow-xl rounded-xl text-center text-white`}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div className="mx-auto bg-white/20 backdrop-blur-sm rounded-full p-6 inline-flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-3xl font-semibold mb-4">{`Step ${item.step}: ${item.title}`}</h3>
                  <p className="text-white text-xl mb-8">{item.description}</p>
                  
                  {/* Pro tip with expand/collapse */}
                  <motion.div 
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center">
                      <FaRegLightbulb className="text-yellow-300 mr-2" />
                      <span className="font-medium">{isExpanded ? "Hide Tip" : "Show Pro Tip"}</span>
                    </div>
                    {isExpanded && (
                      <motion.p 
                        className="mt-3 text-left"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.tip}
                      </motion.p>
                    )}
                  </motion.div>
                  
                  {/* Navigation buttons */}
                  <div className="flex justify-between">
                    <button
                      onClick={prevStep}
                      className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg flex items-center hover:bg-white/30 transition"
                    >
                      <FaArrowRight className="transform rotate-180 mr-2" /> Previous
                    </button>
                    <button
                      onClick={nextStep}
                      className="bg-white text-teal-600 px-6 py-3 rounded-lg flex items-center shadow hover:bg-gray-100 transition"
                    >
                      {currentStep < steps.length ? "Next Step" : "Start Over"} <FaArrowRight className="ml-2" />
                    </button>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Additional resources section */}
      <div className="mt-20 max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold text-teal-700 mb-6 text-center">Additional Resources</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ y: -5 }}
          >
            <h4 className="font-semibold text-teal-600 mb-2">Video Tutorials</h4>
            <p className="text-gray-600">Watch our step-by-step video guides to master Trackr quickly.</p>
          </motion.div>
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ y: -5 }}
          >
            <h4 className="font-semibold text-teal-600 mb-2">Help Center</h4>
            <p className="text-gray-600">Browse our knowledge base for answers to common questions.</p>
          </motion.div>
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ y: -5 }}
          >
            <h4 className="font-semibold text-teal-600 mb-2">Live Support</h4>
            <p className="text-gray-600">Connect with our team for personalized assistance.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

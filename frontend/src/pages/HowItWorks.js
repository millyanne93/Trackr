import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClipboardCheck, FaChartPie, FaUser } from 'react-icons/fa';

const steps = [
  {
    step: 1,
    title: 'Register and Log In',
    description: 'Create an account by filling in your details. Once registered, log in to your dashboard to access Trackr’s powerful tools.',
    icon: <FaUser className="text-white text-5xl mb-4" />,
  },
  {
    step: 2,
    title: 'Add Equipment',
    description: 'Navigate to the "Add Equipment" section. Fill out the equipment details such as name, description, serial number, and save.',
    icon: <FaClipboardCheck className="text-white text-5xl mb-4" />,
  },
  {
    step: 3,
    title: 'Monitor and Optimize',
    description: 'View all equipment status in real-time, assign them to users, and generate insightful reports for better management.',
    icon: <FaChartPie className="text-white text-5xl mb-4" />,
  },
];

const HowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  return (
    <section className="how-it-works py-16 bg-white">
      <h2 className="text-teal-700 text-4xl font-bold text-center mb-12">How It Works</h2>

      <div className="container mx-auto flex flex-col items-center">
        <AnimatePresence>
          {steps.map((item) =>
            item.step === currentStep ? (
              <motion.div
                key={item.step}
                className="p-8 w-full md:w-2/3 bg-gradient-to-r from-teal-500 to-teal-300 shadow-lg rounded-lg text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                {item.icon}
                <h3 className="text-white text-2xl font-semibold mb-4">{`Step ${item.step}: ${item.title}`}</h3>
                <p className="text-white text-lg mb-6">{item.description}</p>
                {currentStep < steps.length && (
                  <button
                    onClick={nextStep}
                    className="mt-4 bg-white text-teal-600 px-6 py-2 rounded-full shadow hover:bg-gray-100 transition duration-300"
                  >
                    Next Step
                  </button>
                )}
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HowItWorks;

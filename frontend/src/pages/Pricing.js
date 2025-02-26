import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const discount = 20; // 20% discount for annual billing
  
  const calculatePrice = (monthlyPrice) => {
    if (isAnnual) {
      const annualPrice = (monthlyPrice * 12 * (100 - discount)) / 100;
      return (annualPrice / 12).toFixed(2);
    }
    return monthlyPrice.toFixed(2);
  };
  
  const plans = [
    {
      title: 'Basic',
      monthlyPrice: 5.99,
      color: 'from-blue-400 to-blue-600',
      highlightColor: 'blue-500',
      features: [
        { name: 'Track up to 50 items', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Email notifications', included: true },
        { name: 'Up to 3 users', included: true },
        { name: 'Mobile app access', included: true },
        { name: 'Advanced analytics', included: false },
        { name: 'Custom integrations', included: false },
        { name: 'Priority support', included: false },
      ],
      popularChoice: false,
    },
    {
      title: 'Pro',
      monthlyPrice: 9.99,
      color: 'from-teal-400 to-teal-600',
      highlightColor: 'teal-500',
      features: [
        { name: 'Track unlimited items', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Custom notifications', included: true },
        { name: 'Up to 15 users', included: true },
        { name: 'Mobile app access', included: true },
        { name: 'API access', included: true },
        { name: 'Custom integrations', included: false },
        { name: 'Priority support', included: false },
      ],
      popularChoice: true,
    },
    {
      title: 'Enterprise',
      monthlyPrice: 19.99,
      color: 'from-purple-400 to-purple-600',
      highlightColor: 'purple-500',
      features: [
        { name: 'Track unlimited items', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Custom notifications', included: true },
        { name: 'Unlimited users', included: true },
        { name: 'Mobile app access', included: true },
        { name: 'API access', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Priority support', included: true },
      ],
      popularChoice: false,
    },
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
  };

  return (
    <section className="pricing py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-40 right-20 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-40 left-20 w-80 h-80 bg-teal-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Choose Your Plan</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your needs. Upgrade or downgrade anytime.
          </p>
          
          {/* Billing toggle switch */}
          <div className="mt-10 flex items-center justify-center">
            <span className={`mr-3 text-lg ${!isAnnual ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>
              Monthly
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={isAnnual}
                onChange={() => setIsAnnual(!isAnnual)}
              />
              <div className="w-16 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span className={`ml-3 text-lg ${isAnnual ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>
              Annual <span className="text-green-500 text-sm font-medium ml-1">Save {discount}%</span>
            </span>
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl ${plan.popularChoice ? 'border-2 border-' + plan.highlightColor : ''}`}
              variants={cardVariants}
            >
              {plan.popularChoice && (
                <div className={`absolute top-0 right-0 bg-${plan.highlightColor} text-white px-4 py-1 text-sm font-medium transform translate-x-6 translate-y-6 rotate-45`}>
                  Popular Choice
                </div>
              )}
              
              <div className={`p-8 bg-gradient-to-br ${plan.color} text-white`}>
                <h3 className="text-2xl font-bold mb-1">{plan.title}</h3>
                <div className="flex items-end">
                  <span className="text-4xl font-bold">${calculatePrice(plan.monthlyPrice)}</span>
                  <span className="text-lg opacity-80 ml-1 mb-1">/mo</span>
                </div>
                <p className="text-white text-opacity-80 mt-2">
                  {isAnnual ? 'Billed annually' : 'Billed monthly'}
                </p>
              </div>
              
              <div className="p-8 bg-white">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      {feature.included ? (
                        <FaCheck className={`text-${plan.highlightColor} mt-1 mr-3 shrink-0`} />
                      ) : (
                        <FaTimes className="text-gray-400 mt-1 mr-3 shrink-0" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/signup">
                  <button className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                    plan.popularChoice 
                      ? `bg-${plan.highlightColor} text-white hover:bg-opacity-90` 
                      : `bg-white text-${plan.highlightColor} border border-${plan.highlightColor} hover:bg-${plan.highlightColor} hover:bg-opacity-10`
                  }`}>
                    Get Started
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-16">
          <p className="text-gray-600 flex items-center justify-center">
            <FaInfoCircle className="mr-2 text-blue-500" />
            All plans include a 14-day free trial. No credit card required.
          </p>
          
          <div className="mt-8">
            <Link to="/enterprise" className="text-blue-600 hover:text-blue-800 font-medium">
              Need a custom plan? Contact us for enterprise solutions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

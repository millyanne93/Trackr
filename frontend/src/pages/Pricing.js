import React from 'react';
import { Link } from 'react-router-dom';

const Pricing = () => (
  <section className="pricing py-16 bg-white">
    {/* Section Title */}
    <h2 className="text-teal-600 text-4xl font-bold text-center mb-4">
      Check out our affordable Plans for Every Need
    </h2>
    {/* Catchy Description */}
    <p className="text-gray-700 text-center mb-8 max-w-2xl mx-auto text-lg">
      Flexible pricing options designed to scale with your business needs.
      Start small and upgrade as you grow.
    </p>

    {/* Pricing Cards */}
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {[
        {
          title: 'Basic Plan',
          price: '$5.99/month',
          features: ['Track up to 50 items', 'Basic analytics', 'Email notifications'],
        },
        {
          title: 'Pro Plan',
          price: '$9.99/month',
          features: ['Track unlimited items', 'Advanced analytics', 'Custom notifications'],
        },
        {
          title: 'Enterprise Plan',
          price: 'Contact us',
          features: ['Team access', 'Priority support', 'Custom integrations'],
        },
      ].map((plan, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-teal-300 to-teal-100 p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition"
        >
          {/* Shining Border Effect */}
          <div
            className="absolute inset-0 rounded-lg border-2 border-transparent pointer-events-none animate-glitter"
            style={{
              backgroundImage: 'linear-gradient(45deg, glitterGold, glitterPink, glitterCyan, glitterRed)',
              backgroundSize: '400% 400%',
            }}
          ></div>
          <h3 className="text-3xl font-bold text-teal-600 mb-4">{plan.title}</h3>
          <p className="text-4xl font-semibold mb-6 text-teal-800">{plan.price}</p>
          <ul className="text-gray-700 mb-6 space-y-2">
            {plan.features.map((feature, i) => (
              <li key={i}>&bull; {feature}</li>
            ))}
          </ul>
          <Link
            to="/pricing"
            className="bg-teal-600 text-white py-3 px-6 rounded-full hover:bg-teal-700 transition transform hover:scale-105"
          >
            Choose Plan
          </Link>
        </div>
      ))}
    </div>
  </section>
);

export default Pricing;

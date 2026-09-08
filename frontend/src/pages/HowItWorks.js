import React from 'react';
import { FaClipboardCheck, FaChartPie, FaUser, FaArrowRight } from 'react-icons/fa';

const steps = [
  {
    step: 1,
    title: "Register & Log In",
    description: "Create your account and log in to access your personalized dashboard.",
    icon: <FaUser className="text-forest-600 text-3xl" />,
  },
  {
    step: 2,
    title: "Add Equipment",
    description: "Enter equipment details like name, description, and serial number.",
    icon: <FaClipboardCheck className="text-forest-600 text-3xl" />,
  },
  {
    step: 3,
    title: "Monitor & Manage",
    description: "Track equipment status, assign to users, and generate reports.",
    icon: <FaChartPie className="text-forest-600 text-3xl" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-6 bg-forest-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-ink mb-4">
            How Trackr Works
          </h2>
          <p className="text-xl text-ink-muted max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="bg-white rounded-xl p-8 text-center border border-forest-100 hover:border-forest-300 transition-all duration-200 hover:shadow-md"
            >
              {/* Step number */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-forest-100 text-forest-600 font-bold text-lg mb-6">
                {step.step}
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-ink mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-ink-muted">
                {step.description}
              </p>

              {/* Optional: subtle arrow indicator */}
              {index < steps.length - 1 && (
                <div className="hidden md:block text-forest-300 mt-4">
                  <FaArrowRight className="mx-auto text-2xl" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <a
            href="/register"
            className="inline-block bg-forest-600 hover:bg-forest-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

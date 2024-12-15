import { FaClipboardCheck, FaExchangeAlt, FaEnvelopeOpenText } from "react-icons/fa";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const BenefitsSection = () => {
  // Initialize AOS for scroll animations
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const benefits = [
    {
      icon: FaClipboardCheck,
      title: "Simplified Equipment Tracking",
      description: "Easily track and manage your equipment, ensuring nothing gets lost or misplaced.",
      subpoints: [
        "View real-time location data",
        "Auto-generate reports",
        "Monitor equipment availability"
      ],
      stat: "99% tracking accuracy"
    },
    {
      icon: FaExchangeAlt,
      title: "Improved Accountability",
      description: "Assign responsibility and track return dates to maintain transparency.",
      subpoints: [
        "Assign to team members",
        "Monitor overdue returns",
        "Audit responsibility logs"
      ],
      stat: "Reduced loss by 40%"
    },
    {
      icon: FaEnvelopeOpenText,
      title: "Real-Time Notifications",
      description: "Keep your team updated with notifications for assignments and returns.",
      subpoints: [
        "Instant email alerts",
        "SMS reminders",
        "Dashboard notifications"
      ],
      stat: "100% up-to-date alerts"
    },
  ];

  return (
    <section className="benefits bg-gray-50 py-20">
      <h2 className="text-teal-600 text-5xl font-bold text-center mb-12">
        Why Choose Trackr?
      </h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            data-aos="fade-up" // AOS scroll effect
            className="flex flex-col items-center text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105 hover:bg-gradient-to-r from-teal-300 to-teal-100"
          >
            {/* Animated Icon */}
            <div className="mb-6 p-4 rounded-full bg-teal-100 text-teal-600">
              <benefit.icon className="text-5xl animate-bounce-on-hover" />
            </div>

            {/* Title */}
            <h3 className="text-teal-700 font-semibold text-2xl mb-4">
              {benefit.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-4">{benefit.description}</p>

            {/* Subpoints */}
            <ul className="text-gray-500 text-sm list-disc list-inside mb-4">
              {benefit.subpoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>

            {/* Statistic */}
            <div className="text-teal-500 font-bold text-lg">
              {benefit.stat}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;

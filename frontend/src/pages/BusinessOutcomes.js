import React, { useEffect } from "react";
import { FaChartLine, FaUserClock, FaFileInvoiceDollar } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const BusinessOutcomes = () => {
  // Initialize AOS for scroll animations
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const caseStudies = [
    {
      company: "Tech Solutions Inc.",
      industry: "IT Services",
      challenge: "Lost 15% of equipment annually, costing over $40,000",
      outcome: "Reduced equipment loss to under 2% within 6 months",
      savings: "$35,000+ annual savings"
    },
    {
      company: "Creative Studios",
      industry: "Media Production",
      challenge: "4+ hours per week spent searching for equipment",
      outcome: "Reduced search time by 85%, improving project timelines",
      savings: "200+ hours saved annually"
    },
    {
      company: "Regional Hospital",
      industry: "Healthcare",
      challenge: "Critical equipment often unavailable when needed",
      outcome: "99.8% equipment availability for critical care",
      savings: "Improved patient care metrics by 23%"
    }
  ];

  const businessOutcomes = [
    {
      icon: FaChartLine,
      title: "Reduce Equipment Loss",
      description: "Our customers typically see a 60-80% reduction in lost or misplaced equipment within the first year.",
      stats: [
        { value: "78%", label: "Average reduction in lost items" },
        { value: "$12,400", label: "Average annual savings" }
      ]
    },
    {
      icon: FaUserClock,
      title: "Save Time and Increase Productivity",
      description: "Eliminate time-consuming manual tracking and empower your team to focus on their core responsibilities.",
      stats: [
        { value: "5-10", label: "Hours saved per employee monthly" },
        { value: "32%", label: "Increase in resource utilization" }
      ]
    },
    {
      icon: FaFileInvoiceDollar,
      title: "Maximize ROI on Equipment",
      description: "Extend equipment lifespan through proper maintenance scheduling and optimal utilization tracking.",
      stats: [
        { value: "27%", label: "Average increase in equipment lifespan" },
        { value: "3-6", label: "Months to achieve ROI on Trackr" }
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Real Business Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just track equipment - transform how your business operates and delivers value.
          </p>
        </div>

        {/* Business Outcomes */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {businessOutcomes.map((outcome, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-teal-500 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-teal-500 mb-4">
                <outcome.icon size={48} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">{outcome.title}</h3>
              <p className="text-gray-600 mb-6">{outcome.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-auto">
                {outcome.stats.map((stat, idx) => (
                  <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-teal-600 font-bold text-3xl">{stat.value}</div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Case Studies */}
        <div data-aos="fade-up">
          <h3 className="text-3xl font-bold text-center mb-10 text-gray-800">Success Stories</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <div 
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 150}
                className="bg-white p-6 rounded-lg shadow border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <h4 className="text-xl font-semibold text-gray-800">{study.company}</h4>
                  <p className="text-teal-600">{study.industry}</p>
                </div>
                
                <div className="mb-4">
                  <h5 className="font-medium text-gray-700 mb-1">Challenge:</h5>
                  <p className="text-gray-600">{study.challenge}</p>
                </div>
                
                <div className="mb-4">
                  <h5 className="font-medium text-gray-700 mb-1">Result:</h5>
                  <p className="text-gray-600">{study.outcome}</p>
                </div>
                
                <div className="text-teal-600 font-bold text-xl mt-4">
                  {study.savings}
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-12">
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
              See More Success Stories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessOutcomes;

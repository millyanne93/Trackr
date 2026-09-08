import React from 'react';
import { 
      FaShieldAlt, 
      FaChartLine, 
      FaClipboardCheck, 
      FaUsers, 
      FaArrowRight,
      FaSync,
      FaFileAlt
} from 'react-icons/fa';
import backgroundImage from '../assets/images/trackr.jpg';

const values = [
      {
              title: 'Immutable Chain of Custody',
              description: 'Every equipment checkout, transfer, and return is permanently logged with precise timestamps and user signatures.',
              icon: <FaShieldAlt className="text-forest-600 text-3xl" />,
            },
      {
              title: 'Zero-Friction Signouts',
              description: 'Eliminate administrative bottlenecks with streamlined, one-click asset assignments.',
              icon: <FaChartLine className="text-forest-600 text-3xl" />,
            },
      {
              title: 'Real-Time Audit Trails',
              description: 'Instant visibility into active deployables, maintenance status, and custodian history across all locations.',
              icon: <FaClipboardCheck className="text-forest-600 text-3xl" />,
            },
      {
              title: 'Role-Based Governance',
              description: 'Fine-grained access controls for admins, department leads, and field staff to enforce authorization rules.',
              icon: <FaUsers className="text-forest-600 text-3xl" />,
            },
];

const features = [
      {
              title: 'Real-Time Tracking',
              description: 'Know exactly where every piece of equipment is at any moment.',
              icon: <FaSync className="text-forest-600 text-2xl" />,
            },
      {
              title: 'User Management',
              description: 'Manage roles and permissions for admins, managers, and staff.',
              icon: <FaUsers className="text-forest-600 text-2xl" />,
            },
      {
              title: 'Borrowing History',
              description: 'Complete audit trail of every equipment assignment and return.',
              icon: <FaFileAlt className="text-forest-600 text-2xl" />,
            },
];

const AboutPage = () => {
      return (
              <div
                className="relative min-h-screen py-20 px-6"
                style={{
                            backgroundImage: `url(${backgroundImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundAttachment: 'fixed',
                              }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-white/90"></div>

                <div className="relative z-10 max-w-6xl mx-auto">
                  {/* Header */}
                  <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-forest-100 text-forest-700 text-sm font-medium tracking-wide mb-4">
                      About Trackr
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-ink leading-tight mb-4">
                      Asset management engineered for <br className="hidden md:block" />
                      operational transparency.
                    </h1>
                    <p className="text-xl text-ink-muted max-w-3xl mx-auto leading-relaxed">
                      Trackr replaces manual spreadsheets and unverified sign-out sheets with a real-time,
                      audit-ready equipment ledger.
                    </p>
                  </div>

                  {/* Mission Statement — Borrowed: clean, with accent line */}
                  <div className="relative bg-white rounded-xl p-8 border-l-4 border-forest-600 mb-16 max-w-4xl mx-auto shadow-sm">
                    <p className="text-ink-muted text-center max-w-2xl mx-auto leading-relaxed">
                      <span className="font-semibold text-ink">Why Trackr exists:</span>{' '}
                      Unaccounted equipment causes project delays and budgetary waste. Trackr makes accountability
                      explicit by unifying device state, borrower history, and authorization workflows into a single dashboard.
                    </p>
                  </div>

                  {/* Core Capabilities — Borrowed: 4-item grid with tags */}
                  <div className="mb-20">
                    <h2 className="text-2xl font-semibold text-ink text-center mb-12">
                      System Capabilities
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                      {values.map((value, index) => (
                                        <div
                                          key={value.title}
                                          className="bg-white rounded-xl p-6 border border-forest-100 hover:border-forest-300 hover:shadow-md transition-all duration-200 flex items-start gap-4"
                                        >
                                          <div className="flex-shrink-0 mt-1">
                                            {value.icon}
                                          </div>
                                          <div>
                                            <div className="flex items-center gap-2 mb-1">
                                              <span className="text-xs font-mono text-forest-400 bg-forest-50 px-2 py-0.5 rounded">
                                                {String(index + 1).padStart(2, '0')}
                                              </span>
                                              <h4 className="font-semibold text-ink">
                                                {value.title}
                                              </h4>
                                            </div>
                                            <p className="text-ink-muted text-sm leading-relaxed">
                                              {value.description}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                    </div>
                  </div>

                  {/* Key Features — Clean 3-column grid */}
                  <div className="mb-16">
                    <h2 className="text-2xl font-semibold text-ink text-center mb-12">
                      Key Features
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                      {features.map((feature) => (
                                        <div
                                          key={feature.title}
                                          className="bg-white rounded-xl p-6 border border-forest-100 hover:border-forest-300 transition-all duration-200 text-center"
                                        >
                                          <div className="flex justify-center mb-3">
                                            {feature.icon}
                                          </div>
                                          <h4 className="font-semibold text-ink mb-2">
                                            {feature.title}
                                          </h4>
                                          <p className="text-ink-muted text-sm leading-relaxed">
                                            {feature.description}
                                          </p>
                                        </div>
                                      ))}
                    </div>
                  </div>

                  {/* Call to Action — Borrowed: clean gradient CTA */}
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-forest-700 to-forest-600 p-10 max-w-4xl mx-auto">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          Ready to secure your equipment workflow?
                        </h3>
                        <p className="text-forest-100 text-sm">
                          Deploy Trackr for your team in under 5 minutes.
                        </p>
                      </div>
                      <a
                        href="/register"
                        className="inline-flex items-center gap-2 bg-white text-forest-700 hover:bg-forest-50 font-medium px-6 py-3 rounded-lg transition-colors duration-200 whitespace-nowrap"
                      >
                        Get Started <FaArrowRight className="text-sm" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
};

export default AboutPage;

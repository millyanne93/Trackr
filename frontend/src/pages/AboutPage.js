import React from 'react';

const AboutPage = () => (
  <div className="p-4 bg-gray-100">
    <h2 className="text-4xl font-bold text-teal-700 mb-4">About Trackr</h2>
    
    {/* Introduction */}
    <p className="text-lg text-gray-700 mb-6">
      Trackr is a simple yet powerful tool designed to help businesses keep track of their equipment. Whether you're managing a small business or a large organization, Trackr ensures that equipment is effectively assigned and tracked, providing you with peace of mind.
    </p>

    {/* Mission Section */}
    <section className="mb-8">
      <h3 className="text-2xl font-semibold text-teal-600 mb-4">Our Mission</h3>
      <p className="text-gray-700">
        Our mission is to provide a hassle-free and efficient way to manage equipment, ensuring transparency, accountability, and seamless communication within organizations. Trackr aims to simplify the tracking process so you can focus on what really matters—running your business.
      </p>
    </section>

    {/* Core Features Section */}
    <section className="mb-8">
      <h3 className="text-2xl font-semibold text-teal-600 mb-4">Core Features</h3>
      <ul className="list-disc list-inside text-gray-700">
        <li className="mb-2">Assign equipment with optional return dates.</li>
        <li className="mb-2">Send notifications about equipment assignments.</li>
        <li className="mb-2">View history of all equipment assignments.</li>
        <li className="mb-2">Manage the lifecycle of your organization's assets easily.</li>
      </ul>
    </section>

    {/* How It Works Section */}
    <section>
      <h3 className="text-2xl font-semibold text-teal-600 mb-4">How It Works</h3>
      <p className="text-gray-700 mb-6">
        Trackr allows you to assign equipment to team members with just a few clicks. You'll receive a full record of the assignment, including any optional return dates, and notifications keep everyone in the loop. Whether it's laptops, tools, or machinery, Trackr helps you stay organized.
      </p>
    </section>
  </div>
);

export default AboutPage;

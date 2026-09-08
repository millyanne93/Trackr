import React from 'react';

// Replaces Features.js + Benefits.js, which described the same three things
// twice with different styling. No invented percentages ("99% accuracy",
// "reduced loss by 40%") — every line here is a factual description of what
// the product does, not a claim that needs evidence we don't have yet.
const capabilities = [
  {
    title: 'Assignment and accountability',
    description:
      "Issue equipment to a specific person in one action, and see exactly who's holding what at any time.",
  },
  {
    title: 'Return tracking',
    description:
      "Set optional due dates and see a clear overdue view, so equipment doesn't quietly disappear.",
  },
  {
    title: 'Role-based access',
    description:
      'Admins, managers, and staff each see only what\u2019s relevant to their role.',
  },
];

const Capabilities = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-ink mb-2">Why teams use Trackr</h2>
      <p className="text-ink-muted mb-12 max-w-xl">
        Built around the three things that actually go wrong with shared
        equipment: nobody knows who has it, nobody knows when it's due back,
        and everybody can edit everything.
      </p>

      <div className="grid md:grid-cols-3 gap-10">
        {capabilities.map((item) => (
          <div key={item.title} className="border-t-2 border-forest-600 pt-4">
            <h3 className="text-lg font-semibold text-ink mb-2">
              {item.title}
            </h3>
            <p className="text-ink-muted leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Capabilities;

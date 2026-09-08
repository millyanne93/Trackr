import React from 'react';

const SummarySection = ({ summaryData, showSummary, setShowSummary }) => {

  const data = summaryData || {};
  const totalUsers = data.totalUsers ?? 'Loading...';
  const totalEquipment = data.totalEquipment ?? 'Loading...';
  const issuedEquipment = data.issuedEquipment ?? 'Loading...';
  const availableEquipment = data.availableEquipment ?? 'Loading...';

  return (
    <div className="bg-white p-4 rounded shadow mb-6 border border-forest-100">
      <h3
        className="text-xl font-semibold cursor-pointer text-ink hover:text-forest-600 flex justify-between items-center"
        onClick={() => setShowSummary(!showSummary)}
      >
        <span>📊 Summary</span>
        <span className="text-sm text-ink-muted">{showSummary ? '▲' : '▼'}</span>
      </h3>
      {showSummary && (
        <ul className="mt-4 space-y-2">
          <li className="flex justify-between border-b border-forest-50 pb-2">
            <span className="text-ink-muted">Total Users</span>
            <span className="font-semibold text-ink">{totalUsers}</span>
          </li>
          <li className="flex justify-between border-b border-forest-50 pb-2">
            <span className="text-ink-muted">Total Equipment</span>
            <span className="font-semibold text-ink">{totalEquipment}</span>
          </li>
          <li className="flex justify-between border-b border-forest-50 pb-2">
            <span className="text-ink-muted">Equipment Issued</span>
            <span className="font-semibold text-ink">{issuedEquipment}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-ink-muted">Available Equipment</span>
            <span className="font-semibold text-ink">{availableEquipment}</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default SummarySection;

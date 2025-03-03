import React from 'react';

const SummarySection = ({ summaryData, showSummary, setShowSummary }) => {
  return (
    <div className="bg-gradient-to-r from-teal-200 to-teal-100 p-4 rounded shadow mb-6">
      <h3
        className="text-xl font-semibold cursor-pointer hover:text-teal-500"
        onClick={() => setShowSummary(!showSummary)}
      >
        Summary
      </h3>
      {showSummary && (
        <ul>
          <li>Total Users: {summaryData.totalUsers ?? 'Loading...'}</li>
          <li>Total Equipment: {summaryData.totalEquipment ?? 'Loading...'}</li>
          <li>Equipment Issued: {summaryData.issuedEquipment ?? 'Loading...'}</li>
          <li>Available Equipment: {summaryData.availableEquipment ?? 'Loading...'}</li>
        </ul>
      )}
    </div>
  );
};

export default SummarySection;

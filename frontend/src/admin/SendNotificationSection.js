import React from 'react';
import SendNotification from '../components/SendNotification';

const SendNotificationSection = ({
  showSendNotification,
  setShowSendNotification,
}) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-6 border border-forest-100">
      <h3
        className="text-xl font-semibold cursor-pointer text-ink hover:text-forest-600 flex justify-between items-center"
        onClick={() => setShowSendNotification(!showSendNotification)}
      >
        <span>📧 Send Notification</span>
        <span className="text-sm text-ink-muted">{showSendNotification ? '▲' : '▼'}</span>
      </h3>
      {showSendNotification && (
        <div className="mt-4">
          <SendNotification />
        </div>
      )}
    </div>
  );
};

export default SendNotificationSection;

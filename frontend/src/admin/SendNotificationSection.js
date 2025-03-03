import React from 'react';
import SendNotification from '../components/SendNotification';

const SendNotificationSection = ({
  showSendNotification,
  setShowSendNotification,
}) => {
  return (
    <div className="bg-gradient-to-r from-teal-200 to-teal-100 p-4 rounded shadow mb-6">
      <h3
        className="text-xl font-semibold cursor-pointer hover:text-teal-500"
        onClick={() => setShowSendNotification(!showSendNotification)}
      >
        Send Notification
      </h3>
      {showSendNotification && <SendNotification />}
    </div>
  );
};

export default SendNotificationSection;

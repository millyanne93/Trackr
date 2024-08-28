import React from 'react';
import LogoutButton from '../components/LogoutButton';

const RegularUserHomePage = ({
  username = 'User',
  equipmentList = [],
  notifications = [],
  borrowingHistory = [],
}) => (
  <div className="p-6">
    <LogoutButton />
    <h2 className="text-3xl font-bold text-green-700 mb-6">Welcome, {username}</h2>

    {/* Your Equipment Section */}
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="text-xl font-semibold">Your Equipment</h3>
      {equipmentList.length > 0 ? (
        <ul>
          {equipmentList.map((item, index) => (
            <li key={index}>
              {item.name} - Status: {item.status} - Return Date: {item.returnDate}
            </li>
          ))}
        </ul>
      ) : (
        <p>No equipment currently borrowed.</p>
      )}
    </div>

    {/* Notifications Section */}
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="text-xl font-semibold">Notifications</h3>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((note, index) => <li key={index}>{note}</li>)}
        </ul>
      ) : (
        <p>No notifications available.</p>
      )}
    </div>

    {/* Borrowing History Section */}
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-semibold">Borrowing History</h3>
      {borrowingHistory.length > 0 ? (
        <ul>
          {borrowingHistory.map((history, index) => (
            <li key={index}>
              {history.equipmentName} - Borrowed on: {history.borrowedDate} - Returned on: {history.returnedDate || 'Not returned yet'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No borrowing history available.</p>
      )}
    </div>
  </div>
);

export default RegularUserHomePage;

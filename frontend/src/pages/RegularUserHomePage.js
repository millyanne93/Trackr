import React from 'react';
import { logout } from '../utils/auth';
import LogoutButton from '../components/LogoutButton'; // Import the LogoutButton component

const RegularUserHomePage = ({ userName, equipmentList = [], notifications = [] }) => (
  <div className="p-6">
    <LogoutButton /> {/* Include the LogoutButton component */}
    <h2 className="text-3xl font-bold text-green-700 mb-6">Welcome, {userName || 'User'}</h2>
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="text-xl font-semibold">Your Equipment</h3>
      <ul>
        {equipmentList.length > 0 ? (
          equipmentList.map((item, index) => (
            <li key={index}>
              {item.name} - Status: {item.status}
            </li>
          ))
        ) : (
          <li>Loading equipment...</li>
        )}
      </ul>
    </div>
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-semibold">Notifications</h3>
      <ul>
        {notifications.length > 0 ? (
          notifications.map((note, index) => <li key={index}>{note}</li>)
        ) : (
          <li>No notifications available</li>
        )}
      </ul>
    </div>
  </div>
);

export default RegularUserHomePage;

import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Dashboard</h2>
      <div className="mb-4">
        <p className="text-lg font-semibold">Equipment Overview</p>
        <ul>
          <li>Total Equipment: {/* Total equipment count */}</li>
          <li>Available: {/* Available equipment count */}</li>
          <li>In Maintenance: {/* Equipment in maintenance count */}</li>
          <li>Borrowed: {/* Borrowed equipment count */}</li>
        </ul>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">Recent Activity</p>
        <ul>
          {/* List recent activities here */}
          <li>Recent activity 1</li>
          <li>Recent activity 2</li>
        </ul>
      </div>
      <div className="flex space-x-4">
        <Link to="/add-equipment" className="bg-green-700 text-white px-4 py-2 rounded">
          Add New Equipment
        </Link>
        <Link to="/manage-categories" className="bg-green-700 text-white px-4 py-2 rounded">
          Manage Categories
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

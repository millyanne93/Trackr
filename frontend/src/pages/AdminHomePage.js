import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AdminHomePage = ({ summaryData, activityData }) => (
  <div className="p-6">
    <h2 className="text-4xl font-bold text-blue-700 mb-6">Admin Dashboard</h2>
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold">Summary</h3>
        <ul>
          <li>Total Users: {summaryData.totalUsers || 'Loading...'}</li>
          <li>Total Equipment: {summaryData.totalEquipment || 'Loading...'}</li>
          {/* Add more summary items as needed */}
        </ul>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold">Activity Overview</h3>
        <LineChart width={500} height={300} data={activityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" />
          <Line type="monotone" dataKey="equipment" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  </div>
);

export default AdminHomePage;

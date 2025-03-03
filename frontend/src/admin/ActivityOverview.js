import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const ActivityOverview = ({ activityData, showActivity, setShowActivity }) => {
  return (
    <div className="bg-gradient-to-r from-teal-200 to-teal-100 p-4 rounded shadow mb-6">
      <h3
        className="text-xl font-semibold cursor-pointer hover:text-teal-500"
        onClick={() => setShowActivity(!showActivity)}
      >
        Activity Overview
      </h3>
      {showActivity && activityData.length > 0 ? (
        <LineChart width={500} height={300} data={activityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" />
          <Line type="monotone" dataKey="equipment" stroke="#82ca9d" />
        </LineChart>
      ) : (
        <p>No activity data available.</p>
      )}
    </div>
  );
};

export default ActivityOverview;

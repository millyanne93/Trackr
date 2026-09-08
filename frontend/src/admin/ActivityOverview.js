import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ActivityOverview = ({ activityData, showActivity, setShowActivity }) => {
  // ✅ Safe fallback
  const data = Array.isArray(activityData) ? activityData : [];

  return (
    <div className="bg-white p-4 rounded shadow mb-6 border border-forest-100">
      <h3
        className="text-xl font-semibold cursor-pointer text-ink hover:text-forest-600 flex justify-between items-center"
        onClick={() => setShowActivity(!showActivity)}
      >
        <span>📊 Activity Overview</span>
        <span className="text-sm text-ink-muted">{showActivity ? '▲' : '▼'}</span>
      </h3>
      {showActivity && (
        <div className="mt-4">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#1E6B45" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-ink-muted">No activity data available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityOverview;

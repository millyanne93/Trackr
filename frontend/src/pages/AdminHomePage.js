import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Import your custom API instance
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import LogoutButton from '../components/LogoutButton';
import AddEquipmentForm from '../components/AddEquipmentForm';

const AdminHomePage = ({
  summaryData = {},
  activityData = [],
  issuedEquipment = [],
  users = [],
  username = 'Admin',
}) => {
  const [equipmentList, setEquipmentList] = useState([]);

  const handleAddEquipment = async (newEquipment) => {

    try {
      const response = await api.post('/equipment', newEquipment); // Use the custom API instance
      if (response.status === 200) {
        const savedEquipment = response.data;
        setEquipmentList((prevList) => [...prevList, savedEquipment]);
        console.log('Equipment added successfully!');
      } else {
        console.error('Failed to add equipment');
      }
    } catch (error) {
      console.error('Error adding equipment:', error.message);
    }
  };

  // Debugging statements
  console.log('AdminHomePage is rendering');
  console.log('handleAddEquipment:', handleAddEquipment); // Ensure this logs a function

  return (
    <div className="p-6">
      <LogoutButton />
      <h2 className="text-3xl font-bold text-green-700 mb-6">Welcome, {username}</h2>

      {/* Summary Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold">Summary</h3>
        <ul>
          <li>Total Users: {summaryData.totalUsers ?? 'Loading...'}</li>
          <li>Total Equipment: {summaryData.totalEquipment ?? 'Loading...'}</li>
          <li>Equipment Issued: {summaryData.totalIssued ?? 'Loading...'}</li>
        </ul>
      </div>

      {/* Activity Overview */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold">Activity Overview</h3>
        {activityData.length > 0 ? (
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

      {/* Equipment Issued Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold">Equipment Issued</h3>
        {issuedEquipment.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Equipment Name</th>
                <th className="py-2">Issued To</th>
                <th className="py-2">Issued Date</th>
                <th className="py-2">Return Date</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {issuedEquipment.map((item, index) => (
                <tr key={index}>
                  <td className="py-2">{item.name}</td>
                  <td className="py-2">{item.issuedTo}</td>
                  <td className="py-2">{item.issuedDate}</td>
                  <td className="py-2">{item.returnDate}</td>
                  <td className="py-2">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No equipment issued.</p>
        )}
      </div>

      {/* Add Equipment Form */}
      <AddEquipmentForm onSubmit={handleAddEquipment} />

      {/* Usage of equipmentList */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold">Added Equipment</h3>
        {equipmentList.length > 0 ? (
          <ul>
            {equipmentList.map((equipment, index) => (
              <li key={index}>{equipment.name}</li>
            ))}
          </ul>
        ) : (
          <p>No equipment added yet.</p>
        )}
      </div>

      {/* User Management Section */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold">User Management</h3>
        {users.length > 0 ? (
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminHomePage;

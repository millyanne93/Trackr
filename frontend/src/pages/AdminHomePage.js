import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import LogoutButton from '../components/LogoutButton';
import AddEquipmentForm from '../components/AddEquipmentForm';
import AssignEquipmentForm from '../components/AssignEquipmentForm';

const AdminHomePage = () => {
  const [summaryData, setSummaryData] = useState({});
  const [activityData, setActivityData] = useState([]);
  const [issuedEquipment, setIssuedEquipment] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('Admin');
  const [loading, setLoading] = useState(true);

  const [showSummary, setShowSummary] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showIssuedEquipment, setShowIssuedEquipment] = useState(false);
  const [showAddEquipment, setShowAddEquipment] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showAssignEquipment, setShowAssignEquipment] = useState(false);

  const fetchData = async () => {
    try {
      const [summaryRes, activityRes, issuedEquipmentRes, equipmentRes, usersRes] = await Promise.all([
        api.get('/summary'),
        api.get('/activity'),
        api.get('/issued'),
        api.get('/equipment'),
        api.get('/users'),
      ]);

      setSummaryData(summaryRes.data);
      setActivityData(activityRes.data);
      setIssuedEquipment(issuedEquipmentRes.data);
      setEquipmentList(equipmentRes.data);
      setUsers(usersRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <LogoutButton />
      <h2 className="text-3xl font-bold text-green-700 mb-6">Welcome, {username}</h2>

      {/* Summary Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold cursor-pointer" onClick={() => setShowSummary(!showSummary)}>
          Summary
        </h3>
        {showSummary && (
          <ul>
            <li>Total Users: {summaryData.totalUsers ?? 'Loading...'}</li>
            <li>Total Equipment: {summaryData.totalEquipment ?? 'Loading...'}</li>
            <li>Equipment Issued: {summaryData.totalIssued ?? 'Loading...'}</li>
          </ul>
        )}
      </div>

      {/* Activity Overview */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold cursor-pointer" onClick={() => setShowActivity(!showActivity)}>
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

      {/* Equipment Issued Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold cursor-pointer" onClick={() => setShowIssuedEquipment(!showIssuedEquipment)}>
          Equipment Issued
        </h3>
        {showIssuedEquipment && issuedEquipment.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Equipment Name</th>
                <th className="py-2">Issued To</th>
                <th className="py-2">Issued On</th>
              </tr>
            </thead>
            <tbody>
              {issuedEquipment.map((equipment) => (
                <tr key={equipment._id}>
                  <td className="border px-4 py-2">{equipment.name}</td>
                  <td className="border px-4 py-2">{equipment.checkedOutBy?.username ?? 'N/A'}</td>
                  <td className="border px-4 py-2">{new Date(equipment.checkedOutAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No equipment has been issued.</p>
        )}
      </div>

      {/* Add Equipment Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold cursor-pointer" onClick={() => setShowAddEquipment(!showAddEquipment)}>
          Add Equipment
        </h3>
        {showAddEquipment && <AddEquipmentForm onAdd={fetchData} />}
      </div>

      {/* Assign Equipment Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold cursor-pointer" onClick={() => setShowAssignEquipment(!showAssignEquipment)}>
          Assign Equipment
        </h3>
        {showAssignEquipment && (
          <AssignEquipmentForm users={users} equipmentList={equipmentList} onAssign={fetchData} />
        )}
      </div>

      {/* User Management Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold cursor-pointer" onClick={() => setShowUserManagement(!showUserManagement)}>
          User Management
        </h3>
        {showUserManagement && (
          <ul>
            {users.map((user) => (
              <li key={user._id}>{user.username}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminHomePage;

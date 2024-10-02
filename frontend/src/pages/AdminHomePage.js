import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import LogoutButton from '../components/LogoutButton';
import AddEquipmentForm from '../components/AddEquipmentForm';
import AssignEquipmentForm from '../components/AssignEquipmentForm';
import SendNotification from '../components/SendNotification';

const AdminHomePage = () => {
  const [summaryData, setSummaryData] = useState({});
  const [activityData, setActivityData] = useState([]);
  const [issuedEquipment, setIssuedEquipment] = useState([]);
  const [issuedEquipmentUsers, setIssuedEquipmentUsers] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [showEditEquipmentModal, setShowEditEquipmentModal] = useState(false); 
  const [showEquipmentList, setShowEquipmentList] = useState(false);
  const [showSendNotification, setShowSendNotification] = useState(false);

  const [showSummary, setShowSummary] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showIssuedEquipment, setShowIssuedEquipment] = useState(false);
  const [showAddEquipment, setShowAddEquipment] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showAssignEquipment, setShowAssignEquipment] = useState(false);

  // Pagination and editing state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  // Fetch Username
  const fetchUsername = async () => {
  try {
    const token = localStorage.getItem('token'); // or wherever you store it
    const res = await api.get('/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsername(res.data.username);
  } catch (error) {
    console.error('Error fetching username:', error.response ? error.response.data : error.message);
  }
};
  

  const fetchData = async () => {
    try {
      const [summaryRes, activityRes, issuedEquipmentRes, equipmentRes] =
        await Promise.all([
          api.get('/summary'),
          api.get('/activity'),
          api.get('/issued'),
          api.get('/equipment'),
        ]);

      setSummaryData(summaryRes.data);
      setActivityData(activityRes.data);
      setIssuedEquipment(issuedEquipmentRes.data);
      setEquipmentList(equipmentRes.data);
      setLoading(false);

      // Fetch users for issued equipment
     const userPromises = issuedEquipmentRes.data.map(async (equipment) => {
      if (equipment.checkedOutBy) {
        try {
          const userRes = await api.get(`/users/${equipment.checkedOutBy}`);
          return userRes.data;
        } catch (error) {
          // Handle case where user doesn't exist (404 error)
          if (error.response && error.response.status === 404) {
            console.warn(`User with ID ${equipment.checkedOutBy} not found.`);
            return { username: 'User Deleted' }; // Fallback for deleted users
          } else {
            console.error('Error fetching user:', error);
            return null;
          }
        }
      }
      return null;
    });

    const resolvedUsers = await Promise.all(userPromises);
    setIssuedEquipmentUsers(resolvedUsers);
  } catch (error) {
    console.error('Error fetching data:', error);
    setLoading(false);
  }
}; 

  const fetchUsers = async (page = 1, limit = 10) => {
    try {
      const res = await api.get(`/users?page=${page}&limit=${limit}`);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsername();
    fetchData();
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      fetchUsers(currentPage); // Refresh user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditUserModal(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${editingUser._id}`, {
        username: editingUser.username,
        role: editingUser.role,
      });
      setShowEditUserModal(false);
      fetchUsers(currentPage);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  const fetchEquipment = async (page = 1, limit = 10) => {
    try {
      const res = await api.get(`/equipment?page=${page}&limit=${limit}`);
      setEquipmentList(res.data.equipment);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    }
  };

  useEffect(() => {
    fetchEquipment(currentPage);
  }, [currentPage]);

  // Handle delete equipment
  const handleDeleteEquipment = async (equipmentId) => {
    try {
      await api.delete(`/equipment/${equipmentId}`);
      fetchEquipment(currentPage); // Refresh equipment list after deletion
    } catch (error) {
      console.error('Error deleting equipment:', error);
    }
  };

  // Handle edit equipment
  const handleEditEquipment = (equipment) => {
    setEditingEquipment(equipment);
    setShowEditEquipmentModal(true);
  };

  const handleUpdateEquipment = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/equipment/${editingEquipment._id}`, {
        name: editingEquipment.name,
        status: editingEquipment.status,
      });
      setShowEditEquipmentModal(false);
      fetchEquipment(currentPage); // Refresh equipment list after update
    } catch (error) {
      console.error('Error updating equipment:', error);
    }
  };

  // Handle page change for equipment
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <LogoutButton />
      <h2 className="text-3xl font-bold text-teal-700 mb-6">
        Welcome, {username}!
      </h2>

      {/* Summary Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3
          className="text-xl font-semibold cursor-pointer hover:text-teal-500"
          onClick={() => setShowSummary(!showSummary)}
        >
          Summary
        </h3>
        {showSummary && (
          <ul>
            <li>Total Users: {summaryData.totalUsers ?? 'Loading...'}</li>
            <li>Total Equipment: {summaryData.totalEquipment ?? 'Loading...'}</li>
            <li>Equipment Issued: {summaryData.issuedEquipment ?? 'Loading...'}</li>
            <li>
              Available Equipment: {summaryData.availableEquipment ?? 'Loading...'}
            </li>
          </ul>
        )}
      </div>

      {/* Activity Overview */}
      <div className="bg-white p-4 rounded shadow mb-6">
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
      {/* Equipment List Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3
          className="text-xl font-semibold cursor-pointer hover:text-teal-500"
          onClick={() => setShowEquipmentList(!showEquipmentList)}
        >
          Equipment List
        </h3>

        {/* Conditional rendering of the equipment list */}
        {showEquipmentList && (
          <ul>
            {Array.isArray(equipmentList) && equipmentList.length > 0 ? (
              equipmentList.map((equipment) => (
                <li key={equipment._id} className="flex justify-between items-center py-2">
                  <span>{equipment.name}</span>
                  <div>
                    <button
                      className="text-teal-500 mr-2"
                      onClick={() => handleEditEquipment(equipment)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteEquipment(equipment._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li>No equipment available</li>
            )}
          </ul>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 ${
                currentPage === index + 1
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-300'
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
   
      {/* Edit Equipment Modal */}
      {showEditEquipmentModal && (
        <div className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content p-6">
              <h2 className="text-2xl font-bold mb-4">Edit Equipment</h2>
              <form onSubmit={handleUpdateEquipment}>
                <div className="mb-4">
                  <label className="block text-gray-700">Name:</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={editingEquipment.name}
                    onChange={(e) =>
                      setEditingEquipment({ ...editingEquipment, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Status:</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={editingEquipment.status}
                    onChange={(e) =>
                      setEditingEquipment({ ...editingEquipment, status: e.target.value })
                    }
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => setShowEditEquipmentModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-teal-500 text-white px-4 py-2 rounded"
                  >
                    Update Equipment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Equipment Issued Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3
          className="text-xl font-semibold cursor-pointer hover:text-teal-500"
          onClick={() => setShowIssuedEquipment(!showIssuedEquipment)}
        >
          Equipment Issued
        </h3>
        {showIssuedEquipment && issuedEquipment.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Equipment Name</th>
                <th className="py-2">Issued To</th>
                <th className="py-2">Issued On</th>
                <th className="py-2">Return Date</th> 
              </tr>
            </thead>
            <tbody>
              {issuedEquipment.map((equipment, index) => (
                <tr key={equipment._id}>
                  <td className="border px-4 py-2">{equipment.name}</td>
                  <td className="border px-4 py-2">
                    {issuedEquipmentUsers[index]?.username ?? 'N/A'}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(equipment.checkedOutAt).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                   {equipment.returnDate ? new Date(equipment.returnDate).toLocaleDateString() : 'N/A'}
                 </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p> Data for Equipment Issued.</p>
        )}
      </div>

      {/* Send Notification Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3
          className="text-xl font-semibold cursor-pointer hover:text-teal-500"
          onClick={() => setShowSendNotification(!showSendNotification)}
        >
          Send Notification
        </h3>
        {showSendNotification && <SendNotification />}
      </div>

      {/* Add Equipment Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3
          className="text-xl font-semibold cursor-pointer hover:text-teal-500"
          onClick={() => setShowAddEquipment(!showAddEquipment)}
        >
          Add Equipment
        </h3>
        {showAddEquipment && <AddEquipmentForm onAdd={fetchData} />}
      </div>

      {/* Assign Equipment Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3
          className="text-xl font-semibold cursor-pointer hover:text-teal-500"
          onClick={() => setShowAssignEquipment(!showAssignEquipment)}
        >
          Assign Equipment
        </h3>
        {showAssignEquipment && (
          <AssignEquipmentForm
            users={users}
            equipmentList={equipmentList}
            onAssign={fetchData}
          />
        )}
      </div>

      {/* User Management Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3
          className="text-xl font-semibold cursor-pointer hover:text-teal-500"
          onClick={() => setShowUserManagement(!showUserManagement)}
        >
          User Management
        </h3>
        {showUserManagement && (
          <>
            <ul>
              {users.map((user) => (
                <li key={user._id} className="flex justify-between items-center py-2">
                  <span>{user.username}</span>
                  <div>
                    <button
                      className="text-teal-500 mr-2"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`mx-1 px-3 py-1 ${
                    currentPage === index + 1
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-300'
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Edit User Modal */}
      {showEditUserModal && (
        <div className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content p-6">
              <h2 className="text-2xl font-bold mb-4">Edit User</h2>
              <form onSubmit={handleUpdateUser}>
                <div className="mb-4">
                  <label className="block text-gray-700">Username:</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={editingUser.username}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, username: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Role:</label>
                  <select
                    className="w-full border border-gray-300 p-2 rounded"
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, role: e.target.value })
                    }
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => setShowEditUserModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-teal-500 text-white px-4 py-2 rounded"
                  >
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHomePage;

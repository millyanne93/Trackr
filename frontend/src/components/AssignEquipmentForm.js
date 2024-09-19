import React, { useState } from 'react';
import api from '../services/api';

const AssignEquipmentForm = ({ users, equipmentList, onAssign }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to assign equipment
  const assignEquipment = async (equipmentId, userId) => {
    try {
      setLoading(true);
      await api.post('/assign', { equipmentId, userId });
      alert('Equipment assigned successfully!');
      setSelectedUser('');
      setSelectedEquipment('');
      onAssign(); // Update the parent component after successful assignment
    } catch (error) {
      console.error('Error assigning equipment:', error);
      alert('Failed to assign equipment.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleAssign = () => {
    if (selectedUser && selectedEquipment) {
      assignEquipment(selectedEquipment, selectedUser);
    } else {
      alert('Please select both a user and equipment.');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="text-xl font-semibold">Assign Equipment</h3>

      <div className="my-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">User:</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      <div className="my-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Equipment:</label>
        <select
          value={selectedEquipment}
          onChange={(e) => setSelectedEquipment(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        >
          <option value="">Select Equipment</option>
          {equipmentList.map((equipment) => (
            <option key={equipment._id} value={equipment._id}>
              {equipment.name} ({equipment.status})
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAssign}
        disabled={loading}
        className="bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {loading ? 'Assigning...' : 'Assign Equipment'}
      </button>
    </div>
  );
};

export default AssignEquipmentForm;

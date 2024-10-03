import React, { useState } from 'react';
import api from '../services/api';

const AssignEquipmentForm = ({ users, equipmentList, onAssign }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [returnDate, setReturnDate] = useState('');  // New state for return date
  const [loading, setLoading] = useState(false);

  // Function to assign equipment
  const assignEquipment = async (equipmentId, userId, returnDate) => {
    try {
      setLoading(true);
      await api.post('/assign', { equipmentId, userId, returnDate }); // Pass returnDate to backend
      alert('Equipment assigned successfully!');
      setSelectedUser('');
      setSelectedEquipment('');
      setReturnDate(''); // Clear the return date field
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
      assignEquipment(selectedEquipment, selectedUser, returnDate);  // Pass return date when assigning
    } else {
      alert('Please select both a user and equipment.');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6 max-w-lg">
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
        <label className="block text-sm font-medium text-gray-700 mb-1 ">Equipment:</label>
        <select
          value={selectedEquipment}
          onChange={(e) => setSelectedEquipment(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        >
          <option value="">Select Equipment</option>
          {Array.isArray(equipmentList) ? (
            equipmentList.map((equipment) => (
              <option key={equipment._id} value={equipment._id}>
                {equipment.name} ({equipment.status})
              </option>
            ))
          ) : (
            <option>No equipment available</option>
          )}
        </select>
      </div>

      <div className="my-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Return Date (Optional):</label>
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <button
        onClick={handleAssign}
        disabled={loading}
        className="bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {loading ? 'Assigning...' : 'Assign Equipment'}
      </button>
    </div>
  );
};

export default AssignEquipmentForm;

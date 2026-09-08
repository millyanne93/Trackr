import React, { useState } from 'react';
import api from '../services/api';

const AssignEquipmentForm = ({ users, equipmentList, onAssign }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); 

  const userArray = Array.isArray(users) ? users : [];
  const equipmentArray = Array.isArray(equipmentList) ? equipmentList : [];

  const assignEquipment = async (equipmentId, userId, returnDate) => {
    try {
      setLoading(true);
      setMessage('');

      const payload = {
        userId: userId,
        equipmentId: equipmentId,
        returnDate: returnDate || null 
      };

      console.log('Sending assignment payload:', payload);

      await api.post('/api/assign', payload);

      setMessage('✅ Equipment assigned successfully!');
      setSelectedUser('');
      setSelectedEquipment('');
      setReturnDate('');
      if (onAssign) onAssign();
    } catch (error) {
      console.error('Error assigning equipment:', error);
      
      if (error.response?.data?.message) {
        setMessage(`❌ ${error.response.data.message}`);
      } else if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = errors.map(e => e.message).join(', ');
        setMessage(`❌ Validation failed: ${errorMessages}`);
      } else {
        setMessage('❌ Failed to assign equipment. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = () => {
    if (!selectedUser || !selectedEquipment) {
      setMessage('❌ Please select both a user and equipment.');
      return;
    }
    assignEquipment(selectedEquipment, selectedUser, returnDate);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6 max-w-lg border border-forest-100">
      <h3 className="text-xl font-semibold text-ink mb-4">Assign Equipment</h3>

      {message && (
        <div className={`p-2 rounded mb-4 ${message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      <div className="my-4">
        <label className="block text-sm font-medium text-ink mb-1">User:</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="border border-forest-100 p-2 rounded w-full focus:ring-2 focus:ring-forest-500 focus:border-transparent"
        >
          <option value="">Select User</option>
          {userArray.length > 0 ? (
            userArray.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))
          ) : (
            <option value="" disabled>No users available</option>
          )}
        </select>
      </div>

      <div className="my-4">
        <label className="block text-sm font-medium text-ink mb-1">Equipment:</label>
        <select
          value={selectedEquipment}
          onChange={(e) => setSelectedEquipment(e.target.value)}
          className="border border-forest-100 p-2 rounded w-full focus:ring-2 focus:ring-forest-500 focus:border-transparent"
        >
          <option value="">Select Equipment</option>
          {equipmentArray.length > 0 ? (
            equipmentArray.map((equipment) => (
              <option key={equipment._id} value={equipment._id}>
                {equipment.name} ({equipment.status})
              </option>
            ))
          ) : (
            <option value="" disabled>No equipment available</option>
          )}
        </select>
      </div>

      <div className="my-4">
        <label className="block text-sm font-medium text-ink mb-1">Return Date (Optional):</label>
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className="border border-forest-100 p-2 rounded w-full focus:ring-2 focus:ring-forest-500 focus:border-transparent"
        />
      </div>

      <button
        onClick={handleAssign}
        disabled={loading}
        className="bg-forest-600 hover:bg-forest-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors disabled:opacity-50 w-full"
      >
        {loading ? 'Assigning...' : 'Assign Equipment'}
      </button>
    </div>
  );
};

export default AssignEquipmentForm;

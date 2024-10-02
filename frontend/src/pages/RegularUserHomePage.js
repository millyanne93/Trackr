import React, { useEffect, useState } from 'react';
import api from '../services/api';
import LogoutButton from '../components/LogoutButton';
import Cookies from 'js-cookie';

const RegularUserHomePage = () => {
  const [username, setUsername] = useState('');
  const [assignedEquipment, setAssignedEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [borrowingHistory, setBorrowingHistory] = useState([]);
  const [userId, setUserId] = useState(null); // Declare userId here

  // Fetch Username and set userId
  const fetchUsername = async () => {
    try {
      const token = localStorage.getItem('token'); // Use localStorage consistently for tokens
      const res = await api.get('/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsername(res.data.username);
      setUserId(res.data.id); // Assuming 'id' is the user ID returned
    } catch (error) {
      console.error('Error fetching username:', error.response ? error.response.data : error.message);
    }
  };

  // Fetch assigned equipment
  const fetchAssignedEquipment = async () => {
    try {
      const token = Cookies.get('token'); // Use localStorage for consistency
      if (!token) {
        throw new Error('No token found');
      }

      const response = await api.get('/assigned', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAssignedEquipment(response.data.equipment || []); // Ensure it's always an array
      setLoading(false);
    } catch (error) {
      console.error('Error fetching assigned equipment:', error);
      setError('Error fetching assigned equipment');
      setLoading(false);
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const token = Cookies.get('token');
      const response = await api.get('/notifications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(response.data || []); // Provide a fallback in case data is undefined
    } catch (error) {
      console.error('Error fetching notifications:', error.response?.data?.message || error.message);
    }
  };

  // Fetch borrowing history
  const fetchBorrowingHistory = async () => {
    try {
      const token = Cookies.get('token');
      const response = await api.get('/borrowing-history', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBorrowingHistory(response.data.borrowingHistory || []); // Always set as an array
    } catch (error) {
      console.error('Error fetching borrowing history:', error.response?.data?.message || error.message);
      setBorrowingHistory([]); // Ensure borrowingHistory is set to an empty array if there's an error
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchUsername();
    fetchAssignedEquipment();
    fetchNotifications();
    fetchBorrowingHistory(); // Fetch borrowing history here
  }, []);

  // Function to handle equipment return
  const handleReturn = async (equipmentId) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('Authorization token is missing');
      }

      // Optimistic UI update: remove the equipment before awaiting the API response
      const updatedEquipment = assignedEquipment.filter(equipment => equipment._id !== equipmentId);
      setAssignedEquipment(updatedEquipment);

      // Make the API call to return the equipment
      await api.put(`/return/${equipmentId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Equipment returned successfully');
      await fetchBorrowingHistory(); 
    } catch (error) {
      // Revert the UI update if an error occurs
      setAssignedEquipment(assignedEquipment); // Revert back in case of error

      console.error('Error returning equipment:', error);
      alert(`Failed to return equipment: ${error.message || 'An error occurred'}`);
    }
  };

  if (loading) {
    return <p>Loading assigned equipment...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-6">
      <LogoutButton />
      <h2 className="text-3xl font-bold text-teal-700 mb-6">Welcome, {username}!</h2>

      {/* Your Equipment Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold cursor-pointer hover:text-teal-500">Your Equipment</h3>
        {assignedEquipment && assignedEquipment.length > 0 ? (
          <ul>
            {assignedEquipment.map((item) => (
              <li key={item._id}>
                {item.name} - Status: {item.status} - Return Date: {item.returnDate || 'No return date'}
                <button
                  className="bg-teal-500 text-white p-2 ml-4 rounded"
                  onClick={() => handleReturn(item._id)}
                >
                  Return
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Equipment currently Assigned.</p>
        )}
      </div>

      {/* Notifications Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold cursor-pointer hover:text-teal-500">Notifications</h3>
        {notifications && notifications.length > 0 ? (
          <ul>
            {notifications.map((note) => (
              <li key={note._id}>
                {note.message} - {new Date(note.date).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>Your Notifications.</p>
        )}
      </div>

      {/* Borrowing History Section */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold cursor-pointer hover:text-teal-500">Assigned Equipment Hitory</h3>
        {borrowingHistory.length > 0 ? (
          <ul>
            {borrowingHistory.map((history, index) => (
              <li key={index}>
                {history.equipmentId.name} - Borrowed on: {new Date(history.borrowedAt).toLocaleString()} - 
                Returned on: {history.returnedAt ? new Date(history.returnedAt).toLocaleString() : 'Not returned yet'}
              </li>
            ))}
          </ul>
        ) : (
          <p>Your Equipment History.</p>
        )}
      </div>
    </div>
  );
};

export default RegularUserHomePage;

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

  // Fetch Username
  const fetchUsername = async () => {
    try {
      const token = localStorage.getItem('token'); // or use Cookies.get('token') if you're storing it in cookies
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

  // Fetch assigned equipment on component mount
  useEffect(() => {
    const fetchAssignedEquipment = async () => {
      try {
        const token = Cookies.get('token');
        console.log('Retrieved token:', token);

        if (!token) {
          throw new Error('No token found');
        }

        const response = await api.get('/assigned', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { equipment } = response.data;

        // If equipment is empty, simply set it to an empty array
        setAssignedEquipment(equipment || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching assigned equipment:', error);
        setError('Error fetching assigned equipment');
        setLoading(false);
      }
    };

    fetchUsername(); // Call fetchUsername when component mounts
    fetchAssignedEquipment();
  }, []);

  // Function to handle equipment return
  const handleReturn = async (equipmentId) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('No token found');
      }

      await api.put(`/return/${equipmentId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Equipment returned successfully');

      // Update the assignedEquipment list by removing the returned item
      setAssignedEquipment(assignedEquipment.filter(equipment => equipment._id !== equipmentId));
    } catch (error) {
      alert('Failed to return equipment.');
      console.error('Error returning equipment:', error);
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
      <h2 className="text-3xl font-bold text-green-700 mb-6">Welcome, {username}!</h2>

      {/* Your Equipment Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold">Your Equipment</h3>
        {assignedEquipment.length > 0 ? (
          <ul>
            {assignedEquipment.map((item) => (
              <li key={item._id}>
                {item.name} - Status: {item.status} - Return Date: {item.returnDate || 'No return date'}
                <button
                  className="bg-red-500 text-white p-2 ml-4 rounded"
                  onClick={() => handleReturn(item._id)}
                >
                  Return
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No equipment currently borrowed.</p>
        )}
      </div>

      {/* Notifications Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold">Notifications</h3>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((note, index) => <li key={index}>{note}</li>)}
          </ul>
        ) : (
          <p>No notifications available.</p>
        )}
      </div>

      {/* Borrowing History Section */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold">Borrowing History</h3>
        {borrowingHistory.length > 0 ? (
          <ul>
            {borrowingHistory.map((history, index) => (
              <li key={index}>
                {history.equipmentName} - Borrowed on: {history.borrowedDate} - Returned on: {history.returnedDate || 'Not returned yet'}
              </li>
            ))}
          </ul>
        ) : (
          <p>No borrowing history available.</p>
        )}
      </div>
    </div>
  );
};

export default RegularUserHomePage;

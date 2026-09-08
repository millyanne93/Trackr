import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Cookies from 'js-cookie';
import { FaBox, FaBell, FaHistory } from 'react-icons/fa';

const RegularUserHomePage = () => {
  const [username, setUsername] = useState('');
  const [assignedEquipment, setAssignedEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [borrowingHistory, setBorrowingHistory] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const fetchUsername = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/api/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsername(res.data.username);
    } catch (error) {
      console.error('Error fetching username:', error.response ? error.response.data : error.message);
    }
  };

  const fetchAssignedEquipment = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await api.get('/api/assigned', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAssignedEquipment(response.data.equipment || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching assigned equipment:', error);
      setAssignedEquipment([]);
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    setLoadingNotifications(true);
    try {
      const token = Cookies.get('token');
      const response = await api.get('/api/notifications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(response.data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error.response?.data?.message || error.message);
      setNotifications([]);
    } finally {
      setLoadingNotifications(false);
    }
  };

  const fetchBorrowingHistory = async () => {
    setLoadingHistory(true);
    try {
      const token = Cookies.get('token');
      const response = await api.get('/api/borrowing-history', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setBorrowingHistory(response.data.borrowingHistory || []);
    } catch (error) {
      console.error('Error fetching borrowing history:', error.response?.data?.message || error.message);
      
      setBorrowingHistory([]);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchUsername();
    fetchAssignedEquipment();
    fetchNotifications();
    fetchBorrowingHistory();
  }, []);

  const handleReturn = async (equipmentId) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('Authorization token is missing');
      }

      const updatedEquipment = assignedEquipment.filter(equipment => equipment._id !== equipmentId);
      setAssignedEquipment(updatedEquipment);

      await api.put(`/api/return/${equipmentId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchBorrowingHistory();
      await fetchNotifications();
    } catch (error) {
      setAssignedEquipment(assignedEquipment);
      console.error('Error returning equipment:', error);
      alert(`Failed to return equipment: ${error.message || 'An error occurred'}`);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = Cookies.get('token');
      await api.put(`/api/notifications/${notificationId}/read`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error.response?.data?.message || error.message);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const token = Cookies.get('token');
      await api.delete(`/api/notifications/${notificationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error.response?.data?.message || error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-forest-50 flex items-center justify-center">
        <div className="text-ink">Loading your equipment...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-forest-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-forest-600 text-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Welcome, {username}!</h1>
              <p className="text-forest-100 mt-1">Here's your equipment dashboard</p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-forest-100">
            <div className="flex items-center gap-3">
              <FaBox className="text-forest-600 text-xl" />
              <div>
                <p className="text-sm text-ink-muted">Assigned Equipment</p>
                <p className="text-2xl font-bold text-ink">{assignedEquipment.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-forest-100">
            <div className="flex items-center gap-3">
              <FaBell className="text-forest-600 text-xl" />
              <div>
                <p className="text-sm text-ink-muted">Notifications</p>
                <p className="text-2xl font-bold text-ink">
                  {notifications.filter(n => !n.read).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-forest-100">
            <div className="flex items-center gap-3">
              <FaHistory className="text-forest-600 text-xl" />
              <div>
                <p className="text-sm text-ink-muted">Total Borrowed</p>
                <p className="text-2xl font-bold text-ink">{borrowingHistory.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Equipment Section */}
        <div className="bg-white rounded-lg shadow-sm border border-forest-100 p-6 mb-6">
          <h3 className="text-xl font-semibold text-ink mb-4 flex items-center gap-2">
            <FaBox className="text-forest-600" /> Your Equipment
          </h3>
          {assignedEquipment.length > 0 ? (
            <ul className="space-y-3">
              {assignedEquipment.map((item) => (
                <li key={item._id} className="flex justify-between items-center border-b border-forest-50 pb-3">
                  <div>
                    <p className="font-medium text-ink">{item.name}</p>
                    <p className="text-sm text-ink-muted">
                      Status: <span className="font-medium">{item.status}</span>
                      {item.returnDate && ` • Due: ${new Date(item.returnDate).toLocaleDateString()}`}
                    </p>
                  </div>
                  <button
                    className="bg-forest-600 hover:bg-forest-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                    onClick={() => handleReturn(item._id)}
                  >
                    Return
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-ink-muted">No equipment currently assigned to you.</p>
          )}
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-lg shadow-sm border border-forest-100 p-6 mb-6">
          <h3 className="text-xl font-semibold text-ink mb-4 flex items-center gap-2">
            <FaBell className="text-forest-600" /> Notifications
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="bg-forest-600 text-white text-xs px-2 py-1 rounded-full">
                {notifications.filter(n => !n.read).length} new
              </span>
            )}
          </h3>
          {loadingNotifications ? (
            <p className="text-ink-muted">Loading notifications...</p>
          ) : notifications.length > 0 ? (
            <ul className="space-y-3">
              {notifications.map((note) => (
                <li key={note._id} className={`flex justify-between items-center border-b border-forest-50 pb-3 ${!note.read ? 'bg-forest-50/50 p-2 rounded' : ''}`}>
                  <div>
                    <p className="text-ink">{note.message}</p>
                    <p className="text-xs text-ink-muted">{new Date(note.date).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    {!note.read && (
                      <button
                        onClick={() => markAsRead(note._id)}
                        className="text-forest-600 hover:text-forest-700 text-sm"
                      >
                        Mark read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(note._id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-ink-muted">No notifications.</p>
          )}
        </div>

        {/* Borrowing History Section */}
        <div className="bg-white rounded-lg shadow-sm border border-forest-100 p-6">
          <h3 className="text-xl font-semibold text-ink mb-4 flex items-center gap-2">
            <FaHistory className="text-forest-600" /> Borrowing History
          </h3>
          {loadingHistory ? (
            <p className="text-ink-muted">Loading history...</p>
          ) : borrowingHistory.length > 0 ? (
            <ul className="space-y-3">
              {borrowingHistory.map((history, index) => (
                <li key={index} className="border-b border-forest-50 pb-3">
                  <p className="font-medium text-ink">{history.equipmentId?.name || 'Unknown Equipment'}</p>
                  <p className="text-sm text-ink-muted">
                    Borrowed: {new Date(history.borrowedAt).toLocaleString()}
                    {history.returnedAt && ` • Returned: ${new Date(history.returnedAt).toLocaleString()}`}
                    {!history.returnedAt && ' • Not returned yet'}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-ink-muted">Your borrowing history is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegularUserHomePage;

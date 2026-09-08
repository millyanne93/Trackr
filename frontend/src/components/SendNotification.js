import { useState, useEffect } from 'react';
import api from '../services/api';

function SendNotification() {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        let allUsers = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const response = await api.get(`/api/users?page=${page}&limit=50`);
          const userData = response.data.users || [];
          allUsers = [...allUsers, ...userData];
          const totalPages = response.data.totalPages || 0;
          hasMore = page < totalPages;
          page++;
        }
        //console.log(` Loaded ${allUsers.length} users for notification`);
        setUsers(allUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        setFeedback('Error loading users: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const sendNotification = async (userId, message) => {
    try {
      setLoading(true);
      const response = await api.post('/api/notifications/send', { userId, message });
      setFeedback(response.data.message);
      setSelectedUserId('');
      setMessage('');
    } catch (error) {
      setFeedback('Error sending notification: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSendNotification = () => {
    if (selectedUserId && message) {
      sendNotification(selectedUserId, message);
    } else {
      alert('Please select a user and enter a message.');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6 max-w-lg border border-forest-100">
      <h3 className="text-xl font-semibold text-ink mb-4">Send Notification</h3>

      {loadingUsers ? (
        <p className="text-ink-muted">Loading users...</p>
      ) : (
        <>
          <div className="my-4">
            <label className="block text-sm font-medium text-ink mb-1">User:</label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="border border-forest-100 p-2 rounded w-full focus:ring-2 focus:ring-forest-500 focus:border-transparent"
            >
              <option value="">Select User</option>
              {users.length > 0 ? (
                users.map((user) => (
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
            <label className="block text-sm font-medium text-ink mb-1">Message:</label>
            <input
              type="text"
              placeholder="Enter notification message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-forest-100 p-2 rounded w-full focus:ring-2 focus:ring-forest-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleSendNotification}
            disabled={loading}
            className="bg-forest-600 hover:bg-forest-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50 w-full"
          >
            {loading ? 'Sending...' : 'Send Notification'}
          </button>

          {feedback && (
            <p className={`mt-4 ${feedback.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
              {feedback}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default SendNotification;

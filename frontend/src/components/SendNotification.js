import { useState, useEffect } from 'react';
import api from '../services/api';

function SendNotification() {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [users, setUsers] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        console.log(response.data); // Check if the data is an array
        setUsers(response.data.users || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Function to send a notification
  const sendNotification = async (userId, message) => {
    try {
      setLoading(true);
      const response = await api.post('/notifications/send', { userId, message });
      setFeedback(response.data.message); // Set success message
      setSelectedUserId(''); // Reset after sending
      setMessage('');
    } catch (error) {
      setFeedback('Error sending notification: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSendNotification = () => {
    if (selectedUserId && message) {
      sendNotification(selectedUserId, message);
    } else {
      alert('Please select a user and enter a message.');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold">Send Notification</h2>

      {/* Select User Dropdown */}
      <div className="my-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">User:</label>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        >
          <option value="">Select User</option>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))
          ) : (
            <option>No users available</option>
          )}
        </select>
      </div>

      {/* Message Input */}
      <div className="my-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Message:</label>
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      {/* Send Button */}
      <button
        onClick={handleSendNotification}
        disabled={loading}
        className="bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {loading ? 'Sending...' : 'Send Notification'}
      </button>

      {/* Feedback Message */}
      {feedback && <p className="mt-4 text-red-500">{feedback}</p>}
    </div>
  );
}

export default SendNotification;

import React from 'react';

const EditUserModal = ({
  showEditUserModal,
  setShowEditUserModal,
  editingUser,
  setEditingUser,
  handleUpdateUser,
}) => {
  return (
    showEditUserModal && (
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
                  className="bg-teal-500 text-white px-4 py-2 rounded-full"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default EditUserModal;

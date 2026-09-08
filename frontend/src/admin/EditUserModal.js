import React from 'react';

const EditUserModal = ({
  user,
  setEditingUser,
  showEditUserModal,
  setShowEditUserModal,
  handleUpdateUser,
}) => {
  return (
    showEditUserModal && (
      <div className="modal fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-overlay absolute inset-0 bg-black/50"></div>
        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-xl shadow-2xl z-50 overflow-y-auto relative">
          <div className="modal-content p-6">
            {/* Header with close button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-ink">Edit User</h2>
              <button
                onClick={() => setShowEditUserModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateUser}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-ink mb-1">Username:</label>
                <input
                  type="text"
                  className="w-full border border-forest-100 p-2 rounded-md focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  value={user?.username || ''}
                  onChange={(e) =>
                    setEditingUser({ ...user, username: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-ink mb-1">Role:</label>
                <select
                  className="w-full border border-forest-100 p-2 rounded-md focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  value={user?.role || 'user'}
                  onChange={(e) =>
                    setEditingUser({ ...user, role: e.target.value })
                  }
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowEditUserModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-forest-600 hover:bg-forest-700 text-white rounded-md transition-colors"
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

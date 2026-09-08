import React from 'react';

const UserManagementSection = ({
  users,
  showUserManagement,
  setShowUserManagement,
  handleEditUser,
  handleDeleteUser,
  totalPages,
  currentPage,
  handlePageChange,
}) => {

  const userList = Array.isArray(users) ? users : [];

  return (
    <div className="bg-white p-4 rounded shadow mb-6 border border-forest-100">
      <h3
        className="text-xl font-semibold cursor-pointer text-ink hover:text-forest-600 flex justify-between items-center"
        onClick={() => setShowUserManagement(!showUserManagement)}
      >
        <span>👥 User Management</span>
        <span className="text-sm text-ink-muted">{showUserManagement ? '▲' : '▼'}</span>
      </h3>
      {showUserManagement && (
        <div className="mt-4">
          {/* ✅ Check if userList has items before mapping */}
          {userList.length > 0 ? (
            <>
              <ul className="divide-y divide-forest-50">
                {userList.map((user) => (
                  <li key={user._id} className="flex justify-between items-center py-3">
                    <span className="text-ink">{user.username}</span>
                    <div className="flex gap-2">
                      <button
                        className="text-forest-600 hover:text-forest-700 text-sm font-medium"
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-4 gap-1">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`px-3 py-1 rounded-md text-sm ${
                        currentPage === index + 1
                          ? 'bg-forest-600 text-white'
                          : 'bg-forest-50 text-ink hover:bg-forest-100'
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-ink-muted">No users found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserManagementSection;

import React from 'react';

const EquipmentList = ({
  equipmentList,
  showEquipmentList,
  setShowEquipmentList,
  handleEditEquipment,
  handleDeleteEquipment,
  totalPages,
  currentPage,
  handlePageChange,
}) => {

  const equipment = Array.isArray(equipmentList) ? equipmentList : [];

  return (
    <div className="bg-white p-4 rounded shadow mb-6 border border-forest-100">
      <h3
        className="text-xl font-semibold cursor-pointer text-ink hover:text-forest-600 flex justify-between items-center"
        onClick={() => setShowEquipmentList(!showEquipmentList)}
      >
        <span>📦 Equipment List</span>
        <span className="text-sm text-ink-muted">{showEquipmentList ? '▲' : '▼'}</span>
      </h3>
      {showEquipmentList && (
        <div className="mt-4">
          {equipment.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-forest-100">
                  <thead>
                    <tr className="bg-forest-50">
                      <th className="py-2 px-4 text-left text-sm font-semibold text-ink border-b border-forest-100">
                        Name
                      </th>
                      <th className="py-2 px-4 text-left text-sm font-semibold text-ink border-b border-forest-100">
                        Status
                      </th>
                      <th className="py-2 px-4 text-left text-sm font-semibold text-ink border-b border-forest-100">
                        Serial Number
                      </th>
                      <th className="py-2 px-4 text-left text-sm font-semibold text-ink border-b border-forest-100">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipment.map((item) => (
                      <tr key={item._id} className="hover:bg-forest-50/50">
                        <td className="border-b border-forest-50 px-4 py-2 text-sm text-ink">
                          {item.name || 'N/A'}
                        </td>
                        <td className="border-b border-forest-50 px-4 py-2 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'available' 
                              ? 'bg-green-100 text-green-700' 
                              : item.status === 'issued'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {item.status || 'Unknown'}
                          </span>
                        </td>
                        <td className="border-b border-forest-50 px-4 py-2 text-sm text-ink">
                          {item.serialNumber || 'N/A'}
                        </td>
                        <td className="border-b border-forest-50 px-4 py-2 text-sm">
                          <div className="flex gap-2">
                            <button
                              className="text-forest-600 hover:text-forest-700 text-sm font-medium"
                              onClick={() => handleEditEquipment(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="text-red-500 hover:text-red-700 text-sm font-medium"
                              onClick={() => handleDeleteEquipment(item._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
            <p className="text-ink-muted">No equipment found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EquipmentList;

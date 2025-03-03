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
  return (
    <div className="bg-gradient-to-r from-teal-200 to-teal-100 p-4 rounded shadow mb-6">
      <h3
        className="text-xl font-semibold cursor-pointer hover:text-teal-500"
        onClick={() => setShowEquipmentList(!showEquipmentList)}
      >
        Equipment List
      </h3>
      {showEquipmentList && (
        <ul>
          {Array.isArray(equipmentList) && equipmentList.length > 0 ? (
            equipmentList.map((equipment) => (
              <li key={equipment._id} className="flex justify-between items-center py-2">
                <span>{equipment.name}</span>
                <div>
                  <button
                    className="text-teal-500 mr-2"
                    onClick={() => handleEditEquipment(equipment)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteEquipment(equipment._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li>No equipment available</li>
          )}
        </ul>
      )}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 ${
              currentPage === index + 1 ? 'bg-teal-500 text-white' : 'bg-gray-300'
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EquipmentList;

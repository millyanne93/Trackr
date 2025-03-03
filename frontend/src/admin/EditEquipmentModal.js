import React from 'react';

const EditEquipmentModal = ({
  equipment,
  setEditingEquipment,
  showEditEquipmentModal,
  setShowEditEquipmentModal,
  handleUpdateEquipment,
}) => {
  return (
    showEditEquipmentModal && (
      <div className="modal fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50"></div>
        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="modal-content p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Equipment</h2>
            <form onSubmit={handleUpdateEquipment}>
              <div className="mb-4">
                <label className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={equipment.name}
                  onChange={(e) =>
                    setEditingEquipment({ ...equipment, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Status:</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={equipment.status}
                  onChange={(e) =>
                    setEditingEquipment({ ...equipment, status: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setShowEditEquipmentModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-4 py-2 rounded"
                >
                  Update Equipment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default EditEquipmentModal;

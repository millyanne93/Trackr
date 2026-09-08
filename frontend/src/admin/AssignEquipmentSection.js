import React from 'react';
import AssignEquipmentForm from '../components/AssignEquipmentForm';

const AssignEquipmentSection = ({
  showAssignEquipment,
  setShowAssignEquipment,
  users,
  equipmentList,
  fetchData,
}) => {

  const userList = users || [];
  const equipment = equipmentList || [];

  return (
    <div className="bg-white p-4 rounded shadow mb-6 border border-forest-100">
      <h3
        className="text-xl font-semibold cursor-pointer text-ink hover:text-forest-600 flex justify-between items-center"
        onClick={() => setShowAssignEquipment(!showAssignEquipment)}
      >
        <span>🔗 Assign Equipment</span>
        <span className="text-sm text-ink-muted">{showAssignEquipment ? '▲' : '▼'}</span>
      </h3>
      {showAssignEquipment && (
        <div className="mt-4">
          <AssignEquipmentForm
            users={userList}
            equipmentList={equipment}
            onAssign={fetchData}
          />
        </div>
      )}
    </div>
  );
};

export default AssignEquipmentSection;

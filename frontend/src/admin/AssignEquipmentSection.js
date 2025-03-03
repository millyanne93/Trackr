import React from 'react';
import AssignEquipmentForm from '../components/AssignEquipmentForm';

const AssignEquipmentSection = ({
  showAssignEquipment,
  setShowAssignEquipment,
  users,
  equipmentList,
  fetchData,
}) => {
  return (
    <div className="bg-gradient-to-r from-teal-200 to-teal-100 p-4 rounded shadow mb-6">
      <h3
        className="text-xl font-semibold cursor-pointer hover:text-teal-500"
        onClick={() => setShowAssignEquipment(!showAssignEquipment)}
      >
        Assign Equipment
      </h3>
      {showAssignEquipment && (
        <AssignEquipmentForm
          users={users}
          equipmentList={equipmentList}
          onAssign={fetchData}
        />
      )}
    </div>
  );
};

export default AssignEquipmentSection;

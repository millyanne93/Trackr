import React from 'react';
import AddEquipmentForm from '../components/AddEquipmentForm';

const AddEquipmentSection = ({ showAddEquipment, setShowAddEquipment, fetchData }) => {
  return (
    <div className="bg-gradient-to-r from-teal-200 to-teal-100 p-4 rounded shadow mb-6">
      <h3
        className="text-xl font-semibold cursor-pointer hover:text-teal-500"
        onClick={() => setShowAddEquipment(!showAddEquipment)}
      >
        Add New Equipment
      </h3>
      {showAddEquipment && <AddEquipmentForm onAdd={fetchData} />}
    </div>
  );
};

export default AddEquipmentSection;

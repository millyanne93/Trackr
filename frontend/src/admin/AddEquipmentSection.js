import React from 'react';
import AddEquipmentForm from '../components/AddEquipmentForm';

const AddEquipmentSection = ({ showAddEquipment, setShowAddEquipment, fetchData }) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-6 border border-forest-100">
      <h3
        className="text-xl font-semibold cursor-pointer text-ink hover:text-forest-600 flex justify-between items-center"
        onClick={() => setShowAddEquipment(!showAddEquipment)}
      >
        <span>➕ Add New Equipment</span>
        <span className="text-sm text-ink-muted">{showAddEquipment ? '▲' : '▼'}</span>
      </h3>
      {showAddEquipment && (
        <div className="mt-4">
          <AddEquipmentForm onAdd={fetchData} />
        </div>
      )}
    </div>
  );
};

export default AddEquipmentSection;

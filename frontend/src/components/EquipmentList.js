import React from 'react';
import EquipmentItem from './EquipmentItem';

const EquipmentList = ({ equipment }) => (
  <div className="p-4">
    <h2 className="text-green-700 text-xl mb-4">Equipment List</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {equipment.map((item) => (
        <EquipmentItem key={item.id} item={item} />
      ))}
    </div>
  </div>
);

export default EquipmentList;

import React from 'react';

const EquipmentItem = ({ item }) => (
  <div className="border p-4 rounded shadow-sm bg-white">
    <h3 className="text-green-700 text-lg">{item.name}</h3>
    <p>{item.description}</p>
    <p className="text-sm text-gray-600">Serial Number: {item.serialNumber}</p>
    <p className={`text-sm ${item.status === 'available' ? 'text-green-500' : 'text-red-500'}`}>
      Status: {item.status}
    </p>
  </div>
);

export default EquipmentItem;

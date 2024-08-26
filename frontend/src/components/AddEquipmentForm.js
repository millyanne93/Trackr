import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddEquipmentForm = ({ onSubmit }) => {
  console.log('AddEquipmentForm is rendering');
  console.log('onSubmit prop:', onSubmit); // Debugging line

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEquipment = { name, description, serialNumber, status: 'available' };

    // Validate onSubmit before calling
    if (typeof onSubmit === 'function') {
      onSubmit(newEquipment);
    } else {
      console.error('onSubmit is not a function:', onSubmit);
    }

    setName('');
    setDescription('');
    setSerialNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Add New Equipment</h3>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Equipment Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serialNumber">
          Serial Number
        </label>
        <input
          id="serialNumber"
          type="text"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Equipment
      </button>
    </form>
  );
};

// Define prop types
AddEquipmentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddEquipmentForm;

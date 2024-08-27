import React, { useState } from 'react';
import api from '../services/api';

const AddEquipmentForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newEquipment = {
      name,
      description,
      serialNumber
    };

    // Log the data being sent
    console.log('Sending data:', newEquipment);

    try {
      const response = await api.post('/equipment', newEquipment);

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      // Handle successful response
      const data = await response.json();
      console.log('Response data:', data);
      setSuccess('Equipment added successfully!');
      setError('');
      // Clear the form fields
      setName('');
      setDescription('');
      setSerialNumber('');
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      setError(`Failed to add equipment: ${error.message}`);
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Add New Equipment</h3>

      {/* Display success or error messages */}
      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-600">{error}</p>}

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

export default AddEquipmentForm;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EquipmentDetail = () => {
  const { id } = useParams(); // Get the equipment ID from the URL
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        // Replace the URL with your actual API endpoint
        const response = await fetch(`/api/equipment/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEquipment(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching equipment details: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Equipment Detail</h2>
      {equipment ? (
        <div className="mb-4">
          <p className="text-lg font-semibold">Name: {equipment.name}</p>
          <p>Description: {equipment.description}</p>
          <p>Serial Number: {equipment.serialNumber}</p>
          <p>Status: <span className={equipment.status === 'Available' ? 'text-green-500' : 'text-red-500'}>{equipment.status}</span></p>
        </div>
      ) : (
        <p>No equipment details available.</p>
      )}
      <div className="mb-4">
        <p className="text-lg font-semibold">Maintenance History</p>
        <ul>
          {equipment.maintenanceHistory && equipment.maintenanceHistory.length > 0 ? (
            equipment.maintenanceHistory.map((entry, index) => (
              <li key={index}>
                {entry.date}: {entry.description}
              </li>
            ))
          ) : (
            <li>No maintenance history available.</li>
          )}
        </ul>
      </div>
      <div className="flex space-x-4">
        <button className="bg-green-700 text-white px-4 py-2 rounded">
          Mark as Repaired
        </button>
        <button className="bg-red-700 text-white px-4 py-2 rounded">
          Delete Equipment
        </button>
      </div>
    </div>
  );
};

export default EquipmentDetail;

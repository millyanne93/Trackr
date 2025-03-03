import React from 'react';

const IssuedEquipment = ({ issuedEquipment, issuedEquipmentUsers, showIssuedEquipment, setShowIssuedEquipment }) => {
  return (
    <div className="bg-gradient-to-r from-teal-200 to-teal-100 p-4 rounded shadow mb-6">
      <h3
        className="text-xl font-semibold cursor-pointer hover:text-teal-500"
        onClick={() => setShowIssuedEquipment(!showIssuedEquipment)}
      >
        Equipment Issued
      </h3>
      {showIssuedEquipment && issuedEquipment.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4">Equipment Name</th>
                <th className="py-2 px-4">Issued To</th>
                <th className="py-2 px-4">Issued On</th>
                <th className="py-2 px-4">Return Date</th>
              </tr>
            </thead>
            <tbody>
              {issuedEquipment.map((equipment, index) => (
                <tr key={equipment._id}>
                  <td className="border px-4 py-2">{equipment.name}</td>
                  <td className="border px-4 py-2">
                    {issuedEquipmentUsers[index]?.username ?? 'N/A'}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(equipment.checkedOutAt).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    {equipment.returnDate ? new Date(equipment.returnDate).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data for equipment issued.</p>
      )}
    </div>
  );
};

export default IssuedEquipment;

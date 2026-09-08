import React from 'react';

const IssuedEquipment = ({
  issuedEquipment,
  issuedEquipmentUsers,
  showIssuedEquipment,
  setShowIssuedEquipment,
}) => {

  const equipment = issuedEquipment || [];
  const users = issuedEquipmentUsers || [];

  return (
    <div className="bg-white p-4 rounded shadow mb-6 border border-forest-100">
      <h3
        className="text-xl font-semibold cursor-pointer text-ink hover:text-forest-600 flex justify-between items-center"
        onClick={() => setShowIssuedEquipment(!showIssuedEquipment)}
      >
        <span>📋 Equipment Issued</span>
        <span className="text-sm text-ink-muted">{showIssuedEquipment ? '▲' : '▼'}</span>
      </h3>
      {showIssuedEquipment && (
        <div className="mt-4">
          {equipment.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white table-auto border border-forest-100">
                <thead>
                  <tr className="bg-forest-50">
                    <th className="py-2 px-4 text-left text-sm font-semibold text-ink border-b border-forest-100">
                      Equipment Name
                    </th>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-ink border-b border-forest-100">
                      Issued To
                    </th>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-ink border-b border-forest-100">
                      Issued On
                    </th>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-ink border-b border-forest-100">
                      Return Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {equipment.map((item, index) => (
                    <tr key={item._id} className="hover:bg-forest-50/50">
                      <td className="border-b border-forest-50 px-4 py-2 text-sm text-ink">
                        {item.name || 'N/A'}
                      </td>
                      <td className="border-b border-forest-50 px-4 py-2 text-sm text-ink">
                        {users[index]?.username ?? 'N/A'}
                      </td>
                      <td className="border-b border-forest-50 px-4 py-2 text-sm text-ink">
                        {item.checkedOutAt
                          ? new Date(item.checkedOutAt).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td className="border-b border-forest-50 px-4 py-2 text-sm text-ink">
                        {item.returnDate
                          ? new Date(item.returnDate).toLocaleDateString()
                          : 'Not returned'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-ink-muted">No equipment currently issued.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default IssuedEquipment;

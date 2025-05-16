// MechanicCard.js
// Componente para mostrar una mecánica individual

import React from 'react';

const MechanicCard = ({ mechanic }) => {
  // Determinar los colores según el rol
  const getRoleStyles = (role) => {
    if (role.includes('Tank')) return 'bg-blue-900 text-blue-300';
    if (role.includes('Healer')) return 'bg-green-900 text-green-300';
    if (role.includes('DPS')) return 'bg-red-900 text-red-300';
    return 'bg-purple-900 text-purple-300';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex">
      <div className="flex-shrink-0 w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4">
        <span className="text-2xl">{mechanic.icon}</span>
      </div>
      <div className="flex-grow">
        <h4 className="font-bold">{mechanic.name}</h4>
        <p className="text-sm text-gray-300 mb-2">{mechanic.description}</p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 rounded bg-gray-700 text-blue-300">🕒 {mechanic.time}</span>
          <span className={`px-2 py-1 rounded ${getRoleStyles(mechanic.role)}`}>
            👤 {mechanic.role}
          </span>
        </div>
        <div className="mt-2 text-green-400 text-sm">
          <span className="font-semibold">💡 Tip:</span> {mechanic.tip}
        </div>
      </div>
    </div>
  );
};

export default MechanicCard;
// CooldownCard.js
import React from 'react';

const CooldownCard = ({ spell, className, specName }) => {
  // Determinar color según el tipo de cooldown
  let borderColor = 'border-blue-500';
  let bgColor = 'bg-blue-900 bg-opacity-30';
  let textColor = 'text-blue-400';
  
  if (spell.type === 'healing') {
    borderColor = 'border-green-500';
    bgColor = 'bg-green-900 bg-opacity-30';
    textColor = 'text-green-400';
  } else if (spell.type === 'defensive') {
    borderColor = 'border-red-500';
    bgColor = 'bg-red-900 bg-opacity-30';
    textColor = 'text-red-400';
  } else if (spell.type === 'utility') {
    borderColor = 'border-yellow-500';
    bgColor = 'bg-yellow-900 bg-opacity-30';
    textColor = 'text-yellow-400';
  }

  return (
    <div className={`cooldown-card ${borderColor} border-l-4 ${bgColor} p-3 rounded-r mb-2`}>
      <div className="flex items-center mb-1">
        <span className="text-xl mr-2">{spell.icon}</span>
        <h3 className={`font-bold ${textColor}`}>{spell.name}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm mb-2">
        <div>
          <span className="text-gray-400">Clase:</span> {className}
        </div>
        <div>
          <span className="text-gray-400">Spec:</span> {specName}
        </div>
        <div>
          <span className="text-gray-400">Tipo:</span> {spell.type}
        </div>
        <div>
          <span className="text-gray-400">Duración:</span> {spell.duration}s
        </div>
        <div>
          <span className="text-gray-400">Cooldown:</span> {spell.cooldown}s
        </div>
      </div>
      
      <p className="text-gray-300 text-sm">{spell.description}</p>
    </div>
  );
};

export default CooldownCard;
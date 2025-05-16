// PhaseTab.js
// Componente para las pestañas de fases

import React from 'react';

const PhaseTab = ({ phase, isActive, onClick }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg transition-all ${
        isActive 
          ? 'bg-indigo-600 text-white shadow-md' 
          : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
      }`}
      onClick={onClick}
    >
      {phase.name}
    </button>
  );
};

export default PhaseTab;
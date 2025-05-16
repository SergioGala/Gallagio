// ViewModeTab.js
// Componente para pestañas de modos de visualización

import React from 'react';

const ViewModeTab = ({ mode, currentMode, onClick }) => {
  const label = 
    mode === 'mechanics' ? 'Mecánicas Clave' : 
    mode === 'timeline' ? 'Línea de Tiempo' : 
    'Estrategia';
    
  return (
    <button
      className={`px-4 py-2 ${currentMode === mode ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-gray-400'}`}
      onClick={() => onClick(mode)}
    >
      {label}
    </button>
  );
};

export default ViewModeTab;
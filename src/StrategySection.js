// StrategySection.js
// Componente para mostrar una sección de estrategia

import React from 'react';

const StrategySection = ({ section }) => {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className="text-lg font-bold mb-2 flex items-center">
        <span className="w-2 h-8 bg-indigo-500 rounded-r mr-2"></span>
        {section.header}
      </h3>
      <p className="text-gray-300 mb-3">{section.content}</p>
      {section.image && (
        <div className="w-full h-40 bg-gray-700 rounded-lg flex items-center justify-center mt-3">
          <p className="text-sm text-gray-400">Imagen: {section.image}</p>
        </div>
      )}
    </div>
  );
};

export default StrategySection;
// PhaseInfo.js
// Componente para mostrar la información de una fase

import React, { useState } from 'react';
import ViewModeTab from './ViewModeTab';
import MechanicCard from './MechanicCard';
import TimelineItem from './TimelineItem';
import StrategySection from './StrategySection';

const PhaseInfo = ({ phase }) => {
  const [viewMode, setViewMode] = useState('mechanics'); // 'mechanics', 'timeline', 'strategy'
  
  if (!phase) return <div>Selecciona una fase para ver su información</div>;
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{phase.name}</h2>
        <p className="text-gray-300 mt-1">{phase.description}</p>
      </div>
      
      <div className="flex mb-6 border-b border-gray-700">
        <ViewModeTab mode="mechanics" currentMode={viewMode} onClick={setViewMode} />
        <ViewModeTab mode="timeline" currentMode={viewMode} onClick={setViewMode} />
        <ViewModeTab mode="strategy" currentMode={viewMode} onClick={setViewMode} />
      </div>
      
      {viewMode === 'mechanics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {phase.keyMechanics.map((mechanic, index) => (
            <MechanicCard key={index} mechanic={mechanic} />
          ))}
        </div>
      )}
      
      {viewMode === 'timeline' && (
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-600"></div>
            <div className="space-y-6">
              {phase.timeline.map((item, index) => (
                <TimelineItem key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {viewMode === 'strategy' && (
        <div className="bg-gray-800 rounded-lg p-4">
          {phase.strategy.map((section, index) => (
            <StrategySection key={index} section={section} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhaseInfo;
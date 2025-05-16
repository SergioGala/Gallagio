// PhasesTab.js
// Componente principal para la pestaña de fases

import React, { useState } from 'react';
import PhaseTab from './PhaseTab';
import PhaseInfo from './PhaseInfo';
import { phase1Data } from './phaseData';
import { intermission1Data } from './intermission1Data';

// Importa más datos de fases cuando tengas los archivos
// import { phase2Data } from './phase2Data';
// import { transitionData } from './transitionData';
// import { phase3Data } from './phase3Data';

// Combina todos los datos de fases disponibles
const phases = [
  phase1Data,
  intermission1Data,
  // phase2Data,
  // transitionData,
  // phase3Data
];

const PhasesTab = () => {
  // Estado para la fase seleccionada
  const [selectedPhaseTab, setSelectedPhaseTab] = useState(phases[0].id);
  
  // Obtener la fase seleccionada
  const selectedPhaseData = phases.find(phase => phase.id === selectedPhaseTab);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Mecánicas por Fase</h2>
      
      {/* Pestañas de fases */}
      <div className="flex flex-wrap mb-6 gap-2">
        {phases.map(phase => (
          <PhaseTab
            key={phase.id}
            phase={phase}
            isActive={selectedPhaseTab === phase.id}
            onClick={() => setSelectedPhaseTab(phase.id)}
          />
        ))}
      </div>
      
      {/* Contenido de la fase seleccionada */}
      <PhaseInfo phase={selectedPhaseData} />
      
      {/* Consejos generales para la fase */}
      <div className="mt-8 bg-indigo-900 bg-opacity-20 border border-indigo-800 rounded-lg p-4">
        <h3 className="text-lg font-bold mb-2 flex items-center">
          <span className="text-xl mr-2">💡</span>
          Consejos para {selectedPhaseData.name}
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          {selectedPhaseData.id === 'phase1' && (
            <>
              <li>Asigna previamente qué grupo absorberá cada cono, alterna grupos para cada absorción.</li>
              <li>Los healers deben priorizar limpiar las absorciones de Mechengineer's Canisters lo antes posible.</li>
              <li>Coordina cooldowns defensivos para Venting Heat.</li>
              <li>Alerta por voz a los jugadores marcados con Sapper's Satchel.</li>
            </>
          )}
          {selectedPhaseData.id === 'intermission1' && (
            <>
              <li>Establece un jugador (ranged con movilidad) para llevar la primera bomba a la Coil.</li>
              <li>Prioriza las interrupciones de Juice It! para evitar que los adds aumenten su daño.</li>
              <li>Los ranged deben posicionarse para baitear los Giga Blast lejos de los adds y bombas.</li>
              <li>Muévete en sentido antihorario cuando esquives los rayos.</li>
            </>
          )}
          {/* Añade más consejos específicos para otras fases cuando las implementes */}
        </ul>
      </div>
    </div>
  );
};

export default PhasesTab;
// PhasesTab.js - Versión corregida
// Componente principal para la pestaña de fases

import React, { useState, useEffect } from 'react';
import PhaseTab from './PhaseTab';
import PhaseInfo from './PhaseInfo';
import { phase1Data } from './phaseData';
import { intermission1Data } from './intermission1Data';

// Importa más datos de fases cuando tengas los archivos
// import { phase2Data } from './phase2Data';
// import { transitionData } from './transitionData';
// import { phase3Data } from './phase3Data';

// Combina todos los datos de fases disponibles
// Si algún archivo no está disponible, incluye un objeto vacío pero válido
const phases = [
  phase1Data || { id: 'phase1', name: 'Fase 1', description: 'Datos no disponibles' },
  intermission1Data || { id: 'intermission1', name: 'Intermedio 1', description: 'Datos no disponibles' },
  // phase2Data || { id: 'phase2', name: 'Fase 2', description: 'Datos no disponibles' },
  // transitionData || { id: 'transition', name: 'Transición', description: 'Datos no disponibles' },
  // phase3Data || { id: 'phase3', name: 'Fase 3', description: 'Datos no disponibles' }
];

const PhasesTab = () => {
  // Estado para la fase seleccionada
  const [selectedPhaseTab, setSelectedPhaseTab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Inicializa la fase seleccionada con la primera disponible
  useEffect(() => {
    if (phases && phases.length > 0) {
      setSelectedPhaseTab(phases[0].id);
    }
    
    // Simular tiempo de carga
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Obtener la fase seleccionada
  const selectedPhaseData = phases.find(phase => phase?.id === selectedPhaseTab) || phases[0] || null;

  // Si no hay fases disponibles, mostrar un mensaje
  if (!phases || phases.length === 0) {
    return (
      <div className="p-4">
        <div className="bg-red-900 bg-opacity-20 border border-red-800 rounded-lg p-4 text-center">
          <h2 className="text-xl font-bold text-red-300 mb-2">Datos no disponibles</h2>
          <p className="text-gray-300">No se encontraron datos para las fases del encuentro.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Mecánicas por Fase</h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Pestañas de fases */}
          <div className="flex flex-wrap mb-6 gap-2">
            {phases.map(phase => (
              <PhaseTab
                key={phase?.id || Math.random().toString()}
                phase={phase}
                isActive={selectedPhaseTab === phase?.id}
                onClick={() => setSelectedPhaseTab(phase?.id)}
              />
            ))}
          </div>
          
          {/* Contenido de la fase seleccionada */}
          <PhaseInfo phase={selectedPhaseData} />
          
          {/* Consejos generales para la fase */}
          {selectedPhaseData && (
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
                {selectedPhaseData.id !== 'phase1' && selectedPhaseData.id !== 'intermission1' && (
                  <li>Información específica para esta fase está en desarrollo.</li>
                )}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PhasesTab;
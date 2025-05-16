// StrategyTab.js
// Componente para la pestaña de estrategia de Chrome King Gallywix

import React, { useState } from 'react';
import InfoCard from './InfoCard';
import RaidCooldownPlanner from './RaidCooldownPlanner';

const StrategyTab = () => {
  const [activeSection, setActiveSection] = useState('general');

  return (
    <div className="space-y-6">
      <div className="flex border-b border-gray-700 mb-4">
        <button 
          className={`px-4 py-2 focus:outline-none ${activeSection === 'general' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-gray-400'}`}
          onClick={() => setActiveSection('general')}
        >
          General
        </button>
        <button 
          className={`px-4 py-2 focus:outline-none ${activeSection === 'cooldowns' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-gray-400'}`}
          onClick={() => setActiveSection('cooldowns')}
        >
          Planificación de CDs
        </button>
        <button 
          className={`px-4 py-2 focus:outline-none ${activeSection === 'positions' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-gray-400'}`}
          onClick={() => setActiveSection('positions')}
        >
          Posiciones
        </button>
      </div>
      
      {activeSection === 'general' && (
        <InfoCard
          title="Estrategia - Chrome King Gallywix"
          icon="🎯"
          variant="highlight"
          content={
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Resumen de la Estrategia</h3>
              <p>
                Chrome King Gallywix es un combate que requiere una coordinación precisa de cooldowns defensivos y
                habilidades de sanación para superar con éxito las mecánicas más peligrosas del jefe.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold text-indigo-300 mb-2">Fase 1: Bomba Colosal</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Dividir la raid en 2 grupos para absorber <strong>Scatterblast Canisters</strong> alternativamente</li>
                    <li>Utilizar cooldowns de sanación potentes para eliminar las absorciones de <strong>Mechengineer's Canisters</strong></li>
                    <li>Coordinar defensivos de raid para <strong>Venting Heat</strong> (0:55 y 1:55)</li>
                    <li>Mover toda la raid de forma coordinada para evitar <strong>Big Bad Buncha Bombs</strong></li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold text-indigo-300 mb-2">Fase 2: Bobinas Giga</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Asignar jugadores con alta movilidad para llevar bombas a las <strong>Giga Coils</strong></li>
                    <li>Interrumpir a los técnicos para evitar buffs de daño</li>
                    <li>Los ranged deben posicionarse estratégicamente para manejar los <strong>Giga Blast</strong></li>
                    <li>Mantener sanación constante debido al daño creciente</li>
                  </ul>
                </div>
                
                <div className="bg-purple-900 bg-opacity-20 p-4 rounded-lg border border-purple-700">
                  <h4 className="font-semibold text-purple-300 mb-2">Transición: TOTAL DESTRUCTION!!!</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Utilizar <strong>Bloodlust/Heroismo</strong> inmediatamente</li>
                    <li>Todos los DPS deben enfocarse en destruir el escudo</li>
                    <li>Interrumpir el casteo tan pronto como sea posible</li>
                    <li>Usar todos los defensivos personales disponibles</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold text-indigo-300 mb-2">Fase 3: Destrucción Total</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Todas las mecánicas anteriores pero con mayor daño</li>
                    <li>Rotar cooldowns defensivos cada 30 segundos</li>
                    <li>Mantener al menos 2 defensivos de raid para el final (25% y menos)</li>
                    <li>Los tanques deben mantenerse alejados con <strong>Bigger Badder Bomb Blast</strong></li>
                  </ul>
                </div>
              </div>
              
              <div className="p-4 bg-indigo-900 bg-opacity-20 border border-indigo-700 rounded-lg mt-6">
                <h4 className="text-lg font-bold text-indigo-300 mb-2">Clave para el éxito:</h4>
                <p className="text-indigo-100">
                  La gestión adecuada de los cooldowns es fundamental para superar este encuentro. Utiliza la sección de 
                  "Planificación de CDs" para crear un plan detallado para tu composición de raid específica.
                </p>
              </div>
            </div>
          }
        />
      )}
      
      {activeSection === 'cooldowns' && (
        <RaidCooldownPlanner />
      )}
      
      {activeSection === 'positions' && (
        <InfoCard
          title="Posiciones de Raid"
          icon="📍"
          content={
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Posicionamiento General</h3>
                <div className="aspect-w-1 aspect-h-1 max-w-md mx-auto bg-gray-700 rounded-lg relative">
                  {/* Representación de la arena de combate */}
                  <div className="absolute inset-0 p-4">
                    {/* Centro - Boss */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-red-900 bg-opacity-40 border-2 border-red-700 flex items-center justify-center text-lg">
                      👑
                    </div>
                    
                    {/* Grupo 1 - Izquierda */}
                    <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-2">
                      <span className="text-white text-sm font-medium">Grupo 1</span>
                    </div>
                    
                    {/* Grupo 2 - Derecha */}
                    <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 bg-purple-900 bg-opacity-30 border border-purple-700 rounded-lg p-2">
                      <span className="text-white text-sm font-medium">Grupo 2</span>
                    </div>
                    
                    {/* Tanques - Frente */}
                    <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 bg-opacity-50 border border-gray-600 rounded-full p-2 text-xs">
                      Tanques
                    </div>
                    
                    {/* Zonas de bombas */}
                    <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-full bg-yellow-600 bg-opacity-30 border border-yellow-700 flex items-center justify-center text-sm">
                      💣
                    </div>
                    
                    <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-full bg-yellow-600 bg-opacity-30 border border-yellow-700 flex items-center justify-center text-sm">
                      💣
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-300 mt-4">
                  <p>Esta disposición permite alternar los grupos para absorber <strong>Scatterblast Canisters</strong> y mantener una distancia segura para las mecánicas de área.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold text-indigo-300 mb-2">Posiciones Fase 1</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Grupo 1: Costado izquierdo del boss</li>
                    <li>Grupo 2: Costado derecho del boss</li>
                    <li>Tanques: Frente al boss, intercambiando a 8-10 stacks</li>
                    <li>Jugadores con bombas: Moverse a los bordes del área</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold text-indigo-300 mb-2">Posiciones Fase 2</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>DPS: Enfocados en los Technicians</li>
                    <li>Transportadores de bombas: Listos para moverse a las Coils</li>
                    <li>Ranged: Distribuidos para baitear Giga Blast lejos de las Coils</li>
                    <li>Movimiento en sentido antihorario para esquivar rayos</li>
                  </ul>
                </div>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};

export default StrategyTab;
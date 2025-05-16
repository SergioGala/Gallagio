import React from 'react';
import { DataProvider } from './DataContext';
import HealerManager from './HealerManager';
import BossEventManager from './BossEventManager';
import AssignmentManager from './AssignmentManager';
import Timeline from './Timeline';
import SaveLoadPanel from './SaveLoadPanel';
import MatrixBackground from './MatrixBackground';

const WoWCooldownPlanner = () => {
  return (
    <DataProvider>
      <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
        <MatrixBackground />
        
        <div className="container mx-auto py-8 px-4 relative z-10">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-green-500">WoW</span> Cooldown Planner
            </h1>
            <p className="text-gray-400">
              Planifica y coordina cooldowns de curación y defensivos para encuentros de World of Warcraft
            </p>
          </header>
          
          <div className="grid grid-cols-1 gap-6">
            <SaveLoadPanel />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HealerManager />
              <BossEventManager />
            </div>
            
            <AssignmentManager />
            
            <Timeline />
          </div>
          
          <footer className="text-center mt-8 py-4 text-gray-500 text-sm">
            <p>
              Desarrollado para la planificación de raids. No afiliado con Blizzard Entertainment.
            </p>
            <p className="mt-1">
              World of Warcraft® es una marca registrada de Blizzard Entertainment, Inc.
            </p>
          </footer>
        </div>
      </div>
    </DataProvider>
  );
};

export default WoWCooldownPlanner;
// App.js (con estilos CSS integrados)
import React from 'react';
import { DataProvider } from './DataContext';
import HealerManager from './HealerManager';
import BossEventManager from './BossEventManager';
import AssignmentManager from './AssignmentManager';
import Timeline from './Timeline';
import SaveLoadPanel from './SaveLoadPanel';
import MatrixBackground from './MatrixBackground';
import './index.css';

const App = () => {
  return (
    <DataProvider>
      <div>
        <MatrixBackground />
        
        <div className="container">
          <header style={{textAlign: 'center', marginBottom: '2rem'}}>
            <h1 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>
              <span style={{color: '#4ADE80'}}>WoW</span> Cooldown Planner
            </h1>
            <p style={{color: 'var(--text-secondary-color)'}}>
              Planifica y coordina cooldowns de curación y defensivos para encuentros de World of Warcraft
            </p>
          </header>
          
          <div className="grid grid-cols-1" style={{gap: '1.5rem'}}>
            <SaveLoadPanel />
            
            <div className="grid grid-cols-2" style={{gap: '1.5rem'}}>
              <HealerManager />
              <BossEventManager />
            </div>
            
            <AssignmentManager />
            
            <Timeline />
          </div>
          
          <footer style={{textAlign: 'center', marginTop: '2rem', padding: '1rem 0', color: '#6B7280', fontSize: '0.875rem'}}>
            <p>
              Desarrollado para la planificación de raids. No afiliado con Blizzard Entertainment.
            </p>
            <p style={{marginTop: '0.25rem'}}>
              World of Warcraft® es una marca registrada de Blizzard Entertainment, Inc.
            </p>
          </footer>
        </div>
      </div>
    </DataProvider>
  );
};

export default App;
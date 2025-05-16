// App.js
// Componente principal de la aplicación

import React, { useState } from 'react';
import NavButton from './NavButton';
import OverviewTab from './OverviewTab';
import PhasesTab from './PhasesTab';

// Importa los demás componentes a medida que los vayas creando
// import AbilitiesTab from './AbilitiesTab';
// import ClassesTab from './ClassesTab';
// import StrategyTab from './StrategyTab';

function App() {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Renderizar barra de navegación
  const renderNavbar = () => (
    <div className="flex flex-wrap justify-between items-center bg-gray-800 rounded-lg p-3 mb-6 shadow-lg">
      <div className="flex space-x-2">
        <NavButton 
          active={selectedTab === 'overview'} 
          onClick={() => setSelectedTab('overview')}
          icon="📋"
          text="General"
        />
        <NavButton 
          active={selectedTab === 'phases'} 
          onClick={() => setSelectedTab('phases')}
          icon="⚔️"
          text="Fases"
        />
        <NavButton 
          active={selectedTab === 'abilities'} 
          onClick={() => setSelectedTab('abilities')}
          icon="🔥"
          text="Habilidades"
        />
        <NavButton 
          active={selectedTab === 'classes'} 
          onClick={() => setSelectedTab('classes')}
          icon="👤"
          text="Clases"
        />
        <NavButton 
          active={selectedTab === 'strategy'} 
          onClick={() => setSelectedTab('strategy')}
          icon="🎯"
          text="Estrategia"
        />
      </div>
      <div className="flex items-center text-xs text-gray-400">
        <span>🔄 Actualizado: 16 Mayo 2025</span>
      </div>
    </div>
  );

  // Renderizar el contenido principal según la pestaña seleccionada
  const renderMainContent = () => {
    switch(selectedTab) {
      case 'overview':
        return <OverviewTab />;
      case 'phases':
        return <PhasesTab />;
      case 'abilities':
        // return <AbilitiesTab />;
        return <div className="p-4">Sección de habilidades en construcción</div>;
      case 'classes':
        // return <ClassesTab />;
        return <div className="p-4">Sección de clases en construcción</div>;
      case 'strategy':
        // return <StrategyTab />;
        return <div className="p-4">Sección de estrategia en construcción</div>;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Chrome King Gallywix
        </h1>
        <p className="text-xl text-gray-400">Guía Interactiva Heroica - Liberation of Undermine</p>
      </header>

      {renderNavbar()}
      
      <main className="container mx-auto">
        {renderMainContent()}
      </main>
      
      <footer className="mt-10 text-center text-gray-500 text-sm">
        <p>Creado con ❤️ para la comunidad de WoW | © 2025</p>
      </footer>
    </div>
  );
}

export default App;
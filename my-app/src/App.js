// App.js - Simplificado y mejorado con drag & drop
import React, { useState } from 'react';
import { DataProvider, useDataContext } from './DataContext';
import HealerManager from './HealerManager';
import BossEventManager from './BossEventManager';
import AssignmentManager from './AssignmentManager';
import Timeline from './Timeline';
import DroppableTimeline from './DroppableTimeline';
import SaveLoadPanel from './SaveLoadPanel';
import MatrixBackground from './MatrixBackground';
import { formatTime } from './WowClassData';
import './index.css';

// Componente de notificación simple
const Notification = ({ message, type, onClose }) => {
  return (
    <div className="notification" style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      padding: '10px 15px',
      borderRadius: '4px',
      maxWidth: '300px',
      backgroundColor: type === 'success' ? '#10B981' : 
                      type === 'error' ? '#EF4444' : '#3B82F6',
      color: 'white',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <span>{message}</span>
      <button 
        onClick={onClose} 
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          marginLeft: '10px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        ×
      </button>
    </div>
  );
};

// Componente principal de la aplicación
const App = () => {
  const [notification, setNotification] = useState(null);
  const [activeDragAndDrop, setActiveDragAndDrop] = useState(true);
  
  // Mostrar notificación
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    
    // Auto-cerrar después de 3 segundos
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  // Cerrar notificación
  const closeNotification = () => {
    setNotification(null);
  };
  
  return (
    <DataProvider>
      <AppContent 
        showNotification={showNotification} 
        activeDragAndDrop={activeDragAndDrop}
        setActiveDragAndDrop={setActiveDragAndDrop}
      />
      
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={closeNotification} 
        />
      )}
    </DataProvider>
  );
};

// Contenido principal con acceso al contexto
const AppContent = ({ showNotification, activeDragAndDrop, setActiveDragAndDrop }) => {
  const { 
    addAssignment, 
    bossEvents, 
    encounterDuration,
    encounterSettings
  } = useDataContext();
  
  // Manejar asignación mediante drag & drop
  const handleAssignmentDrop = (data) => {
    // Crear una nueva asignación
    addAssignment({
      healerId: data.healerId,
      spellName: data.spellName,
      eventTime: data.eventTime,
      note: ''
    });
    
    // Mostrar notificación
    showNotification(`"${data.spellName}" asignado a ${formatTime(data.eventTime)}`, 'success');
  };

  return (
    <div>
      <MatrixBackground />
      
      <div className="container">
        {/* Header con título simple */}
        <header className="app-header">
          <h1 className="app-title">
            <span className="wow-text">WoW</span> Cooldown Planner
          </h1>
          <p className="app-subtitle">
            Planifica y coordina cooldowns de curación y defensivos para encuentros de World of Warcraft
          </p>
          <div style={{
            display: 'inline-block',
            margin: '0.5rem 0',
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--input-bg-color)',
            borderRadius: '4px',
            fontSize: '0.9rem'
          }}>
            {encounterSettings.name} ({encounterSettings.difficulty}) - Duración: {formatTime(encounterDuration)}
          </div>
        </header>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Panel de guardado/carga */}
          <SaveLoadPanel />
          
          {/* Alternador de modos */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Modo de Asignación</h2>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button
                onClick={() => setActiveDragAndDrop(true)}
                className={`btn ${activeDragAndDrop ? 'btn-primary' : ''}`}
                style={{ flex: 1 }}
              >
                Arrastrar y Soltar
              </button>
              <button
                onClick={() => setActiveDragAndDrop(false)}
                className={`btn ${!activeDragAndDrop ? 'btn-primary' : ''}`}
                style={{ flex: 1 }}
              >
                Modo Formulario
              </button>
            </div>
            
            {/* Zona de asignación rápida (solo en modo drag & drop) */}
            {activeDragAndDrop && (
              <div className="drop-zone-panel">
                <h3 style={{ marginBottom: '0.75rem', fontWeight: 'bold' }}>Zona de Asignación Rápida</h3>
                <DroppableTimeline 
                  bossEvents={bossEvents}
                  encounterDuration={encounterDuration}
                  onAssignmentDrop={handleAssignmentDrop}
                />
              </div>
            )}
          </div>
          
          {/* Gestión de healers y eventos */}
          <div className="grid grid-cols-2 gap-6">
            <HealerManager />
            <BossEventManager />
          </div>
          
          {/* Timeline */}
          <Timeline />
          
          {/* Panel de asignaciones (siempre visible) */}
          <AssignmentManager />
        </div>
        
        <footer className="app-footer">
          <p>
            Desarrollado para la planificación de raids. No afiliado con Blizzard Entertainment.
          </p>
          <p>
            World of Warcraft® es una marca registrada de Blizzard Entertainment, Inc.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
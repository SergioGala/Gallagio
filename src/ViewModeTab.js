// ViewModeTab.js - Versión mejorada
// Componente para pestañas de modos de visualización

import React from 'react';
import './ViewModeTab.css';

const ViewModeTab = ({ mode, currentMode, onClick }) => {
  const isActive = currentMode === mode;
  
  // Determinar el texto y el icono según el modo
  const getTabInfo = () => {
    switch(mode) {
      case 'mechanics':
        return {
          text: 'Mecánicas Clave',
          icon: '⚙️'
        };
      case 'timeline':
        return {
          text: 'Línea de Tiempo',
          icon: '⏱️'
        };
      case 'strategy':
        return {
          text: 'Estrategia',
          icon: '📋'
        };
      case 'preparation':
        return {
          text: 'Preparación',
          icon: '🧰'
        };
      case 'video':
        return {
          text: 'Video',
          icon: '📹'
        };
      default:
        return {
          text: 'Desconocido',
          icon: '❓'
        };
    }
  };
  
  const { text, icon } = getTabInfo();
    
  return (
    <div
      className={`view-mode-tab ${isActive ? 'active' : 'inactive'}`}
      onClick={() => onClick(mode)}
      role="tab"
      aria-selected={isActive}
    >
      <div className="view-mode-tab-highlight"></div>
      
      <div className="view-mode-tab-content">
        <span className="view-mode-tab-icon">{icon}</span>
        <span className="view-mode-tab-text">{text}</span>
      </div>
    </div>
  );
};

export default ViewModeTab;
// PhaseTab.js - Versión corregida
// Componente para las pestañas de fases

import React from 'react';
import './PhaseTab.css';

const PhaseTab = ({ phase, isActive, onClick, isNew = false }) => {
  // Verificamos que phase exista antes de trabajar con él
  if (!phase) {
    return null; // O puedes mostrar un placeholder
  }
  
  // Determinar el color de dificultad
  const getDifficultyClass = () => {
    if (!phase.difficulty) return '';
    
    switch(phase.difficulty?.toLowerCase()) {
      case 'fácil':
      case 'facil':
      case 'easy':
        return 'phase-tab-difficulty-easy';
      case 'medio':
      case 'media':
      case 'medium':
        return 'phase-tab-difficulty-medium';
      case 'difícil':
      case 'dificil':
      case 'hard':
        return 'phase-tab-difficulty-hard';
      default:
        return '';
    }
  };
  
  // Determinar el icono según el tipo de fase
  const getPhaseIcon = () => {
    if (phase.icon) return phase.icon;
    
    if (phase.type) {
      switch(phase.type.toLowerCase()) {
        case 'intermision':
        case 'intermission':
          return '🔄';
        case 'transition':
          return '⚡';
        case 'boss':
          return '👑';
        case 'adds':
          return '👥';
        default:
          return '⚔️';
      }
    }
    
    // Si no hay tipo ni icono definido, usar un icono predeterminado según el ID
    if (phase.id) {
      if (phase.id.includes('phase1')) return '1️⃣';
      if (phase.id.includes('phase2')) return '2️⃣';
      if (phase.id.includes('phase3')) return '3️⃣';
      if (phase.id.includes('intermission')) return '🔄';
      if (phase.id.includes('transition')) return '⚡';
    }
    
    return '⚔️'; // Icono predeterminado
  };
  
  // Extraer número de fase si está disponible
  const getPhaseNumber = () => {
    // Usamos optional chaining para evitar errores
    if (phase?.number) return phase.number;
    
    if (phase?.id) {
      const match = phase.id.match(/phase(\d+)/i);
      if (match && match[1]) return match[1];
    }
    
    if (phase?.name) {
      const match = phase.name.match(/fase\s*(\d+)/i);
      if (match && match[1]) return match[1];
    }
    
    return null;
  };
  
  const phaseNumber = getPhaseNumber();
  const phaseIcon = getPhaseIcon();
  
  return (
    <button
      className={`phase-tab ${isActive ? 'phase-tab-active' : 'phase-tab-inactive'}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <div className="phase-tab-highlight"></div>
      <div className="phase-tab-glow"></div>
      
      {phaseNumber && (
        <div className="phase-tab-number">{phaseNumber}</div>
      )}
      
      <div className="phase-tab-content">
        <span className="phase-tab-icon">{phaseIcon}</span>
        <span className="phase-tab-text">{phase.name}</span>
        {phase.label && (
          <span className="phase-tab-label">{phase.label}</span>
        )}
      </div>
      
      {isNew && (
        <span className="phase-tab-badge">N</span>
      )}
      
      {phase.difficulty && (
        <div className={`phase-tab-difficulty-indicator ${getDifficultyClass()}`}></div>
      )}
    </button>
  );
};

export default PhaseTab;
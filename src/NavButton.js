// NavButton.js - Versión mejorada
// Componente para los botones de navegación con efectos y animaciones

import React from 'react';
import './NavButton.css';

const NavButton = ({ active, onClick, icon, text, badge, isNew }) => {
  return (
    <button
      className={`nav-button ${active ? 'nav-button-active' : 'nav-button-inactive'}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <div className="nav-button-highlight"></div>
      <div className="nav-button-glow"></div>
      
      <span className="nav-button-icon">{icon}</span>
      <span className="nav-button-text">{text}</span>
      
      {badge && (
        <span className="nav-button-badge">{badge}</span>
      )}
      
      {isNew && !badge && (
        <span className="nav-button-badge">N</span>
      )}
    </button>
  );
};

export default NavButton;
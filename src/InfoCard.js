// InfoCard.js
// Componente para mostrar tarjetas de información con efectos interactivos

import React, { useState } from 'react';

/**
 * Componente InfoCard mejorado con efectos interactivos
 * 
 * @param {string} title - Título de la tarjeta
 * @param {string} icon - Emoji o icono para la tarjeta
 * @param {ReactNode} content - Contenido de la tarjeta
 * @param {string} variant - Variante de estilo: 'default', 'highlight', 'warning', 'danger'
 * @param {boolean} expandable - Si la tarjeta puede expandirse/contraerse
 * @param {boolean} initialExpanded - Estado inicial de expansión (si es expandable)
 * @param {boolean} glowEffect - Si la tarjeta debe tener efecto de brillo
 */
const InfoCard = ({ 
  title, 
  icon, 
  content, 
  variant = 'default',
  expandable = false,
  initialExpanded = true,
  glowEffect = false
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [isHovered, setIsHovered] = useState(false);

  // Determinar clases CSS basadas en la variante
  const getVariantClasses = () => {
    switch(variant) {
      case 'highlight':
        return 'card-highlight';
      case 'warning':
        return 'card-warning';
      case 'danger':
        return 'card-danger';
      default:
        return '';
    }
  };

  // Clase para efecto de brillo en hover
  const glowClass = glowEffect && isHovered ? 'card-glow' : '';

  return (
    <div 
      className={`card ${getVariantClasses()} ${glowClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-header">
        <div className="card-header-left">
          <span className="card-header-icon">{icon}</span>
          <h3 className="card-title">{title}</h3>
        </div>
        
        {expandable && (
          <button 
            className="card-expand-button" 
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Contraer" : "Expandir"}
          >
            {isExpanded ? '−' : '+'}
          </button>
        )}
      </div>
      
      {(!expandable || isExpanded) && (
        <div className="card-content">
          {content}
        </div>
      )}
      
      {/* Barra de animación para destacar tarjetas importantes */}
      {variant === 'highlight' && (
        <div className="card-highlight-bar"></div>
      )}
    </div>
  );
};

export default InfoCard;
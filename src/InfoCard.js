// InfoCard.js - Versión mejorada
// Componente para mostrar tarjetas de información con efectos interactivos

import React, { useState, useEffect } from 'react';
import './InfoCard.css';

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
 * @param {boolean} animated - Si la tarjeta debe tener animación de entrada
 * @param {boolean} interactive - Si la tarjeta tiene elementos interactivos adicionales
 * @param {string} difficulty - Dificultad del contenido: 'easy', 'medium', 'hard'
 * @param {Array} tags - Etiquetas relacionadas con el contenido
 */
const InfoCard = ({ 
  title, 
  icon, 
  content, 
  variant = 'default',
  expandable = false,
  initialExpanded = true,
  glowEffect = false,
  animated = false,
  interactive = false,
  difficulty = null,
  tags = []
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [isHovered, setIsHovered] = useState(false);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Efecto para la animación de entrada
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Marcar como vista cuando se expande
  useEffect(() => {
    if (isExpanded && !hasBeenViewed) {
      setHasBeenViewed(true);
    }
  }, [isExpanded, hasBeenViewed]);

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
  // Clase para animación de entrada
  const animatedClass = animated ? `card-animated ${isVisible ? 'card-visible' : ''}` : '';
  
  // Determinar el color del indicador de dificultad
  const getDifficultyColor = () => {
    switch(difficulty) {
      case 'easy':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'hard':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div 
      className={`card ${getVariantClasses()} ${glowClass} ${animatedClass} ${isExpanded ? 'card-expanded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Indicador de "Nueva información" */}
      {!hasBeenViewed && (
        <div className="card-new-marker">NUEVO</div>
      )}
      
      {/* Indicador de dificultad si está definido */}
      {difficulty && (
        <div className={`card-difficulty-indicator ${getDifficultyColor()}`}></div>
      )}
      
      <div className="card-header">
        <div className="card-header-left">
          <span className="card-header-icon">{icon}</span>
          <h3 className="card-title">{title}</h3>
        </div>
        
        <div className="card-header-right">
          {/* Etiquetas si existen */}
          {tags.length > 0 && (
            <div className="card-tags">
              {tags.map((tag, index) => (
                <span key={index} className="card-tag">{tag}</span>
              ))}
            </div>
          )}
          
          {interactive && (
            <button 
              className="card-favorite-button" 
              aria-label="Marcar como favorito"
              onClick={(e) => {
                e.stopPropagation();
                // Implementar lógica de favoritos
              }}
            >
              ★
            </button>
          )}
          
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
      </div>
      
      {(!expandable || isExpanded) && (
        <div className="card-content">
          {content}
          
          {/* Controles adicionales para tarjetas interactivas */}
          {interactive && (
            <div className="card-interactive-controls">
              <button className="card-help-button">
                ¿Necesitas ayuda?
              </button>
              <button className="card-demo-button">
                Ver demostración
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Barra de animación para destacar tarjetas importantes */}
      {variant === 'highlight' && (
        <div className="card-highlight-bar"></div>
      )}
      
      {/* Indicador de progreso para contenido expandible */}
      {expandable && interactive && (
        <div className="card-progress-container">
          <div 
            className="card-progress-bar" 
            style={{ width: hasBeenViewed ? '100%' : '0%' }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default InfoCard;
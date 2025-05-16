// StrategySection.js - Versión corregida
// Componente para mostrar una sección de estrategia

import React, { useState } from 'react';
import './StrategySection.css';

const StrategySection = ({ section }) => {
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  // Verificar si section es undefined
  if (!section) {
    return (
      <div className="strategy-section">
        <div className="strategy-section-header">
          <h3 className="strategy-section-title">Sección sin título</h3>
        </div>
        <div className="strategy-section-content">
          <p>Información no disponible</p>
        </div>
      </div>
    );
  }

  // Expandir la imagen cuando se hace clic
  const expandImage = () => {
    if (section.image) {
      setIsImageExpanded(true);
    }
  };

  // Cerrar la imagen expandida
  const closeExpandedImage = () => {
    setIsImageExpanded(false);
  };

  // Prevenir la propagación de clics en el modal
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="strategy-section">
      <div className="strategy-section-header">
        <h3 className="strategy-section-title">{section.header || 'Sin título'}</h3>
      </div>
      
      <div className="strategy-section-content">
        <p>{section.content || 'Sin contenido disponible'}</p>
        
        {section.tip && (
          <div className="strategy-section-tip">
            {section.tip}
          </div>
        )}
        
        {section.tags && Array.isArray(section.tags) && section.tags.length > 0 && (
          <div className="strategy-section-tags">
            {section.tags.map((tag, tagIndex) => {
              let tagClass = '';
              
              // Determinar la clase según el tipo de etiqueta
              try {
                if (tag.toLowerCase().includes('tank')) tagClass = 'strategy-section-tag-tank';
                else if (tag.toLowerCase().includes('heal')) tagClass = 'strategy-section-tag-healer';
                else if (tag.toLowerCase().includes('dps')) tagClass = 'strategy-section-tag-dps';
                else if (tag.toLowerCase().includes('important')) tagClass = 'strategy-section-tag-important';
              } catch (error) {
                console.error("Error al procesar etiqueta:", error);
              }
              
              return (
                <span key={tagIndex} className={`strategy-section-tag ${tagClass}`}>
                  {tag}
                </span>
              );
            })}
          </div>
        )}
        
        {section.image && (
          <div className="strategy-section-image" onClick={expandImage}>
            <div className="strategy-section-image-overlay"></div>
            <span className="strategy-section-image-text">
              {typeof section.image === 'string' 
                ? section.image 
                : 'Diagrama de estrategia'}
            </span>
            <button className="strategy-section-image-expand" aria-label="Expandir imagen">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {/* Modal para la imagen expandida */}
      {isImageExpanded && (
        <div className="strategy-section-expanded-image-modal" onClick={closeExpandedImage}>
          <div className="strategy-section-expanded-image-content" onClick={handleModalClick}>
            {/* Aquí iría la imagen real en un entorno de producción */}
            <div className="strategy-section-expanded-image" style={{width: '800px', height: '600px', backgroundColor: '#2d3748', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <span className="text-gray-400">Imagen expandida: {typeof section.image === 'string' ? section.image : 'Diagrama de estrategia'}</span>
            </div>
            <button className="strategy-section-expanded-image-close" onClick={closeExpandedImage} aria-label="Cerrar imagen">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategySection;
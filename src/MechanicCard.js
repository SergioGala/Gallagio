
// MechanicCard.js - Versión corregida
// Componente para mostrar una mecánica individual con estilo y animaciones

import React, { useState } from 'react';
import './MechanicCard.css';

const MechanicCard = ({ mechanic, isNew = false }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Verificar si mechanic es undefined
  if (!mechanic) {
    return (
      <div className="mechanic-card bg-gray-800 p-4 flex items-center justify-center">
        <span className="text-gray-400">Información no disponible</span>
      </div>
    );
  }
  
  // Determinar los colores según el rol
  const getRoleClasses = (role) => {
    if (!role) return 'bg-purple-900 bg-opacity-30 text-purple-300 border-purple-700';
    
    try {
      if (role.includes('Tank')) return 'bg-blue-900 bg-opacity-30 text-blue-300 border-blue-700';
      if (role.includes('Healer')) return 'bg-green-900 bg-opacity-30 text-green-300 border-green-700';
      if (role.includes('DPS')) return 'bg-red-900 bg-opacity-30 text-red-300 border-red-700';
      return 'bg-purple-900 bg-opacity-30 text-purple-300 border-purple-700';
    } catch (error) {
      console.error("Error al obtener clases de rol:", error);
      return 'bg-purple-900 bg-opacity-30 text-purple-300 border-purple-700';
    }
  };

  // Determinar el estilo del ícono de prioridad
  const getPriorityClasses = (priority) => {
    if (!priority) return '';
    
    try {
      switch(priority.toLowerCase()) {
        case 'alta':
          return 'mechanic-card-tag-priority-high';
        case 'media':
        case 'media-alta':
          return 'mechanic-card-tag-priority';
        case 'baja':
          return '';
        default:
          return '';
      }
    } catch (error) {
      console.error("Error al obtener clases de prioridad:", error);
      return '';
    }
  };

  // Extraer información adicional si existe
  const hasDetails = (
    (mechanic.video && typeof mechanic.video === 'string') || 
    (mechanic.tips && Array.isArray(mechanic.tips) && mechanic.tips.length > 0) || 
    (mechanic.weakauras && typeof mechanic.weakauras === 'string') || 
    (mechanic.counters && Array.isArray(mechanic.counters) && mechanic.counters.length > 0)
  );

  return (
    <div className="mechanic-card">
      {isNew && (
        <div className="mechanic-card-new-badge pulse-animation">NUEVO</div>
      )}
      
      <div className="flex">
        <div className="mechanic-card-icon-container">
          <span className="mechanic-card-icon">{mechanic.icon || '❓'}</span>
        </div>
        
        <div className="mechanic-card-content">
          <div className="mechanic-card-header">
            <h4 className="mechanic-card-title">{mechanic.name || 'Mecánica sin nombre'}</h4>
            {hasDetails && (
              <button 
                className="mechanic-card-detail-btn"
                onClick={() => setShowDetails(!showDetails)}
                aria-label={showDetails ? 'Ocultar detalles' : 'Ver detalles'}
              >
                {showDetails ? '−' : '+'}
              </button>
            )}
          </div>
          
          <p className="mechanic-card-description">{mechanic.description || 'Sin descripción disponible'}</p>
          
          <div className="mechanic-card-tags">
            {mechanic.time && (
              <span className="mechanic-card-tag mechanic-card-tag-time">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="12" height="12">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {mechanic.time}
              </span>
            )}
            
            {mechanic.role && (
              <span className={`mechanic-card-tag mechanic-card-tag-role ${getRoleClasses(mechanic.role)}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="12" height="12">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {mechanic.role}
              </span>
            )}
            
            {mechanic.cooldown && (
              <span className="mechanic-card-tag mechanic-card-tag-cooldown">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="12" height="12">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                CD: {mechanic.cooldown}
              </span>
            )}
            
            {mechanic.priority && (
              <span className={`mechanic-card-tag ${getPriorityClasses(mechanic.priority)}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="12" height="12">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Prioridad: {mechanic.priority}
              </span>
            )}
          </div>
          
          {!showDetails && mechanic.tip && (
            <div className="mechanic-card-tip">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>{mechanic.tip}</span>
            </div>
          )}
          
          {showDetails && (
            <div className="mechanic-card-details">
              {mechanic.tips && Array.isArray(mechanic.tips) && mechanic.tips.length > 0 && (
                <div className="mechanic-card-section">
                  <h5 className="mechanic-card-section-title mechanic-card-section-tips">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Consejos detallados:
                  </h5>
                  <div className="mechanic-card-section-content">
                    <ul>
                      {mechanic.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {mechanic.counters && Array.isArray(mechanic.counters) && mechanic.counters.length > 0 && (
                <div className="mechanic-card-section">
                  <h5 className="mechanic-card-section-title mechanic-card-section-counters">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Counters:
                  </h5>
                  <div className="mechanic-card-section-content">
                    <ul>
                      {mechanic.counters.map((counter, index) => (
                        <li key={index}>{counter}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {mechanic.weakauras && typeof mechanic.weakauras === 'string' && (
                <div className="mechanic-card-section">
                  <h5 className="mechanic-card-section-title mechanic-card-section-weakaura">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    WeakAura:
                  </h5>
                  <div className="mechanic-card-section-content">
                    <a 
                      href={mechanic.weakauras} 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="12" height="12">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Importar WeakAura para {mechanic.name}
                    </a>
                  </div>
                </div>
              )}
              
              {mechanic.video && typeof mechanic.video === 'string' && (
                <div className="mechanic-card-section">
                  <h5 className="mechanic-card-section-title mechanic-card-section-video">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Video:
                  </h5>
                  <div className="mechanic-card-section-content">
                    <div className="mechanic-card-video-preview">
                      <span className="mechanic-card-video-preview-text">
                        [Vista previa del video de {mechanic.name}]
                      </span>
                    </div>
                    <div className="mechanic-card-video-link">
                      <a 
                        href={mechanic.video} 
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver video completo
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Indicador de "Mostrar más" cuando hay detalles disponibles */}
      {hasDetails && !showDetails && (
        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
          Clic + para más detalles
        </div>
      )}
    </div>
  );
};

export default MechanicCard;
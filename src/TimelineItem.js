// TimelineItem.js - Versión corregida
// Componente para un elemento de la línea de tiempo

import React, { useState } from 'react';
import './TimelineItem.css';

const TimelineItem = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Verificar si item es undefined
  if (!item) {
    return (
      <div className="timeline-item">
        <div className="timeline-item-marker timeline-item-marker-default">❓</div>
        <div className="timeline-item-time">--:--</div>
        <div className="timeline-item-event timeline-item-event-default">
          <div className="timeline-item-content">
            Información no disponible
          </div>
        </div>
      </div>
    );
  }
  
  // Función para determinar la clase CSS según el tipo de evento
  const getTypeClass = (type) => {
    if (!type) return 'timeline-item-marker-default';
    
    try {
      switch (type) {
        case 'danger':
          return 'timeline-item-marker-danger';
        case 'warning':
          return 'timeline-item-marker-warning';
        case 'success':
          return 'timeline-item-marker-success';
        case 'important':
          return 'timeline-item-marker-important';
        case 'heal':
          return 'timeline-item-marker-heal';
        case 'tank':
          return 'timeline-item-marker-tank';
        default:
          return 'timeline-item-marker-default';
      }
    } catch (error) {
      console.error("Error al obtener la clase de tipo:", error);
      return 'timeline-item-marker-default';
    }
  };
  
  // Función para determinar la clase CSS para el contenedor del evento
  const getEventClass = (type) => {
    if (!type) return 'timeline-item-event-default';
    
    try {
      switch (type) {
        case 'danger':
          return 'timeline-item-event-danger';
        case 'warning':
          return 'timeline-item-event-warning';
        case 'success':
          return 'timeline-item-event-success';
        case 'important':
          return 'timeline-item-event-important';
        case 'heal':
          return 'timeline-item-event-heal';
        case 'tank':
          return 'timeline-item-event-tank';
        default:
          return 'timeline-item-event-default';
      }
    } catch (error) {
      console.error("Error al obtener la clase de evento:", error);
      return 'timeline-item-event-default';
    }
  };

  // Función para determinar el ícono según el tipo
  const getTypeIcon = (type) => {
    if (!type) return '🔄';
    
    try {
      switch (type) {
        case 'danger':
          return '⚠️';
        case 'warning':
          return '⚡';
        case 'success':
          return '✅';
        case 'important':
          return '🔴';
        case 'heal':
          return '💚';
        case 'tank':
          return '🛡️';
        default:
          return '🔄';
      }
    } catch (error) {
      console.error("Error al obtener el icono de tipo:", error);
      return '🔄';
    }
  };
  
  // Obtener detalles adicionales si existen
  const hasDetails = item.details || (item.roles && Array.isArray(item.roles) && item.roles.length > 0) || item.tip;

  return (
    <div className="timeline-item">
      <div className={`timeline-item-marker ${getTypeClass(item.type)}`}>
        {getTypeIcon(item.type)}
      </div>
      
      <div className="timeline-item-time">{item.time || '--:--'}</div>
      
      <div className={`timeline-item-event ${getEventClass(item.type)}`}>
        <div className="timeline-item-content">
          {item.event || 'Evento sin descripción'}
          
          {hasDetails && !isExpanded && (
            <div className="timeline-item-details-action" onClick={() => setIsExpanded(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="12" height="12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mostrar detalles
            </div>
          )}
          
          {isExpanded && (
            <div className="timeline-item-details">
              {item.details && (
                <div className="timeline-item-details-section">
                  <div className="timeline-item-details-title">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Detalles:
                  </div>
                  <div className="timeline-item-details-content">{item.details}</div>
                </div>
              )}
              
              {item.tip && (
                <div className="timeline-item-details-section">
                  <div className="timeline-item-details-title">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Consejo:
                  </div>
                  <div className="timeline-item-details-content">{item.tip}</div>
                </div>
              )}
              
              {item.roles && Array.isArray(item.roles) && item.roles.length > 0 && (
                <div className="timeline-item-details-section">
                  <div className="timeline-item-details-title">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Roles Afectados:
                  </div>
                  <div className="timeline-item-role">
                    {item.roles.includes('Tanques') && (
                      <span className="timeline-item-role-tag timeline-item-role-tank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="12" height="12">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Tanques
                      </span>
                    )}
                    {item.roles.includes('Healers') && (
                      <span className="timeline-item-role-tag timeline-item-role-healer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="12" height="12">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Healers
                      </span>
                    )}
                    {item.roles.includes('DPS') && (
                      <span className="timeline-item-role-tag timeline-item-role-dps">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="12" height="12">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        DPS
                      </span>
                    )}
                    {item.roles.includes('Todos') && (
                      <span className="timeline-item-role-tag timeline-item-role-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="12" height="12">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Todos
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="timeline-item-details-action" onClick={() => setIsExpanded(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="12" height="12">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Ocultar detalles
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
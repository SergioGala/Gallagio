// PhaseInfo.js - Versión corregida
// Componente para mostrar la información de una fase

import React, { useState, useEffect } from 'react';
import ViewModeTab from './ViewModeTab';
import MechanicCard from './MechanicCard';
import TimelineItem from './TimelineItem';
import StrategySection from './StrategySection';
import './PhaseInfo.css';

const PhaseInfo = ({ phase }) => {
  const [viewMode, setViewMode] = useState('mechanics');
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulación de carga - en una aplicación real podrías estar cargando datos
  useEffect(() => {
    if (phase) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [phase]);
  
  // Si no hay fase seleccionada, mostrar un placeholder
  if (!phase) {
    return (
      <div className="phase-info-container">
        <div className="phase-info-empty">
          Selecciona una fase para ver su información
        </div>
      </div>
    );
  }
  
  // Determinar la clase de dificultad
  const getDifficultyClass = () => {
    if (!phase.difficulty) return '';
    
    try {
      switch(phase.difficulty.toLowerCase()) {
        case 'fácil':
        case 'facil':
        case 'easy':
          return 'phase-info-difficulty-easy';
        case 'medio':
        case 'media':
        case 'medium':
          return 'phase-info-difficulty-medium';
        case 'difícil':
        case 'dificil':
        case 'hard':
          return 'phase-info-difficulty-hard';
        default:
          return '';
      }
    } catch (error) {
      console.error("Error al obtener la clase de dificultad:", error);
      return '';
    }
  };
  
  // Determinar el icono de dificultad
  const getDifficultyIcon = () => {
    if (!phase.difficulty) return '';
    
    try {
      switch(phase.difficulty.toLowerCase()) {
        case 'fácil':
        case 'facil':
        case 'easy':
          return '🟢';
        case 'medio':
        case 'media':
        case 'medium':
          return '🟠';
        case 'difícil':
        case 'dificil':
        case 'hard':
          return '🔴';
        default:
          return '⚪';
      }
    } catch (error) {
      console.error("Error al obtener el icono de dificultad:", error);
      return '⚪';
    }
  };
  
  return (
    <div className="phase-info-container">
      <div className="phase-info-header">
        <h2 className="phase-info-title">
          {phase.name || 'Fase sin nombre'}
          {phase.difficulty && (
            <span className={`phase-info-difficulty ${getDifficultyClass()}`}>
              <span className="phase-info-difficulty-icon">{getDifficultyIcon()}</span>
              {phase.difficulty}
            </span>
          )}
        </h2>
        <p className="phase-info-description">{phase.description || 'Sin descripción disponible'}</p>
      </div>
      
      <div className="phase-info-tabs">
        <ViewModeTab mode="mechanics" currentMode={viewMode} onClick={setViewMode} />
        {Array.isArray(phase.timeline) && phase.timeline.length > 0 && (
          <ViewModeTab mode="timeline" currentMode={viewMode} onClick={setViewMode} />
        )}
        {Array.isArray(phase.strategy) && phase.strategy.length > 0 && (
          <ViewModeTab mode="strategy" currentMode={viewMode} onClick={setViewMode} />
        )}
        {Array.isArray(phase.preparation) && phase.preparation.length > 0 && (
          <ViewModeTab mode="preparation" currentMode={viewMode} onClick={setViewMode} />
        )}
        {phase.video && (
          <ViewModeTab mode="video" currentMode={viewMode} onClick={setViewMode} />
        )}
      </div>
      
      <div className="phase-info-content">
        {/* Botón de información */}
        <div 
          className="phase-info-tooltip"
          onClick={() => setShowTooltip(!showTooltip)}
          aria-label="Mostrar información"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          
          {showTooltip && (
            <div className="phase-info-tooltip-content">
              <p>Cambia entre las diferentes vistas para obtener información detallada sobre esta fase:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li><strong>Mecánicas Clave:</strong> Detalles de cada habilidad y mecánica.</li>
                <li><strong>Línea de Tiempo:</strong> Secuencia de eventos durante la fase.</li>
                <li><strong>Estrategia:</strong> Consejos y tácticas para superar la fase.</li>
              </ul>
            </div>
          )}
        </div>
        
        {isLoading ? (
          <div className="phase-info-loading">
            <div className="phase-info-loading-spinner"></div>
          </div>
        ) : (
          <>
            {viewMode === 'mechanics' && (
              <div className="phase-info-mechanics">
                {Array.isArray(phase.keyMechanics) && phase.keyMechanics.length > 0 ? (
                  phase.keyMechanics.map((mechanic, index) => (
                    <MechanicCard 
                      key={index} 
                      mechanic={mechanic} 
                      isNew={mechanic?.isNew}
                    />
                  ))
                ) : (
                  <div className="phase-info-empty">No hay mecánicas disponibles para esta fase</div>
                )}
              </div>
            )}
            
            {viewMode === 'timeline' && (
              <div className="phase-info-timeline">
                {Array.isArray(phase.timeline) && phase.timeline.length > 0 ? (
                  <div className="space-y-6">
                    {phase.timeline.map((item, index) => (
                      <TimelineItem key={index} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="phase-info-empty">No hay línea de tiempo disponible para esta fase</div>
                )}
              </div>
            )}
            
            {viewMode === 'strategy' && (
              <div className="phase-info-strategy">
                {Array.isArray(phase.strategy) && phase.strategy.length > 0 ? (
                  phase.strategy.map((section, index) => (
                    <StrategySection key={index} section={section} />
                  ))
                ) : (
                  <div className="phase-info-empty">No hay estrategia disponible para esta fase</div>
                )}
              </div>
            )}
            
            {viewMode === 'preparation' && (
              <div className="phase-info-preparation">
                {Array.isArray(phase.preparation) && phase.preparation.length > 0 ? (
                  <div className="bg-indigo-900 bg-opacity-20 border border-indigo-800 rounded-lg p-4 mb-4">
                    <h3 className="text-lg font-bold text-indigo-300 mb-2 flex items-center">
                      <span className="text-xl mr-2">🧰</span>
                      Preparación necesaria
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-indigo-100">
                      {phase.preparation.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="phase-info-empty">No hay información de preparación disponible para esta fase</div>
                )}
                
                {Array.isArray(phase.cooldowns) && phase.cooldowns.length > 0 && (
                  <div className="bg-blue-900 bg-opacity-20 border border-blue-800 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-blue-300 mb-2 flex items-center">
                      <span className="text-xl mr-2">🔄</span>
                      Rotación de cooldowns recomendada
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-blue-100">
                      {phase.cooldowns.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            {viewMode === 'video' && phase.video && (
              <div className="phase-info-video">
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-800 flex items-center justify-center">
                    <p className="text-gray-400">[Video preview: {phase.video.title || 'Guía visual de la fase'}]</p>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{phase.video.title || 'Guía visual'}</h3>
                    <p className="text-gray-400 text-sm mt-1">{phase.video.description || 'Video demostrativo de la fase'}</p>
                    <div className="mt-3">
                      {phase.video.url ? (
                        <a 
                          href={phase.video.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors duration-300"
                        >
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                          </svg>
                          Ver video completo
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">URL del video no disponible</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PhaseInfo;
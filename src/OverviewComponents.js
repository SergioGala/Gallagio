// OverviewComponents.js
// Archivo unificado con todos los componentes auxiliares para la pestaña de resumen
// Importa los estilos para los componentes

import React, { useState } from 'react';
import './OverviewComponents.css'; // Importar los estilos

/**
 * Componente para mostrar estadísticas en un recuadro
 */
export const StatBox = ({ title, value, icon, color = 'bg-gray-700' }) => (
  <div className={`stat-box ${color} rounded-lg p-3`}>
    <div className="text-gray-400 text-xs mb-1 flex items-center">
      <span className="mr-1">{icon}</span> {title}
    </div>
    <div className="text-white font-semibold">{value}</div>
  </div>
);

/**
 * Componente para mostrar una vista previa de fase
 */
export const PhasePreview = ({ number, name, description, keyPoints, color = 'bg-gray-700', expanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  
  return (
    <div className="phase-preview border border-gray-700 rounded-lg overflow-hidden">
      <div 
        className={`phase-header ${color} px-4 py-2 flex items-center justify-between cursor-pointer`} 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="phase-number w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center mr-3">
            <span className="font-bold">{number}</span>
          </div>
          <div>
            <h4 className="phase-title font-bold">{name}</h4>
            <p className="phase-description text-sm text-gray-300">{description}</p>
          </div>
        </div>
        <button 
          className="phase-expand-button w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center focus:outline-none"
          aria-label={isExpanded ? 'Contraer' : 'Expandir'}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>
      {isExpanded && (
        <div className="phase-content p-3 bg-gray-800">
          <ul className="list-disc pl-5 text-sm space-y-1">
            {keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

/**
 * Componente para mostrar errores fatales y sus soluciones
 */
export const FatalMistake = ({ title, description, solution, expanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  
  return (
    <div className="fatal-mistake border-l-4 border-red-500 pl-3 pr-2 py-2 bg-red-900 bg-opacity-20 rounded-r">
      <div className="flex justify-between items-start cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <h4 className="fatal-mistake-title font-bold text-red-400">
          <span className="fatal-mistake-title-icon mr-1">⚠️</span>
          {title}
        </h4>
        <button 
          className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center focus:outline-none text-xs"
          aria-label={isExpanded ? 'Contraer' : 'Expandir'}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>
      {isExpanded && (
        <>
          <p className="fatal-mistake-description text-sm text-gray-300 mt-1">{description}</p>
          <div className="fatal-mistake-solution text-sm text-green-400 mt-1 flex items-center">
            <span className="font-semibold flex items-center">
              <svg className="fatal-mistake-solution-icon w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Solución:
            </span> 
            {solution}
          </div>
        </>
      )}
    </div>
  );
};

/**
 * Componente para mostrar clases top por rol
 */
export const TopClass = ({ role, classes, reason, details }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Función para determinar colores según el rol
  const getRoleStyles = (role) => {
    switch(role) {
      case 'Tank':
        return {
          bg: 'rgba(81, 165, 186, 0.2)',
          text: 'rgb(81, 165, 186)',
          border: 'rgb(81, 165, 186)'
        };
      case 'Healer':
        return {
          bg: 'rgba(133, 200, 138, 0.2)',
          text: 'rgb(133, 200, 138)',
          border: 'rgb(133, 200, 138)'
        };
      case 'DPS':
        return {
          bg: 'rgba(255, 127, 17, 0.2)',
          text: 'rgb(255, 127, 17)',
          border: 'rgb(255, 127, 17)'
        };
      default:
        return {
          bg: 'rgba(132, 94, 194, 0.2)',
          text: 'rgb(132, 94, 194)',
          border: 'rgb(132, 94, 194)'
        };
    }
  };

  const styles = getRoleStyles(role);
  const roleClass = role.toLowerCase();

  return (
    <div className="top-class flex flex-col mb-2 border border-gray-700 rounded overflow-hidden bg-gray-800 bg-opacity-50">
      <div 
        className="flex p-2 cursor-pointer items-center"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div 
          className={`role-tag ${roleClass} w-20 text-xs font-semibold p-1 mr-2 rounded flex items-center justify-center`}
          style={{ 
            backgroundColor: styles.bg,
            color: styles.text,
            borderColor: styles.border
          }}
        >
          {role}
        </div>
        <div className="flex-grow">
          <div className="class-names font-medium">{classes.join(", ")}</div>
          <div className="class-reason text-xs text-gray-400">{reason}</div>
        </div>
        <div className="w-5 text-gray-400">
          {showDetails ? '−' : '+'}
        </div>
      </div>
      
      {showDetails && details && (
        <div className="class-details p-2 text-sm border-t border-gray-700 bg-gray-800">
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            {details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

/**
 * Componente para mostrar ítems requeridos
 */
export const RequiredItem = ({ name, reason, icon = "🧪", details }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div className="required-item group flex items-start p-2 border border-gray-700 rounded mb-2">
      <div className="item-icon text-lg mr-2">{icon}</div>
      <div className="flex-grow">
        <div className="item-name font-medium group-hover:text-indigo-300 transition-colors duration-300">{name}</div>
        <div className="item-reason text-xs text-gray-400">{reason}</div>
        
        {details && (
          <>
            <button 
              className="item-details-button text-xs text-blue-400 mt-1 hover:underline focus:outline-none"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Ocultar detalles' : 'Ver detalles'}
            </button>
            
            {showDetails && (
              <div className="item-details mt-2 text-xs bg-gray-700 p-2 rounded">
                {Array.isArray(details) ? (
                  <ul className="list-disc pl-4 space-y-1">
                    {details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{details}</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

/**
 * Componente para mostrar addons recomendados
 */
export const RecommendedAddon = ({ name, purpose, link, screenshot }) => {
  const [showScreenshot, setShowScreenshot] = useState(false);
  
  return (
    <div className="recommended-addon flex items-start group p-2 rounded">
      <div className="addon-icon text-lg mr-2">🔧</div>
      <div>
        <div className="addon-name font-medium group-hover:text-indigo-300 transition-colors duration-300">{name}</div>
        <div className="addon-reason text-xs text-gray-400">{purpose}</div>
        
        <div className="mt-1 flex items-center space-x-2">
          {link && (
            <a 
              href={link} 
              className="addon-details-button text-xs text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar
            </a>
          )}
          
          {screenshot && (
            <button 
              className="addon-details-button text-xs text-blue-400 hover:underline focus:outline-none"
              onClick={() => setShowScreenshot(!showScreenshot)}
            >
              {showScreenshot ? 'Ocultar' : 'Ver ejemplo'}
            </button>
          )}
        </div>
        
        {showScreenshot && screenshot && (
          <div className="addon-details mt-2 bg-gray-700 p-1 rounded">
            <div className="bg-gray-600 h-32 flex items-center justify-center text-xs text-gray-400">
              [Vista previa del addon: {name}]
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Componente para mostrar habilidades del boss
 */
export const BossAbility = ({ name, description, cooldown, phase, type, tips }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Determinar color según el tipo de habilidad
  const getTypeStyles = () => {
    switch(type) {
      case 'tank':
        return 'border-blue-500 bg-blue-900 bg-opacity-20';
      case 'raid':
        return 'border-purple-500 bg-purple-900 bg-opacity-20';
      case 'heal':
        return 'border-green-500 bg-green-900 bg-opacity-20';
      case 'damage':
        return 'border-red-500 bg-red-900 bg-opacity-20';
      case 'utility':
        return 'border-yellow-500 bg-yellow-900 bg-opacity-20';
      default:
        return 'border-gray-500 bg-gray-800';
    }
  };
  
  const getTypeIcon = () => {
    switch(type) {
      case 'tank': return '🛡️';
      case 'raid': return '👥';
      case 'heal': return '💚';
      case 'damage': return '💥';
      case 'utility': return '🔧';
      default: return '❓';
    }
  };
  
  return (
    <div className={`boss-ability border-l-4 ${getTypeStyles()} mb-2 rounded-r overflow-hidden`}>
      <div 
        className="boss-ability-header px-3 py-2 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <span className="boss-ability-icon mr-2">{getTypeIcon()}</span>
          <span className="boss-ability-title font-medium">{name}</span>
        </div>
        <div className="boss-ability-meta flex items-center space-x-3">
          {cooldown && <span className="boss-ability-cooldown text-xs text-gray-400">CD: {cooldown}</span>}
          {phase && <span className="boss-ability-phase text-xs px-2 py-0.5 bg-indigo-900 rounded-full">Fase {phase}</span>}
          <span>{isOpen ? '−' : '+'}</span>
        </div>
      </div>
      
      {isOpen && (
        <div className="boss-ability-content px-3 py-2 border-t border-gray-700">
          <p className="boss-ability-description text-sm text-gray-300">{description}</p>
          
          {tips && tips.length > 0 && (
            <div className="boss-ability-tips mt-2">
              <h5 className="boss-ability-tips-title text-xs font-semibold text-indigo-300 mb-1 flex items-center">
                <svg className="boss-ability-tips-icon w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Consejos:
              </h5>
              <ul className="boss-ability-tips-list list-disc pl-5 text-xs space-y-1 text-indigo-100">
                {tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Componente para mostrar barras de temporización
 */
export const TimerBar = ({ time, name, type = 'default', expanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  
  // Determinar la clase CSS según el tipo
  const getTypeClass = () => {
    switch(type) {
      case 'danger':
        return 'timer-bar-danger';
      case 'warning':
        return 'timer-bar-warning';
      case 'important':
        return 'timer-bar-important';
      case 'success':
        return 'timer-bar-success';
      default:
        return 'timer-bar-default';
    }
  };
  
  return (
    <div className="timer-bar mb-1">
      <div 
        className="timer-bar-header flex items-center p-1 cursor-pointer hover:bg-gray-700 rounded"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="timer-time w-16 font-mono text-gray-300 text-sm">{time}</div>
        <div className="flex-grow ml-2">
          <div className="timer-bar-container h-5 w-full relative rounded-full bg-gray-700 overflow-hidden">
            <div className={`timer-bar-fill h-full ${getTypeClass()}`} style={{ width: '30%' }}></div>
            <div className="timer-bar-label absolute inset-0 flex items-center px-2">
              <span className="text-xs text-white font-medium">{name}</span>
            </div>
          </div>
        </div>
        <div className="ml-2 text-gray-400 text-sm">
          {isExpanded ? '−' : '+'}
        </div>
      </div>
      
      {isExpanded && (
        <div className="timer-bar-content ml-16 pl-2 border-l border-gray-700 py-1 text-xs">
          <p className="text-gray-400">Información adicional sobre {name}</p>
        </div>
      )}
    </div>
  );
};

/**
 * Componente para mostrar mecánicas con un hover interactivo
 */
export const HoverMechanic = ({ name, description, icon, hoverContent }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="hover-mechanic relative p-2 border border-gray-700 rounded mb-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="hover-mechanic-content flex items-center">
        <span className="hover-mechanic-icon text-xl mr-2">{icon}</span>
        <div className="hover-mechanic-info">
          <div className="hover-mechanic-name font-medium">{name}</div>
          <div className="hover-mechanic-description text-xs text-gray-400">{description}</div>
        </div>
      </div>
      
      {isHovered && hoverContent && (
        <div className="hover-mechanic-popup absolute left-full top-0 ml-2 w-64 p-2 bg-gray-900 border border-gray-700 rounded shadow-lg z-10">
          {hoverContent}
        </div>
      )}
    </div>
  );
};

/**
 * Componente para visualizar rotaciones de cooldowns
 */
export const CooldownRotation = ({ title, cooldowns }) => {
  return (
    <div className="cooldown-rotation p-3 bg-gray-800 rounded border border-gray-700 mb-3">
      <h4 className="cooldown-rotation-title font-semibold mb-2">{title}</h4>
      <div className="space-y-2">
        {cooldowns.map((cooldown, index) => (
          <div key={index} className="cooldown-rotation-item flex items-center">
            <div className="cooldown-rotation-phase w-20 text-gray-400 text-sm">{cooldown.phase}</div>
            <div className="cooldown-rotation-bar flex-grow relative h-6 bg-gray-700 rounded overflow-hidden">
              {cooldown.abilities.map((ability, abilityIndex) => (
                <div 
                  key={abilityIndex}
                  className="cooldown-rotation-ability absolute h-full flex items-center justify-center text-xs text-white font-medium"
                  style={{
                    left: `${ability.startPercent}%`,
                    width: `${ability.endPercent - ability.startPercent}%`,
                    backgroundColor: ability.color || '#4f46e5'
                  }}
                >
                  {ability.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Exportar todos los componentes
export {
  // Los ya exportados arriba se mantienen automáticamente
  // No es necesario repetirlos aquí
};

// Exportación por defecto para compatibilidad
export default {
  StatBox,
  PhasePreview,
  FatalMistake,
  TopClass,
  RequiredItem,
  RecommendedAddon,
  BossAbility,
  TimerBar,
  HoverMechanic,
  CooldownRotation
};
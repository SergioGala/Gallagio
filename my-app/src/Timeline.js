// Timeline.js (corregido)
import React, { useMemo, useState } from 'react';
import { useDataContext } from './DataContext';
import { formatTime } from './WowClassData';

const Timeline = () => {
  const { 
    raidMembers, 
    bossEvents, 
    assignments, 
    encounterDuration,
    wowClasses,
    filterType
  } = useDataContext();

  // Estado para el tooltip
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: null
  });

  // Obtener el tipo de un hechizo (MOVIDO AQUÍ, ANTES DE SU USO)
  const getSpellType = (className, specName, spellName) => {
    if (!className || !specName || !spellName) return null;
    
    const spell = wowClasses[className]?.[specName]?.find(s => s.name === spellName);
    return spell?.type || null;
  };

  // Obtener duración de un hechizo
  const getSpellDuration = (className, specName, spellName) => {
    if (!className || !specName || !spellName) return 0;
    
    const spell = wowClasses[className]?.[specName]?.find(s => s.name === spellName);
    return typeof spell?.duration === 'number' ? spell.duration : 0;
  };

  // Preparar datos para la visualización
  const timelineData = useMemo(() => {
    // Agrupar asignaciones por miembro del raid
    const healerAssignments = {};
    
    raidMembers.forEach(healer => {
      healerAssignments[healer.id] = {
        healer,
        assignments: assignments.filter(a => 
          a.healerId.toString() === healer.id.toString() &&
          (filterType === 'all' || getSpellType(healer.class, healer.spec, a.spellName) === filterType)
        )
      };
    });
    
    return Object.values(healerAssignments).filter(ha => ha.assignments.length > 0);
  }, [raidMembers, assignments, wowClasses, filterType]);

  // Mostrar tooltip
  const showTooltip = (e, assignment) => {
    const healer = raidMembers.find(h => h.id.toString() === assignment.healerId.toString());
    if (!healer) return;
    
    const spell = wowClasses[healer.class]?.[healer.spec]?.find(s => s.name === assignment.spellName);
    if (!spell) return;
    
    const event = bossEvents.find(ev => ev.time === assignment.eventTime);
    
    setTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      content: {
        healer,
        spell,
        assignment,
        event
      }
    });
  };

  // Ocultar tooltip
  const hideTooltip = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  // Generar marcas de tiempo para la línea
  const timeMarkers = useMemo(() => {
    const markers = [];
    const interval = 30; // 30 segundos entre marcas
    
    for (let time = 0; time <= encounterDuration; time += interval) {
      markers.push(time);
    }
    
    return markers;
  }, [encounterDuration]);

  return (
    <div className="card timeline-container">
      <div className="card-header">
        <h2 className="card-title">Línea de Tiempo</h2>
      </div>
      
      {/* Regla de tiempo */}
      <div className="timeline-ruler" style={{height: '2rem'}}>
        {/* Marcas de tiempo */}
        {timeMarkers.map(time => (
          <div 
            key={time}
            className="timeline-marker"
            style={{ left: `${(time / encounterDuration) * 100}%` }}
          >
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              transform: 'translateX(-50%)',
              fontSize: '10px',
              color: 'var(--text-secondary-color)'
            }}>
              {formatTime(time)}
            </div>
          </div>
        ))}
        
        {/* Eventos del boss */}
        {bossEvents.map((event, index) => {
          const position = (event.time / encounterDuration) * 100;
          return (
            <div 
              key={index}
              className="timeline-event"
              style={{ left: `${position}%` }}
              title={`${event.name} (${formatTime(event.time)})`}
            >
              <div style={{
                position: 'absolute',
                bottom: '100%',
                left: '0',
                transform: 'translateX(-50%)',
                marginBottom: '4px',
                backgroundColor: 'rgba(250, 204, 21, 0.2)',
                color: 'var(--utility-color)',
                fontSize: '12px',
                padding: '2px 4px',
                borderRadius: '4px',
                whiteSpace: 'nowrap'
              }}>
                {event.name}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Líneas de tiempo por healer */}
      <div>
        {timelineData.length === 0 ? (
          <p style={{color: 'var(--text-secondary-color)', fontStyle: 'italic'}}>
            No hay asignaciones de cooldowns para mostrar.
          </p>
        ) : (
          timelineData.map(({ healer, assignments }) => (
            <div key={healer.id} style={{position: 'relative', marginBottom: '0.75rem'}}>
              {/* Encabezado del healer */}
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.25rem'}}>
                <div 
                  style={{
                    width: '1rem',
                    height: '1rem',
                    borderRadius: '50%',
                    backgroundColor: wowClasses[healer.class]?.color || '#555',
                    marginRight: '0.5rem'
                  }}
                ></div>
                <span style={{fontWeight: '500', color: 'white'}}>
                  {healer.name} ({healer.class} - {healer.spec})
                </span>
              </div>
              
              {/* Línea de tiempo del healer */}
              <div className="timeline-row-content" style={{
                position: 'relative',
                height: '2rem',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '0.25rem',
                overflow: 'hidden'
              }}>
                {/* Asignaciones de cooldowns */}
                {assignments.map(assignment => {
                  const position = (assignment.eventTime / encounterDuration) * 100;
                  const spell = wowClasses[healer.class]?.[healer.spec]?.find(s => s.name === assignment.spellName);
                  
                  if (!spell) return null;
                  
                  // Determinar color según el tipo
                  let bgColor = '#3B82F6'; // Default blue
                  
                  if (spell.type === 'healing') bgColor = 'var(--healing-color)';
                  else if (spell.type === 'defensive') bgColor = 'var(--defensive-color)';
                  else if (spell.type === 'utility') bgColor = 'var(--utility-color)';
                  
                  // Calcular ancho si tiene duración
                  const duration = getSpellDuration(healer.class, healer.spec, assignment.spellName);
                  const width = duration > 0 
                    ? Math.max(1, (duration / encounterDuration) * 100) 
                    : 1;
                  
                  return (
                    <div 
                      key={assignment.id}
                      className={`timeline-cooldown ${spell.type}`}
                      style={{ 
                        left: `${position}%`, 
                        width: `${width}%`,
                        minWidth: '4px',
                        backgroundColor: bgColor
                      }}
                      onMouseEnter={(e) => showTooltip(e, assignment)}
                      onMouseLeave={hideTooltip}
                    ></div>
                  );
                })}
                
                {/* Cooldowns extendidos para visualización */}
                {assignments.map(assignment => {
                  const spell = wowClasses[healer.class]?.[healer.spec]?.find(s => s.name === assignment.spellName);
                  if (!spell || !spell.cooldown) return null;
                  
                  const startPosition = (assignment.eventTime / encounterDuration) * 100;
                  const cooldownWidth = (spell.cooldown / encounterDuration) * 100;
                  
                  return (
                    <div 
                      key={`cd-${assignment.id}`}
                      style={{ 
                        position: 'absolute',
                        height: '100%',
                        backgroundColor: 'rgba(128, 128, 128, 0.2)',
                        left: `${startPosition}%`, 
                        width: `${cooldownWidth}%`,
                      }}
                    ></div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Tooltip */}
      {tooltip.visible && tooltip.content && (
        <div 
          className="tooltip"
          style={{ 
            left: `${tooltip.x + 10}px`, 
            top: `${tooltip.y + 10}px`,
            maxWidth: '300px'
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.25rem'}}>
            <span style={{marginRight: '0.25rem'}}>{tooltip.content.spell.icon}</span>
            <span style={{fontWeight: 'bold'}}>{tooltip.content.spell.name}</span>
          </div>
          <div style={{marginBottom: '0.25rem'}}>
            <span style={{color: 'var(--text-secondary-color)'}}>Healer:</span> {tooltip.content.healer.name}
          </div>
          <div style={{marginBottom: '0.25rem'}}>
            <span style={{color: 'var(--text-secondary-color)'}}>Evento:</span> {tooltip.content.event?.name || 'Desconocido'} ({formatTime(tooltip.content.assignment.eventTime)})
          </div>
          <div style={{marginBottom: '0.25rem'}}>
            <span style={{color: 'var(--text-secondary-color)'}}>Tipo:</span> {tooltip.content.spell.type}
          </div>
          <div style={{marginBottom: '0.25rem'}}>
            <span style={{color: 'var(--text-secondary-color)'}}>Duración:</span> {tooltip.content.spell.duration}s
          </div>
          <div style={{marginBottom: '0.25rem'}}>
            <span style={{color: 'var(--text-secondary-color)'}}>Cooldown:</span> {tooltip.content.spell.cooldown}s
          </div>
          {tooltip.content.assignment.note && (
            <div style={{marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.2)'}}>
              <span style={{color: 'var(--text-secondary-color)'}}>Nota:</span> {tooltip.content.assignment.note}
            </div>
          )}
          <div style={{marginTop: '0.25rem', fontSize: '0.75rem', color: 'var(--text-secondary-color)'}}>
            {tooltip.content.spell.description}
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;
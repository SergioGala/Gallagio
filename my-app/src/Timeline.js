// Timeline.js (componente mejorado con interactividad)
import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useDataContext } from './DataContext';
import { formatTime } from './WowClassData';

const Timeline = () => {
  const { 
    raidMembers, 
    bossEvents, 
    assignments, 
    encounterDuration,
    wowClasses,
    filterType,
    addAssignment,
    updateAssignment,
    removeAssignment
  } = useDataContext();

  // Estado para el tooltip
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: null
  });

  // Referencia al contenedor de la línea de tiempo
  const timelineRef = useRef(null);
  
  // Estado para zoom y desplazamiento
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Estado para elemento seleccionado (para edición o movimiento)
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  
  // Estado para mostrar conflictos de cooldown
  const [showConflicts, setShowConflicts] = useState(true);

  // Obtener el tipo de un hechizo
  const getSpellType = (className, specName, spellName) => {
    if (!className || !specName || !spellName) return null;
    
    const spell = wowClasses[className]?.[specName]?.find(s => s.name === spellName);
    return spell?.type || null;
  };

  // Obtener detalles completos de un hechizo
  const getSpellDetails = (className, specName, spellName) => {
    if (!className || !specName || !spellName) return null;
    
    const spell = wowClasses[className]?.[specName]?.find(s => s.name === spellName);
    return spell || null;
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
        ),
        // Detectar conflictos de cooldown
        conflicts: detectCooldownConflicts(healer, assignments)
      };
    });
    
    return Object.values(healerAssignments).filter(ha => ha.assignments.length > 0);
  }, [raidMembers, assignments, wowClasses, filterType]);

  // Función para detectar conflictos de cooldown
  function detectCooldownConflicts(healer, allAssignments) {
    const conflicts = [];
    const healerAssignments = allAssignments.filter(a => a.healerId.toString() === healer.id.toString());
    
    for (let i = 0; i < healerAssignments.length; i++) {
      const assignment = healerAssignments[i];
      const spell = getSpellDetails(healer.class, healer.spec, assignment.spellName);
      
      if (!spell || !spell.cooldown) continue;
      
      const endTime = assignment.eventTime;
      const startTime = Math.max(0, endTime - spell.cooldown);
      
      for (let j = 0; j < healerAssignments.length; j++) {
        if (i === j) continue;
        
        const otherAssignment = healerAssignments[j];
        if (otherAssignment.spellName !== assignment.spellName) continue;
        
        if (otherAssignment.eventTime >= startTime && otherAssignment.eventTime <= endTime) {
          conflicts.push({
            assignmentId: assignment.id,
            conflictsWith: otherAssignment.id,
            spell: assignment.spellName,
            time: assignment.eventTime
          });
        }
      }
    }
    
    return conflicts;
  }

  // Mostrar tooltip con información detallada
  const showTooltip = (e, assignment) => {
    const healer = raidMembers.find(h => h.id.toString() === assignment.healerId.toString());
    if (!healer) return;
    
    const spell = wowClasses[healer.class]?.[healer.spec]?.find(s => s.name === assignment.spellName);
    if (!spell) return;
    
    const event = bossEvents.find(ev => ev.time === assignment.eventTime);

    // Verificar si el cooldown está en conflicto
    const isInConflict = timelineData
      .find(data => data.healer.id === healer.id)?.conflicts
      .some(conflict => conflict.assignmentId === assignment.id);
    
    setTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      content: {
        healer,
        spell,
        assignment,
        event,
        isInConflict
      }
    });
  };

  // Ocultar tooltip
  const hideTooltip = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  // Manejar cambio de zoom
  const handleZoomChange = (e) => {
    const newZoom = parseFloat(e.target.value);
    setZoom(newZoom);
  };

  // Iniciar arrastre para desplazamiento
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Solo clic izquierdo
    setIsDragging(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
  };

  // Manejar arrastre
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocidad de desplazamiento
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };

  // Finalizar arrastre
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Seleccionar una asignación para edición
  const handleAssignmentClick = (e, assignment) => {
    e.stopPropagation();
    setSelectedAssignment(assignment);
  };

  // Mover asignación (simulando drag & drop por ahora)
  const handleMoveAssignment = (assignment, newTime) => {
    if (newTime >= 0 && newTime <= encounterDuration) {
      updateAssignment(assignment.id, 'eventTime', newTime);
    }
  };

  // Eliminar asignación
  const handleDeleteAssignment = (e, assignmentId) => {
    e.stopPropagation();
    removeAssignment(assignmentId);
    setSelectedAssignment(null);
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

  // Efecto para limpiar el estado de arrastre cuando el mouse sale del componente
  useEffect(() => {
    const handleMouseLeave = () => {
      setIsDragging(false);
    };
    
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Calcular el ancho de la línea de tiempo basado en zoom
  const timelineWidth = `${100 * zoom}%`;
  const minWidth = "1000px";

  return (
    <div className="card timeline-container">
      <div className="card-header">
        <h2 className="card-title">Línea de Tiempo</h2>
        <div className="timeline-controls">
          <div className="zoom-control">
            <label htmlFor="zoom-slider" style={{marginRight: '8px', color: 'var(--text-secondary-color)'}}>
              Zoom:
            </label>
            <input
              id="zoom-slider"
              type="range"
              min="1"
              max="5"
              step="0.5"
              value={zoom}
              onChange={handleZoomChange}
              style={{width: '100px'}}
            />
          </div>
          <label className="conflict-toggle">
            <input
              type="checkbox"
              checked={showConflicts}
              onChange={() => setShowConflicts(!showConflicts)}
            />
            <span style={{marginLeft: '4px', color: 'var(--text-secondary-color)'}}>
              Mostrar conflictos
            </span>
          </label>
        </div>
      </div>
      
      <div
        ref={timelineRef}
        className="timeline-scroll-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          overflowX: 'auto',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none'
        }}
      >
        <div className="timeline-content" style={{width: timelineWidth, minWidth}}>
          {/* Regla de tiempo */}
          <div className="timeline-ruler" style={{height: '2rem', position: 'sticky', top: 0, backgroundColor: 'var(--card-bg-color)', zIndex: 2}}>
            {/* Marcas de tiempo */}
            {timeMarkers.map(time => (
              <div 
                key={time}
                className="timeline-marker"
                style={{ 
                  left: `${(time / encounterDuration) * 100}%`,
                  height: '100%', 
                  width: '1px',
                  backgroundColor: time % 60 === 0 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'
                }}
              >
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  transform: 'translateX(-50%)',
                  fontSize: '10px',
                  color: 'var(--text-secondary-color)',
                  whiteSpace: 'nowrap'
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
                  style={{ 
                    left: `${position}%`,
                    position: 'absolute',
                    height: '100%',
                    width: '3px',
                    backgroundColor: 'var(--utility-color)',
                    transform: 'translateX(-50%)',
                    cursor: 'pointer',
                    zIndex: 3
                  }}
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
                    whiteSpace: 'nowrap',
                    zIndex: 5
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
              <p style={{color: 'var(--text-secondary-color)', fontStyle: 'italic', padding: '1rem'}}>
                No hay asignaciones de cooldowns para mostrar.
              </p>
            ) : (
              timelineData.map(({ healer, assignments, conflicts }) => (
                <div key={healer.id} style={{position: 'relative', marginBottom: '1.5rem'}}>
                  {/* Encabezado del healer */}
                  <div style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '0.25rem',
                    position: 'sticky',
                    left: 0,
                    backgroundColor: 'var(--card-bg-color)',
                    padding: '0.5rem',
                    zIndex: 2
                  }}>
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
                    {showConflicts && conflicts.length > 0 && (
                      <span style={{
                        marginLeft: '0.5rem',
                        color: 'var(--defensive-color)',
                        fontSize: '0.875rem'
                      }}>
                        ⚠️ {conflicts.length} conflicto(s) de cooldown
                      </span>
                    )}
                  </div>
                  
                  {/* Línea de tiempo del healer */}
                  <div className="timeline-row-content" style={{
                    position: 'relative',
                    height: '2.5rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '0.25rem',
                    overflow: 'visible'
                  }}>
                    {/* Zonas de cooldown (en el fondo) */}
                    {assignments.map(assignment => {
                      const spell = getSpellDetails(healer.class, healer.spec, assignment.spellName);
                      if (!spell || !spell.cooldown) return null;
                      
                      const eventPosition = (assignment.eventTime / encounterDuration) * 100;
                      const startPosition = ((assignment.eventTime - spell.cooldown) / encounterDuration) * 100;
                      const width = (spell.cooldown / encounterDuration) * 100;
                      
                      return (
                        <div 
                          key={`cd-${assignment.id}`}
                          style={{ 
                            position: 'absolute',
                            height: '100%',
                            backgroundColor: 'rgba(128, 128, 128, 0.2)',
                            left: `${Math.max(0, startPosition)}%`, 
                            width: `${width}%`,
                            borderRadius: '4px'
                          }}
                        ></div>
                      );
                    })}
                    
                    {/* Asignaciones de cooldowns */}
                    {assignments.map(assignment => {
                      const position = (assignment.eventTime / encounterDuration) * 100;
                      const spell = getSpellDetails(healer.class, healer.spec, assignment.spellName);
                      
                      if (!spell) return null;
                      
                      // Determinar color según el tipo
                      let bgColor = '#3B82F6'; // Default blue
                      
                      if (spell.type === 'healing') bgColor = 'var(--healing-color)';
                      else if (spell.type === 'defensive') bgColor = 'var(--defensive-color)';
                      else if (spell.type === 'utility') bgColor = 'var(--utility-color)';
                      
                      // Verificar si este cooldown está en conflicto
                      const isInConflict = showConflicts && conflicts.some(c => c.assignmentId === assignment.id);
                      
                      // Calcular ancho si tiene duración
                      const duration = typeof spell.duration === 'number' ? spell.duration : 0;
                      const width = duration > 0 
                        ? Math.max(1, (duration / encounterDuration) * 100) 
                        : 1;
                      
                      return (
                        <div 
                          key={assignment.id}
                          className={`timeline-cooldown ${spell.type} ${isInConflict ? 'in-conflict' : ''} ${selectedAssignment?.id === assignment.id ? 'selected' : ''}`}
                          style={{ 
                            left: `${position}%`, 
                            width: `${width}%`,
                            minWidth: '6px',
                            backgroundColor: bgColor,
                            boxShadow: isInConflict ? '0 0 0 2px #FF4500, 0 0 10px rgba(255, 69, 0, 0.5)' : 
                              selectedAssignment?.id === assignment.id ? '0 0 0 2px white, 0 0 10px rgba(255, 255, 255, 0.5)' : 'none',
                            zIndex: isInConflict || selectedAssignment?.id === assignment.id ? 5 : 4,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            opacity: selectedAssignment && selectedAssignment.id !== assignment.id ? 0.6 : 1
                          }}
                          onClick={(e) => handleAssignmentClick(e, assignment)}
                          onMouseEnter={(e) => showTooltip(e, assignment)}
                          onMouseLeave={hideTooltip}
                        >
                          <div className="cooldown-icon" style={{
                            position: 'absolute',
                            top: '50%',
                            left: '4px',
                            transform: 'translateY(-50%)',
                            fontSize: '12px',
                            display: width > 3 ? 'block' : 'none'
                          }}>
                            {spell.icon}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* Panel de selección de asignación */}
      {selectedAssignment && (
        <div className="selected-assignment-panel" style={{
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: 'var(--input-bg-color)',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
            <h3 style={{margin: 0, fontSize: '1rem', fontWeight: '500'}}>
              Asignación seleccionada
            </h3>
            <button 
              onClick={() => setSelectedAssignment(null)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary-color)',
                cursor: 'pointer',
                fontSize: '1.25rem'
              }}
            >
              ×
            </button>
          </div>
          
          {(() => {
            const healer = raidMembers.find(h => h.id.toString() === selectedAssignment.healerId.toString());
            const spell = healer ? getSpellDetails(healer.class, healer.spec, selectedAssignment.spellName) : null;
            const event = bossEvents.find(e => e.time === selectedAssignment.eventTime);
            
            if (!healer || !spell) return <p>Error: Datos no encontrados</p>;
            
            return (
              <div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '0.75rem',
                  marginBottom: '0.75rem'
                }}>
                  <div>
                    <label style={{color: 'var(--text-secondary-color)', fontSize: '0.875rem'}}>Healer</label>
                    <div style={{fontWeight: '500'}}>{healer.name}</div>
                  </div>
                  <div>
                    <label style={{color: 'var(--text-secondary-color)', fontSize: '0.875rem'}}>Habilidad</label>
                    <div style={{fontWeight: '500'}}>
                      <span style={{marginRight: '0.25rem'}}>{spell.icon}</span> {spell.name}
                    </div>
                  </div>
                  <div>
                    <label style={{color: 'var(--text-secondary-color)', fontSize: '0.875rem'}}>Evento</label>
                    <div style={{fontWeight: '500'}}>{event ? event.name : formatTime(selectedAssignment.eventTime)}</div>
                  </div>
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '0.75rem',
                  marginBottom: '0.75rem'
                }}>
                  <div>
                    <label style={{color: 'var(--text-secondary-color)', fontSize: '0.875rem'}}>Tiempo</label>
                    <div className="time-adjust">
                      <button 
                        onClick={() => handleMoveAssignment(selectedAssignment, selectedAssignment.eventTime - 5)}
                        disabled={selectedAssignment.eventTime <= 0}
                        style={{
                          backgroundColor: 'var(--border-color)',
                          border: 'none',
                          borderRadius: '0.25rem 0 0 0.25rem',
                          padding: '0.25rem 0.5rem',
                          cursor: 'pointer',
                          color: 'white'
                        }}
                      >-5s</button>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: 'var(--input-bg-color)',
                        borderTop: '1px solid var(--border-color)',
                        borderBottom: '1px solid var(--border-color)'
                      }}>
                        {formatTime(selectedAssignment.eventTime)}
                      </span>
                      <button 
                        onClick={() => handleMoveAssignment(selectedAssignment, selectedAssignment.eventTime + 5)}
                        disabled={selectedAssignment.eventTime >= encounterDuration}
                        style={{
                          backgroundColor: 'var(--border-color)',
                          border: 'none',
                          borderRadius: '0 0.25rem 0.25rem 0',
                          padding: '0.25rem 0.5rem',
                          cursor: 'pointer',
                          color: 'white'
                        }}
                      >+5s</button>
                    </div>
                  </div>
                  <div>
                    <label style={{color: 'var(--text-secondary-color)', fontSize: '0.875rem'}}>Nota</label>
                    <input 
                      type="text"
                      value={selectedAssignment.note || ''}
                      onChange={(e) => updateAssignment(selectedAssignment.id, 'note', e.target.value)}
                      placeholder="Añadir nota..."
                      style={{width: '100%'}}
                    />
                  </div>
                </div>
                
                <div style={{display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.75rem'}}>
                  <button
                    onClick={(e) => handleDeleteAssignment(e, selectedAssignment.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
      
      {/* Tooltip */}
      {tooltip.visible && tooltip.content && (
        <div 
          className="tooltip"
          style={{ 
            left: `${tooltip.x + 10}px`, 
            top: `${tooltip.y + 10}px`,
            maxWidth: '300px',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(4px)',
            border: tooltip.content.isInConflict ? '1px solid var(--defensive-color)' : '1px solid rgba(255,255,255,0.1)',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.25rem'}}>
            <span style={{marginRight: '0.25rem'}}>{tooltip.content.spell.icon}</span>
            <span style={{fontWeight: 'bold'}}>{tooltip.content.spell.name}</span>
            {tooltip.content.isInConflict && (
              <span style={{
                marginLeft: 'auto', 
                color: 'var(--defensive-color)',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                ⚠️ En cooldown
              </span>
            )}
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
          <div style={{
            fontSize: '0.75rem', 
            color: 'var(--text-secondary-color)',
            marginTop: '0.5rem',
            fontStyle: 'italic'
          }}>
            Haz clic para editar esta asignación
          </div>
        </div>
      )}
      
      {/* Estilos adicionales */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .in-conflict {
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 69, 0, 0.7); }
          70% { box-shadow: 0 0 0 5px rgba(255, 69, 0, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 69, 0, 0); }
        }
        
        .timeline-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .zoom-control {
          display: flex;
          align-items: center;
        }
        
        .conflict-toggle {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        
        .selected {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default Timeline;
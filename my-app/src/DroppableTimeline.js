// DroppableTimeline.js - Componente mejorado para la zona de asignación rápida
import React, { useRef, useState, useEffect } from 'react';
import { formatTime } from './WowClassData';

const DroppableTimeline = ({ bossEvents, encounterDuration, onAssignmentDrop }) => {
  const timelineRef = useRef(null);
  const [highlightPosition, setHighlightPosition] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  
  // Generar marcas de tiempo para la línea
  const timeMarkers = [];
  const interval = 30; // 30 segundos entre marcas
  
  for (let time = 0; time <= encounterDuration; time += interval) {
    timeMarkers.push(time);
  }
  
  // Calcular la posición del tiempo basado en la posición del mouse
  const calculateTimeFromPosition = (mouseX) => {
    if (!timelineRef.current) return 0;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const scrollLeft = timelineRef.current.parentElement.scrollLeft;
    const relativeX = mouseX - rect.left + scrollLeft;
    const percentage = Math.min(Math.max(relativeX / timelineRef.current.offsetWidth, 0), 1);
    return Math.round(percentage * encounterDuration);
  };
  
  // Manejar arrastre sobre la línea de tiempo
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
    
    // Calcular el tiempo donde se soltaría la habilidad
    const time = calculateTimeFromPosition(e.clientX);
    setHighlightPosition({
      time,
      left: `${(time / encounterDuration) * 100}%`
    });
  };
  
  // Manejar salida del arrastre
  const handleDragLeave = () => {
    setIsDragOver(false);
    setHighlightPosition(null);
  };
  
  // Manejar soltar la habilidad
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    setHighlightPosition(null);
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      const time = calculateTimeFromPosition(e.clientX);
      
      // Pasar los datos completos al callback
      onAssignmentDrop({
        ...data,
        eventTime: time
      });
    } catch (err) {
      console.error('Error processing dropped spell:', err);
    }
  };
  
  // Limpiar highlight al salir del componente
  useEffect(() => {
    return () => {
      setHighlightPosition(null);
      setIsDragOver(false);
    };
  }, []);

  return (
    <div className="drop-zone-container">
      <div 
        ref={timelineRef}
        className={`droppable-timeline ${isDragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Marcas de tiempo */}
        {timeMarkers.map(time => (
          <div 
            key={time}
            className="timeline-marker"
            style={{ 
              position: 'absolute',
              left: `${(time / encounterDuration) * 100}%`,
              height: '100%',
              width: '1px',
              backgroundColor: time % 60 === 0 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'
            }}
          >
            <div style={{
              position: 'absolute',
              bottom: '4px',
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
              style={{ 
                position: 'absolute',
                left: `${position}%`,
                height: '100%',
                width: '3px',
                backgroundColor: 'var(--utility-color)',
                transform: 'translateX(-50%)',
                zIndex: 2
              }}
              title={`${event.name} (${formatTime(event.time)})`}
            >
              <div style={{
                position: 'absolute',
                top: '4px',
                left: '0',
                transform: 'translateX(-50%)',
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
        
        {/* Indicador de posición durante arrastre */}
        {highlightPosition && (
          <div style={{
            position: 'absolute',
            left: highlightPosition.left,
            top: '0',
            height: '100%',
            width: '2px',
            backgroundColor: '#3B82F6',
            transform: 'translateX(-50%)',
            zIndex: 3
          }}>
            <div style={{
              position: 'absolute',
              bottom: '-24px',
              left: '0',
              transform: 'translateX(-50%)',
              backgroundColor: '#3B82F6',
              color: 'white',
              fontSize: '12px',
              padding: '2px 6px',
              borderRadius: '4px',
              whiteSpace: 'nowrap'
            }}>
              {formatTime(highlightPosition.time)}
            </div>
          </div>
        )}
        
        {/* Mensaje de instrucción */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'var(--text-secondary-color)',
          fontSize: '14px',
          fontStyle: 'italic',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          opacity: isDragOver ? 0 : 0.7
        }}>
          Arrastra habilidades aquí para asignarlas a la línea de tiempo
        </div>
      </div>
    </div>
  );
};

export default DroppableTimeline;
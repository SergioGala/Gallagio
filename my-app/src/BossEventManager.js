// BossEventManager.js (con estilos CSS integrados)
import React, { useState } from 'react';
import { useDataContext } from './DataContext';
import { formatTime } from './WowClassData';

const BossEventManager = () => {
  const { 
    bossEvents, 
    addBossEvent, 
    removeBossEvent, 
    updateBossEvent,
    encounterDuration,
    setEncounterDuration
  } = useDataContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    time: 0,
    name: '',
    description: ''
  });

  const startEdit = (event, index) => {
    setIsEditing(true);
    setEditingIndex(index);
    setEditForm({
      time: event.time,
      name: event.name,
      description: event.description
    });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingIndex(null);
  };

  const saveEdit = () => {
    if (!editForm.name.trim() || editForm.time < 0 || editForm.time > encounterDuration) {
      alert('Por favor verifica los campos. El tiempo debe estar entre 0 y la duración del encuentro.');
      return;
    }

    updateBossEvent(editingIndex, 'time', parseInt(editForm.time, 10));
    updateBossEvent(editingIndex, 'name', editForm.name);
    updateBossEvent(editingIndex, 'description', editForm.description);

    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    
    setEditForm({
      ...editForm,
      [name]: name === 'time' ? parseInt(value, 10) || 0 : value
    });
  };

  const handleDurationChange = (e) => {
    const newDuration = parseInt(e.target.value, 10) || 0;
    setEncounterDuration(newDuration);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Eventos del Boss</h2>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <label style={{color: 'white', marginRight: '0.5rem'}}>
            Duración:
            <input
              type="number"
              min="60"
              max="1200"
              value={encounterDuration}
              onChange={handleDurationChange}
              style={{marginLeft: '0.5rem', width: '5rem'}}
            />
            s ({formatTime(encounterDuration)})
          </label>
          <button 
            onClick={addBossEvent}
            className="btn btn-success"
            style={{marginLeft: '0.5rem'}}
          >
            + Añadir Evento
          </button>
        </div>
      </div>
      
      {/* Línea de tiempo simple */}
      <div className="timeline-ruler">
        {bossEvents.map((event, index) => {
          const position = (event.time / encounterDuration) * 100;
          return (
            <div 
              key={index}
              className="timeline-event"
              style={{ left: `${position}%` }}
              title={`${event.name} (${formatTime(event.time)})`}
              onClick={() => startEdit(event, index)}
            >
              <div style={{
                position: 'absolute', 
                bottom: '100%', 
                left: '0', 
                transform: 'translateX(-50%)', 
                marginBottom: '4px',
                backgroundColor: 'rgba(0,0,0,0.8)',
                padding: '2px 4px',
                borderRadius: '4px',
                fontSize: '12px',
                whiteSpace: 'nowrap',
                display: 'none'
              }} className="tooltip-text">
                {event.name} ({formatTime(event.time)})
              </div>
            </div>
          );
        })}
        
        {/* Marcas de tiempo */}
        {Array.from({ length: Math.ceil(encounterDuration / 60) + 1 }).map((_, i) => (
          <div 
            key={i}
            className="timeline-marker"
            style={{ left: `${(i * 60 / encounterDuration) * 100}%` }}
          >
            <div style={{
              position: 'absolute', 
              bottom: '0', 
              left: '0', 
              transform: 'translateX(-50%)', 
              fontSize: '10px',
              color: 'var(--text-secondary-color)'
            }}>
              {formatTime(i * 60)}
            </div>
          </div>
        ))}
      </div>
      
      {/* Lista de eventos */}
      <div>
        {bossEvents.length === 0 ? (
          <p style={{color: 'var(--text-secondary-color)', fontStyle: 'italic'}}>
            No hay eventos definidos. Añade uno para comenzar.
          </p>
        ) : (
          bossEvents
            .sort((a, b) => a.time - b.time) // Ordenar por tiempo
            .map((event, index) => (
              <div 
                key={index} 
                className="healer-item"
              >
                {/* Modo vista normal */}
                {editingIndex !== index ? (
                  <>
                    <div className="event-time">
                      {formatTime(event.time)}
                    </div>
                    <div className="healer-info">
                      <span className="healer-name">{event.name}</span>
                      {event.description && (
                        <span className="healer-class">
                          - {event.description}
                        </span>
                      )}
                    </div>
                    <div className="healer-actions">
                      <button 
                        onClick={() => startEdit(event, index)}
                        className="btn-sm"
                        style={{color: '#3B82F6'}}
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => removeBossEvent(index)}
                        className="btn-sm"
                        style={{color: '#EF4444'}}
                      >
                        🗑️
                      </button>
                    </div>
                  </>
                ) : (
                  /* Modo edición */
                  <div className="edit-form">
                    <input
                      type="number"
                      name="time"
                      min="0"
                      max={encounterDuration}
                      value={editForm.time}
                      onChange={handleEditChange}
                      style={{gridColumn: 'span 2'}}
                    />
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      placeholder="Nombre del evento"
                      style={{gridColumn: 'span 4'}}
                    />
                    <input
                      type="text"
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      placeholder="Descripción"
                      style={{gridColumn: 'span 4'}}
                    />
                    <div style={{gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.25rem'}}>
                      <button 
                        onClick={saveEdit}
                        className="btn-sm"
                        style={{color: '#10B981'}}
                      >
                        ✓
                      </button>
                      <button 
                        onClick={cancelEdit}
                        className="btn-sm"
                        style={{color: '#EF4444'}}
                      >
                        ✗
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default BossEventManager;
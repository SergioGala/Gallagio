// AssignmentManager.js (corregido)
import React, { useState, useMemo } from 'react';
import { useDataContext } from './DataContext';
import { formatTime } from './WowClassData';

const AssignmentManager = () => {
  const { 
    raidMembers, 
    bossEvents, 
    assignments, 
    addAssignment,
    removeAssignment,
    updateAssignment,
    wowClasses,
    filterType,
    setFilterType
  } = useDataContext();

  // Estado local para la nueva asignación
  const [newAssignment, setNewAssignment] = useState({
    healerId: '',
    spellName: '',
    eventTime: '',
    note: ''
  });

  // Estado para edición
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Crear un set de tiempos únicos de eventos para agrupar
  const uniqueEventTimes = useMemo(() => {
    return [...new Set(bossEvents.map(event => event.time))].sort((a, b) => a - b);
  }, [bossEvents]);

  // Filtrar las habilidades por tipo
  const getFilteredSpells = (healerClass, healerSpec) => {
    if (!healerClass || !healerSpec || !wowClasses[healerClass] || !wowClasses[healerClass][healerSpec]) {
      return [];
    }

    return wowClasses[healerClass][healerSpec].filter(spell => 
      filterType === 'all' || spell.type === filterType
    );
  };

  // Obtener el cooldown actual para un healer y spell específico
  const getSpellDetails = (healerId, spellName) => {
    const healer = raidMembers.find(member => member.id.toString() === healerId.toString());
    if (!healer) return null;

    const spell = wowClasses[healer.class]?.[healer.spec]?.find(s => s.name === spellName);
    return spell || null;
  };

  // Iniciar la edición de una asignación
  const startEdit = (assignment) => {
    setIsEditing(true);
    setEditingId(assignment.id);
    setNewAssignment({
      healerId: assignment.healerId,
      spellName: assignment.spellName,
      eventTime: assignment.eventTime,
      note: assignment.note || ''
    });
  };

  // Cancelar la edición
  const cancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    resetForm();
  };

  // Guardar la edición
  const saveEdit = (e) => {
    e.preventDefault(); // Añadir esto para prevenir el envío del formulario
    
    // Validar formulario
    if (!newAssignment.healerId || !newAssignment.spellName || !newAssignment.eventTime) {
      console.log("Validación fallida:", newAssignment); // Para depuración
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    // Actualizar cada campo
    updateAssignment(editingId, 'healerId', newAssignment.healerId);
    updateAssignment(editingId, 'spellName', newAssignment.spellName);
    updateAssignment(editingId, 'eventTime', parseInt(newAssignment.eventTime, 10));
    updateAssignment(editingId, 'note', newAssignment.note);

    // Resetear formulario y estado de edición
    setIsEditing(false);
    setEditingId(null);
    resetForm();
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'healerId') {
      // Reset spellName when healer changes
      setNewAssignment({
        ...newAssignment,
        [name]: value,
        spellName: ''
      });
    } else {
      setNewAssignment({
        ...newAssignment,
        [name]: name === 'eventTime' ? parseInt(value, 10) || '' : value
      });
    }
    
    // Para depuración
    console.log(`Campo ${name} cambiado a:`, value);
    console.log("Estado actualizado:", {
      ...newAssignment,
      [name]: name === 'eventTime' ? parseInt(value, 10) || '' : value
    });
  };

  // Añadir nueva asignación
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar formulario
    console.log("Intentando enviar:", newAssignment); // Para depuración
    
    if (!newAssignment.healerId) {
      alert('Por favor selecciona un healer');
      return;
    }
    
    if (!newAssignment.spellName) {
      alert('Por favor selecciona una habilidad');
      return;
    }
    
    if (!newAssignment.eventTime && newAssignment.eventTime !== 0) {
      alert('Por favor selecciona un evento');
      return;
    }

    // Crear y añadir asignación
    addAssignment({
      healerId: newAssignment.healerId,
      spellName: newAssignment.spellName,
      eventTime: parseInt(newAssignment.eventTime, 10),
      note: newAssignment.note
    });

    // Resetear formulario
    resetForm();
  };

  // Resetear el formulario
  const resetForm = () => {
    setNewAssignment({
      healerId: '',
      spellName: '',
      eventTime: '',
      note: ''
    });
  };

  // Función para verificar si un cooldown está disponible para un evento
  const isCooldownAvailable = (healerId, spellName, eventTime, currentAssignmentId = null) => {
    // Obtener detalles del hechizo
    const spell = getSpellDetails(healerId, spellName);
    if (!spell) return true; // Si no hay información, asumimos que está disponible
    
    // Convertir eventTime a número para estar seguros
    eventTime = parseInt(eventTime, 10);
    
    // Buscar asignaciones previas para este healer y spell
    const previousAssignments = assignments.filter(a => 
      a.healerId.toString() === healerId.toString() && 
      a.spellName === spellName && 
      a.id !== currentAssignmentId
    );
    
    // Verificar para cada asignación si interfiere con el nuevo tiempo
    for (const assignment of previousAssignments) {
      const assignmentTime = parseInt(assignment.eventTime, 10);
      
      // Comprobar si el cooldown se solaparía
      if (Math.abs(assignmentTime - eventTime) < spell.cooldown) {
        return false; // No disponible, en cooldown
      }
    }
    
    return true; // Disponible
  };

  // Verificar disponibilidad para la asignación actual
  const isCurrentCooldownAvailable = useMemo(() => {
    if (!newAssignment.healerId || !newAssignment.spellName || 
        (newAssignment.eventTime !== 0 && !newAssignment.eventTime)) {
      return true; // Si faltan datos, no mostrar advertencia
    }
    
    return isCooldownAvailable(
      newAssignment.healerId, 
      newAssignment.spellName, 
      newAssignment.eventTime,
      isEditing ? editingId : null
    );
  }, [newAssignment, isEditing, editingId, assignments]);

  // Obtener el nombre de un healer por ID
  const getHealerName = (healerId) => {
    const healer = raidMembers.find(h => h.id.toString() === healerId.toString());
    return healer ? healer.name : 'Desconocido';
  };

  // Obtener el nombre del evento por tiempo
  const getEventName = (time) => {
    const event = bossEvents.find(e => e.time === time);
    return event ? event.name : `Tiempo: ${formatTime(time)}`;
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Asignaciones de Cooldowns</h2>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <button
            onClick={() => setFilterType('all')}
            className={`filter-button ${filterType === 'all' ? 'filter-active filter-all' : ''}`}
            style={{backgroundColor: filterType === 'all' ? '#3B82F6' : '#374151'}}
          >
            Todos
          </button>
          <button
            onClick={() => setFilterType('healing')}
            className={`filter-button ${filterType === 'healing' ? 'filter-active filter-healing' : ''}`}
            style={{backgroundColor: filterType === 'healing' ? '#4ADE80' : '#374151'}}
          >
            Curación
          </button>
          <button
            onClick={() => setFilterType('defensive')}
            className={`filter-button ${filterType === 'defensive' ? 'filter-active filter-defensive' : ''}`}
            style={{backgroundColor: filterType === 'defensive' ? '#F87171' : '#374151'}}
          >
            Defensivo
          </button>
          <button
            onClick={() => setFilterType('utility')}
            className={`filter-button ${filterType === 'utility' ? 'filter-active filter-utility' : ''}`}
            style={{backgroundColor: filterType === 'utility' ? '#FACC15' : '#374151'}}
          >
            Utilidad
          </button>
        </div>
      </div>
      
      {/* Formulario para añadir/editar asignación */}
      <form 
        onSubmit={isEditing ? saveEdit : handleSubmit} 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '0.5rem',
          marginBottom: '1rem'
        }}
      >
        <div style={{gridColumn: 'span 3'}}>
          <label style={{display: 'block', marginBottom: '0.25rem', color: 'var(--text-secondary-color)'}}>Healer</label>
          <select
            name="healerId"
            value={newAssignment.healerId}
            onChange={handleChange}
            style={{width: '100%'}}
          >
            <option value="">Selecciona un healer</option>
            {raidMembers.map(healer => (
              <option key={healer.id} value={healer.id}>
                {healer.name} ({healer.class} - {healer.spec})
              </option>
            ))}
          </select>
        </div>
        
        <div style={{gridColumn: 'span 3'}}>
          <label style={{display: 'block', marginBottom: '0.25rem', color: 'var(--text-secondary-color)'}}>Habilidad</label>
          <select
            name="spellName"
            value={newAssignment.spellName}
            onChange={handleChange}
            disabled={!newAssignment.healerId}
            style={{width: '100%'}}
          >
            <option value="">Selecciona una habilidad</option>
            {newAssignment.healerId && raidMembers
              .filter(healer => healer.id.toString() === newAssignment.healerId.toString())
              .map(healer => {
                const spells = getFilteredSpells(healer.class, healer.spec);
                return spells.map(spell => (
                  <option key={spell.name} value={spell.name}>
                    {spell.icon} {spell.name} ({spell.cooldown}s)
                  </option>
                ));
              })}
          </select>
        </div>
        
        <div style={{gridColumn: 'span 2'}}>
          <label style={{display: 'block', marginBottom: '0.25rem', color: 'var(--text-secondary-color)'}}>Evento</label>
          <select
            name="eventTime"
            value={newAssignment.eventTime}
            onChange={handleChange}
            style={{width: '100%'}}
          >
            <option value="">Selecciona un evento</option>
            {uniqueEventTimes.map(time => (
              <option key={time} value={time}>
                {formatTime(time)} - {getEventName(time)}
              </option>
            ))}
          </select>
        </div>
        
        <div style={{gridColumn: 'span 3'}}>
          <label style={{display: 'block', marginBottom: '0.25rem', color: 'var(--text-secondary-color)'}}>Nota (opcional)</label>
          <input
            type="text"
            name="note"
            value={newAssignment.note}
            onChange={handleChange}
            placeholder="Nota adicional"
            style={{width: '100%'}}
          />
        </div>
        
        <div style={{gridColumn: 'span 1', display: 'flex', alignItems: 'flex-end'}}>
          {isEditing ? (
            <button
              type="button"
              onClick={cancelEdit}
              className="btn btn-danger btn-sm"
              style={{width: '100%'}}
            >
              Cancelar
            </button>
          ) : (
            <button
              type="button"
              onClick={resetForm}
              className="btn btn-sm"
              style={{width: '100%', backgroundColor: '#4B5563'}}
            >
              Limpiar
            </button>
          )}
        </div>
        
        <div style={{gridColumn: 'span 12', md: 'span 1', display: 'flex', alignItems: 'flex-end'}}>
          <button
            type="submit"
            className={`btn ${isEditing ? 'btn-primary' : 'btn-success'} btn-sm`}
            style={{width: '100%'}}
          >
            {isEditing ? 'Actualizar' : 'Añadir'}
          </button>
        </div>
        
        {/* Advertencia de cooldown */}
        {!isCurrentCooldownAvailable && (
          <div style={{gridColumn: 'span 12', color: '#FACC15', fontSize: '0.875rem'}}>
            ⚠️ Advertencia: Esta habilidad podría estar en cooldown para este evento. Verifica la línea de tiempo.
          </div>
        )}
      </form>

      {/* Lista de asignaciones agrupadas por eventos */}
      <div>
        {uniqueEventTimes.map(time => {
          const eventAssignments = assignments.filter(a => a.eventTime === time);
          if (eventAssignments.length === 0) return null;
          
          return (
            <div key={time} className="assignment-group">
              <h3 style={{
                fontWeight: '500', 
                marginBottom: '0.5rem',
                color: 'white'
              }}>
                <span style={{fontFamily: 'monospace', color: 'var(--utility-color)'}}>{formatTime(time)}</span> - {getEventName(time)}
              </h3>
              
              <div>
                {eventAssignments.map(assignment => {
                  const spell = getSpellDetails(assignment.healerId, assignment.spellName);
                  let textColor = '#3B82F6'; // Default blue
                  
                  if (spell?.type === 'healing') textColor = 'var(--healing-color)';
                  else if (spell?.type === 'defensive') textColor = 'var(--defensive-color)';
                  else if (spell?.type === 'utility') textColor = 'var(--utility-color)';
                  
                  return (
                    <div key={assignment.id} className="assignment-item">
                      <div style={{flexGrow: 1}}>
                        <span style={{fontWeight: '500', color: 'white'}}>
                          {getHealerName(assignment.healerId)}
                        </span>
                        <span style={{margin: '0 0.5rem'}}>→</span>
                        <span style={{color: textColor}}>
                          {spell?.icon} {assignment.spellName}
                        </span>
                        {assignment.note && (
                          <span style={{marginLeft: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary-color)'}}>
                            ({assignment.note})
                          </span>
                        )}
                      </div>
                      <div style={{display: 'flex', gap: '0.5rem'}}>
                        <button 
                          onClick={() => startEdit(assignment)}
                          className="btn-sm"
                          style={{color: '#3B82F6'}}
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => removeAssignment(assignment.id)}
                          className="btn-sm"
                          style={{color: '#EF4444'}}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        
        {assignments.length === 0 && (
          <p style={{color: 'var(--text-secondary-color)', fontStyle: 'italic'}}>
            No hay asignaciones. Añade una para comenzar.
          </p>
        )}
      </div>
    </div>
  );
};

export default AssignmentManager;
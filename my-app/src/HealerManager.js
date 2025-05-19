// HealerManager.js corregido - problema updateRaidMembers
import React, { useState } from 'react';
import { useDataContext } from './DataContext';
import DraggableSpell from './DraggableSpell';

const HealerManager = () => {
  const { 
    raidMembers, 
    addRaidMember, 
    removeRaidMember, 
    updateRaidMember,
    updateRaidMembers, // Añadido para obtener la función del contexto
    wowClasses,
    filterType,
    setFilterType 
  } = useDataContext();
  
  // Estado para control de edición
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', class: '', spec: '' });
  
  // Estado para expandir/colapsar habilidades
  const [expandedHealer, setExpandedHealer] = useState(null);

  // Manejar clic en healer para expandir/colapsar
  const toggleHealer = (healerId) => {
    if (expandedHealer === healerId) {
      setExpandedHealer(null);
    } else {
      setExpandedHealer(healerId);
    }
  };

  // Iniciar edición de healer
  const startEdit = (healer) => {
    setEditId(healer.id);
    setEditForm({
      name: healer.name,
      class: healer.class,
      spec: healer.spec
    });
  };

  // Cancelar edición
  const cancelEdit = () => {
    setEditId(null);
  };

  // Guardar edición - MÉTODO MODIFICADO
  const saveEdit = () => {
    if (editForm.name.trim() === '' || !editForm.class || !editForm.spec) {
      alert('Por favor completa todos los campos.');
      return;
    }

    // En lugar de actualizar campo por campo, actualizamos el objeto completo
    const updatedHealer = {
      id: editId,
      name: editForm.name,
      class: editForm.class,
      spec: editForm.spec
    };
    
    // Actualizar el estado de los miembros del raid
    const updatedRaidMembers = raidMembers.map(member => 
      member.id === editId ? updatedHealer : member
    );
    
    // Usar la función del contexto para actualizar todo el array de una vez
    updateRaidMembers(updatedRaidMembers);
    
    // Cerrar el modo edición
    setEditId(null);
  };

  // Manejar cambios en el formulario
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'class') {
      // Resetear la especialización al cambiar de clase
      setEditForm({
        ...editForm,
        [name]: value,
        spec: ''
      });
    } else {
      setEditForm({
        ...editForm,
        [name]: value
      });
    }
  };

  // Obtener todas las clases disponibles directamente de wowClasses
  const healerClasses = Object.keys(wowClasses);
  
  // Obtener todas las especializaciones para una clase
  const getSpecsForClass = (className) => {
    if (!className || !wowClasses[className]) return [];
    
    // Retornar todas las especializaciones (todas las claves excepto 'color' e 'icon')
    return Object.keys(wowClasses[className])
      .filter(key => key !== 'color' && key !== 'icon');
  };

  // Filtrar los hechizos por tipo
  const getFilteredSpells = (healerClass, healerSpec) => {
    if (!healerClass || !healerSpec || !wowClasses[healerClass] || !wowClasses[healerClass][healerSpec]) {
      return [];
    }

    return wowClasses[healerClass][healerSpec].filter(spell => 
      filterType === 'all' || spell.type === filterType
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Gestión de Healers</h2>
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
      
      <div className="healer-list">
        {raidMembers.map(healer => (
          <div key={healer.id} className="healer-container">
            {/* Modo vista del healer */}
            {editId !== healer.id ? (
              <div className="healer-item">
                <div 
                  className="healer-icon"
                  style={{backgroundColor: wowClasses[healer.class]?.color || '#555'}}
                >
                  {wowClasses[healer.class]?.icon}
                </div>
                <div className="healer-info">
                  <span className="healer-name">{healer.name}</span>
                  <span className="healer-class">
                    {healer.class} - {healer.spec}
                  </span>
                </div>
                <div className="healer-actions">
                  <button 
                    onClick={() => toggleHealer(healer.id)}
                    className="btn-sm"
                    style={{color: expandedHealer === healer.id ? '#10B981' : '#3B82F6'}}
                  >
                    {expandedHealer === healer.id ? '🔼' : '🔽'}
                  </button>
                  <button 
                    onClick={() => startEdit(healer)}
                    className="btn-sm"
                    style={{color: '#3B82F6'}}
                  >
                    ✏️
                  </button>
                  <button 
                    onClick={() => removeRaidMember(healer.id)}
                    className="btn-sm"
                    style={{color: '#EF4444'}}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ) : (
              /* Modo edición del healer */
              <div className="healer-item edit-mode">
                <div className="edit-form">
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    placeholder="Nombre del healer"
                    style={{gridColumn: 'span 3'}}
                  />
                  <select
                    name="class"
                    value={editForm.class}
                    onChange={handleEditChange}
                    style={{gridColumn: 'span 3'}}
                  >
                    <option value="">Selecciona una clase</option>
                    {healerClasses.map(className => (
                      <option key={className} value={className}>
                        {wowClasses[className].icon} {className}
                      </option>
                    ))}
                  </select>
                  <select
                    name="spec"
                    value={editForm.spec}
                    onChange={handleEditChange}
                    disabled={!editForm.class}
                    style={{gridColumn: 'span 4'}}
                  >
                    <option value="">Selecciona una especialización</option>
                    {getSpecsForClass(editForm.class).map(spec => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
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
              </div>
            )}
            
            {/* Panel expandible de habilidades con drag & drop */}
            {expandedHealer === healer.id && (
              <div 
                className="healer-abilities"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  marginTop: '0.5rem',
                  marginBottom: '0.75rem'
                }}
              >
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '500',
                  marginBottom: '0.75rem',
                  color: wowClasses[healer.class]?.color || 'white'
                }}>
                  {wowClasses[healer.class]?.icon} Habilidades de {healer.name} ({healer.class} - {healer.spec})
                </h3>
                
                <div 
                  className="abilities-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '0.75rem'
                  }}
                >
                  {getFilteredSpells(healer.class, healer.spec).map((spell, index) => (
                    <DraggableSpell 
                      key={index}
                      spell={spell}
                      healerId={healer.id}
                      className={healer.class}
                      specName={healer.spec}
                    />
                  ))}
                </div>
                
                {getFilteredSpells(healer.class, healer.spec).length === 0 && (
                  <p style={{color: 'var(--text-secondary-color)', fontStyle: 'italic'}}>
                    No hay habilidades disponibles con el filtro actual.
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
        
        {raidMembers.length === 0 && (
          <p style={{color: 'var(--text-secondary-color)', fontStyle: 'italic'}}>
            No hay healers añadidos. Añade uno para comenzar.
          </p>
        )}
      </div>
      
      <div style={{textAlign: 'center', marginTop: '1rem'}}>
        <button 
          onClick={addRaidMember}
          className="btn btn-success"
        >
          + Añadir Healer
        </button>
      </div>
      
      {/* Estilos adicionales */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .healer-container {
          margin-bottom: 0.5rem;
        }
        
        .healer-container:last-child {
          margin-bottom: 0;
        }
        
        .edit-mode {
          background-color: var(--input-bg-color);
        }
      `}</style>
    </div>
  );
};

export default HealerManager;
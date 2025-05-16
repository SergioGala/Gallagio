// Componente de selección de healer para WoW Cooldown Tracker

import React, { useState, useEffect } from 'react';
import { WOW_CLASSES } from './WowClassData'; // Asegúrate de importar correctamente tus datos

const HealerSelector = ({ onSelectHealer }) => {
  // Lista de especializaciones de sanación
  const HEALING_SPECS = [
    { class: 'PRIEST', spec: 'HOLY' },
    { class: 'PRIEST', spec: 'DISCIPLINE' },
    { class: 'PALADIN', spec: 'HOLY' },
    { class: 'DRUID', spec: 'RESTORATION' },
    { class: 'SHAMAN', spec: 'RESTORATION' },
    { class: 'MONK', spec: 'MISTWEAVER' },
    { class: 'EVOKER', spec: 'PRESERVATION' }
  ];

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('');
  const [availableSpecs, setAvailableSpecs] = useState([]);

  // Cuando cambia la clase, actualiza las especializaciones disponibles
  useEffect(() => {
    if (selectedClass && WOW_CLASSES[selectedClass]) {
      // Filtrar solo las especializaciones de curación para la clase seleccionada
      const healingSpecs = HEALING_SPECS
        .filter(item => item.class === selectedClass)
        .map(item => item.spec);
      
      setAvailableSpecs(healingSpecs);
      
      // Si hay alguna especialización disponible, selecciona la primera por defecto
      if (healingSpecs.length > 0 && !healingSpecs.includes(selectedSpec)) {
        setSelectedSpec(healingSpecs[0]);
      } else if (healingSpecs.length === 0) {
        setSelectedSpec('');
      }
    } else {
      setAvailableSpecs([]);
      setSelectedSpec('');
    }
  }, [selectedClass]);

  // Cuando cambia la especialización, notifica al componente padre
  useEffect(() => {
    if (selectedClass && selectedSpec) {
      onSelectHealer({
        class: selectedClass,
        spec: selectedSpec,
        abilities: WOW_CLASSES[selectedClass][selectedSpec] || []
      });
    }
  }, [selectedClass, selectedSpec, onSelectHealer]);

  // Lista de clases con especializaciones de sanación
  const healerClasses = [...new Set(HEALING_SPECS.map(item => item.class))];

  return (
    <div className="healer-selector">
      <div className="selector-container">
        <label htmlFor="class-select">Clase:</label>
        <select
          id="class-select"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Selecciona una clase</option>
          {healerClasses.map((className) => (
            <option key={className} value={className}>
              {WOW_CLASSES[className].icon} {className.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      {selectedClass && (
        <div className="selector-container">
          <label htmlFor="spec-select">Especialización:</label>
          <select
            id="spec-select"
            value={selectedSpec}
            onChange={(e) => setSelectedSpec(e.target.value)}
            disabled={availableSpecs.length === 0}
          >
            <option value="">Selecciona una especialización</option>
            {availableSpecs.map((spec) => (
              <option key={spec} value={spec}>
                {spec.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedClass && selectedSpec && (
        <div className="selected-healer">
          <h3 style={{ color: WOW_CLASSES[selectedClass].color }}>
            {WOW_CLASSES[selectedClass].icon} {selectedClass.replace('_', ' ')} - {selectedSpec.replace('_', ' ')}
          </h3>
        </div>
      )}
    </div>
  );
};

// Componente para mostrar las habilidades del healer seleccionado
const HealerAbilities = ({ healer }) => {
  if (!healer || !healer.abilities || healer.abilities.length === 0) {
    return <div>Selecciona un healer para ver sus habilidades</div>;
  }

  return (
    <div className="healer-abilities">
      <h3>Habilidades de {healer.class.replace('_', ' ')} - {healer.spec.replace('_', ' ')}</h3>
      <div className="abilities-grid">
        {healer.abilities.map((ability, index) => (
          <div key={index} className="ability-card">
            <div className="ability-icon">{ability.icon}</div>
            <div className="ability-details">
              <h4>{ability.name}</h4>
              <div className="ability-meta">
                <span className={`ability-type type-${ability.type}`}>{ability.type}</span>
                <span className="ability-cooldown">CD: {ability.cooldown}s</span>
                <span className="ability-duration">Duración: {ability.duration}</span>
              </div>
              <p className="ability-description">{ability.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente principal que integra la selección y visualización
const HealerManager = () => {
  const [selectedHealer, setSelectedHealer] = useState(null);

  return (
    <div className="healer-manager">
      <h2>Selección de Healer</h2>
      <HealerSelector onSelectHealer={setSelectedHealer} />
      <HealerAbilities healer={selectedHealer} />
    </div>
  );
};

export default HealerManager;
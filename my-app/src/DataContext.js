// DataContext.js
import React, { createContext, useState, useContext } from 'react';
import { WOW_CLASSES, DEFAULT_BOSS_EVENTS } from './WowClassData';

// Crear el contexto
const DataContext = createContext();

// Hook personalizado para usar el contexto
export const useDataContext = () => useContext(DataContext);

// Proveedor del contexto
export const DataProvider = ({ children }) => {
  // Estado para los miembros del raid
  const [raidMembers, setRaidMembers] = useState([
    { id: 1, name: 'Healer1', class: 'PRIEST', spec: 'HOLY' },
    { id: 2, name: 'Healer2', class: 'DRUID', spec: 'RESTORATION' },
    { id: 3, name: 'Healer3', class: 'SHAMAN', spec: 'RESTORATION' },
  ]);
  
  // Estado para los eventos del boss
  const [bossEvents, setBossEvents] = useState(DEFAULT_BOSS_EVENTS);
  
  // Estado para la duración del encuentro
  const [encounterDuration, setEncounterDuration] = useState(360); // 6 minutos en segundos
  
  // Estado para las asignaciones de cooldowns
  const [assignments, setAssignments] = useState([]);
  
  // Estado para la configuración del encuentro
  const [encounterSettings, setEncounterSettings] = useState({
    name: 'Boss Name',
    difficulty: 'Mítico',
  });
  
  // Estado para filtros
  const [filterType, setFilterType] = useState('all'); // 'all', 'healing', 'defensive', 'utility'
  
  // Funciones para manipular raid members
  const addRaidMember = () => {
    const newId = raidMembers.length > 0 ? Math.max(...raidMembers.map(h => h.id)) + 1 : 1;
    setRaidMembers([...raidMembers, { 
      id: newId, 
      name: `Healer${newId}`, 
      class: 'PRIEST', 
      spec: 'HOLY' 
    }]);
  };
  
  const removeRaidMember = (id) => {
    setRaidMembers(raidMembers.filter(member => member.id !== id));
    setAssignments(assignments.filter(assignment => assignment.healerId !== id));
  };
  
  const updateRaidMember = (id, field, value) => {
    setRaidMembers(raidMembers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
    
    // Si cambia la clase o spec, eliminar asignaciones existentes
    if (field === 'class' || field === 'spec') {
      setAssignments(assignments.filter(assignment => assignment.healerId !== id));
    }
  };
  
  // Funciones para manipular eventos del boss
  const addBossEvent = () => {
    const newTime = bossEvents.length > 0 ? bossEvents[bossEvents.length - 1].time + 30 : 0;
    setBossEvents([...bossEvents, { 
      time: newTime, 
      name: `New Event`, 
      description: 'Description' 
    }]);
  };
  
  const removeBossEvent = (index) => {
    const newEvents = [...bossEvents];
    const eventTime = newEvents[index].time;
    newEvents.splice(index, 1);
    setBossEvents(newEvents);
    
    // Eliminar asignaciones vinculadas a este evento
    setAssignments(assignments.filter(a => a.eventTime !== eventTime));
  };
  
  const updateBossEvent = (index, field, value) => {
    const newEvents = [...bossEvents];
    const oldTime = newEvents[index].time;
    newEvents[index] = { ...newEvents[index], [field]: value };
    setBossEvents(newEvents);
    
    // Si cambia el tiempo, actualizar asignaciones
    if (field === 'time' && oldTime !== parseInt(value, 10)) {
      setAssignments(assignments.map(a => 
        a.eventTime === oldTime ? { ...a, eventTime: parseInt(value, 10) } : a
      ));
    }
  };
  
  // Funciones para manipular asignaciones
  const addAssignment = (assignment) => {
    const newId = assignments.length > 0 ? Math.max(...assignments.map(a => a.id)) + 1 : 1;
    setAssignments([...assignments, { ...assignment, id: newId }]);
  };
  
  const removeAssignment = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };
  
  const updateAssignment = (id, field, value) => {
    setAssignments(assignments.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    ));
  };
  
  // Funciones para guardar/cargar
  const exportData = () => {
    const data = {
      raidMembers,
      bossEvents,
      encounterDuration,
      assignments,
      encounterSettings,
    };
    return JSON.stringify(data);
  };
  
  const importData = (jsonData) => {
    try {
      const data = JSON.parse(jsonData);
      setRaidMembers(data.raidMembers || []);
      setBossEvents(data.bossEvents || DEFAULT_BOSS_EVENTS);
      setEncounterDuration(data.encounterDuration || 360);
      setAssignments(data.assignments || []);
      setEncounterSettings(data.encounterSettings || { name: 'Boss Name', difficulty: 'Mítico' });
      return true;
    } catch (e) {
      console.error("Error importing data:", e);
      return false;
    }
  };
  
  // Valor del contexto
  const contextValue = {
    // Estados
    raidMembers,
    bossEvents,
    encounterDuration,
    assignments,
    encounterSettings,
    filterType,
    
    // Setters
    setRaidMembers,
    setBossEvents,
    setEncounterDuration,
    setAssignments,
    setEncounterSettings,
    setFilterType,
    
    // Funciones - Raid Members
    addRaidMember,
    removeRaidMember,
    updateRaidMember,
    
    // Funciones - Boss Events
    addBossEvent,
    removeBossEvent,
    updateBossEvent,
    
    // Funciones - Assignments
    addAssignment,
    removeAssignment,
    updateAssignment,
    
    // Funciones - Import/Export
    exportData,
    importData,
    
    // Datos estáticos
    wowClasses: WOW_CLASSES,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
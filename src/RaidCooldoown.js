// RaidCooldownPlanner.js - Parte 1
// Componente de planificador de cooldowns adaptado para la aplicación de Gallywix

import React, { useState, useEffect } from 'react';
import InfoCard from './InfoCard';

// Importamos los datos de clases desde archivos externos para mantener el código organizado
// En el caso de tu proyecto, puedes crear archivos separados para estos datos
import { WOW_CLASSES } from './WowClassData';

// Datos de mecánicas del jefe Gallywix
const BOSS_MECHANICS = {
  phase1: [
    { 
      time: "0:10", 
      name: "Scatterblast Canisters (Grupo 1)",
      description: "Cono frontal que aplica absorción a los jugadores afectados",
      type: "healer"
    },
    { 
      time: "0:55", 
      name: "Venting Heat",
      description: "Daño constante a toda la raid durante 4s", 
      type: "raid"
    },
    { 
      time: "1:06", 
      name: "Scatterblast Canisters (Grupo 2)",
      description: "Cono frontal que aplica absorción a los jugadores afectados",
      type: "healer"
    },
    { 
      time: "1:55", 
      name: "Venting Heat",
      description: "Daño constante a toda la raid durante 4s", 
      type: "raid"
    }
  ],
  phase2: [
    { 
      time: "2:15", 
      name: "Giga Coils",
      description: "Daño creciente a toda la raid hasta desactivación", 
      type: "raid"
    }
  ],
  transition: [
    { 
      time: "Transición 50%", 
      name: "TOTAL DESTRUCTION!!!",
      description: "Cast mortal que debe ser interrumpido tras destruir escudo", 
      type: "urgent"
    }
  ],
  phase3: [
    { 
      time: "3:30", 
      name: "Versiones amplificadas",
      description: "Mayor daño de todas las mecánicas", 
      type: "raid"
    }
  ]
};

// Componente principal
const RaidCooldownPlanner = () => {
  // Estado para la composición de raid
  const [raidComposition, setRaidComposition] = useState([]);
  
  // Estado para el filtro de rol
  const [roleFilter, setRoleFilter] = useState('Todos');
  
  // Estado para el filtro de tipo de cooldown
  const [cooldownTypeFilter, setCooldownTypeFilter] = useState('Todos');
  
  // Estado para mostrar cooldowns disponibles
  const [availableCooldowns, setAvailableCooldowns] = useState({
    raid: [],
    tank: [],
    throughput: [],
    personal: [],
    external: []
  });
  
  // Estado para el plan de cooldowns asignados
  const [cooldownPlan, setCooldownPlan] = useState({});
  
  // Estado para editar nombre de jugador
  const [editingPlayerId, setEditingPlayerId] = useState(null);
  const [editingPlayerName, setEditingPlayerName] = useState('');

  // Efecto para calcular los cooldowns disponibles cuando cambia la composición
  useEffect(() => {
    calculateAvailableCooldowns();
  }, [raidComposition]);

  // Función para agregar un jugador a la raid
  const addPlayer = (playerClass, spec, playerName = '') => {
    // Generar un nombre predeterminado si no se proporciona uno
    const defaultName = playerName || `${spec.name} ${playerClass.name}`;
    
    const newPlayer = {
      id: Date.now(),
      name: defaultName,
      class: playerClass.name,
      classColor: playerClass.color,
      spec: spec.name,
      role: spec.role,
      icon: spec.icon,
      defensives: spec.defensives,
      healing: spec.healing
    };
    
    setRaidComposition([...raidComposition, newPlayer]);
  };

  // Función para eliminar un jugador de la raid
  const removePlayer = (playerId) => {
    // Eliminar el jugador
    setRaidComposition(raidComposition.filter(player => player.id !== playerId));
    
    // Eliminar cualquier cooldown asignado a ese jugador
    const newPlan = {};
    Object.entries(cooldownPlan).forEach(([key, cd]) => {
      if (cd.playerId !== playerId) {
        newPlan[key] = cd;
      }
    });
    setCooldownPlan(newPlan);
  };

  // Función para editar nombre de jugador
  const startEditingPlayer = (player) => {
    setEditingPlayerId(player.id);
    setEditingPlayerName(player.name);
  };

  const savePlayerName = () => {
    if (editingPlayerId) {
      setRaidComposition(
        raidComposition.map(player => 
          player.id === editingPlayerId 
            ? {...player, name: editingPlayerName || player.name} 
            : player
        )
      );
      setEditingPlayerId(null);
      setEditingPlayerName('');
    }
  };

  // Función para calcular los cooldowns disponibles
  const calculateAvailableCooldowns = () => {
    const raidCooldowns = [];
    const tankCooldowns = [];
    const throughputCooldowns = [];
    const personalCooldowns = [];
    const externalCooldowns = [];

    raidComposition.forEach(player => {
      // Añadir cooldowns defensivos
      player.defensives.forEach(defensive => {
        const cooldown = {
          name: defensive.name,
          cooldown: defensive.cooldown,
          player: player.name,
          playerSpec: player.spec,
          playerClass: player.class,
          icon: defensive.icon,
          type: defensive.type,
          classColor: player.classColor,
          effect: defensive.effect || defensive.reduction || defensive.buff || '',
          playerId: player.id
        };

        if (defensive.type === 'raid') {
          raidCooldowns.push(cooldown);
        } else if (defensive.type === 'tank') {
          tankCooldowns.push(cooldown);
        } else if (defensive.type === 'personal') {
          personalCooldowns.push(cooldown);
        } else if (defensive.type === 'external') {
          externalCooldowns.push(cooldown);
        }
      });

      // Añadir cooldowns de sanación
      player.healing.forEach(healing => {
        const cooldown = {
          name: healing.name,
          cooldown: healing.cooldown,
          player: player.name,
          playerSpec: player.spec,
          playerClass: player.class,
          icon: healing.icon,
          type: healing.type,
          classColor: player.classColor,
          effect: healing.effect || '',
          playerId: player.id
        };

        if (healing.type === 'raid') {
          raidCooldowns.push(cooldown);
        } else if (healing.type === 'throughput' || healing.type === 'absorb' || healing.type === 'single') {
          throughputCooldowns.push(cooldown);
        } else if (healing.type === 'external') {
          externalCooldowns.push(cooldown);
        }
      });
    });

    setAvailableCooldowns({
      raid: raidCooldowns,
      tank: tankCooldowns,
      throughput: throughputCooldowns,
      personal: personalCooldowns,
      external: externalCooldowns
    });
  };
  // Función para filtrar jugadores por rol
  const filteredPlayers = () => {
    if (roleFilter === 'Todos') {
      return raidComposition;
    }
    return raidComposition.filter(player => player.role === roleFilter);
  };

  // Función para filtrar cooldowns por tipo
  const filteredCooldowns = () => {
    switch (cooldownTypeFilter) {
      case 'Defensivos de Raid':
        return availableCooldowns.raid;
      case 'Defensivos de Tank':
        return [...availableCooldowns.tank, ...availableCooldowns.external.filter(cd => cd.type === 'tank')];
      case 'Sanación de Raid':
        return [...availableCooldowns.throughput, ...availableCooldowns.raid.filter(cd => cd.playerSpec.includes('Healer') || cd.playerSpec === 'Restauración' || cd.playerSpec === 'Preservación')];
      case 'Defensivos Personales':
        return availableCooldowns.personal;
      case 'Externals':
        return availableCooldowns.external;
      default:
        return [
          ...availableCooldowns.raid,
          ...availableCooldowns.tank,
          ...availableCooldowns.throughput,
          ...availableCooldowns.external
        ];
    }
  };
  
  // Función para asignar un cooldown a una mecánica
  const assignCooldown = (mechanic, cooldown) => {
    const mechanicKey = mechanic.time + mechanic.name;
    setCooldownPlan({
      ...cooldownPlan,
      [mechanicKey]: {
        ...cooldown,
        mechanicTime: mechanic.time,
        mechanicName: mechanic.name
      }
    });
  };
  
  // Función para eliminar la asignación de un cooldown
  const removeCooldownAssignment = (mechanicKey) => {
    const newPlan = {...cooldownPlan};
    delete newPlan[mechanicKey];
    setCooldownPlan(newPlan);
  };
  
  // Verificar si un cooldown ya está asignado
  const isCooldownAssigned = (cooldownPlayerId, cooldownName) => {
    return Object.values(cooldownPlan).some(
      cd => cd.playerId === cooldownPlayerId && cd.name === cooldownName
    );
  };

  // Componente para el panel de mecánicas
  const MechanicsPanel = ({ phase, title }) => {
    return (
      <div className="mb-4">
        <h4 className="font-semibold text-purple-300 mb-2">{title}</h4>
        <div className="space-y-2">
          {BOSS_MECHANICS[phase].map((mechanic, index) => {
            const mechanicKey = mechanic.time + mechanic.name;
            const assignedCooldown = cooldownPlan[mechanicKey];
            
            return (
              <div 
                key={index} 
                className={`p-3 rounded-lg ${
                  mechanic.type === 'raid' 
                    ? 'bg-red-900 bg-opacity-30 border border-red-800' 
                    : mechanic.type === 'healer'
                      ? 'bg-green-900 bg-opacity-30 border border-green-800'
                      : mechanic.type === 'urgent'
                        ? 'bg-purple-900 bg-opacity-30 border border-purple-800'
                        : 'bg-blue-900 bg-opacity-30 border border-blue-800'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-white">{mechanic.time} - {mechanic.name}</div>
                    <div className="text-sm text-gray-300">{mechanic.description}</div>
                  </div>
                  <div className="ml-4">
                    {assignedCooldown ? (
                      <div className="bg-gray-800 p-2 rounded flex items-center">
                        <span className="mr-1">{assignedCooldown.icon}</span>
                        <span style={{ color: assignedCooldown.classColor }}>{assignedCooldown.name}</span>
                        <span className="mx-1 text-gray-400">-</span>
                        <span className="text-sm text-gray-300">{assignedCooldown.player}</span>
                        <button 
                          onClick={() => removeCooldownAssignment(mechanicKey)}
                          className="ml-2 text-red-400 hover:text-red-300"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button 
                        className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-sm text-gray-300"
                        onClick={() => document.getElementById(`dropdown-${mechanicKey}`).classList.toggle('hidden')}
                      >
                        Asignar CD
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Dropdown para seleccionar cooldown */}
                <div id={`dropdown-${mechanicKey}`} className="mt-2 bg-gray-800 rounded p-2 hidden">
                  <div className="text-xs text-gray-400 mb-1">Selecciona un cooldown:</div>
                  <div className="max-h-40 overflow-y-auto">
                    {mechanic.type === 'raid' && (
                      <>
                        {availableCooldowns.raid.length > 0 ? (
                          availableCooldowns.raid.map((cd, i) => (
                            <button 
                              key={i}
                              onClick={() => {
                                assignCooldown(mechanic, cd);
                                document.getElementById(`dropdown-${mechanicKey}`).classList.add('hidden');
                              }}
                              disabled={isCooldownAssigned(cd.playerId, cd.name)}
                              className={`w-full text-left px-2 py-1 rounded mb-1 flex items-center ${
                                isCooldownAssigned(cd.playerId, cd.name)
                                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                  : 'bg-gray-700 hover:bg-gray-600 text-white'
                              }`}
                            >
                              <span className="mr-1">{cd.icon}</span>
                              <span style={{ color: isCooldownAssigned(cd.playerId, cd.name) ? '#6B7280' : cd.classColor }}>
                                {cd.name}
                              </span>
                              <span className="ml-1 text-xs text-gray-400">({cd.player})</span>
                            </button>
                          ))
                        ) : (
                          <div className="text-gray-400 text-sm p-2">No hay cooldowns de raid disponibles</div>
                        )}
                      </>
                    )}
                    
                    {mechanic.type === 'healer' && (
                      <>
                        {availableCooldowns.throughput.length > 0 ? (
                          availableCooldowns.throughput.map((cd, i) => (
                            <button 
                              key={i}
                              onClick={() => {
                                assignCooldown(mechanic, cd);
                                document.getElementById(`dropdown-${mechanicKey}`).classList.add('hidden');
                              }}
                              disabled={isCooldownAssigned(cd.playerId, cd.name)}
                              className={`w-full text-left px-2 py-1 rounded mb-1 flex items-center ${
                                isCooldownAssigned(cd.playerId, cd.name)
                                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                  : 'bg-gray-700 hover:bg-gray-600 text-white'
                              }`}
                            >
                              <span className="mr-1">{cd.icon}</span>
                              <span style={{ color: isCooldownAssigned(cd.playerId, cd.name) ? '#6B7280' : cd.classColor }}>
                                {cd.name}
                              </span>
                              <span className="ml-1 text-xs text-gray-400">({cd.player})</span>
                            </button>
                          ))
                        ) : (
                          <div className="text-gray-400 text-sm p-2">No hay cooldowns de sanación disponibles</div>
                        )}
                      </>
                    )}
                    
                    {/* Para todas las mecánicas, permitir usar cualquier CD más fuerte */}
                    {(mechanic.type === 'urgent' || mechanic.type === 'raid') && availableCooldowns.raid.length === 0 && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-300 mb-1">Cooldowns alternativos:</div>
                        {[...availableCooldowns.throughput, ...availableCooldowns.external]
                          .filter(cd => !isCooldownAssigned(cd.playerId, cd.name))
                          .map((cd, i) => (
                            <button 
                              key={i}
                              onClick={() => {
                                assignCooldown(mechanic, cd);
                                document.getElementById(`dropdown-${mechanicKey}`).classList.add('hidden');
                              }}
                              className="w-full text-left px-2 py-1 rounded mb-1 flex items-center bg-gray-700 hover:bg-gray-600 text-white"
                            >
                              <span className="mr-1">{cd.icon}</span>
                              <span style={{ color: cd.classColor }}>{cd.name}</span>
                              <span className="ml-1 text-xs text-gray-400">({cd.player})</span>
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <InfoCard
      title="Planificador de Cooldowns"
      icon="🔄"
      glowEffect={true}
      tags={["Interactivo", "Personalizable"]}
      content={
        <div className="space-y-6">
          {/* Selector de clase y especialización */}
          <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-white">Añadir Jugador</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {WOW_CLASSES.map(playerClass => (
                <div key={playerClass.name} className="bg-gray-700 p-3 rounded-lg">
                  <h4 
                    className="font-bold mb-2" 
                    style={{ color: playerClass.color }}
                  >
                    {playerClass.name}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {playerClass.specs.map(spec => (
                      <button
                        key={`${playerClass.name}-${spec.name}`}
                        onClick={() => addPlayer(playerClass, spec)}
                        className={`px-3 py-1 rounded text-sm flex items-center ${
                          spec.role === 'Tank' 
                            ? 'bg-blue-900 text-blue-200'
                            : spec.role === 'Healer'
                              ? 'bg-green-900 text-green-200'
                              : 'bg-red-900 text-red-200'
                        }`}
                      >
                        <span className="mr-1">{spec.icon}</span> {spec.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Composición actual de raid */}
          <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-white">Composición de Raid ({raidComposition.length})</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setRoleFilter('Todos')} 
                  className={`px-2 py-1 rounded text-sm ${roleFilter === 'Todos' ? 'bg-indigo-700 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  Todos
                </button>
                <button 
                  onClick={() => setRoleFilter('Tank')} 
                  className={`px-2 py-1 rounded text-sm ${roleFilter === 'Tank' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  Tanks
                </button>
                <button 
                  onClick={() => setRoleFilter('Healer')} 
                  className={`px-2 py-1 rounded text-sm ${roleFilter === 'Healer' ? 'bg-green-700 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  Healers
                </button>
                <button 
                  onClick={() => setRoleFilter('DPS')} 
                  className={`px-2 py-1 rounded text-sm ${roleFilter === 'DPS' ? 'bg-red-700 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  DPS
                </button>
              </div>
            </div>
            
            {raidComposition.length === 0 ? (
              <div className="text-center p-4 bg-gray-700 rounded text-gray-400">
                No hay jugadores en la raid. Añade algunos usando el selector de arriba.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredPlayers().map(player => (
                  <div 
                    key={player.id} 
                    className={`p-3 rounded-lg flex justify-between items-center ${
                      player.role === 'Tank' 
                        ? 'bg-blue-900 bg-opacity-30 border border-blue-700' 
                        : player.role === 'Healer'
                          ? 'bg-green-900 bg-opacity-30 border border-green-700'
                          : 'bg-red-900 bg-opacity-30 border border-red-700'
                    }`}
                  >
                    {editingPlayerId === player.id ? (
                      <div className="flex items-center flex-grow">
                        <span className="text-xl mr-2">{player.icon}</span>
                        <input 
                          type="text" 
                          value={editingPlayerName} 
                          onChange={(e) => setEditingPlayerName(e.target.value)}
                          onBlur={savePlayerName}
                          onKeyPress={(e) => e.key === 'Enter' && savePlayerName()}
                          className="bg-gray-800 text-white rounded px-2 py-1 w-full"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <div className="flex items-center" onDoubleClick={() => startEditingPlayer(player)}>
                        <span className="text-xl mr-2">{player.icon}</span>
                        <div>
                          <div className="flex items-center">
                            <span 
                              className="font-bold"
                              style={{ color: player.classColor }}
                            >
                              {player.name}
                            </span>
                          </div>
                          <div className="text-sm text-gray-300">{player.spec}</div>
                        </div>
                      </div>
                    )}
                    <button 
                      onClick={() => removePlayer(player.id)}
                      className="text-gray-400 hover:text-red-400 ml-2"
                    >
                      ✖️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Cooldowns disponibles */}
          <div className="p-4 bg-gray-800 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-white">Cooldowns Disponibles</h3>
              <div className="flex gap-2 flex-wrap">
                <button 
                  onClick={() => setCooldownTypeFilter('Todos')} 
                  className={`px-2 py-1 rounded text-sm ${cooldownTypeFilter === 'Todos' ? 'bg-indigo-700 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  Todos
                </button>
                <button 
                  onClick={() => setCooldownTypeFilter('Defensivos de Raid')} 
                  className={`px-2 py-1 rounded text-sm ${cooldownTypeFilter === 'Defensivos de Raid' ? 'bg-purple-700 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  Defensivos de Raid
                </button>
                <button 
                  onClick={() => setCooldownTypeFilter('Defensivos de Tank')} 
                  className={`px-2 py-1 rounded text-sm ${cooldownTypeFilter === 'Defensivos de Tank' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  Defensivos de Tank
                </button>
                <button 
                  onClick={() => setCooldownTypeFilter('Sanación de Raid')} 
                  className={`px-2 py-1 rounded text-sm ${cooldownTypeFilter === 'Sanación de Raid' ? 'bg-green-700 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  Sanación de Raid
                </button>
                <button 
                  onClick={() => setCooldownTypeFilter('Defensivos Personales')} 
                  className={`px-2 py-1 rounded text-sm ${cooldownTypeFilter === 'Defensivos Personales' ? 'bg-orange-700 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  Defensivos Personales
                </button>
                <button 
                  onClick={() => setCooldownTypeFilter('Externals')} 
                  className={`px-2 py-1 rounded text-sm ${cooldownTypeFilter === 'Externals' ? 'bg-yellow-700 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  Externals
                </button>
              </div>
            </div>
            
            {filteredCooldowns().length === 0 ? (
              <div className="text-center p-4 bg-gray-700 rounded text-gray-400">
                No hay cooldowns disponibles de este tipo. Añade jugadores a la raid.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                    <tr>
                      <th className="px-3 py-2 rounded-tl-lg">Habilidad</th>
                      <th className="px-3 py-2">Cooldown</th>
                      <th className="px-3 py-2">Tipo</th>
                      <th className="px-3 py-2">Jugador</th>
                      <th className="px-3 py-2 rounded-tr-lg">Efecto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCooldowns().map((cd, index) => (
                      <tr 
                        key={`${cd.playerId}-${cd.name}-${index}`} 
                        className={`${index % 2 === 0 ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-700 bg-opacity-30'} border-b border-gray-700`}
                      >
                        <td className="px-3 py-2 font-medium flex items-center">
                          <span className="mr-2">{cd.icon}</span>
                          <span>{cd.name}</span>
                        </td>
                        <td className="px-3 py-2">{cd.cooldown}</td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            cd.type === 'raid' 
                              ? 'bg-purple-900 bg-opacity-70 text-purple-200' 
                              : cd.type === 'tank'
                                ? 'bg-blue-900 bg-opacity-70 text-blue-200'
                                : cd.type === 'throughput' || cd.type === 'absorb' || cd.type === 'single'
                                  ? 'bg-green-900 bg-opacity-70 text-green-200'
                                  : cd.type === 'external'
                                    ? 'bg-yellow-900 bg-opacity-70 text-yellow-200'
                                    : 'bg-gray-800 text-gray-300'
                          }`}>
                            {cd.type === 'throughput' || cd.type === 'absorb' || cd.type === 'single' 
                              ? 'Sanación' 
                              : cd.type.charAt(0).toUpperCase() + cd.type.slice(1)}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span style={{ color: cd.classColor }}>{cd.player}</span>
                        </td>
                        <td className="px-3 py-2">{cd.effect}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Planificación de cooldowns para Gallywix */}
          {raidComposition.length > 0 && (
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-white">Planificación de Cooldowns para Gallywix</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <MechanicsPanel phase="phase1" title="Fase 1: Bomba Colosal" />
                  <MechanicsPanel phase="phase2" title="Fase 2: Bobinas Giga" />
                </div>
                <div>
                  <MechanicsPanel phase="transition" title="Transición: TOTAL DESTRUCTION!!!" />
                  <MechanicsPanel phase="phase3" title="Fase 3: Destrucción Total" />
                </div>
              </div>
              
              {/* Resumen de asignaciones */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2 text-white">Resumen de Asignaciones</h4>
                
                {Object.keys(cooldownPlan).length === 0 ? (
                  <div className="text-center p-4 bg-gray-700 rounded text-gray-400">
                    No hay cooldowns asignados. Utiliza los botones "Asignar CD" para planificar la estrategia.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-gray-300">
                      <thead className="text-xs uppercase bg-gray-700">
                        <tr>
                          <th className="px-3 py-2 text-left">Tiempo</th>
                          <th className="px-3 py-2 text-left">Mecánica</th>
                          <th className="px-3 py-2 text-left">Cooldown</th>
                          <th className="px-3 py-2 text-left">Jugador</th>
                          <th className="px-3 py-2 text-left">Efecto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(cooldownPlan)
                          .sort((a, b) => {
                            // Primero ordenar por fase
                            const phaseOrderA = getPhaseOrder(a[1].mechanicTime);
                            const phaseOrderB = getPhaseOrder(b[1].mechanicTime);
                            
                            if (phaseOrderA !== phaseOrderB) {
                              return phaseOrderA - phaseOrderB;
                            }
                            
                            // Luego por tiempo dentro de la fase
                            const timeA = a[1].mechanicTime;
                            const timeB = b[1].mechanicTime;
                            
                            if (timeA === timeB) {
                              return a[1].mechanicName.localeCompare(b[1].mechanicName);
                            }
                            
                            // Manejo especial para "Transición"
                            if (timeA.includes('Transición')) return 1;
                            if (timeB.includes('Transición')) return -1;
                            
                            // Convertir tiempos a segundos para compararlos
                            return convertTimeToSeconds(timeA) - convertTimeToSeconds(timeB);
                          })
                          .map(([key, cd], index) => (
                            <tr 
                              key={key} 
                              className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'} border-b border-gray-700`}
                            >
                              <td className="px-3 py-2">{cd.mechanicTime}</td>
                              <td className="px-3 py-2">{cd.mechanicName}</td>
                              <td className="px-3 py-2">
                                <div className="flex items-center">
                                  <span className="mr-2">{cd.icon}</span>
                                  <span style={{ color: cd.classColor }}>{cd.name}</span>
                                </div>
                              </td>
                              <td className="px-3 py-2">{cd.player}</td>
                              <td className="px-3 py-2">{cd.effect}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              
              {/* Timeline visual */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2 text-white">Timeline Visual</h4>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <div className="relative h-16 bg-gray-800 rounded">
                    {/* Fase 1 (0:00-2:00) */}
                    <div className="absolute top-0 left-0 h-full w-1/3 border-r border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-gray-400">Fase 1</span>
                    </div>
                    
                    {/* Fase 2 (2:00-3:00) */}
                    <div className="absolute top-0 left-1/3 h-full w-1/6 border-r border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-gray-400">Fase 2</span>
                    </div>
                    
                    {/* Transición (3:00-3:30) */}
                    <div className="absolute top-0 left-1/2 h-full w-1/12 border-r border-gray-600 bg-purple-900 bg-opacity-20 flex items-center justify-center">
                      <span className="text-xs text-gray-400">Trans</span>
                    </div>
                    
                    {/* Fase 3 (3:30+) */}
                    <div className="absolute top-0 left-7/12 h-full right-0 flex items-center justify-center">
                      <span className="text-xs text-gray-400">Fase 3</span>
                    </div>
                    
                    {/* Marcadores de cooldowns */}
                    {Object.entries(cooldownPlan).map(([key, cd]) => {
                      // Calcular posición basada en el tiempo
                      const position = getTimelinePosition(cd.mechanicTime);
                      
                      return (
                        <div 
                          key={key}
                          className="absolute top-0 w-1 h-full bg-indigo-500"
                          style={{ left: `${position}%` }}
                          title={`${cd.mechanicTime} - ${cd.mechanicName} - ${cd.name} (${cd.player})`}
                        >
                          <div className="absolute -top-6 -left-3">
                            <span className="inline-block w-6 h-6 rounded-full bg-gray-700 border-2 border-indigo-500 text-xs flex items-center justify-center">{cd.icon}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
};

// Funciones auxiliares
function convertTimeToSeconds(timeStr) {
  if (timeStr.includes('Transición')) return 180; // 3:00
  
  const parts = timeStr.split(':');
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }
  return 0;
}

function getPhaseOrder(timeStr) {
  if (timeStr.includes('Transición')) return 3;
  if (timeStr.startsWith('3:')) return 4;
  if (timeStr.startsWith('2:')) return 2;
  return 1;
}

function getTimelinePosition(timeStr) {
  if (timeStr.includes('Transición')) return 50; // Mitad
  
  const seconds = convertTimeToSeconds(timeStr);
  // Suponer que la pelea dura 6 minutos (360 segundos)
  return (seconds / 360) * 100;
}

// Exportar el componente
export default RaidCooldownPlanner;
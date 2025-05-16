// phaseData.js
// Datos de la fase 1 del encuentro

export const phase1Data = {
  id: 'phase1',
  name: 'Fase 1: Bomba Colosal',
  description: 'En la primera fase, Gallywix permanece en el centro de la arena y no se mueve. La mecánica principal es Scatterblast Canisters, un cono frontal dirigido al tanque que debe ser absorbido por grupos.',
  keyMechanics: [
    {
      name: 'Scatterblast Canisters',
      description: 'Cono frontal de daño alto que aplica absorción de sanación',
      icon: '🔴',
      role: 'Tank/Raid',
      time: '0:10, 0:40, 1:10, 1:40',
      tip: 'Divide la raid en 2 grupos, cada uno absorbe de forma alternada'
    },
    {
      name: 'Mechengineer\'s Canisters',
      description: 'Escudo de absorción que debe ser sanado o explota',
      icon: '🛡️',
      role: 'Healer',
      time: 'Después de Scatterblast',
      tip: 'Prioridad máxima de sanación - cooldowns fuertes aquí'
    },
    {
      name: 'Big Bad Buncha Bombs',
      description: 'Bombas grandes que explotan y esparcen bombas más pequeñas',
      icon: '💣',
      role: 'Todos',
      time: '0:15, 1:15',
      tip: 'Mover toda la raid para evitar la explosión principal'
    },
    {
      name: 'Bad Belated Boom',
      description: 'Bombas pequeñas con detonación retardada que aplican DoT',
      icon: '💥',
      role: 'Todos',
      time: 'Después de Big Bad Buncha Bombs',
      tip: 'Estar atento a las bombas pequeñas y evitarlas'
    },
    {
      name: 'Sapper\'s Satchel',
      description: 'Jugadores marcados con bombas que explotan después de 5s',
      icon: '🎒',
      role: 'Marcados',
      time: '0:25, 1:30',
      tip: 'Aléjate del grupo si estás marcado'
    },
    {
      name: 'Trick Shots',
      description: 'Daño acumulativo en el tanque, stack cada 4s',
      icon: '🎯',
      role: 'Tank',
      time: 'Constante',
      tip: 'Intercambio de tanques antes de 10 stacks'
    },
    {
      name: 'Venting Heat',
      description: 'Daño a toda la raid durante 4s',
      icon: '🔥',
      role: 'Todos',
      time: '0:55',
      tip: 'Usar defensivas personales y cooldowns'
    }
  ],
  timeline: [
    { time: '0:00', event: 'Pull - Comienza Fase 1', type: 'neutral' },
    { time: '0:05-0:10', event: 'Primer Scatterblast Canisters (Grupo 1)', type: 'danger' },
    { time: '0:15', event: 'Big Bad Buncha Bombs', type: 'danger' },
    { time: '0:25', event: 'Bad Belated Boom + Sapper\'s Satchel', type: 'warning' },
    { time: '0:35-0:40', event: 'Scatterblast Canisters (Grupo 2)', type: 'danger' },
    { time: '0:45', event: 'Suppression (Swirls)', type: 'warning' },
    { time: '0:55', event: 'Venting Heat (daño a toda la raid)', type: 'danger' },
    { time: '1:05-1:10', event: 'Scatterblast Canisters (Grupo 1)', type: 'danger' },
    { time: '1:15', event: 'Big Bad Buncha Bombs', type: 'danger' },
    { time: '1:30', event: 'Sapper\'s Satchel', type: 'warning' },
    { time: '1:35-1:40', event: 'Scatterblast Canisters (Grupo 2)', type: 'danger' },
    { time: '1:50', event: 'Suppression (Swirls)', type: 'warning' },
    { time: '2:00', event: 'Gallywix alcanza 100 de energía - Comienza Intermedio', type: 'neutral' }
  ],
  strategy: [
    {
      header: 'Posicionamiento',
      content: 'Divida al raid en 2 grupos equilibrados situados a los lados del boss. Gallywix permanece en el centro y no se mueve. Los tanques deben mantenerse cerca para reducir el daño de Gatling Cannon.',
      image: 'phase1_position.jpg'
    },
    {
      header: 'Gestión de Grupos',
      content: 'Cada mitad del raid (grupos 1-2 vs 3-5) debe absorber un cono por turno. Después de ser golpeados, tienen un debuff de 30s que aumenta el daño recibido de esta habilidad.',
      image: 'phase1_groups.jpg'
    },
    {
      header: 'Rotación de Healers',
      content: 'Asigna cooldowns específicos para cada absorción de Scatterblast. P.ej.: 1º - Tranquilidad, 2º - Espíritu Ancestral, 3º - Himno de Esperanza, 4º - Revival.',
      image: null
    },
    {
      header: 'Áreas a Evitar',
      content: 'Asegúrate de moverte como grupo después de cada Big Bad Buncha Bombs. Alerta a los jugadores con Sapper\'s Satchel para que se alejen inmediatamente.',
      image: 'phase1_bombs.jpg'
    }
  ]
};
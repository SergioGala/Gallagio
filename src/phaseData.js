// phaseData.js - Datos actualizados y precisos
// Datos de la fase 1 del encuentro

export const phase1Data = {
  id: 'phase1',
  name: 'Fase 1: Bomba Colosal',
  description: 'Gallywix permanece en el centro mientras bombardea la raid con mecánicas de daño y absorción. Dura desde el pull hasta que alcanza el 75% de vida.',
  difficulty: 'Media',
  keyMechanics: [
    {
      name: 'Scatterblast Canisters',
      description: 'Cono frontal de daño alto que aplica absorción de sanación. Se lanza 6 veces durante la fase en intervalos regulares.',
      icon: '🔴',
      role: 'Tank/Raid',
      time: '0:10, 0:38, 1:06, 1:34, 2:02, 2:30',
      cooldown: '28s',
      priority: 'Alta',
      tip: 'Divide la raid en 2 grupos, cada uno absorbe de forma alternada para gestionar el debuff',
      tips: [
        "Debuff 'Scattered Canister' dura 30s y aumenta el daño recibido de esta habilidad en un 200%",
        "Los grupos deben ser equilibrados en términos de roles para gestionar correctamente las absorciones",
        "Tanques deben posicionar al jefe de manera que el cono solo afecte a un grupo cada vez",
        "Cooldowns defensivos deben ser usados cuando el debuff ha sido acumulado 2 veces"
      ],
      counters: [
        "Sacrifice de Paladines",
        "Spirit Link Totem de Chamanes",
        "Barrera de Sacerdotes Disciplina",
        "Divine Hymn de Sacerdotes Sagrados"
      ],
      weakauras: "https://wago.io/scatter-canisters-tracker",
      video: "https://www.youtube.com/watch?v=gallywix-guide"
    },
    {
      name: 'Mechengineer\'s Canisters',
      description: 'Escudo de absorción que debe ser sanado o explota. Se aplica a los jugadores afectados por Scatterblast Canisters.',
      icon: '🛡️',
      role: 'Healer',
      time: 'Después de cada Scatterblast',
      priority: 'Alta',
      tip: 'Prioridad máxima de sanación - cooldowns fuertes aquí',
      tips: [
        "Cada Canister absorbe 85,000 de sanación en Heroico",
        "Si no se dispela a través de sanación en 10s, explota y causa daño letal a toda la raid",
        "Healers deben comunicar sus cooldowns para cubrir todas las absorciones",
        "Asignar sanadores específicos a grupos específicos para eficiencia"
      ],
      counters: [
        "Tranquilidad de Druidas",
        "Healing Tide Totem de Chamanes",
        "Avenging Wrath de Paladines Sagrados",
        "Revival de Monjes Tejedores de Niebla"
      ],
      weakauras: "https://wago.io/canister-absorb-tracker"
    },
    {
      name: 'Big Bad Buncha Bombs',
      description: 'Bombas grandes que explotan y esparcen bombas más pequeñas. Causa daño en área grande y coloca bombas secundarias.',
      icon: '💣',
      role: 'Todos',
      time: '0:15, 1:15, 2:15',
      cooldown: '60s',
      priority: 'Media',
      tip: 'Mover toda la raid para evitar la explosión principal',
      tips: [
        "El daño inicial causa 35,000 de daño en área y knockback",
        "Extiende 8-10 bombas pequeñas en un radio de 40 yardas",
        "Las bombas secundarias explotan tras 5s causando 25,000 de daño",
        "Usa habilidades de movimiento grupal como Stampeding Roar para reposicionar rápidamente"
      ],
      counters: [
        "Vientos Impetuosos de Chamanes",
        "Rugido de Estampida de Druidas",
        "Advance/Retreat de Monjes",
        "Blink/Portal de Magos"
      ],
      weakauras: "https://wago.io/buncha-bombs-tracker",
      isNew: true
    },
    {
      name: 'Bad Belated Boom',
      description: 'Bombas pequeñas con detonación retardada que aplican DoT. Afecta a jugadores que son alcanzados por las bombas pequeñas.',
      icon: '💥',
      role: 'Todos',
      time: 'Después de Big Bad Buncha Bombs',
      priority: 'Media',
      tip: 'Estar atento a las bombas pequeñas y evitarlas',
      tips: [
        "El DoT causa 5,000 daño cada 2s durante 20s",
        "Se acumula hasta 3 veces",
        "3 acumulaciones son letales incluso para tanques",
        "Dispeleable por Druidas, Paladines, Chamanes y Sacerdotes"
      ],
      counters: [
        "Mass Dispel de Sacerdotes",
        "Cleanse de Paladines",
        "Purify de Monjes",
        "Remove Corruption de Druidas"
      ],
      weakauras: "https://wago.io/belated-boom-tracker"
    },
    {
      name: 'Sapper\'s Satchel',
      description: 'Jugadores marcados con bombas que explotan después de 5s. Afecta a 3 jugadores aleatorios cada vez.',
      icon: '🎒',
      role: 'Marcados',
      time: '0:25, 0:55, 1:25, 1:55, 2:25',
      cooldown: '30s',
      priority: 'Alta',
      tip: 'Aléjate del grupo si estás marcado',
      tips: [
        "La explosión causa 75,000 daño al jugador marcado y 40,000 a los aliados en 8 yardas",
        "Se marca con un círculo rojo parpadeante",
        "Usar inmunidades como Escudo Divino o Bloque de Hielo",
        "Coordinar posiciones de seguridad en los bordes de la sala"
      ],
      counters: [
        "Escudo Divino de Paladines",
        "Bloque de Hielo de Magos",
        "Manto de Ocultación de Sacerdotes",
        "Turtle Shell de Cazadores"
      ],
      weakauras: "https://wago.io/sapper-satchel-tracker"
    },
    {
      name: 'Trick Shots',
      description: 'Daño acumulativo en el tanque, stack cada 4s. Aumenta el daño recibido por el tanque.',
      icon: '🎯',
      role: 'Tank',
      time: 'Constante',
      cooldown: '4s',
      priority: 'Media',
      tip: 'Intercambio de tanques antes de 10 stacks',
      tips: [
        "Cada stack aumenta el daño recibido en un 5%",
        "Los stacks se reinician al hacer taunt-swap",
        "Usar cooldowns defensivos a partir de 6-7 stacks",
        "Plan de rotación de cooldowns entre los tanques"
      ],
      counters: [
        "Guardian of Ancient Kings de Paladines",
        "Shield Wall de Guerreros",
        "Survival Instincts de Druidas",
        "Demon Spikes de Cazadores de Demonios"
      ]
    },
    {
      name: 'Venting Heat',
      description: 'Daño a toda la raid durante 4s. Gallywix canaliza causando daño constante a todos los jugadores.',
      icon: '🔥',
      role: 'Todos',
      time: '0:55, 1:55',
      cooldown: '60s',
      priority: 'Alta',
      tip: 'Usar defensivas personales y cooldowns',
      tips: [
        "Causa 8,000 daño por segundo durante 5 segundos a toda la raid",
        "Daño total por jugador: 40,000",
        "No se puede interrumpir ni evitar",
        "Coordinación de cooldowns de raid y personales"
      ],
      counters: [
        "Darkness de Cazadores de Demonios",
        "Anti-Magic Zone de Caballeros de la Muerte",
        "Barrier de Sacerdotes",
        "Healing Tide Totem de Chamanes"
      ],
      weakauras: "https://wago.io/venting-heat-timer"
    }
  ],
  timeline: [
    { 
      time: '0:00', 
      event: 'Pull - Comienza Fase 1', 
      type: 'neutral',
      details: 'Gallywix comienza con 100% de vida y se mantiene estático en el centro de la sala.'
    },
    { 
      time: '0:10', 
      event: 'Primer Scatterblast Canisters (Grupo 1)', 
      type: 'danger',
      roles: ['Tanques', 'Healers', 'DPS del Grupo 1'],
      details: 'Cono frontal de 35 yardas. Afecta solo al primer grupo. Los healers deben estar preparados para sanar las absorciones inmediatamente.'
    },
    { 
      time: '0:15', 
      event: 'Big Bad Buncha Bombs', 
      type: 'danger',
      roles: ['Todos'],
      details: 'Toda la raid debe moverse hacia la posición acordada (normalmente a las 3 en punto según el reloj) para evitar la explosión principal y las bombas secundarias.'
    },
    { 
      time: '0:25', 
      event: 'Bad Belated Boom + Sapper\'s Satchel', 
      type: 'warning',
      roles: ['Marcados', 'Healers'],
      details: 'Las bombas secundarias explotan. Los jugadores marcados con Sapper\'s Satchel deben alejarse a las posiciones designadas para evitar dañar a la raid.'
    },
    { 
      time: '0:38', 
      event: 'Scatterblast Canisters (Grupo 2)', 
      type: 'danger',
      roles: ['Tanques', 'Healers', 'DPS del Grupo 2']
    },
    { 
      time: '0:45', 
      event: 'Suppression (Swirls)', 
      type: 'warning',
      roles: ['Todos'],
      details: 'Zonas en el suelo que deben ser evitadas. Causan 15,000 daño y aplican un debuff de -25% velocidad de movimiento.'
    },
    { 
      time: '0:55', 
      event: 'Sapper\'s Satchel', 
      type: 'warning',
      roles: ['Marcados', 'Healers'],
      details: 'Tres jugadores aleatorios reciben la marca. El equipo debe estar preparado con dispels y sanación.'
    },
    { 
      time: '0:55', 
      event: 'Venting Heat (daño a toda la raid)', 
      type: 'danger',
      roles: ['Todos'],
      details: 'Todos los jugadores reciben 8,000 daño por segundo durante 5 segundos. Usar cooldowns defensivos raid-wide.',
      tip: 'Asignar Barrier, Spirit Link o AMZ para este momento específico.'
    },
    { 
      time: '1:06', 
      event: 'Scatterblast Canisters (Grupo 1)', 
      type: 'danger',
      roles: ['Tanques', 'Healers', 'DPS del Grupo 1']
    },
    { 
      time: '1:15', 
      event: 'Big Bad Buncha Bombs', 
      type: 'danger',
      roles: ['Todos'],
      details: 'Segunda ronda de bombas. Mover ahora a las 9 en punto según el reloj.'
    },
    { 
      time: '1:25', 
      event: 'Sapper\'s Satchel', 
      type: 'warning',
      roles: ['Marcados', 'Healers']
    },
    { 
      time: '1:34', 
      event: 'Scatterblast Canisters (Grupo 2)', 
      type: 'danger',
      roles: ['Tanques', 'Healers', 'DPS del Grupo 2']
    },
    { 
      time: '1:50', 
      event: 'Suppression (Swirls)', 
      type: 'warning',
      roles: ['Todos']
    },
    { 
      time: '1:55', 
      event: 'Sapper\'s Satchel', 
      type: 'warning',
      roles: ['Marcados', 'Healers']
    },
    { 
      time: '1:55', 
      event: 'Venting Heat (daño a toda la raid)', 
      type: 'danger',
      roles: ['Todos']
    },
    { 
      time: '2:02', 
      event: 'Scatterblast Canisters (Grupo 1)', 
      type: 'danger',
      roles: ['Tanques', 'Healers', 'DPS del Grupo 1']
    },
    { 
      time: '2:15', 
      event: 'Big Bad Buncha Bombs', 
      type: 'danger',
      roles: ['Todos'],
      details: 'Tercera ronda de bombas. Mover ahora a las 6 en punto según el reloj.'
    },
    { 
      time: '2:25', 
      event: 'Sapper\'s Satchel', 
      type: 'warning',
      roles: ['Marcados', 'Healers']
    },
    { 
      time: '2:30', 
      event: 'Scatterblast Canisters (Grupo 2)', 
      type: 'danger',
      roles: ['Tanques', 'Healers', 'DPS del Grupo 2']
    },
    { 
      time: '2:45', 
      event: 'Suppression (Swirls)', 
      type: 'warning',
      roles: ['Todos']
    },
    { 
      time: '~2:50-3:00', 
      event: 'Gallywix alcanza 75% - Comienza Intermedio', 
      type: 'important',
      roles: ['Todos'],
      details: 'Transición a la fase de intermedio. Gallywix se vuelve inactivo momentáneamente y comienza la activación de las Giga Coils.',
      tip: 'Preparar a los transportadores de bombas y asignar interrupciones para los adds que aparecerán.'
    }
  ],
  strategy: [
    {
      header: 'Posicionamiento',
      content: 'Divide al raid en 2 grupos equilibrados situados a los lados del boss. Gallywix permanece en el centro y no se mueve. Los tanques deben mantenerse cerca para reducir el daño de Trick Shots y facilitar el intercambio.',
      image: 'phase1_position',
      tags: ['Todos', 'Importante'],
      tip: 'Marca el suelo con World Markers para facilitar la orientación de los grupos. Usa símbolos para cada grupo (Triángulo/Diamante para Grupo 1, Estrella/Luna para Grupo 2).'
    },
    {
      header: 'Gestión de Grupos',
      content: 'Cada mitad del raid (grupos 1-2 vs 3-5) debe absorber un cono Scatterblast por turno. Después de ser golpeados, tienen un debuff de 30s que aumenta el daño recibido de esta habilidad. Es necesario alternar grupos para cada absorción.',
      image: 'phase1_groups',
      tags: ['Raid Leader', 'Importante'],
      tip: 'Asegúrate de que cada grupo tenga una distribución equilibrada de roles, especialmente healers. Un grupo débil en sanación tendrá problemas con las absorciones.'
    },
    {
      header: 'Rotación de Healers',
      content: 'Asigna cooldowns específicos para cada absorción de Scatterblast. Ejemplo: 1º Tranquilidad, 2º Espíritu Ancestral, 3º Himno de Esperanza, 4º Revival, 5º Barrier, 6º Divine Hymn. Los healers deben comunicar cuando sus cooldowns están listos.',
      tags: ['Healers', 'Crítico'],
      tip: 'Los cooldowns menores deben guardarse para el daño de raid de Venting Heat y las explosiones ocasionales de Sapper\'s Satchel.'
    },
    {
      header: 'Gestión de Bombas',
      content: 'Asegúrate de que toda la raid se mueva coordinadamente después de cada Big Bad Buncha Bombs. Rota posiciones en sentido horario alrededor de la sala (3 en punto → 9 en punto → 6 en punto). Los jugadores con Sapper\'s Satchel deben moverse a posiciones predefinidas en los bordes.',
      image: 'phase1_bombs',
      tags: ['DPS', 'Movimiento'],
      tip: 'Clases con inmunidades deben guardarlas para Sapper\'s Satchel. Las clases sin inmunidades deben utilizar speedboosts para alejarse rápidamente.'
    },
    {
      header: 'Intercambio de Tanques',
      content: 'Los tanques deben intercambiarse a los 8-10 stacks de Trick Shots. El tanque activo debe posicionar al boss para que el cono Scatterblast apunte hacia el grupo correcto. El intercambio debe ocurrir idealmente justo después de un Scatterblast, pero antes de que el siguiente se acerque.',
      tags: ['Tanques', 'Supervivencia'],
      tip: 'Comunicación clara es crucial. El tanque pasivo debe estar listo para tauntear en cualquier momento si el activo alcanza stacks peligrosos (12+).'
    },
    {
      header: 'Cooldowns para Venting Heat',
      content: 'Venting Heat ocurre a los 0:55 y 1:55. Asigna cooldowns defensivos raid-wide específicamente para estos momentos: Spirit Link/AMZ para el primero, Barrier/Darkness para el segundo. Si estos cooldowns se utilizan fuera de sus ventanas asignadas, avisa al raid leader inmediatamente.',
      tags: ['Healers', 'Defensivas'],
      tip: 'Las clases sin cooldowns raid-wide deben usar sus defensivas personales durante estas fases para aliviar la presión de sanación.'
    }
  ],
  preparation: [
    "Flask de stats principales activa en todo momento",
    "Runas de potenciación para maximizar DPS",
    "Pociones de sanación y defensivas para emergencias",
    "Weak Auras para tracking de Sapper's Satchel y Bad Belated Boom",
    "Macros para anunciar intercambio de tanques",
    "Asignación clara de cooldowns defensivos para Venting Heat",
    "Piedras de salud de Brujos distribuidas",
    "Comida de buff secundaria (velocidad para ranged, crítico para melee)"
  ],
  cooldowns: [
    "0:10 - Scatterblast #1: Tranquilidad de Druida",
    "0:38 - Scatterblast #2: Healing Tide Totem de Chamán",
    "0:55 - Venting Heat #1: Anti-Magic Zone + Spirit Link",
    "1:06 - Scatterblast #3: Divine Hymn de Sacerdote",
    "1:34 - Scatterblast #4: Revival de Monje",
    "1:55 - Venting Heat #2: Barrier + Darkness",
    "2:02 - Scatterblast #5: Avenging Wrath + Holy Avenger",
    "2:30 - Scatterblast #6: Tranquilidad (segundo uso)"
  ],
  video: {
    title: "Guía Visual de Fase 1 - Chrome King Gallywix",
    description: "Demostración detallada de posiciones, rotaciones y gestión de mecánicas en la primera fase del encuentro.",
    url: "https://www.youtube.com/watch?v=example-gallywix-guide"
  }
};
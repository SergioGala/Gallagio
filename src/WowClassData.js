export const WOW_CLASSES = [
  {
    name: "Guerrero",
    color: "#C79C6E",
    specs: [
      {
        name: "Protección",
        role: "Tank",
        icon: "🛡️",
        defensives: [
          { name: "Último Bastión", cooldown: "3m", type: "personal", icon: "🛡️", effect: "30% DR" },
          { name: "Muro de Escudo", cooldown: "3m", type: "personal", icon: "🧱", effect: "40% DR" },
          { name: "Grito Intimidador", cooldown: "2m", type: "raid", icon: "📢", reduction: "20% DR" },
          { name: "Estandarte Imponente", cooldown: "3m", type: "raid", icon: "🏳️", effect: "10% Versatilidad" }
        ],
        healing: []
      },
      {
        name: "Armas",
        role: "DPS",
        icon: "⚔️",
        defensives: [
          { name: "Grito de Guerra", cooldown: "3m", type: "raid", icon: "📣", buff: "10% HP" },
          { name: "Die by the Sword", cooldown: "3m", type: "personal", icon: "🗡️", effect: "30% DR" },
          { name: "Estandarte Imponente", cooldown: "3m", type: "raid", icon: "🏳️", effect: "10% Versatilidad" }
        ],
        healing: []
      },
      {
        name: "Furia",
        role: "DPS",
        icon: "🔥",
        defensives: [
          { name: "Grito de Guerra", cooldown: "3m", type: "raid", icon: "📣", buff: "10% HP" },
          { name: "Desafío Endurecedor", cooldown: "3m", type: "personal", icon: "💪", effect: "30% DR" },
          { name: "Estandarte Imponente", cooldown: "3m", type: "raid", icon: "🏳️", effect: "10% Versatilidad" }
        ],
        healing: []
      }
    ]
  },
  {
    name: "Paladín",
    color: "#F58CBA",
    specs: [
      {
        name: "Sagrado",
        role: "Healer",
        icon: "✨",
        defensives: [
          { name: "Sacrificio Divino", cooldown: "5m", type: "personal", icon: "🔄", effect: "Redirige 30% daño" },
          { name: "Escudo Divino", cooldown: "5m", type: "personal", icon: "🛡️", effect: "Inmunidad 8s" },
          { name: "Protección Divina", cooldown: "3m", type: "personal", icon: "👼", effect: "15% DR" },
          { name: "Bendición de Protección", cooldown: "5m", type: "external", icon: "✋", effect: "Inmunidad física" },
          { name: "Bendición de Sacrificio", cooldown: "2m", type: "external", icon: "🩸", effect: "30% daño transferido" }
        ],
        healing: [
          { name: "Ira Vengadora", cooldown: "2m", type: "throughput", icon: "✨", effect: "30% aumento sanación" },
          { name: "Aura de Maestría", cooldown: "3m", type: "raid", icon: "🔆", reduction: "20% DR" },
          { name: "Tótem de Barreras", cooldown: "5m", type: "raid", icon: "🏛️", effect: "Absorción + 15% DR" }
        ]
      },
      {
        name: "Protección",
        role: "Tank",
        icon: "🛡️",
        defensives: [
          { name: "Guardián de Reyes Antiguos", cooldown: "5m", type: "personal", icon: "👑", effect: "50% DR" },
          { name: "Escudo Divino", cooldown: "5m", type: "personal", icon: "🛡️", effect: "Inmunidad 8s" },
          { name: "Ardid del Cruzado", cooldown: "2m", type: "personal", icon: "⚔️", effect: "20% DR" },
          { name: "Palabra de Gloria", cooldown: "1m", type: "personal", icon: "🔆", effect: "Sanación" },
          { name: "Aura de Maestría", cooldown: "3m", type: "raid", icon: "🔆", reduction: "20% DR" },
          { name: "Bendición de Protección", cooldown: "5m", type: "external", icon: "✋", effect: "Inmunidad física" }
        ],
        healing: []
      },
      {
        name: "Reprensión",
        role: "DPS",
        icon: "🔨",
        defensives: [
          { name: "Escudo Divino", cooldown: "5m", type: "personal", icon: "🛡️", effect: "Inmunidad 8s" },
          { name: "Escudo del Vengador", cooldown: "2m", type: "personal", icon: "🛡️", effect: "20% DR" },
          { name: "Tormenta Final", cooldown: "5m", type: "personal", icon: "⚡", effect: "20% Leech" },
          { name: "Aura de Maestría", cooldown: "3m", type: "raid", icon: "🔆", reduction: "20% DR" },
          { name: "Bendición de Protección", cooldown: "5m", type: "external", icon: "✋", effect: "Inmunidad física" }
        ],
        healing: []
      }
    ]
  },
  {
    name: "Sacerdote",
    color: "#FFFFFF",
    specs: [
      {
        name: "Disciplina",
        role: "Healer",
        icon: "🔮",
        defensives: [
          { name: "Barrera de Poder", cooldown: "3m", type: "raid", icon: "🔵", reduction: "25% DR" },
          { name: "Supresión de Dolor", cooldown: "1.5m", type: "tank", icon: "💦", effect: "40% DR" },
          { name: "Desesperación", cooldown: "2m", type: "personal", icon: "🌪️", effect: "75% DR" },
          { name: "Palabra de Protección: Barrera", cooldown: "30s", type: "personal", icon: "🛡️", effect: "Absorción" }
        ],
        healing: [
          { name: "Expiación", cooldown: "2m", type: "throughput", icon: "✨", effect: "40% aumento de sanación" },
          { name: "Spirit Shell", cooldown: "1.5m", type: "absorb", icon: "🛡️", effect: "Absorción acumulativa" },
          { name: "Penitencia Definitiva", cooldown: "4m", type: "raid", icon: "🌟", effect: "Sanación masiva" },
          { name: "Cúpula Luminosa", cooldown: "3m", type: "raid", icon: "🏮", effect: "30% sanación aumentada" }
        ]
      },
      {
        name: "Sagrado",
        role: "Healer",
        icon: "✨",
        defensives: [
          { name: "Guardián del Espíritu", cooldown: "4m", type: "tank", icon: "👼", effect: "Previene muerte" },
          { name: "Desesperación", cooldown: "2m", type: "personal", icon: "🌪️", effect: "75% DR" },
          { name: "Renovación Sagrada", cooldown: "2m", type: "personal", icon: "🔄", effect: "60% sanación recibida" }
        ],
        healing: [
          { name: "Himno Divino", cooldown: "3m", type: "raid", icon: "🎵", effect: "Sanación masiva AoE" },
          { name: "Serenidad", cooldown: "1m", type: "single", icon: "🕊️", effect: "Sanación crítica" },
          { name: "Símbolo de Esperanza", cooldown: "5m", type: "raid", icon: "⭐", effect: "Reset de CDs" },
          { name: "Círculo de Sanación", cooldown: "30s", type: "raid", icon: "⭕", effect: "Sanación en área" },
          { name: "Sanación Divina", cooldown: "1.5m", type: "single", icon: "💫", effect: "Sanación fuerte" }
        ]
      },
      {
        name: "Sombras",
        role: "DPS",
        icon: "🌑",
        defensives: [
          { name: "Dispersión", cooldown: "2m", type: "personal", icon: "💨", effect: "75% DR, inmovil" },
          { name: "Protección contra Sombras", cooldown: "2m", type: "raid", icon: "🌈", effect: "15% DR" },
          { name: "Forma de Vacío", cooldown: "1.5m", type: "personal", icon: "👁️", effect: "10% DR" }
        ],
        healing: [
          { name: "Vacío Compartido", cooldown: "3m", type: "raid", icon: "🕳️", effect: "15% Leech" }
        ]
      }
    ]
  },
  {
    name: "Druida",
    color: "#FF7D0A",
    specs: [
      {
        name: "Equilibrio",
        role: "DPS",
        icon: "🌙",
        defensives: [
          { name: "Forma de Viaje Astral", cooldown: "3m", type: "personal", icon: "✨", effect: "40% DR, inmune CC" },
          { name: "Rugido de Estampida", cooldown: "1m", type: "raid", icon: "🐾", buff: "60% Speed 8s" },
          { name: "Renacimiento", cooldown: "10m", type: "raid", icon: "💫", effect: "Resurrect in combat" },
          { name: "Piel de Corteza", cooldown: "1m", type: "personal", icon: "🌳", effect: "20% DR" },
          { name: "Regeneración Frondosa", cooldown: "1.5m", type: "personal", icon: "🌿", effect: "30% heal over time" }
        ],
        healing: [
          { name: "Naturaleza Enlazada", cooldown: "2m", type: "raid", icon: "🍃", effect: "Heal over time group" }
        ]
      },
      {
        name: "Feral",
        role: "DPS",
        icon: "🐱",
        defensives: [
          { name: "Instintos de Supervivencia", cooldown: "3m", type: "personal", icon: "🛡️", effect: "50% DR" },
          { name: "Rugido de Estampida", cooldown: "1m", type: "raid", icon: "🐾", buff: "60% Speed 8s" },
          { name: "Ferocidad del Tigre", cooldown: "3m", type: "personal", icon: "🐯", effect: "Frenzy" },
          { name: "Reflejos Felinos", cooldown: "30s", type: "personal", icon: "💫", effect: "100% dodge" },
          { name: "Forma Gatuna Avanzada", cooldown: "3m", type: "personal", icon: "🐆", effect: "15% speed passive" }
        ],
        healing: [
          { name: "Crecimiento Salvaje", cooldown: "1.5m", type: "personal", icon: "🌱", effect: "Heal over time" }
        ]
      },
      {
        name: "Guardián",
        role: "Tank",
        icon: "🐻",
        defensives: [
          { name: "Instintos de Supervivencia", cooldown: "3m", type: "personal", icon: "🛡️", effect: "50% DR" },
          { name: "Rugido de Estampida", cooldown: "1m", type: "raid", icon: "🐾", buff: "60% Speed 8s" },
          { name: "Regeneración Frenética", cooldown: "3m", type: "personal", icon: "🌀", effect: "100% heal rate" },
          { name: "Pelaje Grueso", cooldown: "1.5m", type: "personal", icon: "🧥", effect: "25% DR + 8% max HP" },
          { name: "Bramido Incapacitador", cooldown: "1m", type: "raid", icon: "📢", effect: "Incapacitate 3s" }
        ],
        healing: [
          { name: "Forma de Ursoc", cooldown: "3m", type: "personal", icon: "🧸", effect: "15% HP increase" }
        ]
      },
      {
        name: "Restauración",
        role: "Healer",
        icon: "🌿",
        defensives: [
          { name: "Rugido de Estampida", cooldown: "1m", type: "raid", icon: "🐾", buff: "60% Speed 8s" },
          { name: "Piel de Corteza", cooldown: "90s", type: "personal", icon: "🌳", effect: "20% DR" }
        ],
        healing: [
          { name: "Tranquilidad", cooldown: "3m", type: "raid", icon: "🌱", effect: "Smart healing + HoT" },
          { name: "Florecimiento", cooldown: "90s", type: "throughput", icon: "🌸", effect: "Instant Regrowth" },
          { name: "Espíritus del Bosque", cooldown: "1m", type: "throughput", icon: "🌲", effect: "Healing spirits" },
          { name: "Árbol de la Vida", cooldown: "3m", type: "throughput", icon: "🌳", effect: "30% más sanación" },
          { name: "Convoke the Spirits", cooldown: "2m", type: "raid", icon: "✨", effect: "Canal múltiples spells" }
        ]
      }
    ]
  },
  {
    name: "Chamán",
    color: "#0070DE",
    specs: [
      {
        name: "Elemental",
        role: "DPS",
        icon: "⚡",
        defensives: [
          { name: "Cambio Astral", cooldown: "1.5m", type: "personal", icon: "🌠", effect: "40% DR" },
          { name: "Link de Espíritu", cooldown: "3m", type: "raid", icon: "🔗", effect: "Redistribución de daño" },
          { name: "Cambio Primordial", cooldown: "5m", type: "personal", icon: "🌋", effect: "Cheating death" }
        ],
        healing: [
          { name: "Link de Espíritu", cooldown: "3m", type: "raid", icon: "🔗", effect: "Redistribución de daño" },
          { name: "Oleada Cauterizante", cooldown: "30s", type: "personal", icon: "🔥", effect: "Sanación emergencia" }
        ]
      },
      {
        name: "Restauración",
        role: "Healer",
        icon: "💧",
        defensives: [
          { name: "Escudo de Tierra", cooldown: "1.5m", type: "tank", icon: "🌱", effect: "20% DR" },
          { name: "Link de Espíritu", cooldown: "3m", type: "raid", icon: "🔗", effect: "Redistribución de daño" }
        ],
        healing: [
          { name: "Oleada de Sanación", cooldown: "3m", type: "raid", icon: "🌊", effect: "Sanación masiva" },
          { name: "Link de Espíritu", cooldown: "3m", type: "raid", icon: "🔗", effect: "Redistribución de daño" },
          { name: "Marejada Ascendente", cooldown: "3m", type: "throughput", icon: "🌊", effect: "Duplica efectos" },
          { name: "Sanación por Marea", cooldown: "2m", type: "throughput", icon: "🌊", effect: "Sanación mejorada" },
          { name: "Lluvia Tranquila", cooldown: "45s", type: "raid", icon: "☔", effect: "Sanación en área" }
        ]
      }
    ]
  }

];
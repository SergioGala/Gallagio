// GalliwyxEvents.js - Eventos realistas para el encuentro de Chrome King Gallywix en Heroico
// Basado en datos de Mythictrap.com y Method.gg - Versión corregida con 6 Scatterblast en Fase 1

const GALLYWIX_HC_EVENTS = [
  // Fase 1
  { time: 0, name: "Pull", description: "Inicio del combate" },
  
  // Primera secuencia de mecánicas - Scatterblast #1 Grupo 1
  { time: 10, name: "Scatterblast Grupo 1", description: "Primer grupo debe posicionarse para soakear el cono frontal" },
  { time: 15, name: "Big Bad Buncha Bombs", description: "Todos deben esquivar las bombas grandes" },
  { time: 20, name: "Suppression", description: "Esquivar remolinos pequeños" },
  { time: 25, name: "Sapper's Satchel", description: "Jugadores marcados deben separarse" },
  { time: 30, name: "1500-Pound Dud", description: "Tanques deben desarmar las bombas grandes" },
  
  // Segunda secuencia de mecánicas - Scatterblast #1 Grupo 2
  { time: 35, name: "Scatterblast Grupo 2", description: "Segundo grupo debe posicionarse para soakear el cono frontal" },
  { time: 40, name: "Big Bad Buncha Bombs", description: "Todos deben esquivar las bombas grandes" },
  { time: 45, name: "Suppression", description: "Esquivar remolinos pequeños" },
  { time: 50, name: "Sapper's Satchel", description: "Jugadores marcados deben separarse" },
  { time: 55, name: "1500-Pound Dud", description: "Tanques deben desarmar las bombas grandes" },
  
  // Tercera secuencia de mecánicas - Scatterblast #2 Grupo 1
  { time: 60, name: "Scatterblast Grupo 1", description: "Primer grupo debe posicionarse para soakear el cono frontal" },
  { time: 65, name: "Big Bad Buncha Bombs", description: "Todos deben esquivar las bombas grandes" },
  { time: 70, name: "Suppression", description: "Esquivar remolinos pequeños" },
  { time: 75, name: "Sapper's Satchel", description: "Jugadores marcados deben separarse" },
  { time: 80, name: "Venting Heat", description: "Daño alto a toda la raid, usar defensivos" },
  
  // Cuarta secuencia de mecánicas - Scatterblast #2 Grupo 2
  { time: 85, name: "Scatterblast Grupo 2", description: "Segundo grupo debe posicionarse para soakear el cono frontal" },
  { time: 90, name: "Big Bad Buncha Bombs", description: "Todos deben esquivar las bombas grandes" },
  { time: 95, name: "Suppression", description: "Esquivar remolinos pequeños" },
  
  // Quinta secuencia de mecánicas - Scatterblast #3 Grupo 1
  { time: 100, name: "Scatterblast Grupo 1", description: "Primer grupo debe posicionarse para soakear el cono frontal" },
  { time: 105, name: "Big Bad Buncha Bombs", description: "Todos deben esquivar las bombas grandes" },
  { time: 110, name: "Suppression", description: "Esquivar remolinos pequeños" },
  { time: 115, name: "Sapper's Satchel", description: "Jugadores marcados deben separarse" },
  { time: 120, name: "1500-Pound Dud", description: "Tanques deben desarmar las bombas grandes" },
  
  // Sexta secuencia de mecánicas - Scatterblast #3 Grupo 2
  { time: 125, name: "Scatterblast Grupo 2", description: "Segundo grupo debe posicionarse para soakear el cono frontal" },
  { time: 130, name: "Venting Heat", description: "Daño alto a toda la raid, usar defensivos" },
  
  // Intermedio 1 (cuando Gallywix alcanza 100 de energía)
  { time: 135, name: "Intermedio 1", description: "Gallywix activa un Giga Coil, apareceran añadidos" },
  { time: 140, name: "Darkfuse Technicians", description: "Matar añadidos y evitar el daño de aparición" },
  { time: 145, name: "Giga Blast", description: "Esquivar el rayo grande" },
  { time: 150, name: "Charged Giga Bombs", description: "Recoger bombas y llevar una al panel de control del Coil activo" },
  
  // Fase 2
  { time: 155, name: "Fase 2", description: "Inicio de la Fase 2" },
  { time: 160, name: "Fused Canisters", description: "Grupos deben soakear los botes de combustible" },
  { time: 165, name: "Big Bad Buncha Bombs", description: "Todos deben esquivar las bombas grandes" },
  { time: 170, name: "1500-Pound Dud", description: "Tanques deben desarmar las bombas grandes" },
  { time: 175, name: "Suppression", description: "Esquivar remolinos pequeños" },
  { time: 180, name: "Fused Canisters", description: "Grupos deben soakear los botes de combustible" },
  { time: 185, name: "Big Bad Buncha Bombs", description: "Todos deben esquivar las bombas grandes" },
  { time: 190, name: "Venting Heat", description: "Daño alto a toda la raid, usar defensivos" },
  
  // Intermedio 2 (cuando Gallywix alcanza 100 de energía de nuevo)
  { time: 195, name: "Intermedio 2", description: "Gallywix activa otro Giga Coil" },
  { time: 200, name: "Darkfuse Technicians", description: "Matar añadidos y evitar el daño de aparición" },
  { time: 205, name: "Giga Blast", description: "Esquivar el rayo grande" },
  { time: 210, name: "Charged Giga Bombs", description: "Recoger bombas y llevar una al panel de control del Coil activo" },
  
  // Transición a Fase 3 (cuando Gallywix llega al 50% de vida)
  { time: 215, name: "Fase 3 - 50% HP", description: "Gallywix se autoblindará, usar Bloodlust/Heroísmo" },
  { time: 220, name: "TOTAL DESTRUCTION!!!", description: "Romper el escudo y interrumpir el casteo" },
  { time: 225, name: "Radiant Electricity", description: "Esquivar los rayos rotatorios" },
  
  // Fase 3 real
  { time: 230, name: "Fase 3", description: "Inicio de la fase final" },
  { time: 235, name: "Bigger Badder Bomb Blast", description: "Tanque debe separarse con la bomba grande" },
  { time: 245, name: "Tick-Tock Canisters", description: "Grupos deben soakear los botes explosivos" },
  { time: 250, name: "Overloaded Rockets", description: "Jugadores marcados deben alejarse y no moverse" },
  { time: 255, name: "Gallybux Finale Blast", description: "Alejarse lo máximo posible para reducir el daño" },
  { time: 260, name: "Suppression", description: "Esquivar remolinos pequeños" },
  { time: 265, name: "Bigger Badder Bomb Blast", description: "Tanque debe separarse con la bomba grande" },
  { time: 275, name: "Tick-Tock Canisters", description: "Grupos deben soakear los botes explosivos" },
  { time: 280, name: "Overloaded Rockets", description: "Jugadores marcados deben alejarse y no moverse" },
  { time: 285, name: "Gallybux Finale Blast", description: "Alejarse lo máximo posible para reducir el daño" },
  { time: 290, name: "Venting Heat", description: "Daño alto a toda la raid, usar defensivos" },
  
  // Intermedio 3 (cuando Gallywix alcanza 100 de energía de nuevo)
  { time: 300, name: "Intermedio 3", description: "Gallywix activa otro Giga Coil" },
  { time: 305, name: "Darkfuse Technicians", description: "Matar añadidos y evitar el daño de aparición" },
  { time: 310, name: "Giga Blast", description: "Esquivar el rayo grande" },
  { time: 315, name: "Charged Giga Bombs", description: "Recoger bombas y llevar una al panel de control del Coil activo" },
  
  // Fase 3 continuación
  { time: 325, name: "Gallybux Finale Blast", description: "Alejarse lo máximo posible para reducir el daño" },
  { time: 330, name: "Tick-Tock Canisters", description: "Grupos deben soakear los botes explosivos" },
  { time: 335, name: "Bigger Badder Bomb Blast", description: "Tanque debe separarse con la bomba grande" },
  { time: 345, name: "Tick-Tock Canisters", description: "Grupos deben soakear los botes explosivos" },
  { time: 350, name: "Overloaded Rockets", description: "Jugadores marcados deben alejarse y no moverse" },
  { time: 355, name: "Gallybux Finale Blast", description: "Alejarse lo máximo posible para reducir el daño" },
  { time: 360, name: "Venting Heat", description: "Daño alto a toda la raid, usar defensivos" },
];

// Función para cargar estos eventos en el estado de la aplicación
const loadGalliwyxEvents = (setBossEvents, setEncounterSettings, setEncounterDuration) => {
  setBossEvents(GALLYWIX_HC_EVENTS);
  setEncounterSettings({
    name: "Chrome King Gallywix",
    difficulty: "Heroico",
  });
  setEncounterDuration(360); // 6 minutos de duración
};

export { GALLYWIX_HC_EVENTS, loadGalliwyxEvents };
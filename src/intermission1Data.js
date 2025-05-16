// intermission1Data.js
// Datos del intermedio 1 del encuentro

export const intermission1Data = {
  id: 'intermission1',
  name: 'Intermedio 1: Darkfuse Cronies',
  description: 'Se activa cuando Gallywix alcanza 100 de energía. La Giga Coil sureste se activa y spawn de añadidos. Un jugador con alta movilidad debe llevar una Giga Bomb a la bobina activada.',
  keyMechanics: [
    {
      name: 'Giga Coils',
      description: 'Daño creciente a toda la raid, se activa al 100% de energía',
      icon: '⚡',
      role: 'Todos',
      time: 'Al inicio',
      tip: 'Desactivar rápidamente con una Giga Bomb'
    },
    {
      name: 'Darkfuse Technicians',
      description: 'Añadidos que dropean Giga Bombs al morir',
      icon: '👨‍🔧',
      role: 'DPS',
      time: '2:05',
      tip: 'Matar rápidamente y recoger las bombas'
    },
    {
      name: 'Juice It!',
      description: 'Cast de los Technicians, daño AoE y buff de daño para ellos',
      icon: '🧪',
      role: 'Interrumper',
      time: 'Durante toda la fase',
      tip: 'Interrumpir prioritariamente'
    },
    {
      name: 'Giga Blast',
      description: 'Rayos direccionales que aumentan daño de Giga Coils',
      icon: '☢️',
      role: 'Ranged',
      time: '2:10, 2:20',
      tip: 'Baitear lejos de la raid y bombas'
    },
    {
      name: 'Charged Giga Bomb',
      description: 'Bombas recogidas de los Technicians, explotan tras 55s',
      icon: '📦',
      role: 'DPS móvil',
      time: '2:25',
      tip: 'Una a la Coil activa, resto al agujero central'
    }
  ],
  timeline: [
    { time: '2:00', event: 'Comienza Intermedio - Se activa Giga Coil sureste', type: 'neutral' },
    { time: '2:05', event: 'Aparecen Darkfuse Technicians', type: 'warning' },
    { time: '2:10', event: 'Primer Giga Blast', type: 'danger' },
    { time: '2:15', event: 'Technicians comienzan a castear Juice It!', type: 'warning' },
    { time: '2:20', event: 'Segundo Giga Blast', type: 'danger' },
    { time: '2:25', event: 'Los Technicians mueren y sueltan Charged Giga Bombs', type: 'neutral' },
    { time: '2:30', event: 'Llevar Giga Bomb a la Coil - Fin del Intermedio', type: 'success' }
  ],
  strategy: [
    {
      header: 'Agrupación Inicial',
      content: 'Agruparse inmediatamente para atraer a los Darkfuse Technicians a un punto central. Esto facilita el AoE y el control de los adds.',
      image: 'intermission_positioning.jpg'
    },
    {
      header: 'Prioridad de Interrupciones',
      content: 'Asignar rotación de interrupciones para Juice It!. Si los adds castean esta habilidad, aumenta su daño un 10% por stack.',
      image: null
    },
    {
      header: 'Baiting de Giga Blast',
      content: 'Los jugadores ranged deben posicionarse estratégicamente para baitear los rayos lejos de los adds y bombas. Muévanse en sentido antihorario al esquivar.',
      image: 'intermission_baiting.jpg'
    },
    {
      header: 'Transporte de Bombas',
      content: 'Asignar de antemano 1 jugador con alta movilidad (Druida, Cazador, DH, etc.) para llevar la primera bomba a la Giga Coil activa. El resto recoge las bombas restantes y las lanza al agujero.',
      image: 'intermission_bombs.jpg'
    }
  ]
};
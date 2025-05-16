// OverviewTab.js - Versión mejorada (Parte 1 de 3)
import React, { useState } from 'react';
import InfoCard from './InfoCard';
import { 
  StatBox, 
  PhasePreview, 
  FatalMistake, 
  TopClass,
  RequiredItem,
  RecommendedAddon,
  BossAbility,
  TimerBar,
  HoverMechanic,
  CooldownRotation
} from './OverviewComponents';

const OverviewTab = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [activeDifficulty, setActiveDifficulty] = useState('heroic');
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      <div className="lg:col-span-2 space-y-6">
        {/* Selectores de dificultad */}
        <div className="flex mb-4 border border-gray-700 rounded overflow-hidden">
          <button 
            className={`flex-grow py-2 px-4 text-sm font-medium ${
              activeDifficulty === 'normal' 
                ? 'bg-green-900 bg-opacity-50 text-green-300' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
            onClick={() => setActiveDifficulty('normal')}
          >
            Normal
          </button>
          <button 
            className={`flex-grow py-2 px-4 text-sm font-medium ${
              activeDifficulty === 'heroic' 
                ? 'bg-blue-900 bg-opacity-50 text-blue-300' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
            onClick={() => setActiveDifficulty('heroic')}
          >
            Heroico
          </button>
          <button 
            className={`flex-grow py-2 px-4 text-sm font-medium ${
              activeDifficulty === 'mythic' 
                ? 'bg-purple-900 bg-opacity-50 text-purple-300' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
            onClick={() => setActiveDifficulty('mythic')}
          >
            Mítico
          </button>
        </div>

        <InfoCard
          title="Chrome King Gallywix - Heroico"
          icon="👑"
          variant="highlight"
          glowEffect={true}
          tags={["Jefe Final", "Complejo", "Coordinación"]}
          content={
            <div className="space-y-4">
              <p className="text-lg">
                Chrome King Gallywix es el jefe final de la raid <span className="text-yellow-400">Liberation of Undermine</span>. En dificultad heroica, este encuentro de un solo objetivo tiene 3 fases principales separadas por intermisiones, y requiere una coordinación precisa con bombas, absorción de mecánicas y manejo de añadidos.
              </p>
              
              <div className="my-4 p-3 bg-indigo-900 bg-opacity-20 border border-indigo-800 rounded flex items-start">
                <div className="text-indigo-300 text-xl mr-3">💎</div>
                <div className="text-indigo-100 text-sm">
                  <strong>Nota de la comunidad:</strong> Este encuentro es considerado uno de los más complejos de la banda debido a sus numerosas mecánicas entrelazadas. El éxito depende de una coordinación perfecta de la raid, especialmente en la transición de la Fase 2 a la 3.
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                <StatBox icon="🏆" title="Tipo" value="Jefe final" color="bg-indigo-900 bg-opacity-40" />
                <StatBox icon="⚔️" title="Dificultad" value="Heroico" color="bg-purple-900 bg-opacity-40" />
                <StatBox icon="👥" title="Composición" value="2T / 5H / 13DPS" color="bg-blue-900 bg-opacity-40" />
                <StatBox icon="⏱️" title="Duración" value="6-8 minutos" color="bg-green-900 bg-opacity-40" />
                <StatBox icon="🩸" title="Bloodlust" value="Al 50% (Fase 2.5)" color="bg-red-900 bg-opacity-40" />
                <StatBox icon="💀" title="Wipe común" value="Absorciones no sanadas" color="bg-red-900 bg-opacity-40" />
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-800 p-3 rounded border border-gray-700">
                  <h3 className="text-indigo-300 font-semibold mb-2 flex items-center">
                    <span className="mr-1">📊</span> Estadísticas
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>PV Heroico:</span>
                      <span className="font-mono">245,000,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Enrage:</span>
                      <span className="font-mono">11:30 minutos</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DPS requerido:</span>
                      <span className="font-mono">~400k raid</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Checkpoints:</span>
                      <span className="font-mono">75%, 50%, 25%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-3 rounded border border-gray-700">
                  <h3 className="text-indigo-300 font-semibold mb-2 flex items-center">
                    <span className="mr-1">🛡️</span> Resistencias
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="w-20">Fuego:</span>
                      <div className="h-4 flex-grow bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-red-600" style={{ width: '60%' }}></div>
                      </div>
                      <span className="ml-2 w-8 text-right">60%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-20">Arcano:</span>
                      <div className="h-4 flex-grow bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-600" style={{ width: '40%' }}></div>
                      </div>
                      <span className="ml-2 w-8 text-right">40%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-20">Naturaleza:</span>
                      <div className="h-4 flex-grow bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-600" style={{ width: '25%' }}></div>
                      </div>
                      <span className="ml-2 w-8 text-right">25%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-20">Sombra:</span>
                      <div className="h-4 flex-grow bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-500" style={{ width: '10%' }}></div>
                      </div>
                      <span className="ml-2 w-8 text-right">10%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex border-b border-gray-700 mb-4">
                  <button 
                    className={`px-4 py-2 focus:outline-none ${activeSection === 'general' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-gray-400'}`}
                    onClick={() => setActiveSection('general')}
                  >
                    General
                  </button>
                  <button 
                    className={`px-4 py-2 focus:outline-none ${activeSection === 'lore' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-gray-400'}`}
                    onClick={() => setActiveSection('lore')}
                  >
                    Historia
                  </button>
                  <button 
                    className={`px-4 py-2 focus:outline-none ${activeSection === 'mechanics' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-gray-400'}`}
                    onClick={() => setActiveSection('mechanics')}
                  >
                    Mecánicas
                  </button>
                </div>
                
                {activeSection === 'general' && (
                  <div className="text-sm space-y-3 text-gray-300">
                    <p>Chrome King Gallywix es un encuentro técnicamente desafiante que pone a prueba la coordinación de la raid al máximo. Varios jugadores deberán manejar mecánicas específicas a lo largo de las tres fases principales.</p>
                    <p>A diferencia de otros jefes de la banda, Gallywix cambia drásticamente sus patrones de ataque entre fases, lo que requiere adaptación constante. La transición de la Fase 2 a la 3 es particularmente peligrosa debido al cast de <span className="text-red-400">TOTAL DESTRUCTION!!!</span> que debe ser interrumpido a tiempo.</p>
                    <p>Los tanques sufren daño creciente durante todo el encuentro, por lo que los healers deben administrar sabiamente sus cooldowns. Estar atento a las bombas y las zonas seguras es esencial para la supervivencia.</p>
                  </div>
                )}
                
                {activeSection === 'lore' && (
                  <div className="text-sm space-y-3 text-gray-300">
                    <p>Gallywix, anteriormente Manitas de Undermine, se convirtió en el Chrome King tras absorber tecnología de cromo puro en los laboratorios secretos bajo la ciudad. Su obsesión por automatizar y mejorar Kezan lo llevó a experimentos cada vez más peligrosos.</p>
                    <p>Las Giga Coils son su obra maestra, dispositivos que canalizan energía arcana y la convierten en poder tecnológico. Con su traje potenciado por cromo, Gallywix se ha vuelto prácticamente invulnerable, controlando a sus antiguos aliados para hacer su voluntad.</p>
                    <p>La batalla final tiene lugar en su cámara privada, donde ha almacenado todas sus invenciones más peligrosas. Al derrotarlo, los aventureros no solo salvan Undermine, sino que evitan que su tecnología de cromo caiga en manos equivocadas.</p>
                  </div>
                )}
              </div>
            </div>
          }
        />

            {activeSection === 'mechanics' && (
              <div className="space-y-2">
                <BossAbility 
                  name="Scatterblast Canisters" 
                  description="Cono frontal de daño alto que aplica absorción de sanación a los jugadores alcanzados."
                  cooldown="30s"
                  phase="1, 3"
                  type="tank"
                  tips={[
                    "Alterna dos grupos para recibir el daño",
                    "Evita solapamiento con otras mecánicas",
                    "Los healers deben priorizar eliminar las absorciones"
                  ]}
                />
                
                <BossAbility 
                  name="Big Bad Buncha Bombs" 
                  description="Bombas grandes que explotan y esparcen bombas más pequeñas en un área extensa."
                  cooldown="60s"
                  phase="1, 3"
                  type="raid"
                  tips={[
                    "Mover toda la raid lejos de la explosión inicial",
                    "Atención a las bombas secundarias",
                    "Usa speed boosts para posicionarte rápidamente"
                  ]}
                />
                
                <BossAbility 
                  name="TOTAL DESTRUCTION!!!" 
                  description="Cast que comienza en la transición de fase al 50%. Si no se interrumpe, causa wipe instantáneo."
                  phase="2.5"
                  type="damage"
                  tips={[
                    "Usar Bloodlust/Heroísmo inmediatamente",
                    "Todos deben atacar el escudo",
                    "Interrumpir tan pronto como sea posible",
                    "Cooldowns defensivos por si acaso"
                  ]}
                />
                
                <BossAbility 
                  name="Giga Coils" 
                  description="Estructuras que causan daño creciente a toda la raid hasta ser desactivadas con bombas."
                  phase="2"
                  type="raid"
                  tips={[
                    "Designar transportadores de bombas con alta movilidad",
                    "Priorizar desactivación sobre DPS al boss",
                    "Coordinar desactivaciones con el raid leader"
                  ]}
                />
                
                <BossAbility 
                  name="Trick Shots" 
                  description="Daño acumulativo en el tanque, aumenta con cada stack."
                  cooldown="4s"
                  phase="1, 2, 3"
                  type="tank"
                  tips={[
                    "Intercambio de tanques a los 8-10 stacks",
                    "Uso de cooldowns defensivos con stacks altos",
                    "Comunicación clara para los intercambios"
                  ]}
                />
              </div>
            )}

        <InfoCard
          title="Resumen Rápido - Tres Fases"
          icon="⚡"
          tags={["Simplificado", "Guía rápida"]}
          content={
            <div className="space-y-4">
              <PhasePreview 
                number="1"
                name="Bomba Colosal" 
                description="Scatterblast Canisters + Absorción de daño"
                keyPoints={[
                  "Divide la raid en 2 grupos para alternar frontales (30s de cooldown)",
                  "Sane las absorciones rápidamente para evitar explosiones letales",
                  "Esquive bombas para evitar DoT acumulable Bad Belated Boom",
                  "Tanques alternan a los 8-10 stacks de Trick Shots",
                  "Usar defensivas personales durante Venting Heat (daño a toda la raid)"
                ]}
                color="bg-blue-900 bg-opacity-30"
                expanded={true}
              />
              
              <PhasePreview 
                number="2"
                name="Bobinas Giga" 
                description="Desactivar Giga Coils + Añadidos"
                keyPoints={[
                  "3 grupos para absorber los Fused Canisters (asignar posiciones)",
                  "Desactive Giga Coils con bombas recogidas de los añadidos",
                  "Interrumpa a los Technicians (Juice It!) para evitar que se buffen",
                  "Ranged posicionados para baitear Giga Blast lejos de la raid",
                  "Jugadores móviles (DH/Druidas) designados para llevar bombas",
                  "Evite los rayos direccionales que aumentan el daño de las Coils"
                ]}
                color="bg-purple-900 bg-opacity-30"
              />
              
              <div className="py-2 px-4 bg-yellow-900 bg-opacity-30 border border-yellow-800 rounded-lg flex">
                <div className="text-yellow-400 text-lg mr-3">⚠️</div>
                <div className="text-yellow-200 text-sm">
                  <strong>Transición Crítica al 50%:</strong> Cuando Gallywix alcanza el 50%, se protege con un escudo y comienza a castear <span className="font-mono text-red-300">TOTAL DESTRUCTION!!!</span>. Destruya el escudo e interrumpa INMEDIATAMENTE. Use Bloodlust/Heroísmo aquí. <strong>Esta es la parte más peligrosa del encuentro y causa la mayoría de los wipes.</strong>
                </div>
              </div>
              
              <PhasePreview 
                number="3"
                name="Destrucción Total" 
                description="Versiones aumentadas de mecánicas previas + Nuevas bombas"
                keyPoints={[
                  "Mecánicas de Fase 1 y 2 simultáneamente pero más letales",
                  "Tanques deben alejarse con Bigger Badder Bomb Blast (daño en área)",
                  "Aléjese de Gallywix Finale Blast (50 yardas de alcance)",
                  "4+ jugadores deben agruparse en cada Tick-Tock Canister",
                  "Sanar a los tanques es prioridad máxima (daño incrementado en 100%)",
                  "Evitar solapamiento de bombas - usar toda el área disponible",
                  "Mantener alta sanación de área para contrarrestar daño constante"
                ]}
                color="bg-red-900 bg-opacity-30"
              />
            </div>
          }
        />

        <InfoCard
          title="Qué Causará el Wipe de tu Raid"
          icon="💀"
          content={
            <div className="space-y-3">
              <FatalMistake 
                title="Mechengineer's Canisters no sanados"
                description="Los escudos de absorción que no se eliminan explotan y matan a toda la raid. Si se acumulan 2+ absorciones sin sanar, el daño resultante es letal."
                solution="Coordina cooldowns de sanación y asigna healers a grupos específicos. Prioriza sanar por encima de todo lo demás."
                expanded={true}
              />
              
              <FatalMistake 
                title="Giga Coils activas demasiado tiempo"
                description="El daño incrementa rápidamente hasta ser letal, subiendo un 10% cada segundo. Después de 10 segundos, el daño es prácticamente imposible de sanar."
                solution="Designa jugadores con movilidad para llevar Giga Bombs a los controles. Asigna prioridades y coordina por voz."
              />
              
              <FatalMistake 
                title="No interrumpir TOTAL DESTRUCTION!!!"
                description="Al 50%, el cast debe ser interrumpido o es un wipe instantáneo. El escudo tiene 30M de vida y debe ser destruido para poder interrumpir."
                solution="Usa Bloodlust, todos atacan el escudo, interrumpe en cuanto sea posible. Preparen trinkets y cooldowns ofensivos."
              />
              
              <FatalMistake 
                title="Pocos jugadores en los Canisters"
                description="Se necesitan 3+ jugadores en Fase 1 y 4+ en Fase 2/3 por canister. De lo contrario, las explosiones son letales y aplican un DoT que no se puede dispellear."
                solution="Divide la raid en grupos equilibrados y asigna zonas. Usa marcas en el suelo para grupos y comunica cuando hay que agruparse."
              />
              
              <FatalMistake 
                title="Mal manejo de Giga Blast en Fase 2"
                description="Los rayos de Giga Blast incrementan el poder de las Giga Coils y causan daño severo a cualquier jugador alcanzado."
                solution="Los ranged deben posicionarse lejos de bombas y Coils, baiteando los rayos hacia zonas despejadas. Moverse en sentido contrario a las agujas del reloj."
              />
              
              <FatalMistake 
                title="Solapamiento de cooldowns defensivos"
                description="El uso ineficiente de cooldowns defensivos deja a la raid vulnerable durante mecánicas letales como Venting Heat y Gallywix Finale Blast."
                solution="Asigna cooldowns específicos para cada mecánica peligrosa. Usa WeakAuras o similares para rastrear cooldowns de raid."
              />
            </div>
          }
        />
        
        <InfoCard
          title="Rotación de Cooldowns Recomendada"
          icon="🔄"
          content={
            <div>
              <p className="mb-4 text-sm">Coordinación de cooldowns defensivos para minimizar el daño en los momentos críticos del encuentro:</p>
              
              <CooldownRotation
                title="Fase 1"
                cooldowns={[
                  {
                    phase: "0:10",
                    abilities: [
                      { name: "Tranquilidad", startPercent: 0, endPercent: 100, color: "#33cc33" }
                    ]
                  },
                  {
                    phase: "0:40",
                    abilities: [
                      { name: "Espíritu Ancestral", startPercent: 0, endPercent: 100, color: "#3399ff" }
                    ]
                  },
                  {
                    phase: "0:55",
                    abilities: [
                      { name: "Barrera", startPercent: 0, endPercent: 50, color: "#cc66ff" },
                      { name: "Halo", startPercent: 50, endPercent: 100, color: "#ffcc00" }
                    ]
                  },
                  {
                    phase: "1:10",
                    abilities: [
                      { name: "Himno", startPercent: 0, endPercent: 100, color: "#ff9999" }
                    ]
                  },
                  {
                    phase: "1:40",
                    abilities: [
                      { name: "Revival", startPercent: 0, endPercent: 100, color: "#66ccff" }
                    ]
                  }
                ]}
              />
              
              <CooldownRotation
                title="Fase 2"
                cooldowns={[
                  {
                    phase: "2:15",
                    abilities: [
                      { name: "Tranquilidad", startPercent: 0, endPercent: 100, color: "#33cc33" }
                    ]
                  },
                  {
                    phase: "2:45",
                    abilities: [
                      { name: "Barrera", startPercent: 0, endPercent: 100, color: "#cc66ff" }
                    ]
                  },
                  {
                    phase: "3:10",
                    abilities: [
                      { name: "Espíritu Ancestral", startPercent: 0, endPercent: 100, color: "#3399ff" }
                    ]
                  }
                ]}
              />
              
              <CooldownRotation
                title="TOTAL DESTRUCTION!!! (50%)"
                cooldowns={[
                  {
                    phase: "Transición",
                    abilities: [
                      { name: "Bloodlust", startPercent: 0, endPercent: 50, color: "#ff3333" },
                      { name: "TODOS LOS PERSONALES", startPercent: 50, endPercent: 100, color: "#ff9900" }
                    ]
                  }
                ]}
              />
              
              <div className="mt-4 p-3 bg-blue-900 bg-opacity-20 border border-blue-800 rounded">
                <h4 className="text-blue-300 text-sm font-semibold mb-2">Notas adicionales:</h4>
                <ul className="list-disc pl-5 text-xs text-blue-100">
                  <li>Los tanques deben coordinar sus defensivos personales con el daño de Trick Shots.</li>
                  <li>Durante la fase 3, rota cooldowns cada 30 segundos para las mecánicas amplificadas.</li>
                  <li>Asegúrate de guardar al menos 2 cooldowns mayores para el final de la fase 3 (25% y menos).</li>
                </ul>
              </div>
            </div>
          }
        />
      </div>


      <div className="space-y-6">
        <InfoCard
          title="Clases Destacadas"
          icon="⭐"
          tags={["Meta", "Recomendado"]}
          content={
            <div className="space-y-3">
              <TopClass 
                role="Tank"
                classes={["Guerrero", "Cazador de Demonios"]}
                reason="Alta movilidad para manejar Bigger Badder Bomb Blast en Fase 3"
                details={[
                  "Los Guerreros pueden usar Intervene para evitar daño de bombas",
                  "Los Cazadores de Demonios tienen excelente movilidad con Fel Rush",
                  "Ambas clases tienen cooldowns defensivos fuertes para manejar el daño incrementado en Fase 3",
                  "Las defensivas personales son cruciales con 10+ stacks de Trick Shots"
                ]}
              />
              
              <TopClass 
                role="Healer"
                classes={["Chamán", "Paladín"]}
                reason="Sanación AoE fuerte para las absorciones de los Canisters"
                details={[
                  "Los Chamanes destacan con Healing Rain para las áreas de absorciones",
                  "Spirit Link Totem es excelente para manejar el daño de Giga Coils",
                  "Los Paladines ofrecen excelente sanación de tanques con Beacon of Light",
                  "Aura Mastery reduce el daño de TOTAL DESTRUCTION!!! si no se interrumpe a tiempo",
                  "Ambas clases tienen buena movilidad para posicionarse correctamente"
                ]}
              />
              
              <TopClass 
                role="DPS"
                classes={["Mago", "Cazador", "Druida Balance"]}
                reason="Ranged para baitear Giga Blast lejos de la raid"
                details={[
                  "Los Magos pueden usar Blink para evitar mecánicas rápidamente",
                  "Los Cazadores tienen movimiento excelente sin perder DPS",
                  "Druidas Balance pueden usar Travel Form para llevar bombas",
                  "Todas estas clases tienen buen daño sostenido en targets múltiples",
                  "Capacidad de seguir haciendo DPS mientras esquivan mecánicas"
                ]}
              />
              
              <TopClass 
                role="Utilidad"
                classes={["Brujo", "Druida"]}
                reason="Portales/movilidad para llevar bombas a los controles"
                details={[
                  "Los Brujos pueden usar Gateway para rápido movimiento entre Coils",
                  "Health Stones son vitales para sobrevivir daño inesperado",
                  "Druidas pueden usar Travel Form para rápido traslado de bombas",
                  "Stampeding Roar ayuda a toda la raid a esquivar Bad Belated Boom",
                  "Ambas clases ofrecen soluciones defensivas para el grupo"
                ]}
              />
              
              <div className="mt-4 p-3 bg-green-900 bg-opacity-20 border border-green-800 rounded">
                <h4 className="text-green-300 text-sm font-semibold mb-2">Composición recomendada:</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  <div className="px-2 py-1 bg-blue-900 bg-opacity-50 text-blue-300 rounded">
                    1× Guerrero Tank
                  </div>
                  <div className="px-2 py-1 bg-blue-900 bg-opacity-50 text-blue-300 rounded">
                    1× Cazador de Demonios Tank
                  </div>
                  <div className="px-2 py-1 bg-green-900 bg-opacity-50 text-green-300 rounded">
                    2× Chamán Restauración
                  </div>
                  <div className="px-2 py-1 bg-green-900 bg-opacity-50 text-green-300 rounded">
                    1× Paladín Sagrado
                  </div>
                  <div className="px-2 py-1 bg-green-900 bg-opacity-50 text-green-300 rounded">
                    1× Druida Restauración
                  </div>
                  <div className="px-2 py-1 bg-green-900 bg-opacity-50 text-green-300 rounded">
                    1× Sacerdote Disciplina
                  </div>
                  <div className="px-2 py-1 bg-red-900 bg-opacity-50 text-red-300 rounded">
                    3× Magos
                  </div>
                  <div className="px-2 py-1 bg-red-900 bg-opacity-50 text-red-300 rounded">
                    2× Brujos
                  </div>
                  <div className="px-2 py-1 bg-red-900 bg-opacity-50 text-red-300 rounded">
                    2× Cazadores
                  </div>
                  <div className="px-2 py-1 bg-red-900 bg-opacity-50 text-red-300 rounded">
                    2× Druida Balance
                  </div>
                  <div className="px-2 py-1 bg-red-900 bg-opacity-50 text-red-300 rounded">
                    4× DPS Melé (variados)
                  </div>
                </div>
              </div>
            </div>
          }
        />

        <InfoCard
          title="Preparación Necesaria"
          icon="🧰"
          content={
            <div className="space-y-3">
              <RequiredItem 
                name="Flask de Inteligencia/Fuerza/Agilidad"
                reason="Aumenta DPS para fases de alto daño"
                details={[
                  "Flask of Endless Fathoms (Int +238)",
                  "Flask of the Undertow (Agi +238)",
                  "Flask of the Currents (Str +238)",
                  "Duración: 1 hora, persiste a través de la muerte"
                ]}
              />
              
              <RequiredItem 
                name="Pociones de Rejuvenecimiento Espiritual"
                reason="Vital para sobrevivir mecánicas de alto daño"
                details="Restaura 12,800 salud y 9,600 mana durante 10s. Usa una al inicio del combate y otra durante la transición al 50%"
              />
              
              <RequiredItem 
                name="Comida de Stats Principales"
                reason="Maximiza rendimiento en todas las fases"
                details={[
                  "Bountiful Captain's Feast (+75 a todas las stats)",
                  "La comida específica de cada stat es mejor para maximizar (+85)",
                  "Usar comida de resistencia para progresión temprana"
                ]}
              />
              
              <RequiredItem 
                name="Piedras de Salud"
                reason="Supervivencia durante TOTAL DESTRUCTION!!!"
                icon="💎"
                details="Pide a los brujos que repartan piedras de salud ANTES del pull. ¡No olvides usarla durante la transición!"
              />
              
              <RequiredItem 
                name="Runas Aumentadas"
                reason="DPS extra para romper escudo en transición"
                icon="📜"
                details={[
                  "Lightning-Forged Augment Rune (Stats Principales +60)",
                  "Funciona junto con frascos, no se consume al morir",
                  "Duración: 1 hora"
                ]}
              />
              
              <RequiredItem 
                name="Battle Shout/Int/Fort Buffs"
                reason="Imprescindibles para toda la raid"
                icon="📢"
                details="Revisa antes del pull que todos los buffs de raid estén activos. Especialmente importante: Arcane Intellect, Power Word: Fortitude, Battle Shout"
              />
              
              <RequiredItem 
                name="Oil y Piedra de Afilar para Armas"
                reason="Aumento de daño necesario para superar el DPS check"
                icon="🔪"
                details={[
                  "Aceites de arma para casters",
                  "Piedras de afilar para físicos",
                  "No olvidar reactivarlos después de cada wipe"
                ]}
              />
            </div>
          }
        />

        <InfoCard
          title="Addons Recomendados"
          icon="🔌"
          content={
            <div className="space-y-2">
              <RecommendedAddon 
                name="DBM/BigWigs"
                purpose="Timers para todas las mecánicas"
                link="#"
                screenshot={true}
              />
              
              <RecommendedAddon 
                name="WeakAuras"
                purpose="Tracking de Giga Coils y absorciones"
                link="#"
                screenshot={true}
              />
              
              <RecommendedAddon 
                name="GTFO"
                purpose="Alertas para bombas y mecánicas evitables"
                link="#"
              />
              
              <RecommendedAddon 
                name="Method Raid Tools"
                purpose="Asignación de grupos para Canisters"
                link="#"
              />
              
              <RecommendedAddon 
                name="Exorsus Raid Tools"
                purpose="Tracking de cooldowns de raid"
                link="#"
              />
              
              <RecommendedAddon 
                name="OmniCC"
                purpose="Visualización mejorada de cooldowns"
                link="#"
              />
              
              <RecommendedAddon 
                name="Details! Damage Meter"
                purpose="Análisis de daño y sanación"
                link="#"
              />
              
              <div className="mt-3 p-3 bg-indigo-900 bg-opacity-30 border border-indigo-800 rounded">
                <h4 className="text-indigo-300 text-sm font-semibold mb-2">Paquete de WeakAuras</h4>
                <p className="text-xs text-indigo-100 mb-2">Este paquete incluye auras para:</p>
                <ul className="list-disc pl-5 text-xs text-indigo-100">
                  <li>Rastreo de absorciones de Mechengineer's Canisters</li>
                  <li>Timer de Giga Coils con intensidad de daño</li>
                  <li>Alertas para jugadores marcados con Sapper's Satchel</li>
                  <li>Notificación y sonido para TOTAL DESTRUCTION!!!</li>
                  <li>Contador de stacks de Trick Shots para tanques</li>
                </ul>
                <div className="mt-2">
                  <a href="#" className="flex items-center justify-center bg-indigo-700 hover:bg-indigo-600 text-white py-1 px-2 rounded text-xs">
                    <span className="mr-1">💾</span>
                    <span>Descargar paquete de WeakAuras para Gallywix</span>
                  </a>
                </div>
              </div>
            </div>
          }
        />
        
        <InfoCard
          title="Historial de Cambios"
          icon="📜"
          expandable={true}
          initialExpanded={false}
          content={
            <div className="space-y-3 text-sm">
              <div className="flex">
                <div className="w-24 text-indigo-300">16-Mayo-2025</div>
                <div>
                  <div className="font-medium">Actualización 1.3</div>
                  <ul className="list-disc pl-5 text-xs text-gray-300 mt-1">
                    <li>Añadidos detalles sobre la fase 3</li>
                    <li>Corregida información sobre resistencias</li>
                    <li>Actualizado paquete de WeakAuras</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-24 text-indigo-300">10-Mayo-2025</div>
                <div>
                  <div className="font-medium">Actualización 1.2</div>
                  <ul className="list-disc pl-5 text-xs text-gray-300 mt-1">
                    <li>Añadida sección de rotación de cooldowns</li>
                    <li>Mejoradas recomendaciones de clases</li>
                    <li>Corregidos timers para Fase 2</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-24 text-indigo-300">02-Mayo-2025</div>
                <div>
                  <div className="font-medium">Actualización 1.1</div>
                  <ul className="list-disc pl-5 text-xs text-gray-300 mt-1">
                    <li>Primera publicación completa</li>
                    <li>Añadida información detallada de todas las fases</li>
                  </ul>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default OverviewTab;
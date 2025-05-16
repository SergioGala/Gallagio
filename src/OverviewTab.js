// OverviewTab.js
// Componente para la pestaña de resumen general

import React from 'react';
import InfoCard from './InfoCard';

// Componentes auxiliares para la sección de resumen
const StatBox = ({ title, value }) => (
  <div className="bg-gray-700 rounded-lg p-3">
    <div className="text-gray-400 text-xs mb-1">{title}</div>
    <div className="text-white font-semibold">{value}</div>
  </div>
);

const PhasePreview = ({ number, name, description, keyPoints }) => (
  <div className="border border-gray-700 rounded-lg overflow-hidden">
    <div className="bg-gray-700 px-4 py-2 flex items-center">
      <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center mr-3">
        <span className="font-bold">{number}</span>
      </div>
      <div>
        <h4 className="font-bold">{name}</h4>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </div>
    <div className="p-3 bg-gray-800">
      <ul className="list-disc pl-5 text-sm space-y-1">
        {keyPoints.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  </div>
);

const FatalMistake = ({ title, description, solution }) => (
  <div className="border-l-4 border-red-500 pl-3">
    <h4 className="font-bold text-red-400">{title}</h4>
    <p className="text-sm text-gray-300">{description}</p>
    <p className="text-sm text-green-400 mt-1">
      <span className="font-semibold">✓ Solución:</span> {solution}
    </p>
  </div>
);

const TopClass = ({ role, classes, reason }) => {
  // Función para determinar colores según el rol
  const getRoleStyles = (role) => {
    switch(role) {
      case 'Tank':
        return {
          bg: 'rgba(81, 165, 186, 0.2)',
          text: 'rgb(81, 165, 186)',
          border: 'rgb(81, 165, 186)'
        };
      case 'Healer':
        return {
          bg: 'rgba(133, 200, 138, 0.2)',
          text: 'rgb(133, 200, 138)',
          border: 'rgb(133, 200, 138)'
        };
      case 'DPS':
        return {
          bg: 'rgba(255, 127, 17, 0.2)',
          text: 'rgb(255, 127, 17)',
          border: 'rgb(255, 127, 17)'
        };
      default:
        return {
          bg: 'rgba(132, 94, 194, 0.2)',
          text: 'rgb(132, 94, 194)',
          border: 'rgb(132, 94, 194)'
        };
    }
  };

  const styles = getRoleStyles(role);

  return (
    <div className="flex">
      <div 
        className="w-20 text-xs font-semibold p-1 mr-2 rounded flex items-center justify-center"
        style={{ 
          backgroundColor: styles.bg,
          color: styles.text,
          borderColor: styles.border,
          border: "1px solid"
        }}
      >
        {role}
      </div>
      <div>
        <div className="font-medium">{classes.join(", ")}</div>
        <div className="text-xs text-gray-400">{reason}</div>
      </div>
    </div>
  );
};

const RequiredItem = ({ name, reason }) => (
  <div className="flex items-start">
    <div className="text-lg mr-2">🧪</div>
    <div>
      <div className="font-medium">{name}</div>
      <div className="text-xs text-gray-400">{reason}</div>
    </div>
  </div>
);

const RecommendedAddon = ({ name, purpose }) => (
  <div className="flex items-start">
    <div className="text-lg mr-2">🔧</div>
    <div>
      <div className="font-medium">{name}</div>
      <div className="text-xs text-gray-400">{purpose}</div>
    </div>
  </div>
);

const OverviewTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      <div className="lg:col-span-2 space-y-6">
        <InfoCard
          title="Chrome King Gallywix - Heroico"
          icon="👑"
          content={
            <div className="space-y-4">
              <p className="text-lg">
                Chrome King Gallywix es el jefe final de la raid Liberation of Undermine. En dificultad heroica, este encuentro de un solo objetivo tiene 3 fases principales y requiere una coordinación precisa con bombas, absorción de mecánicas y manejo de añadidos.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <StatBox title="Tipo" value="Jefe final" />
                <StatBox title="Dificultad" value="Heroico" />
                <StatBox title="Composición" value="2T / 5H / 13DPS" />
                <StatBox title="Duración" value="6-8 minutos" />
                <StatBox title="Bloodlust" value="Al 50% (TOTAL DESTRUCTION!!!)" />
                <StatBox title="Wipe más común" value="Absorciones no sanadas" />
              </div>
            </div>
          }
        />

        <InfoCard
          title="Resumen Rápido - Tres Fases"
          icon="⚡"
          content={
            <div className="space-y-4">
              <PhasePreview 
                number="1"
                name="Bomba Colosal" 
                description="Scatterblast Canisters + Absorción de daño"
                keyPoints={[
                  "Divida la raid en 2 grupos para alternar frontales",
                  "Sane las absorciones rápidamente",
                  "Esquive bombas para evitar DoT acumulable"
                ]}
              />
              <PhasePreview 
                number="2"
                name="Bobinas Giga" 
                description="Desactivar Giga Coils + Añadidos"
                keyPoints={[
                  "3 grupos para absorber los Fused Canisters",
                  "Desactive Giga Coils con bombas de los añadidos",
                  "Interrumpa a los Technicians (Juice It!)"
                ]}
              />
              <div className="py-2 px-4 bg-yellow-900 bg-opacity-30 border border-yellow-800 rounded-lg flex">
                <div className="text-yellow-400 text-lg mr-3">⚠️</div>
                <div className="text-yellow-200 text-sm">
                  <strong>Transición Crítica al 50%:</strong> Destruya el escudo e interrumpa TOTAL DESTRUCTION!!! Use Bloodlust/Heroísmo aquí.
                </div>
              </div>
              <PhasePreview 
                number="3"
                name="Destrucción Total" 
                description="Versiones aumentadas de mecánicas previas"
                keyPoints={[
                  "Tanques deben alejarse con Bigger Badder Bomb Blast",
                  "Aléjese de Gallybux Finale Blast (50 yardas)",
                  "4+ jugadores en cada Tick-Tock Canister"
                ]}
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
                description="Los escudos de absorción que no se eliminan explotan y matan a toda la raid."
                solution="Coordina cooldowns de sanación y asigna healers a grupos específicos."
              />
              <FatalMistake 
                title="Giga Coils activas demasiado tiempo"
                description="El daño incrementa rápidamente hasta ser letal."
                solution="Designa jugadores con movilidad para llevar Giga Bombs a los controles."
              />
              <FatalMistake 
                title="No interrumpir TOTAL DESTRUCTION!!!"
                description="Al 50%, el cast debe ser interrumpido o es un wipe instantáneo."
                solution="Usa Bloodlust, todos atacan el escudo, interrumpe en cuanto sea posible."
              />
              <FatalMistake 
                title="Pocos jugadores en los Canisters"
                description="Se necesitan 3+ jugadores en Fase 1 y 4+ en Fase 2/3 por canister."
                solution="Divide la raid en grupos equilibrados y asigna zonas."
              />
            </div>
          }
        />
      </div>

      <div className="space-y-6">
        <InfoCard
          title="Clases Destacadas"
          icon="⭐"
          content={
            <div className="space-y-3">
              <TopClass 
                role="Tank"
                classes={["Guerrero", "Cazador de Demonios"]}
                reason="Alta movilidad para manejar Bigger Badder Bomb Blast en Fase 3"
              />
              <TopClass 
                role="Healer"
                classes={["Chamán", "Paladín"]}
                reason="Sanación AoE fuerte para las absorciones de los Canisters"
              />
              <TopClass 
                role="DPS"
                classes={["Mago", "Cazador", "Druida Balance"]}
                reason="Ranged para baitear Giga Blast lejos de la raid"
              />
              <TopClass 
                role="Utilidad"
                classes={["Brujo", "Druida"]}
                reason="Portales/movilidad para llevar bombas a los controles"
              />
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
              />
              <RequiredItem 
                name="Pociones de Rejuvenecimiento Espiritual"
                reason="Vital para sobrevivir mecánicas de alto daño"
              />
              <RequiredItem 
                name="Comida de Stats Principales"
                reason="Maximiza rendimiento en todas las fases"
              />
              <RequiredItem 
                name="Piedras de Salud"
                reason="Supervivencia durante TOTAL DESTRUCTION!!!"
              />
              <RequiredItem 
                name="Runas Aumentadas"
                reason="DPS extra para romper escudo en transición"
              />
              <RequiredItem 
                name="Battle Shout/Int/Fort Buffs"
                reason="Imprescindibles para toda la raid"
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
              />
              <RecommendedAddon 
                name="WeakAuras"
                purpose="Tracking de Giga Coils y absorciones"
              />
              <RecommendedAddon 
                name="GTFO"
                purpose="Alertas para bombas y mecánicas evitables"
              />
              <RecommendedAddon 
                name="Method Raid Tools"
                purpose="Asignación de grupos para Canisters"
              />
              <RecommendedAddon 
                name="Exorsus Raid Tools"
                purpose="Tracking de cooldowns de raid"
              />
              <div className="mt-3 text-xs text-blue-300">
                <a href="#" className="flex items-center">
                  <span className="mr-1">💾</span>
                  <span className="underline">Descargar paquete de WeakAuras para Gallywix</span>
                </a>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default OverviewTab;
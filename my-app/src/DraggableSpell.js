// DraggableSpell.js - Componente para permitir arrastrar habilidades a la línea de tiempo
import React, { useState } from 'react';

const DraggableSpell = ({ spell, healerId, className, specName }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  // Determinar color según el tipo de cooldown
  let borderColor = 'border-blue-500';
  let bgColor = 'bg-blue-900 bg-opacity-30';
  let textColor = 'text-blue-400';
  
  if (spell.type === 'healing') {
    borderColor = 'border-green-500';
    bgColor = 'bg-green-900 bg-opacity-30';
    textColor = 'text-green-400';
  } else if (spell.type === 'defensive') {
    borderColor = 'border-red-500';
    bgColor = 'bg-red-900 bg-opacity-30';
    textColor = 'text-red-400';
  } else if (spell.type === 'utility') {
    borderColor = 'border-yellow-500';
    bgColor = 'bg-yellow-900 bg-opacity-30';
    textColor = 'text-yellow-400';
  }

  // Iniciar arrastre
  const handleDragStart = (e) => {
    setIsDragging(true);
    
    // Configurar los datos a transferir durante el arrastre
    e.dataTransfer.setData('application/json', JSON.stringify({
      spellName: spell.name,
      healerId: healerId,
      className: className,
      specName: specName,
      spellType: spell.type,
      spellDuration: spell.duration,
      spellCooldown: spell.cooldown,
      spellIcon: spell.icon
    }));
    
    // Configurar una imagen de arrastre personalizada (opcional)
    const dragIcon = document.createElement('div');
    dragIcon.className = `${bgColor} ${borderColor} border-l-4 p-2 rounded shadow-lg`;
    dragIcon.innerHTML = `<span class="text-xl mr-2">${spell.icon}</span> ${spell.name}`;
    dragIcon.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    dragIcon.style.color = 'white';
    dragIcon.style.fontSize = '14px';
    dragIcon.style.padding = '4px 8px';
    dragIcon.style.borderRadius = '4px';
    dragIcon.style.position = 'absolute';
    dragIcon.style.top = '-1000px'; // Oculto pero necesario para la imagen
    document.body.appendChild(dragIcon);
    
    try {
      e.dataTransfer.setDragImage(dragIcon, 15, 15);
    } catch (err) {
      console.error('Error setting drag image:', err);
    }
    
    // Limpiar después
    setTimeout(() => {
      document.body.removeChild(dragIcon);
    }, 0);
  };

  // Finalizar arrastre
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className={`draggable-spell ${borderColor} border-l-4 ${bgColor} p-3 rounded-r mb-2 ${isDragging ? 'opacity-50' : ''}`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        cursor: 'grab',
        transition: 'all 0.2s ease',
        transform: isDragging ? 'scale(0.98)' : 'scale(1)'
      }}
    >
      <div className="flex items-center mb-1">
        <span className="text-xl mr-2">{spell.icon}</span>
        <h3 className={`font-bold ${textColor}`}>{spell.name}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm mb-2">
        <div>
          <span className="text-gray-400">Tipo:</span> {spell.type}
        </div>
        <div>
          <span className="text-gray-400">Duración:</span> {spell.duration}s
        </div>
        <div>
          <span className="text-gray-400">Cooldown:</span> {spell.cooldown}s
        </div>
      </div>
      
      <p className="text-gray-300 text-sm">{spell.description}</p>
      
      <div className="text-xs text-gray-400 mt-2 italic">
        Arrastra esta habilidad a la línea de tiempo para asignarla
      </div>
    </div>
  );
};

export default DraggableSpell;
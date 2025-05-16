// TimelineItem.js
// Componente para un elemento de la línea de tiempo

import React from 'react';

const TimelineItem = ({ item }) => {
  // Función para determinar el color según el tipo de evento
  const getTypeStyles = (type) => {
    switch (type) {
      case 'danger':
        return 'bg-red-900 bg-opacity-30 border border-red-800';
      case 'warning':
        return 'bg-yellow-900 bg-opacity-30 border border-yellow-800';
      case 'success':
        return 'bg-green-900 bg-opacity-30 border border-green-800';
      default:
        return 'bg-gray-700';
    }
  };

  // Función para determinar el icono según el tipo
  const getTypeIcon = (type) => {
    switch (type) {
      case 'danger':
        return '⚠️';
      case 'warning':
        return '⚡';
      case 'success':
        return '✅';
      default:
        return '🔄';
    }
  };

  return (
    <div className="ml-10 relative">
      <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center -translate-x-14 ${
        item.type === 'danger' ? 'bg-red-700' :
        item.type === 'warning' ? 'bg-yellow-700' :
        item.type === 'success' ? 'bg-green-700' :
        'bg-gray-700'
      }`}>
        {getTypeIcon(item.type)}
      </div>
      <div className="pb-4">
        <span className="font-bold text-white">{item.time}</span>
        <div className={`mt-1 p-3 rounded-lg ${getTypeStyles(item.type)}`}>
          {item.event}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
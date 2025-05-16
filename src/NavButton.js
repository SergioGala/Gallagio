// NavButton.js
// Componente para los botones de navegación

import React from 'react';

const NavButton = ({ active, onClick, icon, text }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
        active 
          ? 'bg-indigo-700 text-white shadow-md' 
          : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
      }`}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </button>
  );
};

export default NavButton;
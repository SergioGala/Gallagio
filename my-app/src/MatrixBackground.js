// MatrixBackground.js (con estilos CSS integrados)
import React, { useState, useEffect } from 'react';

// Función para generar un carácter aleatorio del estilo Matrix
const generateMatrixChar = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
  return chars.charAt(Math.floor(Math.random() * chars.length));
};

const MatrixBackground = () => {
  const [matrixChars, setMatrixChars] = useState([]);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // Inicializar el efecto Matrix
  useEffect(() => {
    // Función para actualizar las dimensiones en caso de cambio de tamaño de ventana
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Añadir listener para cambio de tamaño
    window.addEventListener('resize', handleResize);

    // Crear streams de caracteres Matrix
    const initMatrix = () => {
      const screenWidth = dimensions.width;
      const numStreams = Math.floor(screenWidth / 20); // Aproximadamente 20px por stream
      const newMatrixChars = [];
      
      for (let i = 0; i < numStreams; i++) {
        newMatrixChars.push({
          x: Math.random() * 100, // Porcentaje a lo ancho de la pantalla
          y: Math.random() * 100, // Porcentaje a lo alto de la pantalla
          speed: 0.2 + Math.random() * 0.8, // Velocidad de caída
          length: 5 + Math.floor(Math.random() * 15), // Longitud del rastro
          chars: Array(15).fill().map(() => generateMatrixChar()), // Caracteres a mostrar
          opacity: 0.1 + Math.random() * 0.4, // Opacidad del rastro
        });
      }
      
      setMatrixChars(newMatrixChars);
    };

    // Inicializar
    initMatrix();

    // Actualizar la animación periódicamente
    const matrixInterval = setInterval(() => {
      setMatrixChars(prevChars => {
        return prevChars.map(stream => {
          // Mover el stream hacia abajo
          const newY = (stream.y + stream.speed) % 100;
          
          // Ocasionalmente cambiar los caracteres
          const newChars = stream.chars.map((char, i) => 
            Math.random() < 0.1 ? generateMatrixChar() : char
          );
          
          return { ...stream, y: newY, chars: newChars };
        });
      });
    }, 100);
    
    // Limpieza
    return () => {
      clearInterval(matrixInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, [dimensions.width]);

  return (
    <div className="matrix-background">
      {matrixChars.map((stream, streamIndex) => (
        <div 
          key={streamIndex}
          className="matrix-char"
          style={{
            left: `${stream.x}%`,
            top: `${stream.y}%`,
            opacity: stream.opacity,
            transform: 'translateX(-50%)',
          }}
        >
          {stream.chars.map((char, charIndex) => (
            <div 
              key={charIndex}
              style={{
                opacity: 1 - (charIndex / stream.length),
              }}
            >
              {char}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatrixBackground;
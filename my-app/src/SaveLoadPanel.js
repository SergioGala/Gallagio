// SaveLoadPanel.js (actualizado con carga de Gallywix HC real)
import React, { useState } from 'react';
import { useDataContext } from './DataContext';
import { GALLYWIX_HC_EVENTS } from './GalliwyxEvents'; // Importa los eventos predefinidos

const SaveLoadPanel = () => {
  const { 
    exportData, 
    importData,
    encounterSettings,
    setEncounterSettings,
    setBossEvents,        // Añadido para poder establecer los eventos
    setEncounterDuration  // Añadido para ajustar la duración
  } = useDataContext();
  
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');
  const [showExport, setShowExport] = useState(false);
  const [exportText, setExportText] = useState('');
  
  // Manejar exportación
  const handleExport = () => {
    const data = exportData();
    setExportText(data);
    setShowExport(true);
    setShowImport(false);
  };
  
  // Manejar importación
  const handleImport = () => {
    try {
      if (!importText.trim()) {
        setImportError('Por favor, introduce los datos a importar.');
        return;
      }
      
      const success = importData(importText);
      
      if (success) {
        setImportError('');
        setShowImport(false);
        setImportText('');
      } else {
        setImportError('Datos inválidos. Por favor, verifica el formato JSON.');
      }
    } catch (error) {
      setImportError(`Error: ${error.message}`);
    }
  };
  
  // Manejar copia al portapapeles
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(exportText)
      .then(() => {
        alert('Datos copiados al portapapeles');
      })
      .catch(err => {
        console.error('Error al copiar: ', err);
        alert('No se pudo copiar al portapapeles. Por favor, selecciona y copia manualmente.');
      });
  };
  
  // Manejar descarga del archivo
  const handleDownload = () => {
    const blob = new Blob([exportText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wow-cd-planner-${encounterSettings.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Manejar cambios en los ajustes del encuentro
  const handleSettingChange = (e) => {
    const { name, value } = e.target;
    setEncounterSettings({
      ...encounterSettings,
      [name]: value
    });
  };
  
  // Cargar eventos preconfigurados de Gallywix
  const loadGalliwyxHC = () => {
    setBossEvents(GALLYWIX_HC_EVENTS);
    setEncounterSettings({
      name: "Chrome King Gallywix",
      difficulty: "Heroico",
    });
    setEncounterDuration(360); // 6 minutos de duración
    
    // Notificar al usuario
    alert('Eventos de Chrome King Gallywix HC cargados correctamente');
  };
  
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Ajustes del Encuentro</h2>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <button
            onClick={() => {
              setShowImport(true);
              setShowExport(false);
            }}
            className="btn btn-primary"
          >
            Importar
          </button>
          <button
            onClick={handleExport}
            className="btn btn-success"
          >
            Exportar
          </button>
        </div>
      </div>
      
      {/* Ajustes del encuentro */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <div>
          <label style={{display: 'block', marginBottom: '0.25rem', color: 'var(--text-secondary-color)'}}>
            Nombre del Boss
          </label>
          <input
            type="text"
            name="name"
            value={encounterSettings.name}
            onChange={handleSettingChange}
            placeholder="Nombre del Boss"
          />
        </div>
        <div>
          <label style={{display: 'block', marginBottom: '0.25rem', color: 'var(--text-secondary-color)'}}>
            Dificultad
          </label>
          <select
            name="difficulty"
            value={encounterSettings.difficulty}
            onChange={handleSettingChange}
          >
            <option value="Normal">Normal</option>
            <option value="Heroico">Heroico</option>
            <option value="Mítico">Mítico</option>
          </select>
        </div>
        
        {/* Botón para cargar Gallywix HC */}
        <div style={{marginTop: '1rem', textAlign: 'center'}}>
          <button
            onClick={loadGalliwyxHC}
            className="btn"
            style={{
              backgroundColor: '#C41F3B', // Color de Death Knight, representativo del Chrome King
              color: 'white', 
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto'
            }}
          >
            <span style={{marginRight: '0.5rem'}}>💰</span> Cargar Chrome King Gallywix HC
          </button>
        </div>
      </div>
      
      {/* Panel de importación */}
      {showImport && (
        <div className="import-export-area">
          <h3 style={{fontWeight: '500', marginBottom: '0.5rem', color: 'white'}}>Importar Datos</h3>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            className="textarea-code"
            placeholder="Pega aquí el JSON a importar"
            style={{marginBottom: '0.5rem'}}
          />
          {importError && (
            <div style={{color: '#EF4444', marginBottom: '0.5rem'}}>{importError}</div>
          )}
          <div style={{display: 'flex', justifyContent: 'flex-end', gap: '0.5rem'}}>
            <button
              onClick={() => {
                setShowImport(false);
                setImportError('');
                setImportText('');
              }}
              className="btn"
              style={{backgroundColor: '#4B5563'}}
            >
              Cancelar
            </button>
            <button
              onClick={handleImport}
              className="btn btn-primary"
            >
              Importar
            </button>
          </div>
        </div>
      )}
      
      {/* Panel de exportación */}
      {showExport && (
        <div className="import-export-area">
          <h3 style={{fontWeight: '500', marginBottom: '0.5rem', color: 'white'}}>Exportar Datos</h3>
          <textarea
            value={exportText}
            readOnly
            className="textarea-code"
            style={{marginBottom: '0.5rem'}}
          />
          <div style={{display: 'flex', justifyContent: 'flex-end', gap: '0.5rem'}}>
            <button
              onClick={() => setShowExport(false)}
              className="btn"
              style={{backgroundColor: '#4B5563'}}
            >
              Cerrar
            </button>
            <button
              onClick={handleCopyToClipboard}
              className="btn btn-primary"
            >
              Copiar
            </button>
            <button
              onClick={handleDownload}
              className="btn btn-success"
            >
              Descargar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaveLoadPanel;
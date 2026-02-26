import React from 'react';
import './Ubicacion.css';

const Ubicacion = () => {
  return (
    <div id="ubicacion" className="container mt-5">
      <h2>Nuestra Ubicación</h2>
      <p>Aquí se mostrará el mapa de Google Maps.</p>
      {/* Google Maps embed will go here */}
      <div className="map-placeholder">
        <p>Mapa de Google</p>
      </div>
    </div>
  );
};

export default Ubicacion;

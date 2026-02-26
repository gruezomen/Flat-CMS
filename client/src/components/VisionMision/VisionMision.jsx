import React, { useState, useEffect } from 'react';
import './VisionMision.css';

const VisionMision = () => {
  const [data, setData] = useState({ vision: '', mision: '' });

  useEffect(() => {
    fetch('http://192.168.1.14:3001/api/secciones')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="vision-mision" className="container mt-5">
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="vision-box border p-4 h-100">
            <h3>Visión</h3>
            <p>{data.vision || 'Cargando...'}</p>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="mision-box border p-4 h-100">
            <h3>Misión</h3>
            <p>{data.mision || 'Cargando...'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMision;

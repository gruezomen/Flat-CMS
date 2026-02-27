import React, { useState, useEffect } from 'react';
import './AcercaDe.css';
import { API_URLS } from '../../api';

const AcercaDe = () => {
  const [data, setData] = useState({ acercaDe: '' });

  useEffect(() => {
    fetch(API_URLS.secciones)
      .then(res => res.json())
      .then(d => setData(d))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="acerca-de" className="container mt-5 text-center">
      <div className="card p-5 shadow-sm">
        <h2>Acerca de Nosotros</h2>
        <p className="lead">{data.acercaDe || 'Cargando...'}</p>
      </div>
    </section>
  );
};

export default AcercaDe;

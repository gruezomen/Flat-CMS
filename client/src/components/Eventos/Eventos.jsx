import React, { useState, useEffect } from 'react';
import './Eventos.css';
import { API_URLS } from '../../api';

const Eventos = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch(API_URLS.eventos)
      .then(res => res.json())
      .then(data => setEventos(data))
      .catch(err => console.error('Error al cargar eventos:', err));
  }, []);

  return (
    <section id="eventos" className="container mt-5">
      <h2 className="text-center mb-4">Próximos Eventos</h2>
      <div className="row">
        {eventos.length > 0 ? (
          eventos.map((evento) => (
            <div key={evento.id} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">{evento.titulo}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{evento.fecha}</h6>
                  <p className="card-text">{evento.descripcion}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No hay eventos próximos.</p>
        )}
      </div>
    </section>
  );
};

export default Eventos;

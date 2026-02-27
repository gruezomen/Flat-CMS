import React, { useState, useEffect } from 'react';
import './Noticias.css';
import { API_URLS } from '../../api';

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetch(API_URLS.noticias)
      .then(res => res.json())
      .then(data => setNoticias(data))
      .catch(err => console.error('Error fetching noticias:', err));
  }, []);

  return (
    <section id="noticias" className="container mt-5">
      <h2 className="text-center mb-4">Últimas Noticias</h2>
      <div className="row">
        {noticias.length > 0 ? (
          noticias.map((noticia) => (
            <div key={noticia.id} className="col-md-6 mb-3">
              <div className="card h-100">
                {noticia.imagen && <img src={noticia.imagen} className="card-img-top" alt={noticia.titulo} style={{ height: '200px', objectFit: 'cover' }} />}
                <div className="card-body">
                  <h5 className="card-title">{noticia.titulo}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{noticia.fecha}</h6>
                  <p className="card-text">{noticia.contenido}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No hay noticias para mostrar.</p>
        )}
      </div>
    </section>
  );
};

export default Noticias;

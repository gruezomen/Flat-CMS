import React, { useState, useEffect } from 'react';
import './Carousel.css';
import { API_URLS } from '../../api';

const Carousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(API_URLS.carrusel)
      .then(res => res.json())
      .then(data => setImages(data))
      .catch(err => console.error('Error al cargar carrusel:', err));
  }, []);

  if (images.length === 0) return <div className="p-5 text-center bg-light">Cargando carrusel...</div>;

  return (
    <div id="imageCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#imageCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
            data-bs-interval="4000"
          >
            <img src={image.src} className="d-block w-100" alt={image.alt} />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#imageCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#imageCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default Carousel;

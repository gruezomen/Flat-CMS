import React from 'react';
import './Carousel.css';

const Carousel = () => {
  const images = [
    {
      src: 'https://via.placeholder.com/800x400/0000FF/FFFFFF?Text=Imagen+1',
      alt: 'Primera imagen',
    },
    {
      src: 'https://via.placeholder.com/800x400/FF0000/FFFFFF?Text=Imagen+2',
      alt: 'Segunda imagen',
    },
    {
      src: 'https://via.placeholder.com/800x400/00FF00/FFFFFF?Text=Imagen+3',
      alt: 'Tercera imagen',
    },
  ];

  return (
    <div id="imageCarousel" className="carousel slide" data-bs-ride="carousel">
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

import React from 'react';
import './Ubicacion.css';

const Ubicacion = () => {
  return (
    <section id="ubicacion" className="container mt-5 mb-5">
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="row g-0">
            <div className="col-md-4 p-4 d-flex flex-column justify-content-center bg-light">
              <h2 className="text-primary mb-3">Nuestra Ubicación</h2>
              <p className="fw-bold mb-1">Universidad Mayor de San Simón (UMSS)</p>
              <p className="text-muted">
                Av. Oquendo y Calle Jordán<br />
                Cochabamba - Bolivia
              </p>
              <div className="mt-3">
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Universidad+Mayor+de+San+Simón,+Cochabamba" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline-primary btn-sm"
                >
                  Cómo llegar
                </a>
              </div>
            </div>
            <div className="col-md-8">
              <div className="ratio ratio-21x9 h-100" style={{ minHeight: '300px' }}>
                <iframe 
                  src="https://maps.google.com/maps?q=-17.393836,-66.147171&z=17&output=embed" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación UMSS"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ubicacion;

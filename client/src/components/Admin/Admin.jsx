import React, { useState, useEffect } from 'react';
import './Admin.css';
import { API_URLS } from '../../api';

const Admin = () => {
  const [noticias, setNoticias] = useState([]);
  const [secciones, setSecciones] = useState({ vision: '', mision: '', acercaDe: '' });
  const [carrusel, setCarrusel] = useState([]);

  useEffect(() => {
    // Cargar noticias
    fetch(API_URLS.noticias)
      .then(res => res.json())
      .then(data => setNoticias(data));

    // Cargar secciones
    fetch(API_URLS.secciones)
      .then(res => res.json())
      .then(data => setSecciones(data));

    // Cargar carrusel
    fetch(API_URLS.carrusel)
      .then(res => res.json())
      .then(data => setCarrusel(data));
  }, []);

  const handleSaveNoticias = () => {
    fetch(API_URLS.noticias, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noticias),
    })
      .then(res => res.json())
      .then(data => alert(data.message));
  };

  const handleSaveSecciones = () => {
    fetch(API_URLS.secciones, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(secciones),
    })
      .then(res => res.json())
      .then(data => alert(data.message));
  };

  const handleSaveCarrusel = () => {
    fetch(API_URLS.carrusel, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carrusel),
    })
      .then(res => res.json())
      .then(data => alert(data.message));
  };

  const handleEditNoticia = (id, campo, valor) => {
    setNoticias(noticias.map(n => n.id === id ? { ...n, [campo]: valor } : n));
  };

  const handleEditCarrusel = (id, campo, valor) => {
    setCarrusel(carrusel.map(item => item.id === id ? { ...item, [campo]: valor } : item));
  };

  const handleImageUpload = (id, file, tipo = 'noticia') => {
    const formData = new FormData();
    formData.append('image', file);

    fetch(API_URLS.upload, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        if (data.imageUrl) {
          if (tipo === 'noticia') {
            handleEditNoticia(id, 'imagen', data.imageUrl);
          } else {
            handleEditCarrusel(id, 'src', data.imageUrl);
          }
        }
      })
      .catch(err => console.error('Error al subir imagen:', err));
  };

  const handleAddNoticia = () => {
    const nueva = { id: Date.now(), titulo: 'Nueva Noticia', contenido: '', fecha: new Date().toISOString().split('T')[0], imagen: '' };
    setNoticias([...noticias, nueva]);
  };

  const handleAddCarrusel = () => {
    const nuevo = { id: Date.now(), src: '', alt: 'Nueva imagen del carrusel' };
    setCarrusel([...carrusel, nuevo]);
  };

  const handleDeleteNoticia = (id) => {
    setNoticias(noticias.filter(n => n.id !== id));
  };

  const handleDeleteCarrusel = (id) => {
    setCarrusel(carrusel.filter(item => item.id !== id));
  };

  const handleEditSeccion = (campo, valor) => {
    setSecciones({ ...secciones, [campo]: valor });
  };

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center mb-4">Panel de Administración (Flat CMS)</h1>
      
      {/* Secciones de Texto */}
      <div className="card p-4 mb-5 shadow-sm">
        <h3>Secciones de Texto Estático</h3>
        <div className="mb-3">
          <label className="form-label">Visión</label>
          <textarea className="form-control" value={secciones.vision} onChange={(e) => handleEditSeccion('vision', e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Misión</label>
          <textarea className="form-control" value={secciones.mision} onChange={(e) => handleEditSeccion('mision', e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Acerca de</label>
          <textarea className="form-control" value={secciones.acercaDe} onChange={(e) => handleEditSeccion('acercaDe', e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={handleSaveSecciones}>Guardar Secciones</button>
      </div>

      {/* Gestión del Carrusel */}
      <div className="card p-4 mb-5 shadow-sm border-primary">
        <h3>Gestión del Carrusel Principal</h3>
        <button className="btn btn-success mb-3" onClick={handleAddCarrusel}>Añadir Imagen al Carrusel</button>
        <div className="row">
          {carrusel.map(item => (
            <div key={item.id} className="col-md-6 mb-3">
              <div className="border p-3 rounded bg-light">
                <div className="input-group mb-2">
                  <span className="input-group-text">URL</span>
                  <input type="text" className="form-control" value={item.src} onChange={(e) => handleEditCarrusel(item.id, 'src', e.target.value)} placeholder="URL de la imagen" />
                </div>
                <input type="file" className="form-control mb-2" onChange={(e) => handleImageUpload(item.id, e.target.files[0], 'carrusel')} />
                <input type="text" className="form-control mb-2" value={item.alt} onChange={(e) => handleEditCarrusel(item.id, 'alt', e.target.value)} placeholder="Descripción (alt)" />
                {item.src && <img src={item.src} alt="Preview" className="img-thumbnail mb-2" style={{ height: '100px' }} />}
                <button className="btn btn-danger btn-sm d-block w-100" onClick={() => handleDeleteCarrusel(item.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary mt-2" onClick={handleSaveCarrusel}>Guardar Carrusel</button>
      </div>

      {/* Gestión de Noticias */}
      <div className="card p-4 shadow-sm">
        <h3>Gestión de Noticias</h3>
        <button className="btn btn-success mb-3" onClick={handleAddNoticia}>Nueva Noticia</button>
        <div className="list-group">
          {noticias.map(noticia => (
            <div key={noticia.id} className="list-group-item border mb-2">
              <input type="text" className="form-control mb-2 fw-bold" value={noticia.titulo} onChange={(e) => handleEditNoticia(noticia.id, 'titulo', e.target.value)} placeholder="Título" />
              <textarea className="form-control mb-2" value={noticia.contenido} onChange={(e) => handleEditNoticia(noticia.id, 'contenido', e.target.value)} placeholder="Contenido" rows="3" />
              <div className="mb-2">
                <label className="form-label">Imagen de la noticia</label>
                <div className="input-group mb-1">
                  <span className="input-group-text">URL</span>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="https://ejemplo.com/imagen.jpg" 
                    value={noticia.imagen || ''} 
                    onChange={(e) => handleEditNoticia(noticia.id, 'imagen', e.target.value)} 
                  />
                </div>
                <div className="text-center mb-1">
                  <small className="text-muted">O sube un archivo local:</small>
                </div>
                <input type="file" className="form-control mb-1" onChange={(e) => handleImageUpload(noticia.id, e.target.files[0], 'noticia')} />
                {noticia.imagen && (
                  <div className="mt-2 text-center">
                    <img src={noticia.imagen} alt="Preview" style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '5px' }} />
                  </div>
                )}
              </div>
              <input type="date" className="form-control mb-2" value={noticia.fecha} onChange={(e) => handleEditNoticia(noticia.id, 'fecha', e.target.value)} />
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteNoticia(noticia.id)}>Eliminar Noticia</button>
            </div>
          ))}
        </div>
        <button className="btn btn-primary mt-3" onClick={handleSaveNoticias}>Guardar Noticias</button>
      </div>

      <div className="mt-4">
        <a href="/" className="btn btn-secondary">Volver al Sitio</a>
      </div>
    </div>
  );
};

export default Admin;

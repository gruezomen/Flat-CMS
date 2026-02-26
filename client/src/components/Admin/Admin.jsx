import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  const [noticias, setNoticias] = useState([]);
  const [secciones, setSecciones] = useState({ vision: '', mision: '', acercaDe: '' });

  useEffect(() => {
    // Cargar noticias
    fetch('http://192.168.1.14:3001/api/noticias')
      .then(res => res.json())
      .then(data => setNoticias(data));

    // Cargar secciones
    fetch('http://192.168.1.14:3001/api/secciones')
      .then(res => res.json())
      .then(data => setSecciones(data));
  }, []);

  const handleSaveNoticias = () => {
    fetch('http://192.168.1.14:3001/api/noticias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noticias),
    })
      .then(res => res.json())
      .then(data => alert(data.message));
  };

  const handleSaveSecciones = () => {
    fetch('http://192.168.1.14:3001/api/secciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(secciones),
    })
      .then(res => res.json())
      .then(data => alert(data.message));
  };

  const handleEditNoticia = (id, campo, valor) => {
    setNoticias(noticias.map(n => n.id === id ? { ...n, [campo]: valor } : n));
  };

  const handleAddNoticia = () => {
    const nueva = { id: Date.now(), titulo: 'Nueva Noticia', contenido: '', fecha: new Date().toISOString().split('T')[0] };
    setNoticias([...noticias, nueva]);
  };

  const handleDeleteNoticia = (id) => {
    setNoticias(noticias.filter(n => n.id !== id));
  };

  const handleEditSeccion = (campo, valor) => {
    setSecciones({ ...secciones, [campo]: valor });
  };

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center mb-4">Panel de Administración (Flat CMS)</h1>
      
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

      <div className="card p-4 shadow-sm">
        <h3>Gestión de Noticias</h3>
        <button className="btn btn-success mb-3" onClick={handleAddNoticia}>Nueva Noticia</button>
        <div className="list-group">
          {noticias.map(noticia => (
            <div key={noticia.id} className="list-group-item border mb-2">
              <input type="text" className="form-control mb-2 fw-bold" value={noticia.titulo} onChange={(e) => handleEditNoticia(noticia.id, 'titulo', e.target.value)} placeholder="Título" />
              <textarea className="form-control mb-2" value={noticia.contenido} onChange={(e) => handleEditNoticia(noticia.id, 'contenido', e.target.value)} placeholder="Contenido" rows="3" />
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

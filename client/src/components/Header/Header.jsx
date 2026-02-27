import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: '/', name: 'Inicio' },
    { path: '/#noticias', name: 'Noticias' },
    { path: '/#eventos', name: 'Eventos' },
    { path: '/#vision-mision', name: 'Visión y Misión' },
    { path: '/#acerca-de', name: 'Acerca de' },
    { path: '/#ubicacion', name: 'Ubicación' },
  ];

  return (
    <header className="bg-dark text-white sticky-top">
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Mi Sitio
          </a>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {navItems.map((item) => (
                <li className="nav-item" key={item.path}>
                  <a className="nav-link" href={item.path} onClick={() => setIsOpen(false)}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;


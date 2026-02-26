import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer" className="bg-dark text-white text-center p-4 mt-5">
      <p>&copy; {new Date().getFullYear()} Mi Sitio. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;

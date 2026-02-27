// Detectamos la IP actual desde la que se accede al sitio
const host = window.location.hostname;
const API_BASE_URL = `http://${host}:3001`;

export const API_URLS = {
  noticias: `${API_BASE_URL}/api/noticias`,
  secciones: `${API_BASE_URL}/api/secciones`,
  carrusel: `${API_BASE_URL}/api/carrusel`,
  upload: `${API_BASE_URL}/api/upload`,
};

export default API_BASE_URL;

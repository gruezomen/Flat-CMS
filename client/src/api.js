const host = window.location.hostname;
let API_BASE_URL = `http://${host}:3001`;

API_BASE_URL = 'https://flat-cms.onrender.com';

export const API_URLS = {
  noticias: `${API_BASE_URL}/api/noticias`,
  secciones: `${API_BASE_URL}/api/secciones`,
  carrusel: `${API_BASE_URL}/api/carrusel`,
  eventos: `${API_BASE_URL}/api/eventos`,
  upload: `${API_BASE_URL}/api/upload`,
};

export default API_BASE_URL;

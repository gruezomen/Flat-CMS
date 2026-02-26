const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;
const DATA_PATH = path.join(__dirname, 'data', 'noticias.json');
const SECCIONES_PATH = path.join(__dirname, 'data', 'secciones.json');

app.use(cors());
app.use(express.json());

// Leer noticias
app.get('/api/noticias', (req, res) => {
  fs.readFile(DATA_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error al leer las noticias' });
    res.json(JSON.parse(data));
  });
});

// Guardar noticias
app.post('/api/noticias', (req, res) => {
  fs.writeFile(DATA_PATH, JSON.stringify(req.body, null, 2), (err) => {
    if (err) return res.status(500).json({ error: 'Error al guardar las noticias' });
    res.json({ message: 'Noticias actualizadas con éxito' });
  });
});

// Leer secciones
app.get('/api/secciones', (req, res) => {
  fs.readFile(SECCIONES_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error al leer las secciones' });
    res.json(JSON.parse(data));
  });
});

// Guardar secciones
app.post('/api/secciones', (req, res) => {
  fs.writeFile(SECCIONES_PATH, JSON.stringify(req.body, null, 2), (err) => {
    if (err) return res.status(500).json({ error: 'Error al guardar las secciones' });
    res.json({ message: 'Secciones actualizadas con éxito' });
  });
});

app.get('/', (req, res) => {
  res.send('Backend del Flat CMS funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

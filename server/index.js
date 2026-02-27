const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const port = 3001;
const DATA_PATH = path.join(__dirname, 'data', 'noticias.json');
const SECCIONES_PATH = path.join(__dirname, 'data', 'secciones.json');
const CARRUSEL_PATH = path.join(__dirname, 'data', 'carrusel.json');

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoint para subir imágenes
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ninguna imagen' });
  }
  const host = req.get('host');
  const imageUrl = `${req.protocol}://${host}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

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

// Leer carrusel
app.get('/api/carrusel', (req, res) => {
  fs.readFile(CARRUSEL_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error al leer el carrusel' });
    res.json(JSON.parse(data));
  });
});

// Guardar carrusel
app.post('/api/carrusel', (req, res) => {
  fs.writeFile(CARRUSEL_PATH, JSON.stringify(req.body, null, 2), (err) => {
    if (err) return res.status(500).json({ error: 'Error al guardar el carrusel' });
    res.json({ message: 'Carrusel actualizado con éxito' });
  });
});

app.get('/', (req, res) => {
  res.send('Backend del Flat CMS funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

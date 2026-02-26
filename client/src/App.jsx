import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Carousel from './components/Carousel/Carousel';
import Noticias from './components/Noticias/Noticias';
import Eventos from './components/Eventos/Eventos';
import Ubicacion from './components/Ubicacion/Ubicacion';
import VisionMision from './components/VisionMision/VisionMision';
import AcercaDe from './components/AcercaDe/AcercaDe';
import Footer from './components/Footer/Footer';
import Admin from './components/Admin/Admin';

const Home = () => (
  <>
    <Header />
    <main>
      <Carousel />
      <div className="container">
        <Noticias />
        <Eventos />
        <Ubicacion />
        <VisionMision />
        <AcercaDe />
      </div>
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;


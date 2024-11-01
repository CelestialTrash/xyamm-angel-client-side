// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MerchandisePage from './pages/MerchandisePage';
import Bionetta from './pages/Bionetta';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import pointerImage from './assets/llave.svg'; // Pointer image

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const handleMouseMove = (event) => {
        setMousePosition({ x: event.pageX, y: event.pageY });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [isMobile]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen relative">
        {/* Navbar */}
        <Navbar />

        {/* Image that follows the cursor, only on desktop */}
        {!isMobile && (
          <img
            src={pointerImage}
            alt="Pointer Follower"
            className="pointer-follower"
            style={{
              position: 'absolute',
              top: `${mousePosition.y - 25}px`,
              left: `${mousePosition.x - 25}px`,
              transition: 'transform 0.3s ease-out',
              transform: 'translate(-50%, -50%)',
              width: '350px',
              height: '350px',
              pointerEvents: 'none',
              zIndex: 9999,
            }}
          />
        )}

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/merchandise" element={<MerchandisePage />} />
            <Route path="/bionetta" element={<Bionetta />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;



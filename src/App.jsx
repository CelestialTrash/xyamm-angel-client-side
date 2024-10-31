import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MerchandisePage from './pages/MerchandisePage';
import Bionetta from './pages/Bionetta';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import pointerImage from './assets/llave.svg'; // Pointer image


function App() {
  // State to store the mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Function to handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.pageX, y: event.pageY });
    };

    // Add event listener to track mouse movements
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Router>
  <div className="flex flex-col min-h-screen relative">
    {/* Navbar */}
    <Navbar />

    {/* Image that follows the cursor */}
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

    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/merchandise" element={<MerchandisePage />} /> {/* Uso de "element" en lugar de "component" */}
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



// src/pages/Bionetta.js
import { Link } from "react-router-dom";

function Bionetta() {
    return (
        <section 
            className="flex flex-col items-center justify-center bg-black overflow-hidden"
            style={{ height: 'calc(100vh - 60px - 80px)' }} // Ajusta estos valores según la altura real de tu navbar y footer
        >
            {/* Título pequeño con estilo */}
            
            {/* Título principal "Bionetta" */}
            <Link
                to="/"
                className="text-5xl font-bold text-white transition duration-300 ease-in-out transform hover:scale-120 hover:text-white hover:[text-shadow:0_0_10px_rgba(255,255,255,0.7),_0_0_20px_rgba(255,255,255,0.7),_0_0_30px_rgba(255,255,255,0.7)]"
            >
                Bionetta 
            </Link>
            
        </section>
    );
}

export default Bionetta;


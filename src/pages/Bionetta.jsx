import { Link } from "react-router-dom";

function Bionetta() {
    return (
        <section 
  className="flex items-center justify-center bg-black"
  style={{ height: 'calc(100vh - 80px - 64px)' }}
>
  <Link
    to="/"
    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white transition duration-300 ease-in-out transform hover:scale-110 hover:[text-shadow:0_0_10px_rgba(255,255,255,0.7),_0_0_20px_rgba(255,255,255,0.7),_0_0_30px_rgba(255,255,255,0.7)]"
  >
    Bionetta
  </Link>
</section>
    );
}

export default Bionetta;


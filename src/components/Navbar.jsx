import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import sanityClient from '../sanityClient';

function Navbar() {
  const [logoUrl, setLogoUrl] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "navbar"]{
          logoImage{
            asset->{
              url
            }
          }
        }`
      )
      .then((data) => {
        const logo = data[0]?.logoImage?.asset?.url;
        setLogoUrl(logo);
      })
      .catch(console.error);
  }, []);

  return (
    <nav className="bg-black p-2 sm:p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="h-8 sm:h-12 w-auto" />
          ) : (
            'Loading...'
          )}
        </Link>

        {/* Links: Listen, Merch, Bionetta */}
        <div className="flex space-x-2 sm:space-x-4 ml-4">
          {/* Listen Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-white focus:outline-none"
            >
              Listen
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 shadow-lg rounded-lg z-50">
                <ul>
                  <li>
                    <a
                      href="https://open.spotify.com/artist/72DBIvrB4UT18T3wCH5clI?si=a_A-UstSTLW90lvgy8wgNg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2 text-white hover:bg-white hover:text-black"
                    >
                      Spotify
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://soundcloud.com/xyammangel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2 text-white hover:bg-white hover:text-black"
                    >
                      SoundCloud
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/xyammangel__/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2 text-white hover:bg-white hover:text-black"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/@XyammAngel__"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2 text-white hover:bg-white hover:text-black"
                    >
                      YouTube
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Merch */}
          <Link to="/merchandise" className="text-white">
            Merch
          </Link>
          <Link to="/bionetta" className="text-white">
            Bionetta
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

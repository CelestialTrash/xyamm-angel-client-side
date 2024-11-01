// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import sanityClient from '../sanityClient';

function Navbar() {
  const [logoUrl, setLogoUrl] = useState(null);

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
    <nav className="bg-black p-4 overflow-x-hidden">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="h-12 w-auto" />
          ) : (
            'Loading...'
          )}
        </Link>

        {/* Menu Options */}
        <div className="flex space-x-4 ml-8">
          {/* Link to Footer instead of Dropdown on mobile */}
          <a href="#footer" className="text-white">
            Listen
          </a>
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

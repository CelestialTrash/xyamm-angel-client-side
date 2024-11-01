// src/components/Footer.js
import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient';

function Footer() {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "footer"]{
          socialLinks[]{
            platform,
            logoImage{
              asset->{
                url
              }
            },
            linkUrl,
            altText
          }
        }`
      )
      .then((data) => {
        if (data && data.length > 0) {
          setSocialLinks(data[0].socialLinks);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <footer id="footer" className="bg-black text-white p-2 sm:p-4 overflow-x-hidden">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 sm:space-x-6 mb-4">
          {socialLinks?.map((link, index) => (
            <a
              key={index}
              href={link.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={link.logoImage?.asset?.url}
                alt={link.altText || link.platform}
                className="h-10 w-10 sm:h-12 sm:w-12"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </a>
          ))}
        </div>
        <p className="text-xs sm:text-sm">&copy; 2024 Xyamm Angel</p>
      </div>
    </footer>
  );
}

export default Footer;

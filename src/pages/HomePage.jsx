// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';

const HomePage = () => {
  const [homePageData, setHomePageData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Controla la imagen seleccionada
  const [isLightboxOpen, setIsLightboxOpen] = useState(false); // Controla el estado del lightbox

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "homePage"]{
          title,
          heroVideo{ asset->{ url }},
          releases[]{ releaseTitle, releaseImage{ asset->{ url }} },
          bioBackgroundImage{ asset->{ url }},
          gallery[]{ asset->{ url }}
        }`
      )
      .then((data) => setHomePageData(data[0]))
      .catch(console.error);
  }, []);

  if (!homePageData) return <div>Loading...</div>;

  const openLightbox = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Video */}
      <section className="hero-section relative h-screen">
        {homePageData?.heroVideo?.asset?.url ? (
          <video
            autoPlay
            muted
            loop
            className="absolute inset-0 w-full h-full object-cover"
            src={homePageData.heroVideo.asset.url}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-500 flex justify-center items-center">
            <p className="text-5xl text-white">No Hero Video Available</p>
          </div>
        )}
      </section>

      {/* Release Section */}
      <section className="release-section py-12 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Releases</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {homePageData.releases?.map((release, index) => (
              <div key={index} className="release-item relative group">
                <div className="w-full h-96 overflow-hidden shadow-md transition-all duration-500 relative">
                  <img
                    src={release.releaseImage?.asset?.url}
                    alt={release.releaseTitle}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center items-center">
                    <div className="text-center text-white space-y-4">
                      <h3 className="text-xl font-semibold">{release.releaseTitle}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio Section with Background Image */}
      

{/* Bio Section with Background Image */}
<section
  className="bio-section relative py-12 bg-center min-h-screen bg-black hidden md:block"
  style={{
    backgroundImage: homePageData?.bioBackgroundImage?.asset?.url
      ? `url(${homePageData.bioBackgroundImage.asset.url})`
      : 'none',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  }}
>
  {homePageData?.bioBackgroundImage?.asset?.url ? (
    <div className="container mx-auto px-4 flex justify-center items-center h-full">
      <p className="text-2xl text-white font-bold"></p>
    </div>
  ) : (
    <div className="container mx-auto px-4 flex justify-center items-center h-full bg-white">
      <p className="text-2xl text-black">No Bio Image Available</p>
    </div>
  )}
</section>


      {/* Gallery Section */}
      <section className="gallery-section py-12 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {homePageData.gallery?.map((image, index) => (
              <div
                key={index}
                className="w-full h-96 overflow-hidden shadow-md"
                onClick={() => openLightbox(image.asset.url)}
              >
                <img
                  src={image.asset.url}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-full object-cover cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected Gallery Image"
              className="max-w-full max-h-screen"
            />
          </div>
          <div
            className="absolute inset-0 bg-transparent cursor-pointer"
            onClick={closeLightbox}
          ></div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

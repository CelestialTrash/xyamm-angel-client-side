// src/pages/MerchandisePage.js
import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';

const MerchandisePage = () => {
  const [merchData, setMerchData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "merchPage"]{
          title,
          products[]{
            productName,
            productImage{
              asset->{
                url
              }
            },
            price,
            purchaseLink
          }
        }`
      )
      .then((data) => setMerchData(data[0]))
      .catch(console.error);
  }, []);

  if (!merchData) return <div>Loading...</div>;

  return (
    <div>
      {/* Shop Merchandise Section */}
      <section className="merch-section h-full py-12 bg-black">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-6 text-center text-white">Shop Merchandise</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-48">
      {merchData.products.map((product, index) => (
        <div key={index} className="product-item p-4 rounded-lg shadow-lg ">
          {/* Product Image */}
          <div className="w-full h-64 overflow-hidden rounded-lg ">
            <img
              src={product.productImage?.asset?.url}
              alt={product.productName}
              className="w-full h-full object-scale-down transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          {/* Product Name */}
          <h3 className="text-xl font-semibold mt-4 text-center text-white">{product.productName}</h3>
          {/* Product Price */}
          <p className="text-lg text-center text-gray-300">${product.price.toFixed(2)}</p>
          {/* Purchase Button */}
          <div className="text-center mt-4">
            <a
              href={product.purchaseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition-colors duration-300"
            >
              Purchase
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


    </div>
  );
};

export default MerchandisePage;


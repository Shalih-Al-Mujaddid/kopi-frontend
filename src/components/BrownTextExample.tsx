import React from 'react';

const BrownTextExample: React.FC = () => {
  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Contoh Teks Coklat</h1>

      {/* Basic brown text */}
      <p className="text-brown mb-4">
        Ini adalah teks coklat biasa menggunakan class text-brown
      </p>

      {/* Light brown text */}
      <p className="text-brown-light mb-4">
        Ini adalah teks coklat muda menggunakan class text-brown-light
      </p>

      {/* Dark brown text */}
      <p className="text-brown-dark mb-4">
        Ini adalah teks coklat gelap menggunakan class text-brown-dark
      </p>

      {/* Amber brown text */}
      <p className="text-amber-brown mb-4">
        Ini adalah teks coklat amber menggunakan class text-amber-brown
      </p>

      {/* Coffee brown text */}
      <p className="text-coffee-brown mb-4">
        Ini adalah teks coklat kopi menggunakan class text-coffee-brown
      </p>

      {/* Espresso text */}
      <p className="text-espresso mb-4">
        Ini adalah teks espresso gelap menggunakan class text-espresso
      </p>

      {/* Gradient brown text */}
      <p className="gradient-brown text-2xl font-bold mb-4">
        Ini adalah teks dengan gradient coklat
      </p>

      {/* Hero title style */}
      <h2 className="hero-title-brown text-4xl mb-4">
        Judul Hero dengan Style Coklat
      </h2>

      {/* About title style */}
      <h3 className="about-title-brown text-2xl mb-4">
        Judul About dengan Style Coklat
      </h3>

      {/* Menu title style */}
      <h4 className="menu-title-brown text-xl mb-4">
        Judul Menu dengan Style Coklat
      </h4>

      {/* Product title style */}
      <h5 className="product-title-brown text-lg mb-4">
        Judul Produk dengan Style Coklat
      </h5>
    </div>
  );
};

export default BrownTextExample;

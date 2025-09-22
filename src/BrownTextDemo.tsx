import React from 'react';
import BrownTextExample from './components/BrownTextExample';

const BrownTextDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Demo Styling Teks Coklat
        </h1>
        <p className="text-center mb-8 text-gray-600">
          Berikut adalah contoh penggunaan berbagai class CSS untuk membuat teks berwarna coklat
        </p>

        <BrownTextExample />

        <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Cara Penggunaan:</h2>
          <div className="space-y-2 text-sm">
            <p><code className="bg-gray-100 px-2 py-1 rounded">text-brown</code> - Teks coklat standar</p>
            <p><code className="bg-gray-100 px-2 py-1 rounded">text-brown-light</code> - Teks coklat muda</p>
            <p><code className="bg-gray-100 px-2 py-1 rounded">text-brown-dark</code> - Teks coklat gelap</p>
            <p><code className="bg-gray-100 px-2 py-1 rounded">text-amber-brown</code> - Teks coklat amber</p>
            <p><code className="bg-gray-100 px-2 py-1 rounded">text-coffee-brown</code> - Teks coklat kopi</p>
            <p><code className="bg-gray-100 px-2 py-1 rounded">text-espresso</code> - Teks espresso gelap</p>
            <p><code className="bg-gray-100 px-2 py-1 rounded">gradient-brown</code> - Teks dengan gradient coklat</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrownTextDemo;

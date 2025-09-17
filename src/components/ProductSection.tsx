import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, ShoppingCart } from "react-feather";

type ProductItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number; // Assuming the API provides a rating field
};

const formatRupiah = (value: number): string =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const ProductSection: React.FC<{
  searchQuery?: string;
  addToCart?: (product: { id: number; name: string; price: number; image: string }) => void;
}> = ({ searchQuery = "", addToCart }) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get("http://localhost:8000/api/products") // backend Laravel
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal memuat produk. Silakan coba lagi.");
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <section className="products" id="products">
      <h2>
        <span>Produk Unggulan </span>Kami
      </h2>
      <p className="text-sm">- Pilihan kopi terbaik untuk kamu -</p>
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Memuat produk...</p>
      </div>
    </section>
  );

  if (error) return (
    <section className="products" id="products">
      <h2>
        <span>Produk Unggulan </span>Kami
      </h2>
      <p className="text-sm">- Pilihan kopi terbaik untuk kamu -</p>
      <div className="flex justify-center items-center h-40">
        <p className="text-red-500">{error}</p>
      </div>
    </section>
  );

  return (
    <section className="products" id="products">
      <h2>
        <span>Produk Unggulan </span>Kami
      </h2>
      <p className="text-sm">- Pilihan kopi terbaik untuk kamu -</p>
      {searchQuery && (
        <p className="text-sm mb-2">
          Menampilkan hasil pencarian untuk: <strong>{searchQuery}</strong>
        </p>
      )}


      <div className="row grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">Tidak ada produk yang cocok.</p>
        ) : (
          filteredProducts.map((item) => (
            <div
              className="menu-card bg-white rounded-2xl shadow-md p-4 text-center hover:shadow-lg transition-shadow"
              key={item.id}
              style={{ border: 'none' }}
            >
              <div className="relative group flex justify-center">
                <img
                  src={`http://localhost:8000/storage/${item.image}`}
                  alt={item.name}
                  className="menu-card-img mx-auto rounded-xl shadow-md object-cover transition-all duration-300 group-hover:brightness-50"
                  style={{ height: "50%", width: "50%", maxWidth: "300px", borderRadius: "50%" }}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-100 transition-opacity duration-300 rounded-full">
            <button
              className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 transition"
              onClick={() => {
                setSelectedProduct(item);
                setIsModalOpen(true);
              }}
              aria-label={`Lihat detail ${item.name}`}
            >
              <Eye size={16} className="text-white" />
            </button>
                </div>
              </div>
              <h3 className="menu-card-title mt-1 text-xl font-semibold">
                {item.name}
              </h3>
            </div>
          ))
        )}
      </div>

      {/* Product Detail Modal */}
      {isModalOpen && selectedProduct && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100000,
            width: '100%',
            height: '100%'
          }}
          onClick={() => {
            console.log('Modal backdrop clicked');
            setIsModalOpen(false);
          }}
        >
          {(() => {
            console.log('Modal is rendering for product:', selectedProduct.name);
            console.log('Modal DOM should be visible now');
            return null;
          })()}
          <div
            style={{
              backgroundColor: 'black',  
              borderRadius: '1rem',
              padding: '1.5rem',
              maxWidth: '50rem',
              width: '100%',
              margin: '0 1rem',
              maxHeight: '50rem',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative',
              zIndex: 100001,
              color: 'white'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{selectedProduct.name}</h3>
              <button
                onClick={() => {
                  console.log('Closing modal');
                  setIsModalOpen(false);
                }}
                className="text-gray-300 hover:text-gray-100 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mb-10 mr4 flex">
              <div className="w-1/3">
                <img
                  src={`http://localhost:8000/storage/${selectedProduct.image}`}
                  alt={selectedProduct.name}
                  className="w-full rounded-xl"
                  onError={(e) => {
                    console.log('Image failed to load:', selectedProduct.image);
                    e.currentTarget.src = '/assets/images/placeholder.jpg';
                  }}
                />
              </div>
              <div className="w-2/3 pl-6">
                <h4 className="font-semibold text-gray-200 mb-2"></h4>
                <p className="text-gray-300 leading-relaxed font-sans text-justify max-w-[calc(100%-4rem)] break-words">{selectedProduct.description}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-10 border-gray-600 border-t">
              <div className="text-amber-300 font-bold text-4xl" style={{ fontSize: "1.5rem" }}>
                {formatRupiah(Number(selectedProduct.price))}
              </div>
          <button
            className="flex items-center justify-center w-8 h-8 mt-4 rounded-lg bg-amber-500 hover:bg-amber-600 transition"
            onClick={() => {
              if (addToCart) {
                addToCart({
                  id: selectedProduct.id,
                  name: selectedProduct.name,
                  price: Number(selectedProduct.price),
                  image: selectedProduct.image
                });
                alert(`${selectedProduct.name} telah ditambahkan ke keranjang!`);
                setIsModalOpen(false);
              }
            }}
            aria-label={`Tambah ${selectedProduct.name} ke keranjang`}
          >
            <ShoppingCart size={20} className="text-white" />
          </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductSection;




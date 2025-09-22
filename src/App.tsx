import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MenuSection from './components/MenuSection';
import ProductSection from './components/ProductSection';
import ContactSection from './components/ContactSection';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
// import './script.js';

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const addToCart = (product: { id: number; name: string; price: number; image: string }) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const submitOrder = async () => {
    if (cart.length === 0) {
      alert("Keranjang kosong. Tambahkan produk terlebih dahulu.");
      return;
    }
    try {
      const orderData = {
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total: cart.reduce((total, item) => total + item.price * item.quantity, 0)
      };
      const response = await axios.post("http://localhost:8000/api/orders", orderData);
      if (response.status === 201 || response.status === 200) {
        alert("Pesanan berhasil dikirim!");
        clearCart();
      } else {
        alert("Gagal mengirim pesanan. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Terjadi kesalahan saat mengirim pesanan.");
    }
  };

  return (
    <>
      <Navbar
        onSearch={handleSearch}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        clearCart={clearCart}
        submitOrder={submitOrder}
      />
      <Hero />
      <About />
      <MenuSection />
      <ProductSection searchQuery={searchQuery} addToCart={addToCart} />
      <ContactSection />
      <Gallery />
      <Footer />
    </>
  );
}

export default App;
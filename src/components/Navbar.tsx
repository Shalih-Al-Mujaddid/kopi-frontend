import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Menu, Search, X } from "react-feather";

interface NavbarProps {
  onSearch: (query: string) => void;
  cart?: {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }[];
  removeFromCart?: (id: number) => void;
  updateQuantity?: (id: number, quantity: number) => void;
  clearCart?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onSearch,
  cart = [],
  removeFromCart,
  updateQuantity,
  clearCart
}) => {
  const [isNavActive, setNavActive] = useState(false);
  const [isSearchActive, setSearchActive] = useState(false);
  const [isCartActive, setCartActive] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const navRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLFormElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        navRef.current &&
        !navRef.current.contains(target) &&
        !(event.target as HTMLElement).closest("#hamburger-menu")
      ) {
        setNavActive(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(target) &&
        !(event.target as HTMLElement).closest("#search-button")
      ) {
        setSearchActive(false);
      }

      if (
        cartRef.current &&
        !cartRef.current.contains(target) &&
        !(event.target as HTMLElement).closest("#shopping-cart-button")
      ) {
        setCartActive(false);
      }

      if (modalRef.current && event.target === modalRef.current) {
        setModalOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // focus input kalau search aktif
  useEffect(() => {
    if (isSearchActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchActive]);

  // auto buka search kalau user langsung ngetik
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        !isSearchActive &&
        event.key.length === 1 &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        setSearchActive(true);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchActive]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    onSearch(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchActive(false);
    window.location.hash = "#products";
  };

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <a href="#" className="navbar-logo">
          Kopi<span>Hitam</span>.
        </a>

        {/* Navbar Menu */}
        <div
          className={`navbar-nav ${isNavActive ? "active" : ""}`}
          ref={navRef}
        >
          <a href="#home">Beranda</a>
          <a href="#about">Tentang Kami</a>
          <a href="#menu">Menu</a>
          <a href="#products">Produk</a>
          <a href="#contact">Kontak</a>
          <a href="#galery">Galeri</a>
        </div>

        {/* Icon Buttons */}
        <div className="navbar-extra">
          {/* Search */}
          <a
            href="#"
            id="search-button"
            onClick={(e) => {
              e.preventDefault();
              setSearchActive((prev) => !prev);
            }}
          >
            <Search size={20} />
          </a>

          {/* Cart */}
          <a
            href="#"
            id="shopping-cart-button"
            onClick={(e) => {
              e.preventDefault();
              setCartActive((prev) => !prev);
            }}
          >
            <ShoppingCart size={20} />
            <span className="quantity-badge">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
          </a>

          {/* Hamburger */}
          <a
            href="#"
            id="hamburger-menu"
            onClick={(e) => {
              e.preventDefault();
              setNavActive((prev) => !prev);
            }}
          >
            <Menu size={20} />
          </a>
        </div>

        {/* Search Form */}
        <form
          className={`search-form ${isSearchActive ? "active" : ""}`}
          ref={searchRef}
          onSubmit={handleSearchSubmit}
        >
          <input
            ref={inputRef}
            type="search"
            id="search-box"
            placeholder="Cari kopi favoritmu..."
            value={searchInput}
            onChange={handleInputChange}
          />
          <button type="submit" aria-label="Search">
            <Search size={20} />
          </button>
        </form>

        {/* Shopping Cart */}
        <div
          className={`shopping-cart ${isCartActive ? "active" : ""} pt-3`}
          ref={cartRef}
        >

          {cart.length === 0 ? (
            <h4 className="text-xl font-semibold mb-2 mt-20">Keranjang Belanja Masih Kosong</h4>
          ) : (
            <>
              <h4 className="text-lg font-semibold mb-2 mt-4 text-center">
                Keranjang Belanja
              </h4>
              <div className="cart-items space-y-4 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item flex items-center space-x-4 border-b border-gray-300 pb-2">
                    <img
                      src={`http://localhost:8000/storage/${item.image}`}
                      alt={item.name}
                      className="cart-item-image w-12 h-12 rounded-full object-cover"
                    />
                    <div className="cart-item-details flex-1">
                    <h5 className="font-bold text-xl">{item.name}</h5>
                    <p className="text-xs text-gray-600">Rp {item.price.toLocaleString()}</p>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity?.(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-black text-white rounded-md text-sm"
                        >
                          -
                        </button>
                        <span className="min-w-[20px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity?.(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-black text-white rounded-md text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart?.(item.id)}
                      className="remove-btn bg-red-500 text-white rounded hover:bg-red-600"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="cart-total mt-4 font-semibold border-t border-gray-300 pt-2">
                <p>Total: Rp {cart.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}</p>
              </div>
            <div className="flex mt-4 gap-4">
              <button
                onClick={() => {
                  if (clearCart) {
                    clearCart();
                    alert("Keranjang telah dikosongkan!");
                  }
                }}
                className="clear-cart-btn bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 flex-1 font-semibold"
              >
                Kosongkan Keranjang
              </button>
              <button
                onClick={() => {
                  alert("Pesan Sekarang: Pembayaran sedang diproses!");
                }}
                className="order-now-btn bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 flex-1 font-semibold"
              >
                Pesan Sekarang
              </button>
            </div>
            </>
          )}
        </div>
      </nav>
g
      {/* MODAL */}
      <div
        id="item-detail-modal"
        className={`modal ${isModalOpen ? "active" : ""}`}
        ref={modalRef}
        style={{ display: isModalOpen ? "flex" : "none" }}
      >
        <div className="modal-content">
          <span
            className="close-icon"
            onClick={(e) => {
              e.preventDefault();
              setModalOpen(false);
            }}
          >
            <X size={20} />
          </span>
          <p>Detail produk ditampilkan di sini...</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;

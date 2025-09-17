import { useEffect } from 'react';
import feather from 'feather-icons';

const Footer = () => {
  useEffect(() => {
    feather.replace();
  }, []);

  return (
    <footer>
      <div className="socials">
        <a href="http://www.instagram.com/@Anda_2030">
          <i data-feather="instagram"></i>
        </a>
        <a href="https://www.youtube.com/@sandhikagalihWPU">
          <i data-feather="youtube"></i>
        </a>
        <a href="https://www.whatsapp.com/+62 821-8943-1943">
          <i data-feather="phone"></i>
        </a>
      </div>

      <div className="links">
        <a href="#home">Beranda</a>
        <a href="#about">Tentang Kami</a>
        <a href="#menu">Menu</a>
        <a href="#contact">Kontak</a>
      </div>

      <div className="credit">
        <p>
          Created By <a href="">Techmakers</a>. | &copy; 2024
        </p>
      </div>
    </footer>
  );
};

export default Footer;

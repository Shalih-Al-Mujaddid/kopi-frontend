import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="about">
      <h2>
        <span>Tentang</span>Kami
      </h2>

      <div className="row">
        <div className="about-img">
          <img src="/assets/img/copy.jpg" alt="Tentang Kami" />
        </div>
        <div className="content">
          <h3>
            Kopi<span>Hitam</span>.
          </h3>
          <p>Kami membuat Kopi dengan IKHLAS</p>
          <p>
            Dengan bahan-bahan berkualitas dan peralatan Terbaik di Dunia sehingga menciptakan Cita Rasa yang sangat
            Nikmat😋 & bikin Ketagihan loh coba aja njink! kopi gue ☠!!!
          </p>
          <p>
            Kami juga mempunyai anggota yang profesional dalam menghias kopi, salah satu dari karya anggota kami
            seperti yang bisa di lihat di samping kanan &larr;
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

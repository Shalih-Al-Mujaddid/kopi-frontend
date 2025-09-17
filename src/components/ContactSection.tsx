import { Mail, Phone, User } from 'react-feather';

const ContactSection = () => {
  return (
    <section id="contact" className="contact">
      <h2>
        <span>Kontak</span> Kami
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
        impedit?
      </p>

      <div className="row">
        <iframe
          className="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d496.66661962650727!2d119.4807710942728!3d-5.21026703410615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee30031dfd741%3A0x225ca2d1189433c!2sPondok%20Informatika%20Al%20Muyassar%20Gowa!5e0!3m2!1sid!2sid!4v1724729939406!5m2!1sid!2sid"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <User />
            <input type="text" placeholder="Nama" />
          </div>

          <div className="input-group">
            <Mail />
            <input type="text" placeholder="Email" />
          </div>

          <div className="input-group">
            <Phone />
            <input type="text" placeholder="No.HP" />
          </div>

          <button type="submit" className="btn">
            Kirim Pesan
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;

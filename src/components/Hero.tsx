import React, { useEffect, useState } from "react";
import axios from "axios";

interface Banner {
  id: number;
  title: string;
  title_secondary?: string | null;
  subtitle?: string | null;
  image: string;
  image_url?: string | null;
  link?: string | null;
  is_active: number | string;
  text_color?: string | null;
}

const Hero: React.FC = () => {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/banners");
        localStorage.setItem("bannerData", JSON.stringify(res.data.data));
        console.log( res.data.data.length);

        const activeBanner = res.data.data.find(
          (b: Banner) => b.is_active === 1 || b.is_active === "1"
        );

        setBanner(activeBanner || null);
      } catch (err) {
        console.error("Error fetching banners:", err);
        alert("Failed to load banner data. Please check the API.");
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  if (loading) {
    return (
      <section className="hero flex items-center justify-center h-screen text-center text-white bg-gray-800">
        <p>Loading banner...</p>
      </section>
    );
  }

  if (!banner) {
    return (
      <section className="hero flex items-center justify-center h-screen text-center text-white bg-gray-800">
        <p>Tidak ada banner aktif</p>
      </section>
    );
  }

  return (
    <section
      className="hero relative flex items-center justify-center text-center"
      id="home"
      style={{
        backgroundImage: banner.image_url
          ? `url(${banner.image_url})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Konten */}
      <main className="relative z-10 px-4">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold">
          <span className="text-white">{banner.title}</span>
          <span style={{ color: banner.text_color || "#ffffff"}}>
            {banner.title_secondary}
          </span>
        </h1>
      </div>

        {banner.subtitle && (
          <h2>
          <p className="mt-6 text-lg md:text-xl font-sans text-white">
            {banner.subtitle}
          </p>
          </h2>
        )}

        {banner.link && (
          <h3>
          <a
            href={banner.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-sans text-white hover:underline text-bold"
          >
            Lihat Selengkapnya
          </a>
          </h3>
        )}
      </main>
    </section>
  );
};

export default Hero;

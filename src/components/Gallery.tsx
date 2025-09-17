import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "react-feather";

interface GalleryItem {
  id: number;
  title: string;
  description?: string | null;
  image: string;
  is_active: number | string;
}

interface ApiResponse {
  data?: GalleryItem[]; // optional karena bisa langsung array
}

const Gallery: React.FC = () => {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get<ApiResponse | GalleryItem[]>(
          "http://localhost:8000/api/galleries"
        );

        // Fallback parsing
        let items: GalleryItem[] = [];
        if (Array.isArray(res.data)) {
          items = res.data;
        } else if (res.data?.data) {
          items = res.data.data;
        }

        console.log("Fetched gallery data:", items);
        console.log(
          "Constructed image URLs:",
          items.map((item) => `http://localhost:8000/storage/${item.image}`)
        );

        setGalleries(items);
      } catch (err) {
        console.error("Error fetching galleries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <section className="galery flex items-center justify-center h-screen text-center text-white bg-gray-800">
        <p>Loading gallery...</p>
      </section>
    );
  }

  return (
    <section className="galery" id="galery">
      <h2>
        <span>Galeri </span>Kami
      </h2>
      <p>Kami yang terkena paparazi ⤵</p>

      <div className="ga">
        {galleries.map((item) => (
          <div className="product-car" key={item.id}>
            <div className="product-img">
              <a href={`http://localhost:8000/storage/${item.image}`}>
                <img
                  src={`http://localhost:8000/storage/${item.image}`}
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </a>
            </div>
            <div className="product-content">
              <h3>{item.title}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>

              <div className="product-stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="star-full"
                    fill={i < 4 ? "currentColor" : "none"}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;

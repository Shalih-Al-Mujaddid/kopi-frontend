import React, { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
}

const MenuSection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  if (categories.length === 0) {
    return <p className="text-center">Loading menu...</p>;
  }

  return (
    <section id="menu" className="menu">
      <h2>
        <span>Menu </span>Kami
      </h2>
      <p>
        Pilihan kopi spesial dengan cita rasa khas dari berbagai jenis biji kopi.
      </p>

      <div className="row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((item) => (
          <div
            className="menu-card bg-white rounded-2xl shadow-md p-4 text-center"
            key={item.id}
          >
            <a
              href={`http://localhost:8000/storage/${item.image}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={`http://localhost:8000/storage/${item.image}`}
                alt={item.name}
                className="menu-card-img mx-auto rounded-xl shadow-md object-cover"
                style={{ height: "60%", width: "50%", maxWidth: "300px" }}
              />
            </a>
            <h3 className="menu-card-title mt-4 text-xl font-semibold">
              {item.name}
            </h3>
            <p className="menu-card-price text-gray-600 text-sm mt-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;

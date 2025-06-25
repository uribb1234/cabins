import React, { useState, useRef, useEffect } from "react";
import CabinIcon from "./assets/cabinicon.svg?react";

export interface Zimmer {
  id: number;
  name: string;
  price: number;
  description: string;
  images?: string[];
  capacity?: number;
  is_available?: boolean;
  link: string;
}

interface ZimmerCardProps {
  zimmer: Zimmer;
  index?: number;
}

const ZimmerCard: React.FC<ZimmerCardProps> = ({ zimmer }) => {
  if (!zimmer) return <div>טעינה...</div>;

  const {
    name,
    price,
    description,
    images = [],
    capacity = 0,
    is_available = true,
    link,
  } = zimmer;

  const isFamily = capacity >= 3;
  const tagText = isFamily ? "צימר משפחתי" : "צימר זוגי";
  const tagColor = isFamily
    ? "bg-blue-100 text-blue-800 border-blue-200"
    : "bg-green-100 text-green-800 border-green-200";

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [localImages, setLocalImages] = useState([...images]);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex(
      (prev) => (prev + 1) % Math.min(localImages.length, 3)
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + Math.min(localImages.length, 3)) %
        Math.min(localImages.length, 3)
    );
  };

  return (
    <div className="zimmer-border">
      <div className="zimmer-card text-black">
        <a
          href={link}
          className="block h-full rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-white text-black"
        >
          <div className="relative">
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src={
                  localImages[currentImageIndex] ||
                  "https://via.placeholder.com/800x400"
                }
                alt={`${name} - תמונה ${currentImageIndex + 1}`}
                className="w-full h-64 object-cover transition-transform duration-700"
              />
              {localImages.length > 1 && (
                <>
                  <button onClick={prevImage} className="carousel-button prev">
                    ←
                  </button>
                  <button onClick={nextImage} className="carousel-button next">
                    →
                  </button>
                </>
              )}
            </div>
            <div className="absolute bottom-4 left-4 flex items-center space-x-2 icon-title-group">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                <CabinIcon className="w-5 h-5 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-black inline-block align-middle">
                {name}
              </h3>
            </div>
          </div>

          <div className="card-content p-6 flex flex-col gap-4 text-black">
            <div className="flex justify-between items-center">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${tagColor}`}
              >
                {tagText}
              </span>
            </div>

            <p className="text-black mb-0">{description}</p>

            <div className="flex justify-between items-center">
              <span className="price text-orange-500 text-lg font-bold">
                ₪{price} ללילה
              </span>
              <span
                className={`availability text-sm px-3 py-1 rounded-full ${
                  is_available ? "bg-green-200 text-black" : "bg-red-200 text-black"
                }`}
              >
                {is_available ? "פנוי" : "תפוס"}
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ZimmerCard;

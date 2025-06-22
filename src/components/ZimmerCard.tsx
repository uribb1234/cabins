import React from "react";
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
  const {
    name,
    price,
    description,
    images = [],
    capacity = 0,
    is_available = true,
    link,
  } = zimmer;

  // קביעת סוג הצימר לפי כמות האורחים
  const isFamily = capacity >= 3;
  const tagText = isFamily ? "צימר משפחתי" : "צימר זוגי";
  const tagColor = isFamily ? "bg-blue-100 text-blue-800 border-blue-200" : "bg-green-100 text-green-800 border-green-200";

  return (
    <div className="group zimmer-card">
      <a
        href={link}
        className="rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-white text-gray-800 block h-full"
      >
        <div className="relative">
          <img
            src={images[0] || "https://via.placeholder.com/800x400"}
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute bottom-4 left-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <CabinIcon className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        </div>

        <div className="card-content p-6 flex flex-col justify-between h-full">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-2xl font-bold">{name}</h3>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${tagColor}`}>
              {tagText}
            </span>
          </div>

          <p className="text-gray-600 mb-4">{description}</p>

          <div className="flex justify-between items-center mt-auto">
            <span className="price text-orange-500 text-lg font-bold">
              ₪{price} ללילה
            </span>
            <span
              className={`availability text-sm px-3 py-1 rounded-full ${
                is_available ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
              }`}
            >
              {is_available ? "פנוי" : "תפוס"}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ZimmerCard;

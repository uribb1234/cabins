import React from "react";

interface ZimmerCardProps {
  id: number;
  name: string;
  price?: number;
  description?: string;
  images?: string[];
  capacity?: number;
  is_available?: boolean;
  index: number;
  link: string;
}

const ZimmerCard: React.FC<ZimmerCardProps> = ({ id, name, price, description, images = [], capacity = 0, is_available = true, index, link }) => {
  return (
    <div className="group">
      <a href={link} className="rounded-lg text-card-foreground overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm block zimmer-card">
        <div className="relative overflow-hidden">
          <img src={images[0] || "https://via.placeholder.com/800x400"} alt={name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute top-4 right-4">
            <div className="inline-flex items-center rounded-full text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-3 py-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-3 h-3 ml-1">
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
              </svg>
              מומלץ
            </div>
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart w-5 h-5 text-red-500">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="p-6 card-content">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">{name}</h3>
            <div className="text-left">
              <p className="text-2xl font-bold text-amber-600 price">₪{price || 0}</p>
              <p className="text-sm text-gray-500">ללילה</p>
            </div>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">{description || "אין תיאור זמין"}</p>
          <div className="flex flex-wrap gap-3 mb-6 features">
            <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-full feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users w-4 h-4 text-amber-600">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span className="text-sm font-medium text-amber-800">עד {capacity} אורחים</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-full feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wifi w-4 h-4 text-blue-600">
                <path d="M12 20h.01"></path>
                <path d="M2 8.82a15 15 0 0 1 20 0"></path>
                <path d="M5 12.859a10 10 0 0 1 14 0"></path>
                <path d="M8.5 16.429a5 5 0 0 1 7 0"></path>
              </svg>
              <span className="text-sm font-medium text-blue-800">WiFi</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-full feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-car w-4 h-4 text-green-600">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                <circle cx="7" cy="17" r="2"></circle>
                <path d="M9 17h6"></path>
                <circle cx="17" cy="17" r="2"></circle>
              </svg>
              <span className="text-sm font-medium text-green-800">חניה</span>
            </div>
          </div>
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 bg-green-100 text-green-800 border-green-200 availability">
            {is_available ? "זמין להזמנה" : "לא זמין"}
          </div>
        </div>
      </a>
    </div>
  );
};

export default ZimmerCard; // שמור רק את היצוא הזה בסוף
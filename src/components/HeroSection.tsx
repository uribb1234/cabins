import React from "react";
import ZimmerCard from "@/components/ZimmerCard.tsx";
import { Calendar } from "lucide-react";

export default function HeroSection() {
  const zimmers = [
    { name: "אלה", price: 520, description: "צימר רומנטי עם נוף מרהיב ואמבטיה מפנקת", imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", link: "/room-ela", maxGuests: 2 },
    { name: "אלון", price: 380, description: "צימר משפחתי נעים עם חצר ופינת ילדים", imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", link: "/room-alon", maxGuests: 6 },
    { name: "תאנה", price: 400, description: "צימר שקט עם אווירה מרגיעה וג'קוזי", imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", link: "/room-tnina", maxGuests: 3 },
    { name: "רימון", price: 450, description: "צימר יוקרתי עם נוף פנורמי וחצר פרטית", imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", link: "/room-rimon", maxGuests: 4 },
  ];

  return (
    <section className="min-h-screen bg-teal-500 text-white flex flex-col items-center justify-center p-6">
      <h1
        dir="rtl"
        className="text-5xl md:text-7xl font-bold mb-6 text-center px-4 hero-title"
      >
        צימרים אלה ואלון בשומרון
      </h1>

      <p
        dir="rtl"
        className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-center px-4"
      >
        חוויה בלתי נשכחת בלב הטבע
        <br />
        <span dir="rtl" className="text-lg md:text-xl text-yellow-200">
          ארבעה צימרים יוקרתיים במיקום אחד מושלם
        </span>
      </p>

      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
        <div className="p-2">
          <a
            href="/form.html"
            className="custom-button"
          >
            <Calendar className="w-6 h-6" />
            מלאו טופס הזמנה
          </a>
        </div>

        <div className="p-2">
          <a
            href="https://www.zimmerland.co.il/%D7%90%D7%9C%D7%94-%D7%95%D7%90%D7%9C%D7%95%D7%9F-%D7%91%D7%A9%D7%95%D7%9E%D7%A8%D7%95%D7%9F.html"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 text-white px-6 py-4 text-lg font-semibold rounded-lg border border-white/30 hover:bg-white/20 transition-colors block"
          >
            הזמנה באתר צימרלנד
          </a>
        </div>
      </div>

      <div
        dir="rtl"
        className="flex items-center justify-center gap-2 text-yellow-200 mb-10 px-4"
      >
        <span className="text-lg">מתחם נופש מדהים לאירוח זוגות ומשפחות...</span>
      </div>
        <h2>הצימרים שלנו</h2>

      <div className="grid grid-cols-2 gap-8 w-full max-w-6xl" style={{ display: 'grid !important', gridTemplateColumns: '1fr 1fr !important' }}>
        {zimmers.map((zimmer) => (
          <ZimmerCard
            key={zimmer.name}
            id={Date.now() + Math.random()}
            name={zimmer.name}
            price={zimmer.price}
            description={zimmer.description}
            link={zimmer.link}
            capacity={zimmer.maxGuests}
            images={[zimmer.imageUrl]}
            is_available={true}
            index={zimmers.indexOf(zimmer)}
          />
        ))}
      </div>
    </section>
  );
}
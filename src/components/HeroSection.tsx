import React from "react";
import ZimmerCard, { Zimmer } from "./ZimmerCard";
import { Calendar } from "lucide-react";

interface HeroSectionProps {
  zimmers: Zimmer[];
}

export default function HeroSection({ zimmers }: HeroSectionProps) {
  return (
    <section
      dir="rtl"
      className="min-h-screen bg-teal-500 text-white flex flex-col items-center justify-center py-12 px-4"
    >
      <div className="w-full max-w-6xl text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 px-4 hero-title">
          צימרים אלה ואלון בשומרון
        </h1>

        <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto px-4">
          חוויה בלתי נשכחת בלב הטבע
          <br />
          <span className="text-lg md:text-xl text-yellow-200">
            ארבעה צימרים יוקרתיים במיקום אחד מושלם
          </span>
        </p>

        <div className="flex flex-col sm:flex-row-reverse gap-6 justify-center items-center mb-16">
          <a href="/form.html" className="custom-button flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            מלאו טופס הזמנה
          </a>
          <a
            href="https://www.zimmerland.co.il/%D7%90%D7%9C%D7%94-%D7%95%D7%90%D7%9C%D7%95%D7%9F-%D7%91%D7%A9%D7%95%D7%9E%D7%A8%D7%95%D7%9F.html"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 text-white px-6 py-4 text-lg font-semibold rounded-lg border border-white/30 hover:bg-white/20 transition-colors block"
          >
            הזמנה באתר צימרלנד
          </a>
        </div>

        <h2 className="text-3xl font-semibold mb-8">הצימרים שלנו</h2>
      </div>

      {/* גריד עם מרווחים קטנים */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 w-full max-w-6xl">
        {zimmers.map((zimmer) => (
          <ZimmerCard key={zimmer.id} zimmer={zimmer} />
        ))}
      </div>
    </section>
  );
}
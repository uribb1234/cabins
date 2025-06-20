import React, { useState, useEffect } from "react";
import { Zimmer } from "@/entities/Zimmer";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Wifi, 
  Car, 
  Mountain, 
  Heart,
  MessageCircle,
  Calendar,
  Star,
  MapPin,
  Phone
} from "lucide-react";
import { motion } from "framer-motion";

import HeroSection from "../components/home/HeroSection";
import ZimmerCard from "../components/home/ZimmerCard";
import ContactSection from "../components/home/ContactSection";

export default function HomePage() {
  const [zimmers, setZimmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadZimmers();
  }, []);

  const loadZimmers = async () => {
    try {
      const data = await Zimmer.list();
      setZimmers(data);
    } catch (error) {
      console.error("Error loading zimmers:", error);
    }
    setLoading(false);
  };

  return (
    <div className="overflow-hidden">
      <HeroSection />
      
      {/* Featured Section */}
      <section className="py-20 bg-gradient-to-b from-white to-amber-50" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              הצימרים שלנו
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              ארבעה צימרים יוקרתיים במיקום אחד מושלם, כל אחד עם אופי ייחודי משלו
            </p>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-2xl mb-4"></div>
                  <div className="bg-gray-200 h-6 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {zimmers.map((zimmer, index) => (
                <ZimmerCard key={zimmer.id} zimmer={zimmer} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Action Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600" dir="rtl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              מוכנים לחוויה בלתי נשכחת?
            </h2>
            <p className="text-xl text-amber-100 mb-8">
              הזמינו עכשיו או שוחחו איתנו לקבלת מידע נוסף
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to={createPageUrl("Chat")}>
                <Button className="bg-white text-amber-600 hover:bg-amber-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <MessageCircle className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                  צ'אט בוט
                </Button>
              </Link>
              
              <Link to={createPageUrl("Booking")}>
                <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 group">
                  <Calendar className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                  הזמנה ידנית
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
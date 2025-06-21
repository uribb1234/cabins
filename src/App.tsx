import React from "react";
import HeroSection from "./components/HeroSection";
import ContactSection from "./components/ContactSection";
import { Zimmer } from "./components/ZimmerCard";

const rawZimmers: Zimmer[] = [
  {
    id: 1,
    name: "אלה",
    price: 520,
    description: "צימר רומנטי עם נוף מרהיב ואמבטיה מפנקת",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    capacity: 2,
    is_available: true,
    link: "/room-ela",
  },
  {
    id: 2,
    name: "אלון",
    price: 380,
    description: "צימר משפחתי נעים עם חצר ופינת ילדים",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    capacity: 6,
    is_available: true,
    link: "/room-alon",
  },
  {
    id: 3,
    name: "תאנה",
    price: 400,
    description: "צימר שקט עם אווירה מרגיעה וג'קוזי",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    capacity: 3,
    is_available: true,
    link: "/room-tnina",
  },
  {
    id: 4,
    name: "רימון",
    price: 450,
    description: "צימר יוקרתי עם נוף פנורמי וחצר פרטית",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    capacity: 4,
    is_available: true,
    link: "/room-rimon",
  },
];

function App() {
  return (
    <div>
      <HeroSection zimmers={rawZimmers} />
      <ContactSection />
    </div>
  );
}

export default App;

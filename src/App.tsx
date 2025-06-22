import React from "react";
import HeroSection from "./components/HeroSection";
import ContactSection from "./components/ContactSection";
import { Zimmer } from "./components/ZimmerCard";
import CabinIcon from "./assets/cabinicon.svg?react";
import smallPoolImage from "./components/assets/smallpool.jpeg";
import fig from "./components/assets/fig.jpeg";
import alon from "./components/assets/alon.png";
import ela from "./components/assets/ela.png";




const rawZimmers: Zimmer[] = [
  {
    id: 1,
    name: "אלה",
    price: 520,
    description: "צימר רומנטי עם נוף מרהיב ואמבטיה מפנקת",
    images: [ela],
    capacity: 6,
    is_available: true,
    link: "/room-ela",
  },
  {
    id: 2,
    name: "אלון",
    price: 380,
    description: "צימר משפחתי נעים עם חצר ופינת ילדים",
    images: [alon],
    capacity: 6,
    is_available: true,
    link: "/room-alon",
  },
  {
    id: 3,
    name: "תאנה",
    price: 400,
    description: "צימר שקט עם אווירה מרגיעה וג'קוזי",
    capacity: 2,
    images: [fig],
    is_available: true,
    link: "/room-fig",
  },
  {
    id: 4,
    name: "רימון",
    price: 450,
    description: "צימר יוקרתי עם נוף פנורמי וחצר פרטית",
    images: [smallPoolImage], 
    capacity: 2,
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
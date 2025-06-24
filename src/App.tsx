import React from "react";
import HeroSection from "./components/HeroSection";
import ContactSection from "./components/ContactSection";
import { Zimmer } from "./components/ZimmerCard";
import CabinIcon from "./assets/cabinicon.svg?react";
import smallPoolImage from "./components/assets/smallpool.png";
import fig from "./components/assets/fig.jpeg"; 
import fig2 from "./components/assets/fig2.png"; 
import fig3 from "./components/assets/fig3.png"; 
import alon from "./components/assets/alon.png";
import ela from "./components/assets/ela.png";
import ela2 from "./components/assets/ela2.png";
import rimon from "./components/assets/rimon.png"; 
import rimon2 from "./components/assets/rimon2.png"; 
import bigpool from "./components/assets/bigpool.png"; 
import alon2 from "./components/assets/alon2.png"; 



import NavMenu from "./NavMenu";

const rawZimmers: Zimmer[] = [
  {
    id: 1,
    name: "אלה",
    price: 520,
    description: "צימר רומנטי עם נוף מרהיב ואמבטיה מפנקת",
    images: [ela, bigpool, ela2], 
    capacity: 6,
    is_available: true,
    link: "/room-ela",
  },
  {
    id: 2,
    name: "אלון",
    price: 380,
    description: "צימר משפחתי נעים עם חצר ופינת ילדים",
    images: [alon, bigpool, alon2 ], 
    is_available: true,
    link: "/room-alon",
  },
  {
    id: 3,
    name: "תאנה",
    price: 400,
    description: "צימר שקט עם אווירה מרגיעה וג'קוזי",
    images: [fig, fig2, fig3],
    capacity: 2,
    is_available: true,
    link: "/room-fig",
  },
  {
    id: 4,
    name: "רימון",
    price: 450,
    description: "צימר יוקרתי עם נוף פנורמי וחצר פרטית",
    images: [ rimon ,smallPoolImage , rimon2],
    capacity: 2,
    is_available: true,
    link: "/room-rimon",
  },
];

function App() {
  return (
    <div>
      <NavMenu />
      <HeroSection zimmers={rawZimmers} />
      <ContactSection id="contact" />
    </div>
  );
}

export default App;
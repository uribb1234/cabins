import React from "react";
import HeroSection from "./components/HeroSection";
import ContactSection from "./components/ContactSection";
import { Zimmer } from "./components/ZimmerCard";
import CabinIcon from "./assets/cabinicon.svg?react";
import smallPoolImage from "./components/assets/pictures/smallpool.png";
import fig from "./components/assets/pictures/fig.jpeg"; 
import fig2 from "./components/assets/pictures/fig2.png"; 
import fig3 from "./components/assets/pictures/fig3.png"; 
import alon from "./components/assets/pictures/alon.png";
import ela from "./components/assets/pictures/ela.png";
import ela2 from "./components/assets/pictures/ela2.png";
import rimon from "./components/assets/pictures/rimon.png"; 
import rimon2 from "./components/assets/pictures/rimon2.png"; 
import bigpool from "./components/assets/pictures/bigpool.png"; 
import alon2 from "./components/assets/pictures/alon2.png"; 


import NavMenu from "./NavMenu";

const rawZimmers: Zimmer[] = [
  {
    id: 1,
    name: "אלה",
    price: 800,
    description: "צימר משפחתי עם נוף מרהיב",
    images: [ela, bigpool, ela2], 
    capacity: 6,
    is_available: true,
    link: "/ela-cabin",
  },
  {
    id: 2,
    name: "אלון",
    price: 800,
    description:"צימר משפחתי עם נוף ירוק",
    images: [alon, bigpool, alon2 ], 
    capacity: 6,
    is_available: true,
    link: "/alon-cabin",
  },
  {
    id: 3,
    name: "תאנה",
    price: 680,
    description:"צימר זוגי שקט עם נוף יפיפה",
    images: [fig, fig2, fig3],
    capacity: 2,
    is_available: true,
    link: "/fig-cabin",
  },
  {
    id: 4,
    name: "רימון",
    price: 850,
    description: "צימר זוגי יוקרתי עם נוף יחודי",
    images: [ rimon ,smallPoolImage , rimon2],
    capacity: 2,
    is_available: true,
    link: "/rimon-cabin",
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
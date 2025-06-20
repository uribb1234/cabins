import { useState, useEffect } from 'react';
import './App.css';
import HeroSection from './components/HeroSection';
import ZimmerCard from './components/ZimmerCard';
import ContactSection from './components/ContactSection';

interface Zimmer {
  id: number;
  name: string;
  location?: string;
  price_per_night?: number;
  description?: string;
  capacity?: number;
  features?: string[];
  images?: string[];
  is_available?: boolean;
}

function App() {
  const [zimmers, setZimmers] = useState<Zimmer[]>([]);

  useEffect(() => {
    fetch('/zimmer.json')
      .then((response) => response.json())
      .then((data) => setZimmers(data))
      .catch((error) => console.error('Error loading zimmer.json:', error));
  }, []);

  return (
    <div>
      <HeroSection />
      <main>
        {zimmers.map((zimmer, index) => (
          <ZimmerCard
            key={zimmer.id}
            zimmer={zimmer}
            index={index}
          />
        ))}
      </main>
      <ContactSection />
    </div>
  );
}

export default App;

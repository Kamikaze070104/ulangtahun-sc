import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import ReasonCard from './components/ReasonCard';
import NavigationDots from './components/NavigationDots';
import FinaleSection from './components/FinaleSection';
import ProgressBar from './components/ProgressBar';
import LoadingOverlay from './components/LoadingOverlay';
import MemoryGallery from './components/MemoryGallery';
import CandleBlowSection from './components/CandleBlowSection';
import GamesPage from './pages/GamesPage';
import { getAllReasons } from './data/reasons';
import { useScrollTracking } from './hooks/useScrollTracking';

function HomePage() {
  const reasons = getAllReasons();
  const currentIndex = useScrollTracking();
  const containerRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure smooth scrolling is enabled
    document.documentElement.classList.add('scroll-smooth');
    return () => {
      document.documentElement.classList.remove('scroll-smooth');
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Loading Overlay - shows on first visit/refresh */}
      {isLoading && <LoadingOverlay onLoadingComplete={handleLoadingComplete} />}

      <main
        ref={containerRef}
        className="bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 min-h-screen relative scroll-container hide-scrollbar"
      >
        {/* Progress Bar - Visible on all devices, tracks this container */}
        <ProgressBar containerRef={containerRef} />

        {/* Navigation Dots - Hidden on mobile, handled by CSS media queries in component */}
        <NavigationDots total={reasons.length} currentIndex={currentIndex} />

        {/* Hero Section */}
        <HeroSection isLoading={isLoading} />

        {/* Reason Cards */}
        {reasons.map((reason, index) => (
          <ReasonCard
            key={reason.id}
            reason={reason}
            index={index}
          />
        ))}

        {/* Memory Gallery - Photo memories section */}
        <MemoryGallery />

        {/* Candle Blow Section - Interactive 22nd birthday cake */}
        <CandleBlowSection />

        {/* Finale Section */}
        <FinaleSection />
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

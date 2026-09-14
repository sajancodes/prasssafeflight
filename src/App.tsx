import React, { useState, useEffect } from 'react';
import { CinematicIntro } from './components/intro/CinematicIntro';
import { FlightJourney } from './components/journey/FlightJourney';
import { CloudTransition } from './components/clouds/CloudTransition';
import { Scrapbook } from './components/memories/Scrapbook';
import { SuitcaseSection } from './components/suitcase/SuitcaseSection';
import { CanadaHopes } from './components/wishes/CanadaHopes';
import { PhotoTimeline } from './components/timeline/PhotoTimeline';
import { OpenWhenLetters } from './components/letters/OpenWhenLetters';
import { FarewellCake3D } from './components/cake/FarewellCake3D';
import { EmotionalSilence } from './components/silence/EmotionalSilence';
import { FinalLetter } from './components/letter/FinalLetter';
import { FinalFlight } from './components/finale/FinalFlight';
import { HeaderNav } from './components/common/HeaderNav';
import { MusicPlayer } from './components/common/MusicPlayer';
import { PhotoModal } from './components/common/PhotoModal';
import { AllPhotosGallery } from './components/gallery/AllPhotosGallery';
import { AirplaneTransition } from './components/common/AirplaneTransition';
import { SurpriseArcadePage } from './components/arcade/SurpriseArcadePage';
import { PhotoItem } from './data/photos';
import { soundscape } from './utils/audio';

export function App() {
  const [currentPage, setCurrentPage] = useState<'journey' | 'arcade'>('journey');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState<'journey' | 'arcade'>('arcade');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('scene-intro');

  // Trigger background nostalgic music autoplay upon coming to the site
  useEffect(() => {
    soundscape.startAutoplay();
  }, []);

  const handleNavigatePage = (target: 'journey' | 'arcade') => {
    if (target === currentPage || isTransitioning) return;
    setTransitionTarget(target);
    setIsTransitioning(true);
  };

  const handleTransitionMidpoint = () => {
    setCurrentPage(transitionTarget);
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
  };

  const handleStartJourney = () => {
    const flightEl = document.getElementById('scene-flight');
    if (flightEl) {
      flightEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Observe active section on scroll when in journey mode
  useEffect(() => {
    if (currentPage !== 'journey') return;

    const sectionIds = [
      'scene-intro',
      'scene-flight',
      'scene-clouds',
      'scene-scrapbook',
      'scene-suitcase',
      'scene-hopes',
      'scene-timeline',
      'scene-letters',
      'scene-cake',
      'scene-silence',
      'scene-final-letter',
      'scene-finale',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentPage]);

  return (
    <div className="relative min-h-screen bg-[#07080b] text-[#ece8e1] selection:bg-[#c0392b] selection:text-white">
      {/* Top Floating Navigation Bar */}
      <HeaderNav
        activeSection={activeSection}
        currentPage={currentPage}
        onNavigate={handleNavigatePage}
        onOpenGallery={() => setIsGalleryOpen(true)}
      />

      {/* Floating Web Audio Soundscape / Music Player */}
      <MusicPlayer />

      {/* Vertical Flying Airplane Transition Overlay */}
      <AirplaneTransition
        isActive={isTransitioning}
        destinationLabel={
          transitionTarget === 'arcade'
            ? "Boarding Flight to Didi's Surprise Arcade 🍁"
            : 'Returning to Farewell Journey ✈️'
        }
        onMidpoint={handleTransitionMidpoint}
        onComplete={handleTransitionComplete}
      />

      {/* Primary Page Content Router */}
      {currentPage === 'journey' ? (
        <main className="w-full">
          {/* Scene 1: Cinematic Intro */}
          <CinematicIntro onStart={handleStartJourney} />

          {/* Scene 2: Nepal → Canada Geodesic Flight Route */}
          <FlightJourney />

          {/* Scene 3: Through the Clouds Transition */}
          <CloudTransition />

          {/* Scene 4: Interactive Memory Scrapbook */}
          <Scrapbook
            onSelectPhoto={(photo) => setSelectedPhoto(photo)}
            onOpenGallery={() => setIsGalleryOpen(true)}
          />

          {/* Scene 5: The Interactive Suitcase */}
          <SuitcaseSection />

          {/* Scene 6: Things I Hope Canada Gives You */}
          <CanadaHopes />

          {/* Scene 7: Visual Photo Timeline (Then → Now) */}
          <PhotoTimeline onSelectPhoto={(photo) => setSelectedPhoto(photo)} />

          {/* Scene 8: Open When... Envelopes */}
          <OpenWhenLetters />

          {/* Scene 9: Photorealistic 3D Farewell Cake (Three.js / WebGL) */}
          <FarewellCake3D onNavigateSurprise={() => handleNavigatePage('arcade')} />

          {/* Scene 10: Emotional Silence & Best Portrait Spotlight */}
          <EmotionalSilence onSelectPhoto={(photo) => setSelectedPhoto(photo)} />

          {/* Scene 11: Final Personal Letter */}
          <FinalLetter />

          {/* Scene 12: Final Flight Arrival & Sky Lantern Blessings */}
          <FinalFlight />
        </main>
      ) : (
        <SurpriseArcadePage onNavigateHome={() => handleNavigatePage('journey')} />
      )}

      {/* High-Resolution Polaroid Inspection Lightbox */}
      <PhotoModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />

      {/* Complete 50+ Photos Vault Gallery Modal */}
      <AllPhotosGallery
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onSelectPhoto={(photo) => {
          setIsGalleryOpen(false);
          setSelectedPhoto(photo);
        }}
      />
    </div>
  );
}

export default App;

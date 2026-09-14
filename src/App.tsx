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
import { Sparkles, Plane, ArrowRight } from 'lucide-react';

export function App() {
  const [currentPage, setCurrentPage] = useState<'journey' | 'arcade'>('journey');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState<'journey' | 'arcade'>('arcade');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('scene-intro');

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

          {/* Scene 13: Gateway to Surprise Arcade & Mini-Games */}
          <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-[#07080b] via-[#0e1322] to-[#07090e] text-center border-t border-white/10 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#0d101a] border-2 border-amber-400/40 shadow-[0_0_50px_rgba(245,158,11,0.15)] space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Special Surprise Departure Vault</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif-title font-extrabold text-white leading-tight">
                Didi&apos;s Canada Send-Off Arcade 🍁🎮
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto font-sans leading-relaxed">
                We designed an exclusive world of interactive games, challenges, and keepsakes for you: the 23kg Luggage Weigh-In, Canadian Slang Survival Quiz, Memory Match, and your official VIP First-Class Boarding Pass!
              </p>

              <div className="pt-2">
                <button
                  id="launch-arcade-flight-button"
                  onClick={() => handleNavigatePage('arcade')}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 hover:brightness-110 text-white font-bold text-base shadow-2xl shadow-red-950 transition-all active:scale-95 cursor-pointer group"
                >
                  <Plane className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                  <span>Fly to Surprise Arcade</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </section>
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

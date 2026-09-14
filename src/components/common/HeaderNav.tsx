import React, { useState, useEffect } from 'react';
import { Plane, Compass, Heart, Cake, Image as ImageIcon, MapPin } from 'lucide-react';
import { appConfig } from '../../data/config';

interface HeaderNavProps {
  onOpenGallery: () => void;
  activeSection: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onOpenGallery, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'scene-flight', label: 'Route', icon: MapPin },
    { id: 'scene-scrapbook', label: 'Scrapbook', icon: Compass },
    { id: 'scene-suitcase', label: 'Suitcase', icon: Heart },
    { id: 'scene-letters', label: 'Open When', icon: Heart },
    { id: 'scene-cake', label: 'Farewell Cake', icon: Cake },
    { id: 'scene-finale', label: 'Final Letter', icon: Plane },
  ];

  return (
    <header
      id="main-navigation-bar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[#0b0c10]/85 backdrop-blur-md border-b border-white/5 shadow-xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Title */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 text-left group"
        >
          <span className="w-8 h-8 rounded-full bg-red-950/40 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform">
            ✈️
          </span>
          <div>
            <div className="text-sm font-semibold tracking-wide text-white/90 group-hover:text-white flex items-center gap-1.5 font-serif-title">
              <span>{appConfig.recipientName}</span>
              <span className="text-xs text-white/40 font-sans">|</span>
              <span className="text-xs text-amber-300/80 font-sans tracking-normal">Nepal → Canada</span>
            </div>
            <div className="text-[10px] text-white/40 tracking-wider uppercase hidden sm:block">
              A New Chapter
            </div>
          </div>
        </button>

        {/* Quick links & Gallery trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-full text-xs">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1 rounded-full transition-all text-xs font-medium ${
                  activeSection === item.id
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            id="view-all-photos-button"
            onClick={onOpenGallery}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-900/30 hover:bg-red-800/40 border border-red-500/30 text-red-200 text-xs font-medium transition-all shadow-sm active:scale-95"
          >
            <ImageIcon className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden xs:inline">Photo Vault</span>
            <span className="text-[10px] bg-red-500/30 px-1.5 py-0.2 rounded-full font-mono text-red-200">50+</span>
          </button>
        </div>
      </div>
    </header>
  );
};

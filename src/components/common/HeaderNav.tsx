import React, { useState, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { appConfig } from '../../data/config';

interface HeaderNavProps {
  onOpenGallery: () => void;
  activeSection: string;
  currentPage: 'journey' | 'arcade';
  onNavigate: (page: 'journey' | 'arcade') => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onOpenGallery,
  currentPage,
  onNavigate,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          onClick={() => {
            if (currentPage !== 'journey') {
              onNavigate('journey');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
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

        {/* Navigation triggers */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Arcade Page Switcher with Airplane indicator */}
          {currentPage === 'journey' ? (
            <button
              id="nav-to-arcade-button"
              onClick={() => onNavigate('arcade')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-red-500/20 hover:from-amber-500/30 hover:to-red-500/30 border border-amber-400/40 text-amber-200 text-xs font-medium transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <span>🍁 Surprise Arcade</span>
              <span className="text-[10px] bg-amber-400/30 px-1.5 py-0.2 rounded-full font-mono text-amber-100">
                New!
              </span>
            </button>
          ) : (
            <button
              id="nav-to-journey-button"
              onClick={() => onNavigate('journey')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-medium transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <span>✈️ Farewell Journey</span>
            </button>
          )}

          {/* Photo Vault Trigger */}
          <button
            id="view-all-photos-button"
            onClick={onOpenGallery}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-900/30 hover:bg-red-800/40 border border-red-500/30 text-red-200 text-xs font-medium transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden xs:inline">Photo Vault</span>
            <span className="text-[10px] bg-red-500/30 px-1.5 py-0.2 rounded-full font-mono text-red-200">
              50+
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

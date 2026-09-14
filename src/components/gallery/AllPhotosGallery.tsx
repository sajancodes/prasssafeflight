import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Search,
  Image as ImageIcon,
  Heart,
  Eye,
  Sparkles,
  MapPin,
  Calendar,
  Shuffle,
  Grid,
  Columns,
  Layers,
  Check,
  Download,
} from 'lucide-react';
import { photos, PhotoItem } from '../../data/photos';
import { soundscape } from '../../utils/audio';

interface AllPhotosGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto: (photo: PhotoItem) => void;
}

type CategoryFilter = 'all' | 'scrapbook' | 'timeline' | 'portrait' | 'favorites';
type ViewMode = 'cards' | 'polaroid' | 'compact';

export const AllPhotosGallery: React.FC<AllPhotosGalleryProps> = ({
  isOpen,
  onClose,
  onSelectPhoto,
}) => {
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('didi_favorite_photos');
      return saved ? JSON.parse(saved) : ['portrait-1', 'highlight-1', 'scrapbook-1'];
    } catch {
      return ['portrait-1', 'highlight-1', 'scrapbook-1'];
    }
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundscape.playBubblePopSound();
    setFavoriteIds((prev) => {
      const next = prev.includes(id) ? prev.filter((it) => it !== id) : [...prev, id];
      try {
        localStorage.setItem('didi_favorite_photos', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleRandomMemory = () => {
    if (photos.length === 0) return;
    soundscape.playCardFlipSound();
    const randomIndex = Math.floor(Math.random() * photos.length);
    const chosen = photos[randomIndex];
    onSelectPhoto(chosen);
  };

  const filteredPhotos = useMemo(() => {
    return photos.filter((p) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'favorites' && favoriteIds.includes(p.id)) ||
        (filter === 'scrapbook' && p.category === 'scrapbook') ||
        (filter === 'timeline' && p.category.startsWith('timeline')) ||
        (filter === 'portrait' && (p.category === 'portrait' || p.category === 'highlight'));

      const query = search.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        p.caption.toLowerCase().includes(query) ||
        (p.note && p.note.toLowerCase().includes(query)) ||
        (p.location && p.location.toLowerCase().includes(query)) ||
        (p.date && p.date.toLowerCase().includes(query));

      return matchesFilter && matchesSearch;
    });
  }, [filter, search, favoriteIds]);

  if (!isOpen) return null;

  return (
    <div
      id="gallery-vault-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300 select-none"
      onClick={onClose}
    >
      <div
        className="relative max-w-7xl w-full h-[94vh] bg-[#0c0e17] text-[#ece8e1] rounded-3xl border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Bar */}
        <div className="relative z-10 px-5 sm:px-8 py-5 border-b border-white/10 bg-[#0c0e17]/95 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500/20 via-amber-500/20 to-red-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
              <ImageIcon className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-white tracking-wide">
                  Prasamsa Didi&apos;s Photo Vault
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {photos.length} Photographs
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-sans mt-0.5">
                Preserved with endless love from Nepal to accompany you across Canadian skies ✈️🤍
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Surprise Random Memory Button */}
            <button
              onClick={handleRandomMemory}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-xs text-amber-300 font-medium transition-all active:scale-95 cursor-pointer shadow-sm"
              title="Pick a random photo memory"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Surprise Memory</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all active:scale-90 cursor-pointer"
              title="Close Vault (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter, Search & View Controls Bar */}
        <div className="relative z-10 px-5 sm:px-8 py-3.5 border-b border-white/5 bg-[#090a10] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: `All Memories (${photos.length})` },
              { id: 'scrapbook', label: 'Scrapbook Polaroids' },
              { id: 'timeline', label: 'Life Timeline' },
              { id: 'portrait', label: 'Portraits & Radiance' },
              { id: 'favorites', label: `❤️ Favorites (${favoriteIds.length})` },
            ].map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundscape.playBubblePopSound();
                    setFilter(tab.id as CategoryFilter);
                  }}
                  className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-black font-bold shadow-md shadow-amber-950/60 scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search captions, notes, places..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400/70 focus:bg-white/10 transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-full p-0.5">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  viewMode === 'cards' ? 'bg-white/20 text-white' : 'text-neutral-400 hover:text-white'
                }`}
                title="Exhibition Cards"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('polaroid')}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  viewMode === 'polaroid' ? 'bg-white/20 text-white' : 'text-neutral-400 hover:text-white'
                }`}
                title="Polaroid Scrapbook Look"
              >
                <Layers className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  viewMode === 'compact' ? 'bg-white/20 text-white' : 'text-neutral-400 hover:text-white'
                }`}
                title="Dense Grid"
              >
                <Columns className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Photos Exhibition Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 scrollbar-thin">
          <div
            className={`grid gap-4 sm:gap-6 ${
              viewMode === 'compact'
                ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
                : viewMode === 'polaroid'
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}
          >
            {filteredPhotos.map((photo, index) => {
              const isFav = favoriteIds.includes(photo.id);

              // Polaroid Look
              if (viewMode === 'polaroid') {
                return (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.4) }}
                    whileHover={{ scale: 1.02, rotate: 0 }}
                    style={{ rotate: (photo.rotation || (index % 5) - 2) + 'deg' }}
                    onClick={() => onSelectPhoto(photo)}
                    className="group relative bg-[#fdfaf5] text-[#1a1816] rounded-xl p-3 pb-5 shadow-xl hover:shadow-2xl border border-neutral-300 hover:border-amber-400 cursor-pointer transition-all duration-300 flex flex-col"
                  >
                    {/* Washi Tape Accent */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-amber-200/80 backdrop-blur-sm border border-amber-300/60 rounded-sm rotate-[-2deg] shadow-sm z-20 pointer-events-none" />

                    {/* Image Box */}
                    <div className="relative w-full h-56 sm:h-64 bg-neutral-200 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          // Graceful fallback to prevent blank collapse
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />

                      {/* Favorite Heart Button */}
                      <button
                        onClick={(e) => toggleFavorite(photo.id, e)}
                        className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-md shadow-md cursor-pointer ${
                          isFav
                            ? 'bg-red-600 text-white scale-110'
                            : 'bg-black/50 hover:bg-black/80 text-white/80 hover:text-white'
                        }`}
                        title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
                      </button>

                      {/* Inspect Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-medium text-xs">
                        <Eye className="w-4 h-4" />
                        <span>Inspect Memory</span>
                      </div>
                    </div>

                    {/* Polaroid Bottom Notes */}
                    <div className="mt-3 px-1 space-y-1">
                      <p className="font-handwritten text-lg text-neutral-800 font-bold leading-snug line-clamp-1">
                        {photo.caption}
                      </p>
                      {photo.note && (
                        <p className="font-handwritten text-sm text-red-900/80 italic line-clamp-2">
                          &ldquo;{photo.note}&rdquo;
                        </p>
                      )}
                      <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                        <span>{photo.location || 'Nepal'}</span>
                        <span>{photo.date || 'Cherished'}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              // Standard / Compact Exhibition Cards
              return (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.4) }}
                  whileHover={{ y: -4 }}
                  onClick={() => onSelectPhoto(photo)}
                  className="group relative bg-[#131622] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/50 shadow-lg hover:shadow-[0_12px_30px_rgba(245,158,11,0.15)] cursor-pointer transition-all duration-300 flex flex-col"
                >
                  {/* Image Container with rock-solid height so it NEVER collapses */}
                  <div className={`relative w-full ${viewMode === 'compact' ? 'h-48' : 'h-64 sm:h-72'} bg-[#08090f] overflow-hidden shrink-0`}>
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />

                    {/* Subtle vignette gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131622] via-transparent to-black/30 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-black/60 text-white/80 border border-white/15 backdrop-blur-md">
                        #{String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Favorite Heart Button */}
                      <button
                        onClick={(e) => toggleFavorite(photo.id, e)}
                        className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-md shadow-md cursor-pointer ${
                          isFav
                            ? 'bg-red-600 text-white scale-110 shadow-red-900/60'
                            : 'bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/10'
                        }`}
                        title={isFav ? 'Favorited' : 'Add to favorites'}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
                      </button>
                    </div>

                    {/* Hover Inspect Indicator */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-medium text-xs backdrop-blur-[2px]">
                      <Eye className="w-4 h-4 text-amber-300" />
                      <span>View Fullscreen</span>
                    </div>
                  </div>

                  {/* Card Body Information */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2 bg-[#131622]">
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug font-serif-title">
                        {photo.caption}
                      </h4>

                      {photo.note && (
                        <p className="font-handwritten text-sm text-amber-200/90 mt-1 line-clamp-2 leading-relaxed">
                          &ldquo;{photo.note}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400 font-sans">
                      <span className="flex items-center gap-1 line-clamp-1">
                        <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                        <span>{photo.location || 'Nepal'}</span>
                      </span>

                      {photo.date && (
                        <span className="flex items-center gap-1 font-mono text-[10px] text-neutral-500">
                          <Calendar className="w-3 h-3" />
                          <span>{photo.date}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Empty Search / Filter Results */}
          {filteredPhotos.length === 0 && (
            <div className="py-24 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-neutral-400">
                <Search className="w-7 h-7" />
              </div>
              <h4 className="text-base font-semibold text-white">No photographs matched your search</h4>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Try searching for different keywords, clear filters, or view all photos.
              </p>
              <button
                onClick={() => {
                  setFilter('all');
                  setSearch('');
                }}
                className="px-4 py-2 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-xs text-amber-300 font-medium transition-all"
              >
                Reset Filters & Search
              </button>
            </div>
          )}
        </div>

        {/* Footer Statistics */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#090a10] flex items-center justify-between text-xs text-neutral-400 font-mono">
          <span>
            Displaying {filteredPhotos.length} of {photos.length} memories
          </span>
          <span className="text-amber-300/80 font-sans">
            Tap any photograph to inspect in full HD ✨
          </span>
        </div>
      </div>
    </div>
  );
};

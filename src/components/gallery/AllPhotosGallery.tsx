import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search, Filter, Image as ImageIcon, Heart, Eye, Sparkles } from 'lucide-react';
import { photos, PhotoItem } from '../../data/photos';

interface AllPhotosGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto: (photo: PhotoItem) => void;
}

export const AllPhotosGallery: React.FC<AllPhotosGalleryProps> = ({ isOpen, onClose, onSelectPhoto }) => {
  const [filter, setFilter] = useState<'all' | 'scrapbook' | 'timeline' | 'portrait'>('all');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredPhotos = photos.filter((p) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'scrapbook' && p.category === 'scrapbook') ||
      (filter === 'timeline' && p.category.startsWith('timeline')) ||
      (filter === 'portrait' && (p.category === 'portrait' || p.category === 'highlight'));

    const matchesSearch =
      search === '' ||
      p.caption.toLowerCase().includes(search.toLowerCase()) ||
      (p.note && p.note.toLowerCase().includes(search.toLowerCase())) ||
      (p.location && p.location.toLowerCase().includes(search.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div
      id="gallery-vault-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full h-[90vh] bg-[#10121a] text-[#ece8e1] rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-950/40 border border-red-500/30 flex items-center justify-center text-red-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white font-serif-title">
                Prasamsa Didi's Photo Vault
              </h3>
              <p className="text-xs text-white/50 font-sans">
                {photos.length} real photos preserved with love from Nepal
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="px-6 py-3 border-b border-white/5 bg-[#0c0e14] flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(
              [
                { id: 'all', label: 'All Photos' },
                { id: 'scrapbook', label: 'Scrapbook Memories' },
                { id: 'timeline', label: 'Timeline Stages' },
                { id: 'portrait', label: 'Portraits & Radiant Smiles' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search captions or notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50"
            />
          </div>
        </div>

        {/* Photos Grid with Lazy Loading */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              whileHover={{ scale: 1.03 }}
              onClick={() => {
                onSelectPhoto(photo);
              }}
              className="group relative bg-[#171924] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/40 cursor-pointer shadow-md transition-all flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden bg-black/40">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-medium">
                  <Eye className="w-4 h-4" />
                  <span>Inspect</span>
                </div>
              </div>

              <div className="p-3 space-y-1 flex-1 flex flex-col justify-between">
                <p className="text-xs text-white/90 font-serif-title line-clamp-1">
                  {photo.caption}
                </p>
                {photo.note && (
                  <p className="font-handwritten text-sm text-amber-300 line-clamp-1">
                    "{photo.note}"
                  </p>
                )}
              </div>
            </motion.div>
          ))}

          {filteredPhotos.length === 0 && (
            <div className="col-span-full py-16 text-center text-white/40 space-y-2 font-sans text-sm">
              <p>No photos match the selected criteria.</p>
              <button
                onClick={() => {
                  setFilter('all');
                  setSearch('');
                }}
                className="text-amber-400 underline text-xs"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, Heart, MapPin, Calendar, Sparkles } from 'lucide-react';
import { PhotoItem } from '../../data/photos';

interface PhotoModalProps {
  photo: PhotoItem | null;
  onClose: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose }) => {
  if (!photo) return null;

  return (
    <div
      id="photo-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        id="photo-modal-card"
        className="relative max-w-xl w-full bg-[#fcf9f2] text-[#2c2b29] rounded-2xl p-4 sm:p-6 shadow-2xl border border-[#e8dfcf] transform transition-all duration-300 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 text-neutral-800 flex items-center justify-center transition-colors"
          aria-label="Close photo"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Vintage Washi Tape Top Decor */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-amber-100/80 border border-amber-300/40 rotate-[-1deg] shadow-sm pointer-events-none opacity-85" />

        {/* Image Frame */}
        <div className="relative rounded-lg overflow-hidden bg-neutral-900 aspect-[4/3] sm:aspect-square max-h-[60vh] flex items-center justify-center border border-neutral-200 shadow-inner">
          <img
            src={photo.src}
            alt={photo.alt || 'Prasamsa Didi memory'}
            className="w-full h-full object-contain object-center"
            loading="eager"
          />
        </div>

        {/* Polaroid Style Details & Caption */}
        <div className="pt-4 sm:pt-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-500 font-sans">
            {photo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                {photo.location}
              </span>
            )}
            {photo.date && (
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                {photo.date}
              </span>
            )}
          </div>

          <p className="text-base sm:text-lg font-medium text-neutral-800 font-serif-title leading-relaxed">
            {photo.caption}
          </p>

          {photo.note && (
            <div className="pt-1 flex items-start gap-2 text-neutral-700">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="font-handwritten text-xl sm:text-2xl text-neutral-800 leading-snug">
                "{photo.note}"
              </p>
            </div>
          )}

          <div className="pt-2 border-t border-neutral-200/80 flex items-center justify-between text-xs text-neutral-400 font-sans">
            <span className="italic">Treasured memory of Prasamsa Didi</span>
            <span className="flex items-center gap-1 text-red-500/80">
              <Heart className="w-3.5 h-3.5 fill-red-500/30" />
              From Nepal with love
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Pin, Eye, Image as ImageIcon, Camera } from 'lucide-react';
import { PhotoItem, photos } from '../../data/photos';

interface ScrapbookProps {
  onSelectPhoto: (photo: PhotoItem) => void;
  onOpenGallery: () => void;
}

export const Scrapbook: React.FC<ScrapbookProps> = ({ onSelectPhoto, onOpenGallery }) => {
  const scrapbookPhotos = photos.filter((p) => p.category === 'scrapbook').slice(0, 14);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="scene-scrapbook"
      className="relative min-h-screen w-full bg-[#181a22] text-[#ece8e1] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Craft Paper & Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-amber-900/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-red-950/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-16">
        {/* Header Title */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/30 border border-amber-500/20 text-xs tracking-widest uppercase text-amber-300 font-sans"
          >
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>The Memory Scrapbook</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white font-serif-title"
          >
            Moments Stitched in Gold
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-300 font-serif-title italic"
          >
            “This smile deserves to be remembered. Some moments become memories before we even realize it.”
          </motion.p>
        </div>

        {/* Tactile Scrapbook Desk with Overlapping Polaroids & Washi Tapes */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-4">
          {scrapbookPhotos.map((item, index) => {
            const rot = item.rotation || (index % 2 === 0 ? -2.5 : 2.5);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, rotate: rot }}
                whileInView={{ opacity: 1, y: 0, rotate: rot }}
                whileHover={{ scale: 1.04, rotate: 0, zIndex: 30 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectPhoto(item)}
                className="group relative cursor-pointer"
              >
                {/* Vintage Washi Tape Decor */}
                <div
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-5 z-20 transition-transform ${
                    index % 3 === 0
                      ? 'bg-amber-200/70 border border-amber-300/60 rotate-[-2deg]'
                      : index % 3 === 1
                      ? 'bg-rose-200/60 border border-rose-300/50 rotate-[3deg]'
                      : 'bg-emerald-100/60 border border-emerald-300/50 rotate-[-1deg]'
                  } shadow-xs opacity-90 backdrop-blur-[1px]`}
                />

                {/* Polaroid Frame Container */}
                <div className="bg-[#fcfaf4] text-[#2c2b29] p-4 sm:p-4.5 pb-6 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] border border-[#e4dcce] transition-shadow duration-300 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)]">
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-neutral-900 border border-neutral-200/80">
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Hover Quick-Inspect overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white">
                      <span className="p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/20">
                        <Eye className="w-4 h-4 text-white" />
                      </span>
                      <span className="text-xs font-medium tracking-wide">View Memory</span>
                    </div>
                  </div>

                  {/* Polaroid Handwritten Caption Area */}
                  <div className="pt-3.5 px-1 space-y-1">
                    <p className="font-handwritten text-xl sm:text-2xl text-neutral-800 leading-tight">
                      {item.caption}
                    </p>
                    {item.note && (
                      <p className="text-[12px] text-neutral-500 font-sans italic line-clamp-1">
                        "{item.note}"
                      </p>
                    )}
                  </div>

                  {/* Corner Stamp */}
                  <div className="absolute bottom-2 right-3 opacity-40 group-hover:opacity-80 transition-opacity flex items-center gap-1 text-[10px] font-mono text-neutral-400">
                    <span>NEP</span>
                    <Heart className="w-2.5 h-2.5 text-red-500 fill-red-500/50" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View Full Collection Button */}
        <div className="text-center pt-6">
          <motion.button
            onClick={onOpenGallery}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-sm font-medium text-white transition-all shadow-md"
          >
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <span>Open All 50+ Photos of Prasamsa Didi</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono">
              Full Vault
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

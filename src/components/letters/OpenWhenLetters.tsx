import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Mountain, Heart, Sparkles, Compass, X, Stamp } from 'lucide-react';
import { openWhenLetters, OpenWhenLetter } from '../../data/letters';
import { soundscape } from '../../utils/audio';

export const OpenWhenLetters: React.FC = () => {
  const [activeLetter, setActiveLetter] = useState<OpenWhenLetter | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mountain':
        return <Mountain className="w-5 h-5" />;
      case 'Heart':
        return <Heart className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  const handleOpenLetter = (letter: OpenWhenLetter) => {
    soundscape.playChime();
    setActiveLetter(letter);
  };

  return (
    <section
      id="scene-letters"
      className="relative min-h-screen w-full bg-[#151720] text-[#ece8e1] py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle warm glow background */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-amber-950/20 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase text-amber-300 font-sans"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Emergency Envelopes</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white font-serif-title"
          >
            “Open When…” Envelopes
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-neutral-400 font-sans"
          >
            Little sealed letters to keep in your pocket whenever you need words of home.
          </motion.p>
        </div>

        {/* Physical Looking Envelopes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {openWhenLetters.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => handleOpenLetter(item)}
              className="group relative bg-[#fcfaf5] text-[#2c2b29] rounded-2xl p-6 sm:p-8 shadow-[0_15px_35px_rgba(0,0,0,0.3)] border border-[#e8dfce] cursor-pointer transition-all duration-300 overflow-hidden"
            >
              {/* Envelope Flap Crease visual */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#efe6d5] to-transparent pointer-events-none opacity-80" />

              {/* Red Wax Seal */}
              <div
                className="absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center text-white shadow-md transform group-hover:scale-110 transition-transform"
                style={{ backgroundColor: item.sealColor }}
              >
                <div className="w-8 h-8 rounded-full border border-dashed border-white/40 flex items-center justify-center">
                  <Heart className="w-4 h-4 fill-white/80" />
                </div>
              </div>

              {/* Envelope Content */}
              <div className="space-y-4 pt-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-200/80 text-[11px] font-mono uppercase tracking-wider text-neutral-700">
                  {item.badge}
                </span>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-serif-title font-semibold text-neutral-900 group-hover:text-amber-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 font-sans line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-neutral-200 text-xs font-medium text-neutral-500">
                  <span className="font-handwritten text-lg text-neutral-800">
                    Click to unseal & read ✉️
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider">
                    Kathmandu ➔ Canada
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Letter Reading Modal */}
      <AnimatePresence>
        {activeLetter && (
          <div
            id="letter-modal-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveLetter(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-[#fdfaf3] text-[#2c2b29] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#e8dfcf] max-h-[85vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLetter(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-200/80 hover:bg-neutral-300 text-neutral-800 flex items-center justify-center transition-colors"
                aria-label="Close letter"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Letter Header */}
              <div className="space-y-2 pb-6 border-b border-neutral-300">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-mono uppercase tracking-wider font-semibold">
                  {activeLetter.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif-title font-semibold text-neutral-900">
                  {activeLetter.title}
                </h3>
              </div>

              {/* Letter Body (Parchment text) */}
              <div className="py-6 space-y-4">
                <div className="text-base sm:text-lg leading-relaxed font-serif text-neutral-800 whitespace-pre-line">
                  {activeLetter.letter}
                </div>

                {/* Reminder quote */}
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 mt-6">
                  <p className="font-handwritten text-xl sm:text-2xl text-amber-950">
                    {activeLetter.reminder}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-neutral-300 flex items-center justify-between text-xs text-neutral-500 font-sans">
                <span>With all our love, always.</span>
                <button
                  onClick={() => setActiveLetter(null)}
                  className="px-4 py-1.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
                >
                  Fold Letter
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

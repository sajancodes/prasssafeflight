import React from 'react';
import { motion } from 'framer-motion';
import { bestPortraitPhoto, PhotoItem } from '../../data/photos';

interface EmotionalSilenceProps {
  onSelectPhoto: (photo: PhotoItem) => void;
}

export const EmotionalSilence: React.FC<EmotionalSilenceProps> = ({ onSelectPhoto }) => {
  return (
    <section
      id="scene-silence"
      className="relative min-h-screen w-full bg-[#050608] text-[#ece8e1] py-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Absolute minimal dark backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-950/10 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-16">
        {/* Unhurried Sequential Emotional Typography */}
        <div className="space-y-10 sm:space-y-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.8 }}
            className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-400 font-serif-title leading-relaxed"
          >
            “You might be going thousands of kilometres away…”
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.8, delay: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-300 font-serif-title leading-relaxed italic"
          >
            “…but distance has never been powerful enough to erase memories.”
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.8, delay: 1.2 }}
            className="w-12 h-[1px] bg-white/10 mx-auto"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.8, delay: 1.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-light text-white font-serif-title leading-relaxed"
          >
            “The people who matter…”
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.8, delay: 2.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-light text-amber-200/90 font-serif-title leading-relaxed italic"
          >
            “…stay close, even when they’re far away.”
          </motion.p>
        </div>

        {/* Gradual Portrait Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 2.2, delay: 2.8 }}
          className="pt-8"
        >
          <div
            onClick={() => onSelectPhoto(bestPortraitPhoto)}
            className="group relative max-w-sm mx-auto p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all duration-700 shadow-2xl cursor-pointer"
          >
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-black">
              <img
                src={bestPortraitPhoto.src}
                alt={bestPortraitPhoto.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>

            <div className="pt-3 pb-1 text-center space-y-1">
              <p className="font-serif-title text-base sm:text-lg text-white font-medium">
                Prasamsa Didi
              </p>
              <p className="font-handwritten text-xl text-amber-300">
                “Forever in our prayers and hearts.”
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

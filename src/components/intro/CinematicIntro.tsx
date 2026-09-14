import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Sparkles, ChevronDown } from 'lucide-react';
import { soundscape } from '../../utils/audio';
import { appConfig } from '../../data/config';

interface CinematicIntroProps {
  onStart: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onStart }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Step timings for slow, unhurried, emotional reveal
    const timer1 = setTimeout(() => setStep(1), 800); // Name appears
    const timer2 = setTimeout(() => setStep(2), 2600); // Subtitle appears
    const timer3 = setTimeout(() => setStep(3), 4800); // Button appears

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleBegin = () => {
    soundscape.play();
    onStart();
  };

  return (
    <section
      id="scene-intro"
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#07080b] text-[#ece8e1] overflow-hidden px-4 sm:px-6 select-none"
    >
      {/* Background Starfield & Atmosphere Canvas */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle radial ambient light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-950/20 rounded-full blur-[140px] opacity-40 animate-pulse-slow" />
        <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] bg-amber-900/15 rounded-full blur-[120px] opacity-30" />

        {/* Ambient floating star specks */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] opacity-60" />
      </div>

      {/* Airplane Silhouette Flying Across Screen */}
      <motion.div
        className="absolute top-1/4 left-0 w-full pointer-events-none z-10"
        initial={{ x: '-15%', y: 0, opacity: 0 }}
        animate={{
          x: '115%',
          y: [-5, 12, -8, 10],
          opacity: [0, 0.8, 0.9, 0.8, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'linear',
          times: [0, 0.1, 0.5, 0.9, 1],
        }}
      >
        <div className="relative inline-flex items-center">
          {/* Glowing Jet Contrail */}
          <div className="w-56 sm:w-80 h-[2px] bg-gradient-to-r from-transparent via-amber-200/30 to-white/70 blur-[1px] -mr-1" />
          
          {/* Realistic Airplane Silhouette Icon */}
          <div className="relative text-white/85 rotate-45 transform drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
            <Plane className="w-5 h-5 sm:w-7 sm:h-7" />
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping opacity-75" />
          </div>
        </div>
      </motion.div>

      {/* Main Narrative Content Container */}
      <div className="relative z-20 max-w-3xl mx-auto text-center space-y-8 sm:space-y-10 py-12">
        {/* Soft Badge */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase text-amber-200/80 font-sans"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>A Farewell Journey</span>
              <span>•</span>
              <span>Nepal → Canada</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 1: “Prasamsa Didi…” */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white font-serif-title">
                {appConfig.recipientName}…
              </h1>
              <p className="font-handwritten text-2xl sm:text-3xl text-amber-200/90 tracking-wide">
                (Safe flight to our beloved sister)
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: “Before you leave Nepal, there’s something I wanted you to see.” */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 0.2 }}
              className="max-w-xl mx-auto space-y-3"
            >
              <p className="text-lg sm:text-2xl text-neutral-300 font-light font-serif-title leading-relaxed">
                “Before you leave Nepal,
                <br className="hidden sm:inline" />
                there’s something I wanted you to see.”
              </p>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto pt-2" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Button “Begin the journey ✈️” */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="pt-6 sm:pt-8"
            >
              <button
                id="begin-journey-button"
                onClick={handleBegin}
                className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-[#962d22] via-[#b03a2e] to-[#802218] text-white text-base sm:text-lg font-medium shadow-[0_0_35px_rgba(176,58,46,0.4)] hover:shadow-[0_0_50px_rgba(192,57,43,0.6)] border border-red-400/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                <span className="tracking-wide">Begin the journey</span>
                <span className="text-xl group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
                  ✈️
                </span>

                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[300%] transition-transform duration-1000" />
                </div>
              </button>

              <p className="text-xs text-white/40 mt-4 font-sans tracking-wide">
                (Click to begin with soundscape • Headphones recommended)
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Scroll Hint */}
      {step >= 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs pointer-events-none"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      )}
    </section>
  );
};

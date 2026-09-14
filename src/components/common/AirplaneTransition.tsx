import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundscape } from '../../utils/audio';

interface AirplaneTransitionProps {
  isActive: boolean;
  destinationLabel: string;
  onMidpoint: () => void;
  onComplete: () => void;
}

export const AirplaneTransition: React.FC<AirplaneTransitionProps> = ({
  isActive,
  destinationLabel,
  onMidpoint,
  onComplete,
}) => {
  useEffect(() => {
    if (!isActive) return;

    // Play turbine ascent sound & cabin chime
    soundscape.playPlaneTakeoffSound();

    // Trigger page swap at midpoint when screen is shrouded by clouds
    const midpointTimer = setTimeout(() => {
      onMidpoint();
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 750);

    // End transition
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1550);

    return () => {
      clearTimeout(midpointTimer);
      clearTimeout(completeTimer);
    };
  }, [isActive, onMidpoint, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="airplane-page-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#06080e] via-[#0d1527] to-[#1a2b4c]"
        >
          {/* Vertical Sky Speed Streaks / Wind Lines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: '-20vh', opacity: 0 }}
                animate={{ y: '120vh', opacity: [0, 0.8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6 + (i % 5) * 0.15,
                  delay: (i * 0.05) % 0.8,
                  ease: 'linear',
                }}
                className="absolute w-[1.5px] bg-gradient-to-b from-transparent via-white/70 to-transparent rounded-full"
                style={{
                  left: `${(i * 3.3) % 100}%`,
                  height: `${70 + (i % 6) * 35}px`,
                }}
              />
            ))}
          </div>

          {/* Golden blessing stars drifting downwards */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={`star-${i}`}
                initial={{ y: '-10vh', opacity: 0 }}
                animate={{ y: '110vh', opacity: [0, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.1 + (i % 4) * 0.2,
                  delay: (i * 0.08) % 1,
                  ease: 'easeIn',
                }}
                className="absolute text-amber-300 font-serif text-sm select-none"
                style={{
                  left: `${4 + ((i * 4.2) % 92)}%`,
                }}
              >
                {i % 3 === 0 ? '🍁' : i % 3 === 1 ? '✨' : '🤍'}
              </motion.div>
            ))}
          </div>

          {/* Cinematic Volumetric Cloud Layers Rushing Downwards */}
          <motion.div
            initial={{ y: '-60%', opacity: 0 }}
            animate={{ y: '140%', opacity: [0, 0.85, 1, 0.7, 0] }}
            transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-x-0 w-full h-[180%] pointer-events-none flex flex-col justify-around opacity-75"
          >
            <div className="w-[140%] -ml-[20%] h-64 bg-radial from-white/20 via-sky-200/10 to-transparent blur-3xl rounded-full" />
            <div className="w-[120%] -ml-[10%] h-80 bg-radial from-white/30 via-sky-100/15 to-transparent blur-3xl rounded-full" />
            <div className="w-[150%] -ml-[25%] h-96 bg-radial from-white/25 via-blue-200/10 to-transparent blur-3xl rounded-full" />
          </motion.div>

          {/* Central Destination Display Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="absolute top-16 sm:top-24 z-30 flex flex-col items-center text-center px-6 pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono tracking-widest text-sky-200 uppercase backdrop-blur-md shadow-xl mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>In-Flight Teleportation • Flight 2026</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-serif-title font-light text-white tracking-wide drop-shadow-md">
              {destinationLabel}
            </h3>
            <p className="text-xs sm:text-sm text-sky-200/70 font-sans mt-1">
              Soaring across 11,600 km with all our love ✈️🤍
            </p>
          </motion.div>

          {/* THE VERTICAL FLYING AIRPLANE */}
          <motion.div
            initial={{ y: '115vh', scale: 0.75 }}
            animate={{ y: '-135vh', scale: [0.8, 1.15, 1.25, 1.05] }}
            transition={{
              duration: 1.45,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="relative z-40 flex flex-col items-center pointer-events-none"
          >
            {/* Supersonic Vector Airplane (Pointing Vertically Up) */}
            <div className="relative w-36 sm:w-48 h-56 sm:h-72 flex items-center justify-center filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
              <svg
                viewBox="0 0 200 300"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Airplane Wings Shadow & Body glow */}
                <defs>
                  <linearGradient id="fuselageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e2e8f0" />
                    <stop offset="45%" stopColor="#ffffff" />
                    <stop offset="60%" stopColor="#f8fafc" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                  </linearGradient>
                  <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="50%" stopColor="#e2e8f0" />
                    <stop offset="100%" stopColor="#94a3b8" />
                  </linearGradient>
                  <linearGradient id="afterburner" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="35%" stopColor="#fbbf24" />
                    <stop offset="70%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>

                {/* Main Wings */}
                <path
                  d="M100 110 L195 210 L180 220 L115 165 L100 170 L85 165 L20 220 L5 210 Z"
                  fill="url(#wingGrad)"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />

                {/* Wingtips / Red Accents */}
                <path d="M195 210 L185 200 L180 220 Z" fill="#b91c1c" />
                <path d="M5 210 L15 200 L20 220 Z" fill="#b91c1c" />

                {/* Left & Right Jet Engines */}
                <rect x="58" y="160" width="16" height="42" rx="6" fill="#475569" stroke="#334155" strokeWidth="1.5" />
                <rect x="126" y="160" width="16" height="42" rx="6" fill="#475569" stroke="#334155" strokeWidth="1.5" />

                {/* Engine Intake Rims */}
                <ellipse cx="66" cy="162" rx="7" ry="3" fill="#1e293b" />
                <ellipse cx="134" cy="162" rx="7" ry="3" fill="#1e293b" />

                {/* Horizontal Stabilizers / Tail Wings */}
                <path
                  d="M100 240 L155 285 L145 292 L105 272 L100 274 L95 272 L55 292 L45 285 Z"
                  fill="url(#wingGrad)"
                  stroke="#94a3b8"
                  strokeWidth="1"
                />

                {/* Sleek Fuselage (Main Body) */}
                <path
                  d="M100 18 C112 40, 115 90, 115 220 C115 260, 107 285, 100 295 C93 285, 85 260, 85 220 C85 90, 88 40, 100 18 Z"
                  fill="url(#fuselageGrad)"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                />

                {/* Cockpit Windshield Visor (Glossy Cyan) */}
                <path
                  d="M93 54 C97 48, 103 48, 107 54 L111 65 C104 63, 96 63, 89 65 Z"
                  fill="#0284c7"
                  stroke="#0369a1"
                  strokeWidth="1"
                />
                <ellipse cx="100" cy="58" rx="7" ry="3" fill="#38bdf8" opacity="0.8" />

                {/* Vertical Stabilizer Fin */}
                <path
                  d="M98 215 L102 215 L104 285 L96 285 Z"
                  fill="#b91c1c"
                />
                {/* Red Maple Leaf or Star on Tail Fin */}
                <circle cx="100" cy="255" r="3.5" fill="#fef08a" />

                {/* Nepal Flag Crimson Stripe Along Fuselage */}
                <line x1="100" y1="75" x2="100" y2="195" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
              </svg>

              {/* Glowing Jet Engine Flames / Afterburners */}
              <div
                className="absolute top-[68%] left-[27%] w-4 h-24 bg-gradient-to-b from-cyan-300 via-amber-400 to-transparent blur-[2px] rounded-full animate-pulse"
                style={{ transform: 'translateX(-50%)' }}
              />
              <div
                className="absolute top-[68%] left-[73%] w-4 h-24 bg-gradient-to-b from-cyan-300 via-amber-400 to-transparent blur-[2px] rounded-full animate-pulse"
                style={{ transform: 'translateX(-50%)' }}
              />

              {/* Core Hot Engine Glow */}
              <div className="absolute top-[65%] left-[27%] w-2 h-4 bg-white rounded-full blur-[1px] -translate-x-1/2" />
              <div className="absolute top-[65%] left-[73%] w-2 h-4 bg-white rounded-full blur-[1px] -translate-x-1/2" />

              {/* Long Contrail Smoke Streams Shooting Downwards */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: ['40px', '220px', '320px'], opacity: [0, 0.9, 0.3] }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute top-[80%] left-[27%] w-3 bg-gradient-to-b from-white/90 via-sky-200/40 to-transparent rounded-full blur-sm -translate-x-1/2"
              />
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: ['40px', '220px', '320px'], opacity: [0, 0.9, 0.3] }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute top-[80%] left-[73%] w-3 bg-gradient-to-b from-white/90 via-sky-200/40 to-transparent rounded-full blur-sm -translate-x-1/2"
              />
            </div>
          </motion.div>

          {/* Bottom Flight Altitude Telemetry */}
          <div className="absolute bottom-10 inset-x-0 z-30 flex justify-center pointer-events-none">
            <div className="flex items-center gap-6 px-6 py-2.5 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-md text-xs font-mono text-white/80 shadow-2xl">
              <div className="flex items-center gap-2">
                <span className="text-amber-400">ALT:</span>
                <span className="text-white font-semibold">38,000 FT</span>
              </div>
              <div className="w-[1px] h-3 bg-white/20" />
              <div className="flex items-center gap-2">
                <span className="text-sky-400">SPEED:</span>
                <span className="text-white font-semibold">MACH 0.85</span>
              </div>
              <div className="w-[1px] h-3 bg-white/20" />
              <div className="flex items-center gap-2">
                <span className="text-red-400">WAYPOINT:</span>
                <span className="text-white font-semibold">KTM ➔ CANADA</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

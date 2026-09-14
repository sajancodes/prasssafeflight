import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Heart, Send, Sparkles, Flame, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundscape } from '../../utils/audio';
import { appConfig } from '../../data/config';

interface Lantern {
  id: number;
  message: string;
  x: number;
  delay: number;
  color: string;
}

export const FinalFlight: React.FC = () => {
  const [lanterns, setLanterns] = useState<Lantern[]>([
    { id: 1, message: 'Safe travels Didi!', x: 25, delay: 0, color: '#f39c12' },
    { id: 2, message: 'Canada is lucky to have you', x: 50, delay: 1.5, color: '#e74c3c' },
    { id: 3, message: 'Always proud of you 🤍', x: 75, delay: 3, color: '#f1c40f' },
  ]);
  const [customWish, setCustomWish] = useState('');

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customWish.trim()) return;

    soundscape.playChime();
    const newLantern: Lantern = {
      id: Date.now(),
      message: customWish.trim(),
      x: 20 + Math.random() * 60,
      delay: 0,
      color: ['#f39c12', '#e74c3c', '#e67e22', '#d35400', '#f1c40f'][Math.floor(Math.random() * 5)],
    };

    setLanterns((prev) => [...prev, newLantern]);
    setCustomWish('');

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ff9ff3', '#feca57', '#ff6b6b', '#48dbfb', '#1dd1a1'],
      });
    } catch {
      // ignore
    }
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="scene-finale"
      className="relative min-h-screen w-full bg-gradient-to-b from-[#07080b] via-[#090d18] to-[#040508] text-[#ece8e1] py-32 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col items-center justify-center text-center select-none"
    >
      {/* Aurora Borealis & Starfield Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Northern Lights wave */}
        <motion.div
          className="absolute -top-10 inset-x-0 h-[400px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/15 to-purple-500/10 rounded-full blur-[100px]"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scaleY: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Ambient star specks */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0f_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {/* Floating Sky Lanterns Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {lanterns.map((l) => (
          <motion.div
            key={l.id}
            initial={{ y: '105vh', opacity: 0 }}
            animate={{
              y: '-20vh',
              opacity: [0, 0.9, 0.9, 0],
              x: [0, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 60],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              delay: l.delay,
              ease: 'linear',
            }}
            style={{ left: `${l.x}%` }}
            className="absolute flex flex-col items-center gap-1"
          >
            {/* Glowing Lantern */}
            <div
              className="w-8 h-11 rounded-t-xl rounded-b-md shadow-[0_0_25px_rgba(243,156,18,0.8)] border border-amber-300/60 flex items-center justify-center relative"
              style={{ backgroundColor: l.color }}
            >
              {/* Flame inside */}
              <div className="w-2 h-3 bg-white rounded-full animate-ping opacity-75" />
            </div>
            <span className="text-[10px] font-handwritten text-amber-200 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-xs whitespace-nowrap">
              {l.message}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Main Narrative Sequence */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-12">
        {/* Airplane Arrival Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative inline-flex items-center justify-center"
        >
          <div className="w-20 h-20 rounded-full bg-red-950/40 border border-red-500/30 flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(231,76,60,0.3)]">
            🇨🇦
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 -m-3 border border-dashed border-amber-400/30 rounded-full"
          />
        </motion.div>

        {/* Final Emotional Climax Text */}
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white font-serif-title leading-tight"
          >
            Welcome to your next chapter,
            <br />
            <span className="text-amber-200/95 font-medium">{appConfig.recipientName}. 🇨🇦</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-2xl sm:text-3xl text-neutral-300 font-serif-title italic"
          >
            “Go make Canada a little more Prasamsa.”
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pt-4 space-y-2"
          >
            <p className="text-xl sm:text-2xl font-serif text-white/90">
              Safe flight. 🤍
            </p>
            <p className="font-handwritten text-2xl sm:text-3xl text-amber-300/90 tracking-wide">
              From Nepal, with love.
            </p>
          </motion.div>
        </div>

        {/* Interactive Sky Lantern Wish Release */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="pt-6 max-w-md mx-auto"
        >
          <form
            onSubmit={handleSendWish}
            className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md shadow-lg"
          >
            <input
              type="text"
              placeholder="Release a farewell wish into the sky..."
              value={customWish}
              onChange={(e) => setCustomWish(e.target.value)}
              className="flex-1 bg-transparent px-4 py-2 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-medium text-xs transition-colors shrink-0 cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Send Lantern</span>
            </button>
          </form>
          <p className="text-[11px] text-white/40 mt-2 font-sans">
            (Watch your glowing wish lantern drift up into the Canadian sky)
          </p>
        </motion.div>

        {/* Replay / Restart Journey */}
        <div className="pt-8">
          <button
            onClick={handleReplay}
            className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/80 transition-colors font-sans tracking-wide"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay the journey from the beginning</span>
          </button>
        </div>
      </div>
    </section>
  );
};

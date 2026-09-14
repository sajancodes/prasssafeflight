import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Luggage,
  Sparkles,
  Camera,
  Smile,
  Home,
  Users,
  Mountain,
  Heart,
  CheckCircle2,
  PackageCheck,
  RefreshCw,
} from 'lucide-react';
import { suitcaseItems, SuitcaseItem } from '../../data/memories';
import { soundscape } from '../../utils/audio';

export const SuitcaseSection: React.FC = () => {
  const [packedIds, setPackedIds] = useState<string[]>([]);
  const [isSuitcaseOpen, setIsSuitcaseOpen] = useState(true);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera':
        return <Camera className="w-4 h-4" />;
      case 'Smile':
        return <Smile className="w-4 h-4" />;
      case 'Home':
        return <Home className="w-4 h-4" />;
      case 'Users':
        return <Users className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'Mountain':
        return <Mountain className="w-4 h-4" />;
      default:
        return <Heart className="w-4 h-4" />;
    }
  };

  const handlePackItem = (id: string) => {
    soundscape.playChime();
    if (!packedIds.includes(id)) {
      setPackedIds((prev) => [...prev, id]);
    }
  };

  const handlePackAll = () => {
    soundscape.playChime();
    setPackedIds(suitcaseItems.map((i) => i.id));
  };

  const handleReset = () => {
    setPackedIds([]);
  };

  const allPacked = packedIds.length === suitcaseItems.length;

  return (
    <section
      id="scene-suitcase"
      className="relative min-h-screen w-full bg-[#12141c] text-[#ece8e1] py-24 px-4 sm:px-6 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-35">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-amber-950/25 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-rose-950/20 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-4xl w-full mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase text-amber-300 font-sans"
          >
            <Luggage className="w-3.5 h-3.5" />
            <span>Interactive Packing</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white font-serif-title"
          >
            Packing the Essentials for Canada
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-neutral-400 font-sans"
          >
            Click each memory or pack them all into Prasamsa Didi's travel suitcase.
          </motion.p>
        </div>

        {/* Vintage Styled Leather Suitcase Container */}
        <div className="relative bg-gradient-to-b from-[#2a1c14] to-[#1c130d] border-4 border-[#8c593b] rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
          {/* Leather Corner Reinforcements & Brass Rivets */}
          <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-[#d4af37] rounded-tl-xl pointer-events-none" />
          <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-[#d4af37] rounded-tr-xl pointer-events-none" />
          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-[#d4af37] rounded-bl-xl pointer-events-none" />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-[#d4af37] rounded-br-xl pointer-events-none" />

          {/* Suitcase Handle at top */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#4a2e1b] border-2 border-[#d4af37] rounded-t-xl shadow-md flex items-center justify-center">
            <div className="w-16 h-1 bg-[#d4af37]/60 rounded-full" />
          </div>

          {/* Luggage Tag: Prasamsa Didi - Canada Bound */}
          <div className="absolute top-4 right-6 hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#f5e6cc] text-[#3e2723] rounded-lg shadow-md border border-[#c4a482] rotate-3 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span className="font-bold">TAG: PRASAMSA // KTM ✈ CAN</span>
          </div>

          {/* Suitcase Interior Grid */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-amber-200/60 font-mono">
                Inside the Trunk ({packedIds.length} / {suitcaseItems.length} Packed)
              </span>

              <div className="flex items-center gap-2">
                {!allPacked ? (
                  <button
                    onClick={handlePackAll}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 text-xs font-medium transition-colors"
                  >
                    <PackageCheck className="w-3.5 h-3.5" />
                    <span>Pack Everything</span>
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/15 text-white/70 text-xs transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Unpack</span>
                  </button>
                )}
              </div>
            </div>

            {/* Interactive Items to Pack */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {suitcaseItems.map((item) => {
                const isPacked = packedIds.includes(item.id);
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handlePackItem(item.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isPacked
                        ? 'bg-amber-950/40 border-amber-500/50 shadow-inner'
                        : 'bg-black/30 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                        style={{ backgroundColor: item.color }}
                      >
                        {getIcon(item.icon)}
                      </div>
                      {isPacked && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1 animate-in zoom-in" />
                      )}
                    </div>

                    <div className="mt-3">
                      <div className="text-sm font-semibold text-white tracking-wide font-serif-title">
                        {item.name}
                      </div>
                      <p className="text-[11px] text-white/60 line-clamp-2 mt-1 font-sans">
                        {item.description}
                      </p>
                    </div>

                    {/* Status badge */}
                    <div className="mt-2 text-[10px] font-mono tracking-wider uppercase text-amber-300/70">
                      {isPacked ? '✓ Packed in luggage' : '+ Click to pack'}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* The Heartfelt Revelation when everything is packed */}
            <AnimatePresence>
              {allPacked && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1.2 }}
                  className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#090b10]/90 border border-amber-500/30 text-center space-y-4 shadow-2xl backdrop-blur-md"
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg sm:text-2xl font-serif-title text-neutral-300"
                  >
                    “But there’s one thing that doesn’t fit inside a suitcase…”
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4, duration: 1 }}
                    className="space-y-2"
                  >
                    <p className="text-2xl sm:text-4xl font-serif-title text-white font-medium">
                      “Everyone who is wishing you well.” 🤍
                    </p>
                    <p className="font-handwritten text-xl sm:text-2xl text-amber-300/90 pt-1">
                      (No luggage limit can ever hold all our blessings for you)
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

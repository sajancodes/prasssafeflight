import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Key, Heart, Clock, Compass, Volume2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundscape } from '../../utils/audio';

export const SecretVaultModal: React.FC = () => {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [hugCount, setHugCount] = useState(1048);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);

  // Dual Live Clock state
  const [ktmTime, setKtmTime] = useState('');
  const [canTime, setCanTime] = useState('');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      // Kathmandu is UTC + 5:45
      const ktm = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kathmandu',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);

      // Toronto / Eastern Canada UTC - 4 (EDT) or UTC - 5 (EST)
      const can = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Toronto',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);

      setKtmTime(ktm);
      setCanTime(can);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlock = () => {
    if (passcode.trim() === '2026' || passcode.toLowerCase().includes('didi')) {
      setIsUnlocked(true);
      setErrorMsg('');
      soundscape.playSuccessChime();
      try {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#fbbf24', '#f59e0b', '#ef4444', '#38bdf8'],
        });
      } catch {
        // ignore
      }
    } else {
      soundscape.playBubblePopSound();
      setErrorMsg('Incorrect passcode! Hint: Enter "2026" or click Auto-Unlock below!');
    }
  };

  const handleAutoUnlock = () => {
    setPasscode('2026');
    setIsUnlocked(true);
    soundscape.playSuccessChime();
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#38bdf8'],
      });
    } catch {
      // ignore
    }
  };

  const handleSendHug = () => {
    soundscape.playBubblePopSound();
    setHugCount((h) => h + 1);
    const newHeart = { id: Date.now() + Math.random(), x: 30 + Math.random() * 40 };
    setFloatingHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  };

  return (
    <div className="bg-[#111420] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Surprise 2: Secret Digital Safe</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif-title font-semibold text-white">
            Didi&apos;s Time-Capsule Vault & Nepal Compass 🧭
          </h3>
          <p className="text-sm text-neutral-400 font-sans mt-1">
            Protected vault containing live timezone bridges, personal blessings, and an endless hug generator.
          </p>
        </div>
      </div>

      {/* Vault Body */}
      <div className="py-6">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            /* Locked Safe Screen */
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md mx-auto p-8 rounded-3xl bg-[#090b12] border-2 border-amber-500/30 text-center space-y-6 shadow-2xl relative"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.2)]">
                <Lock className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-serif-title font-bold text-white">
                  Enter Safe Combination
                </h4>
                <p className="text-xs text-neutral-400">
                  Hint: What year does Didi’s flight depart for Canada? (4 digits)
                </p>
              </div>

              {/* Code Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <input
                    type="text"
                    maxLength={6}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                    placeholder="2 0 2 6"
                    className="w-44 text-center tracking-widest text-2xl font-mono py-2.5 rounded-xl bg-black/60 border border-amber-400/40 text-amber-300 focus:outline-hidden focus:border-amber-400 shadow-inner"
                  />
                  <button
                    onClick={handleUnlock}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all active:scale-95 cursor-pointer"
                  >
                    Unlock
                  </button>
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-400 font-sans">{errorMsg}</p>
                )}

                <div className="pt-2">
                  <button
                    onClick={handleAutoUnlock}
                    className="inline-flex items-center gap-1.5 text-xs text-amber-400/80 hover:text-amber-300 underline cursor-pointer"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>I am Prasamsa Didi • Auto Unlock</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Unlocked Safe Content */
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              {/* Dual Timezone Bridge */}
              <div className="p-6 rounded-3xl bg-[#090b12] border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-hidden">
                {/* Kathmandu Clock */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-2xl shrink-0">
                    🏔️
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>KATHMANDU, NEPAL (NPT)</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-mono font-bold text-white mt-1">
                      {ktmTime || '12:00:00 PM'}
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      Where your roots, childhood, and love will always reside.
                    </div>
                  </div>
                </div>

                {/* Toronto / Canada Clock */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-2xl shrink-0">
                    🍁
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>TORONTO / CANADA (EST)</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-mono font-bold text-white mt-1">
                      {canTime || '02:15:00 AM'}
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      Where your exciting dreams, career, and future are unfolding.
                    </div>
                  </div>
                </div>
              </div>

              {/* Compass & Bridge Note */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-red-500/10 border border-amber-400/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 text-xl shrink-0 animate-spin-slow">
                  🧭
                </div>
                <div className="space-y-0.5">
                  <h5 className="text-sm font-serif-title font-bold text-white">
                    Nepal Compass: Distance is Just a Number
                  </h5>
                  <p className="text-xs text-neutral-300">
                    Kathmandu is approximately <strong>11,600 KM</strong> away across the Atlantic. But whenever you gaze at the moon in Canada, remember we are looking at the exact same sky.
                  </p>
                </div>
              </div>

              {/* Infinite Hug Generator */}
              <div className="p-6 rounded-3xl bg-[#090b12] border border-white/10 text-center space-y-4 relative">
                <div className="space-y-1">
                  <h5 className="text-xl sm:text-2xl font-serif-title font-bold text-white">
                    Unlimited Hugs From Your Gadha 🤍
                  </h5>
                  <p className="text-xs sm:text-sm text-neutral-300">
                    Whenever you feel cold, miss home, or study late in Canada, tap the heart for unlimited warm hugs from your gadha!
                  </p>
                </div>

                <div className="relative inline-block py-4">
                  {/* Floating hearts animation */}
                  {floatingHearts.map((heart) => (
                    <motion.div
                      key={heart.id}
                      initial={{ y: 0, opacity: 1, scale: 0.8 }}
                      animate={{ y: -80, opacity: 0, scale: 1.4 }}
                      transition={{ duration: 1.1, ease: 'easeOut' }}
                      className="absolute text-2xl pointer-events-none"
                      style={{ left: `${heart.x}%`, top: '10%' }}
                    >
                      💖
                    </motion.div>
                  ))}

                  <motion.button
                    onClick={handleSendHug}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="w-24 h-24 rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 flex items-center justify-center text-white shadow-[0_0_35px_rgba(239,68,68,0.5)] cursor-pointer transition-all border-2 border-white/20 active:shadow-[0_0_50px_rgba(239,68,68,0.8)]"
                  >
                    <Heart className="w-11 h-11 fill-white" />
                  </motion.button>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl font-mono font-bold text-amber-300">
                    {hugCount.toLocaleString()} Unlimited Hugs From Your Gadha Sent 🤍
                  </div>
                  <div className="text-xs text-neutral-400 font-sans">
                    Lifetime guarantee: 100% free, unconditional, and instantly teleported across 11,600 km to Didi!
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

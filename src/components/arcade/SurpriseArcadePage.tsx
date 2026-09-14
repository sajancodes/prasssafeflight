import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Gamepad2, Gift, Luggage, HelpCircle, Grid, Award, Lock, Plane } from 'lucide-react';
import { PackingChallengeGame } from './PackingChallengeGame';
import { CanadaQuizGame } from './CanadaQuizGame';
import { MemoryMatchGame } from './MemoryMatchGame';
import { CatchBlessingsGame } from './CatchBlessingsGame';
import { GoldenBoardingPass } from './GoldenBoardingPass';
import { SecretVaultModal } from './SecretVaultModal';

interface SurpriseArcadePageProps {
  onNavigateHome: () => void;
}

export const SurpriseArcadePage: React.FC<SurpriseArcadePageProps> = ({ onNavigateHome }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'packing' | 'quiz' | 'memory' | 'sky' | 'ticket' | 'safe'>('all');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-neutral-100 font-sans selection:bg-amber-500/30 selection:text-amber-200 relative pb-28">
      {/* Background Ambience & Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>
      <div className="fixed -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed top-1/3 right-0 w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Floating Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#07090e]/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-neutral-200 hover:text-white transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>Fly Back to Farewell Story</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-xs font-mono text-neutral-400">
            PRASAMSA DIDI • CANADA 2026
          </span>
          <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
            🍁 SURPRISE ARCADE
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="pt-12 sm:pt-20 pb-10 px-4 sm:px-6 max-w-5xl mx-auto text-center space-y-5">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-serif-title font-extrabold text-white tracking-tight leading-tight"
        >
          Didi&apos;s Canada Send-Off Arcade 🍁✨
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-sans leading-relaxed"
        >
          Built with infinite love, laughter, and care from Nepal. Play the games, solve the luggage challenge, unlock the digital safe, and take your golden boarding pass with you!
        </motion.p>

        {/* Quick Jump Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 pt-3"
        >
          <button
            onClick={() => scrollToSection('game-packing')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-sky-300 transition-all"
          >
            <Luggage className="w-3.5 h-3.5" />
            <span>23KG Luggage</span>
          </button>
          <button
            onClick={() => scrollToSection('game-quiz')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-red-300 transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Canada Quiz</span>
          </button>
          <button
            onClick={() => scrollToSection('game-memory')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-purple-300 transition-all"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Memory Match</span>
          </button>
          <button
            onClick={() => scrollToSection('game-sky')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-amber-300 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sky Blessings</span>
          </button>
          <button
            onClick={() => scrollToSection('surprise-ticket')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-yellow-300 transition-all"
          >
            <Plane className="w-3.5 h-3.5" />
            <span>First-Class Ticket</span>
          </button>
          <button
            onClick={() => scrollToSection('surprise-safe')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-emerald-300 transition-all"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Secret Vault</span>
          </button>
        </motion.div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Game 1: Packing Challenge */}
        <section id="game-packing">
          <PackingChallengeGame />
        </section>

        {/* Game 2: Canada Quiz */}
        <section id="game-quiz">
          <CanadaQuizGame />
        </section>

        {/* Game 3: Memory Match */}
        <section id="game-memory">
          <MemoryMatchGame />
        </section>

        {/* Game 4: Catch Blessings */}
        <section id="game-sky">
          <CatchBlessingsGame />
        </section>

        {/* Surprise 1: Golden Boarding Pass */}
        <section id="surprise-ticket">
          <GoldenBoardingPass />
        </section>

        {/* Surprise 2: Secret Safe & Time Compass */}
        <section id="surprise-safe">
          <SecretVaultModal />
        </section>

        {/* Bottom Departure Return Banner */}
        <div className="text-center pt-8 pb-4">
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#111422] to-[#0a0c14] border border-amber-400/30 shadow-2xl space-y-4">
            <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-white">
              Ready to revisit the memories? ✈️
            </h3>
            <p className="text-sm text-neutral-300 max-w-md mx-auto">
              You can fly back to the main interactive farewell story and cutting the cake anytime.
            </p>
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-red-600 via-amber-600 to-red-600 hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-red-950 transition-all active:scale-95 cursor-pointer"
            >
              <Plane className="w-4 h-4" />
              <span>Fly Back with Airplane Transition ➔</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

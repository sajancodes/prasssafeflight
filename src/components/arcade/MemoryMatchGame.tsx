import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid, Sparkles, RotateCcw, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundscape } from '../../utils/audio';

interface CardItem {
  id: number;
  pairId: number;
  icon: string;
  title: string;
  subtitle: string;
}

const MEMORY_PAIRS = [
  { pairId: 1, icon: '🥟', title: 'Momo & Chiya', subtitle: 'Kathmandu evenings' },
  { pairId: 2, icon: '🍁', title: 'Maple Leaves', subtitle: 'Canadian autumn' },
  { pairId: 3, icon: '✈️', title: 'Flight 2026', subtitle: 'Across oceans' },
  { pairId: 4, icon: '🏔️', title: 'Himalayas', subtitle: 'Everest roots' },
  { pairId: 5, icon: '🍰', title: 'Red Velvet', subtitle: 'Sweetest farewell' },
  { pairId: 6, icon: '💌', title: 'Open When', subtitle: 'Letters of love' },
  { pairId: 7, icon: '🧳', title: 'The Suitcase', subtitle: 'Packed dreams' },
  { pairId: 8, icon: '🤍', title: 'Endless Hugs', subtitle: 'Always with you' },
];

function shuffleCards(): CardItem[] {
  const deck: CardItem[] = [];
  let id = 1;
  MEMORY_PAIRS.forEach((pair) => {
    deck.push({ id: id++, ...pair });
    deck.push({ id: id++, ...pair });
  });

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export const MemoryMatchGame: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>(() => shuffleCards());
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const handleCardClick = (index: number) => {
    // If already two flipped or clicked already flipped/matched card, return
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedPairIds.includes(cards[index].pairId)
    ) {
      return;
    }

    soundscape.playCardFlipSound();
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.pairId === secondCard.pairId) {
        // Matched!
        setTimeout(() => {
          soundscape.playSuccessChime();
          setMatchedPairIds((prev) => {
            const next = [...prev, firstCard.pairId];
            if (next.length === MEMORY_PAIRS.length) {
              setIsWon(true);
              try {
                confetti({
                  particleCount: 90,
                  spread: 90,
                  origin: { y: 0.6 },
                  colors: ['#fbbf24', '#f43f5e', '#38bdf8'],
                });
              } catch {
                // ignore
              }
            }
            return next;
          });
          setFlippedIndices([]);
        }, 500);
      } else {
        // No match, flip back
        setTimeout(() => {
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  const handleRestart = () => {
    soundscape.playCardFlipSound();
    setCards(shuffleCards());
    setFlippedIndices([]);
    setMatchedPairIds([]);
    setMoves(0);
    setIsWon(false);
  };

  return (
    <div className="bg-[#111420] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono uppercase tracking-wider mb-2">
            <Grid className="w-3.5 h-3.5" />
            <span>Mini-Game 3: Nostalgia Match</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif-title font-semibold text-white">
            Memory Match: Nepal to Canada 🧩
          </h3>
          <p className="text-sm text-neutral-400 font-sans mt-1">
            Flip and match all 8 pairs of cherished memories to unlock a secret message!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
            Moves: <strong className="text-amber-400">{moves}</strong>
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
            Pairs: <strong className="text-emerald-400">{matchedPairIds.length}</strong> / 8
          </div>
          <button
            onClick={handleRestart}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all active:scale-95 cursor-pointer"
            title="Shuffle & Restart"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Victory Banner */}
      {isWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="my-6 p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-red-500/20 border border-amber-400/40 text-center space-y-2"
        >
          <div className="flex items-center justify-center gap-2 text-amber-300 font-serif-title font-bold text-lg">
            <Trophy className="w-5 h-5" />
            <span>All Memories Matched in {moves} Moves! 🌟</span>
          </div>
          <p className="text-xs text-neutral-200 max-w-md mx-auto">
            &ldquo;No matter how many miles you fly, every shared memory with you remains forever safe in our hearts.&rdquo; 🤍
          </p>
        </motion.div>
      )}

      {/* Card Grid (4x4) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 py-6">
        {cards.map((card, index) => {
          const isFlipped = flippedIndices.includes(index);
          const isMatched = matchedPairIds.includes(card.pairId);

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className="relative h-28 sm:h-32 cursor-pointer perspective-1000 select-none"
            >
              <motion.div
                animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full relative rounded-2xl border transition-all duration-300 transform-style-3d shadow-md"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Card Back (Facedown) */}
                <div
                  className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#161a29] to-[#0c0f18] border border-white/10 hover:border-amber-400/40 flex flex-col items-center justify-center backface-hidden group"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="text-2xl opacity-60 group-hover:scale-110 transition-transform">
                    ✈️
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mt-1">
                    Tap to Flip
                  </span>
                </div>

                {/* Card Front (Faceup) */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl border flex flex-col items-center justify-center p-2 text-center backface-hidden ${
                    isMatched
                      ? 'bg-emerald-950/70 border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'bg-[#181c2d] border-amber-400/60'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <span className="text-3xl sm:text-4xl mb-1">{card.icon}</span>
                  <span className="text-xs font-semibold text-white leading-tight font-serif-title">
                    {card.title}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-sans">
                    {card.subtitle}
                  </span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, RotateCcw, Heart, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundscape } from '../../utils/audio';

const BLESSING_QUOTES = [
  'May Canada welcome you with open arms and warm coffees! ☕',
  'May every new professor and colleague admire your sharp mind! 🌟',
  'May you never forget that your family in Nepal is always one call away! 📞🤍',
  'May the Canadian winter bring you magical snowfall and cozy memories! ❄️',
  'May your courage always shine brighter than any homesickness! ✈️',
  'May you make lifelong friends who appreciate your beautiful soul! 🍁',
  'May every dream you packed in that 23kg suitcase turn into reality! 🧳✨',
  'Nepal will forever be proud of you, Prasamsa Didi! 🇳🇵🤍',
];

interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  char: string;
  size: number;
  rotation: number;
  rotSpeed: number;
}

export const CatchBlessingsGame: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [basketX, setBasketX] = useState(50); // percentage 0 to 100
  const [score, setScore] = useState(0);
  const [lastBlessing, setLastBlessing] = useState('Catch falling stars and maple leaves to read blessings!');
  const [isWon, setIsWon] = useState(false);

  const itemsRef = useRef<FallingItem[]>([]);
  const nextId = useRef(1);
  const animFrame = useRef<number | null>(null);

  // Start game loop
  const handleStartGame = () => {
    setIsPlaying(true);
    setScore(0);
    setIsWon(false);
    itemsRef.current = [];
    soundscape.playSuccessChime();
  };

  const handleStopGame = () => {
    setIsPlaying(false);
    if (animFrame.current) {
      cancelAnimationFrame(animFrame.current);
    }
  };

  // Mouse / Touch movement
  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isPlaying) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = ((clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(8, Math.min(92, relativeX)));
  };

  useEffect(() => {
    if (!isPlaying) return;

    let lastSpawn = performance.now();

    const loop = (now: number) => {
      // Spawn items
      if (now - lastSpawn > 650) {
        lastSpawn = now;
        const chars = ['⭐', '🍁', '✈️', '🤍', '✨'];
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        itemsRef.current.push({
          id: nextId.current++,
          x: 10 + Math.random() * 80,
          y: -5,
          speed: 0.6 + Math.random() * 0.7,
          char: randomChar,
          size: 24 + Math.random() * 10,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 4,
        });
      }

      // Update positions & check collisions
      const containerH = containerRef.current?.clientHeight || 320;
      const basketYRatio = 85; // basket is at 85% height

      const surviving: FallingItem[] = [];

      itemsRef.current.forEach((item) => {
        item.y += item.speed;
        item.rotation += item.rotSpeed;

        // Check if item caught by basket (basket is width ~18% centered at basketX)
        const inYZone = item.y >= basketYRatio - 4 && item.y <= basketYRatio + 8;
        const inXZone = Math.abs(item.x - basketX) < 12;

        if (inYZone && inXZone) {
          // CAUGHT!
          soundscape.playBubblePopSound();
          setScore((s) => {
            const nextScore = s + 1;
            const quote = BLESSING_QUOTES[(nextScore - 1) % BLESSING_QUOTES.length];
            setLastBlessing(quote);

            if (nextScore >= 12 && !isWon) {
              setIsWon(true);
              soundscape.playSuccessChime();
              try {
                confetti({
                  particleCount: 80,
                  spread: 80,
                  origin: { y: 0.6 },
                  colors: ['#f59e0b', '#ef4444', '#38bdf8', '#ffffff'],
                });
              } catch {
                // ignore
              }
            }
            return nextScore;
          });
        } else if (item.y < 105) {
          surviving.push(item);
        }
      });

      itemsRef.current = surviving;
      animFrame.current = requestAnimationFrame(loop);
    };

    animFrame.current = requestAnimationFrame(loop);

    return () => {
      if (animFrame.current) {
        cancelAnimationFrame(animFrame.current);
      }
    };
  }, [isPlaying, basketX, isWon]);

  return (
    <div className="bg-[#111420] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h3 className="text-2xl sm:text-3xl font-serif-title font-semibold text-white">
            Catch the Canada Blessings 🌟
          </h3>
          <p className="text-sm text-neutral-400 font-sans mt-1">
            Slide the golden cloud left and right to catch falling blessing stars & maple leaves!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
            Caught: <strong className="text-amber-400">{score}</strong> / 12
          </div>
          {!isPlaying ? (
            <button
              onClick={handleStartGame}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-lg shadow-amber-950 transition-all cursor-pointer active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>Play Game</span>
            </button>
          ) : (
            <button
              onClick={handleStopGame}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs text-white transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Pause / Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Live Revealed Blessing Banner */}
      <div className="mt-5 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
        <span className="text-2xl shrink-0">💌</span>
        <div className="overflow-hidden">
          <span className="text-xs font-mono text-amber-300/80 uppercase tracking-wide block">
            Latest Caught Blessing:
          </span>
          <p className="text-sm text-white font-serif font-medium truncate">
            {lastBlessing}
          </p>
        </div>
      </div>

      {/* Interactive Canvas / Game Arena */}
      <div
        ref={containerRef}
        onMouseMove={(e) => handleMove(e.clientX)}
        onTouchMove={(e) => {
          if (e.touches[0]) handleMove(e.touches[0].clientX);
        }}
        className="relative w-full h-80 sm:h-96 mt-6 rounded-2xl bg-gradient-to-b from-[#080a10] via-[#0d1222] to-[#141b30] border border-white/10 overflow-hidden cursor-crosshair select-none"
      >
        {/* Subtle Background Starfield */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${(i * 13) % 100}%`,
                left: `${(i * 17) % 100}%`,
                opacity: (i % 5) * 0.2 + 0.2,
              }}
            />
          ))}
        </div>

        {/* Falling Items */}
        {itemsRef.current.map((item) => (
          <div
            key={item.id}
            className="absolute pointer-events-none select-none transition-transform"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              fontSize: `${item.size}px`,
              transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
              filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))',
            }}
          >
            {item.char}
          </div>
        ))}

        {/* Player Golden Cloud / Basket */}
        <div
          className="absolute pointer-events-none transition-transform duration-75"
          style={{
            left: `${basketX}%`,
            top: '85%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative flex items-center justify-center px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-black font-bold text-xs shadow-[0_0_25px_rgba(245,158,11,0.6)] border border-amber-200">
            <span className="mr-1.5 text-base">☁️</span>
            <span>Didi&apos;s Basket</span>
          </div>
        </div>

        {/* Overlay if not playing */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-3xl">
              🌟
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-serif-title text-white font-bold">
                Ready to collect your Canadian Blessings?
              </h4>
              <p className="text-xs text-neutral-300 max-w-sm">
                Move your cursor or swipe your finger across the screen to steer the basket and catch 12 blessings!
              </p>
            </div>
            <button
              onClick={handleStartGame}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Start Game ➔
            </button>
          </div>
        )}

        {/* Victory Ribbon */}
        {isWon && (
          <div className="absolute top-4 inset-x-4 bg-emerald-950/90 border border-emerald-400/60 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-200 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>Sky Milestone Reached!</strong> All 12 blessings collected with love! 🌟</span>
            </div>
            <button
              onClick={handleStartGame}
              className="px-3 py-1 rounded-full bg-emerald-500 text-black font-semibold text-[11px] cursor-pointer"
            >
              Catch More
            </button>
          </div>
        )}
      </div>

      {/* Mobile left/right helper tap controls */}
      {isPlaying && (
        <div className="flex sm:hidden items-center justify-between gap-4 mt-3">
          <button
            onPointerDown={() => setBasketX((x) => Math.max(10, x - 15))}
            className="flex-1 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-semibold text-center active:bg-white/20"
          >
            ◀ Move Left
          </button>
          <button
            onPointerDown={() => setBasketX((x) => Math.min(90, x + 15))}
            className="flex-1 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-semibold text-center active:bg-white/20"
          >
            Move Right ▶
          </button>
        </div>
      )}
    </div>
  );
};

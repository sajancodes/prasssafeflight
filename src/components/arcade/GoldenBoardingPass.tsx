import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Check, Copy, Sparkles, MapPin, Calendar, Clock, QrCode } from 'lucide-react';
import { soundscape } from '../../utils/audio';

export const GoldenBoardingPass: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `✈️ BOARDING PASS • FIRST CLASS TO DREAMS\nPassenger: Prasamsa Didi\nFlight: NP-CAN-2026\nRoute: Kathmandu (KTM) ➔ Toronto / Vancouver (CAN)\nSeat: 1A (Window to the Northern Lights)\nStatus: Priority Boarding • Infinite Love From Nepal 🤍`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    soundscape.playChime();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-[#111420] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h3 className="text-2xl sm:text-3xl font-serif-title font-semibold text-white">
            Didi&apos;s VIP First-Class Boarding Pass 🎫
          </h3>
          <p className="text-sm text-neutral-400 font-sans mt-1">
            An official commemorative pass for your journey across the globe.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-200 text-xs font-medium transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Pass Copied!' : 'Copy Ticket Info'}</span>
        </button>
      </div>

      {/* Realistic Airline Boarding Pass Card */}
      <div className="mt-8 max-w-2xl mx-auto rounded-3xl bg-gradient-to-r from-[#fcf9f2] via-[#faf5eb] to-[#f4ece0] text-[#1c1917] p-6 sm:p-8 shadow-2xl border-2 border-[#d4af37]/60 relative overflow-hidden">
        {/* Top Airline Banner */}
        <div className="flex items-center justify-between border-b-2 border-dashed border-neutral-300 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center text-white text-xl shadow-md">
              ✈️
            </div>
            <div>
              <div className="text-xs font-mono font-bold tracking-widest uppercase text-red-800">
                ROYAL AIRWAYS • NEPAL TO CANADA
              </div>
              <div className="text-lg sm:text-xl font-serif-title font-bold text-neutral-900">
                FIRST CLASS TO YOUR DREAMS
              </div>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
              CLASS
            </div>
            <div className="text-sm font-mono font-bold text-red-700">
              VIP / FIRST
            </div>
          </div>
        </div>

        {/* Airport Flight Path */}
        <div className="grid grid-cols-3 gap-2 items-center py-6 border-b border-neutral-200 text-center">
          <div className="text-left">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-neutral-900">
              KTM
            </div>
            <div className="text-xs font-sans text-neutral-600 font-medium">Kathmandu, Nepal</div>
            <div className="text-[11px] font-mono text-neutral-400">Tribhuvan Intl</div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="text-xs font-mono text-red-600 font-semibold mb-1">11,600 KM</div>
            <div className="w-full flex items-center gap-1 text-neutral-400">
              <div className="h-[2px] w-full bg-neutral-300" />
              <Plane className="w-4 h-4 text-red-600 rotate-90 shrink-0" />
              <div className="h-[2px] w-full bg-neutral-300" />
            </div>
            <div className="text-[10px] font-mono text-neutral-500 mt-1">NON-STOP LOVE</div>
          </div>

          <div className="text-right">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-red-700">
              CAN
            </div>
            <div className="text-xs font-sans text-neutral-600 font-medium">Toronto / Vancouver</div>
            <div className="text-[11px] font-mono text-neutral-400">Pearson / YVR</div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 text-left border-b border-neutral-200">
          <div>
            <div className="text-[10px] font-mono uppercase text-neutral-500">PASSENGER NAME</div>
            <div className="text-sm font-bold font-serif-title text-neutral-900">
              Prasamsa Didi
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-neutral-500">FLIGHT NUMBER</div>
            <div className="text-sm font-mono font-bold text-neutral-900">
              NP-CAN-2026
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-neutral-500">SEAT ASSIGNMENT</div>
            <div className="text-sm font-mono font-bold text-red-700">
              1A (Window)
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-neutral-500">BOARDING GATE</div>
            <div className="text-sm font-mono font-bold text-neutral-900">
              GATE 07 • DESTINY
            </div>
          </div>
        </div>

        {/* Bottom Barcode & Quote */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-serif italic text-neutral-700">
              &ldquo;May your wings carry you far, and your roots always bring you peace.&rdquo;
            </div>
            <div className="text-[11px] font-mono text-neutral-400">
              ISSUED WITH LOVE BY FAMILY & FRIENDS IN NEPAL 🤍
            </div>
          </div>

          {/* Barcode representation */}
          <div className="flex items-center gap-1 bg-white p-2 rounded-lg border border-neutral-300 shadow-xs">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="bg-neutral-800"
                style={{
                  width: `${(i % 3 === 0 ? 3 : i % 2 === 0 ? 1.5 : 2)}px`,
                  height: '32px',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

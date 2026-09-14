import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Feather, Heart, Printer, Check, Copy, Sparkles } from 'lucide-react';
import { finalLetterContent } from '../../data/letters';
import { appConfig } from '../../data/config';
import { soundscape } from '../../utils/audio';

export const FinalLetter: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const fullText = `${finalLetterContent.greeting}\n\n${finalLetterContent.paragraphs.join('\n\n')}\n\n${finalLetterContent.signoff}\n${finalLetterContent.sender}\n${finalLetterContent.location} • ${finalLetterContent.date}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    soundscape.playChime();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="scene-final-letter"
      className="relative min-h-screen w-full bg-[#11131a] text-[#ece8e1] py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background warm desk light */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-950/25 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase text-amber-300 font-sans"
          >
            <Feather className="w-3.5 h-3.5" />
            <span>A Personal Farewell Message</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white font-serif-title"
          >
            One last thing…
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-neutral-400 font-sans"
          >
            From the bottom of our hearts, before your plane takes off for Canada.
          </motion.p>
        </div>

        {/* Vintage Parchment Letter Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative bg-[#fcf9f2] text-[#2c2925] rounded-3xl p-8 sm:p-14 shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-[#e8dfcf] space-y-8"
        >
          {/* Top Decorative Wax Stamp and Origin Mark */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-300">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>Kathmandu, Nepal ➔ Canada</span>
            </div>

            {/* Vintage Postmark Stamp */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded border border-dashed border-neutral-400 font-mono text-[11px] text-neutral-500 rotate-[-2deg]">
              <span>AIR MAIL // FLIGHT 2026</span>
              <span>✈️</span>
            </div>
          </div>

          {/* Letter Body */}
          <div className="space-y-6 text-base sm:text-lg text-neutral-800 font-serif leading-relaxed">
            <h3 className="text-2xl sm:text-3xl font-semibold text-neutral-900 font-serif-title">
              {finalLetterContent.greeting}
            </h3>

            {finalLetterContent.paragraphs.map((para, i) => (
              <p key={i} className="leading-relaxed">
                {para}
              </p>
            ))}

            <div className="pt-6 space-y-2 border-t border-neutral-200">
              <p className="italic text-neutral-700">
                {finalLetterContent.signoff}
              </p>
              <p className="font-handwritten text-3xl sm:text-4xl text-neutral-900 pt-1 font-bold">
                {finalLetterContent.sender}
              </p>
              <div className="text-xs font-mono text-neutral-500 pt-1">
                {finalLetterContent.location} • {finalLetterContent.date}
              </div>
            </div>
          </div>

          {/* Bottom Action Tray */}
          <div className="pt-6 border-t border-neutral-300 flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              This letter is always here for you to revisit.
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-200/80 hover:bg-neutral-300 text-neutral-800 font-medium transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Words'}</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Keepsake</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Users2, TrendingUp, HeartHandshake, Sparkles } from 'lucide-react';
import { canadaHopes, CanadaHope } from '../../data/memories';

export const CanadaHopes: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'Users2':
        return <Users2 className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <HeartHandshake className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="scene-hopes"
      className="relative min-h-screen w-full bg-[#0e1017] text-[#ece8e1] py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-rose-950/20 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-amber-950/20 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-20">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase text-amber-300 font-sans"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Wishes for the New Chapter</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white font-serif-title"
          >
            Things I Hope Canada Gives You
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-neutral-400 font-sans"
          >
            Four sincere wishes as you start your journey in the Great White North. 🇨🇦
          </motion.p>
        </div>

        {/* 4 Cinematic Vertical Chapters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {canadaHopes.map((chapter, index) => {
            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="group relative rounded-3xl p-8 sm:p-10 bg-[#141824]/80 border border-white/10 hover:border-white/20 transition-all duration-500 shadow-xl backdrop-blur-md overflow-hidden flex flex-col justify-between"
              >
                {/* Background soft thematic gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${chapter.bgGradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Subtle Maple Leaf watermarking */}
                <div className="absolute top-4 right-4 text-white/5 group-hover:text-white/10 transition-colors text-6xl select-none pointer-events-none">
                  🍁
                </div>

                <div className="relative z-10 space-y-6">
                  {/* Top Badge with Icon */}
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
                      style={{ backgroundColor: chapter.themeColor + '25', border: `1px solid ${chapter.themeColor}50`, color: chapter.themeColor }}
                    >
                      {getIcon(chapter.iconName)}
                    </div>
                    <span className="text-xs font-mono tracking-widest text-white/40 uppercase">
                      Chapter 0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-wider text-white font-serif-title uppercase">
                      {chapter.title}
                    </h3>
                    <div className="w-10 h-[2px]" style={{ backgroundColor: chapter.themeColor }} />
                  </div>

                  {/* Highlight Quote */}
                  <p className="text-lg sm:text-xl font-light text-neutral-200 font-serif-title leading-relaxed italic">
                    {chapter.quote}
                  </p>
                </div>

                {/* Description */}
                <div className="relative z-10 pt-6 mt-6 border-t border-white/5">
                  <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                    {chapter.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

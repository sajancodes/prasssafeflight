import React from 'react';
import { motion } from 'framer-motion';
import { History, Sparkles, ArrowDown, MapPin, Calendar, Heart } from 'lucide-react';
import { PhotoItem, photos } from '../../data/photos';

interface PhotoTimelineProps {
  onSelectPhoto: (photo: PhotoItem) => void;
}

export const PhotoTimeline: React.FC<PhotoTimelineProps> = ({ onSelectPhoto }) => {
  const stages = [
    {
      id: 'then',
      title: 'THEN',
      subtitle: 'The Humble Beginnings',
      quote: 'Wide-eyed, curious, and filled with gentle kindness.',
      items: photos.filter((p) => p.category === 'timeline-then'),
    },
    {
      id: 'growing',
      title: 'GROWING UP',
      subtitle: 'Learning, Blossoming & Building Wings',
      quote: 'Overcoming every step with courage and making lifelong memories in Nepal.',
      items: photos.filter((p) => p.category === 'timeline-growth'),
    },
    {
      id: 'person',
      title: 'THE PERSON YOU BECAME',
      subtitle: 'Our Guiding Star & Pride',
      quote: 'A compassionate, resilient, and inspiring woman who lifts everyone around her.',
      items: photos.filter((p) => p.category === 'timeline-now').slice(0, 2),
    },
    {
      id: 'now',
      title: 'AND NOW…',
      subtitle: 'Canada Bound • Spreading Your Wings',
      quote: 'Standing ready to conquer the world with that unforgettable smile.',
      items: photos.filter((p) => p.category === 'timeline-now').slice(2, 4),
    },
  ];

  return (
    <section
      id="scene-timeline"
      className="relative min-h-screen w-full bg-[#11131b] text-[#ece8e1] py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background stars / ambient gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-sky-950/20 rounded-full blur-[180px]" />
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
            <History className="w-3.5 h-3.5" />
            <span>Visual Story</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white font-serif-title"
          >
            The Journey of Prasamsa Didi
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-neutral-400 font-sans"
          >
            From the little moments at home to stepping onto the global stage.
          </motion.p>
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative border-l-2 border-white/10 ml-4 sm:ml-8 md:ml-32 space-y-16 sm:space-y-24 pl-6 sm:pl-10">
          {stages.map((stage, sIndex) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8 }}
              className="relative space-y-6"
            >
              {/* Timeline Pin Node on the line */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#11131b] border-2 border-amber-400 flex items-center justify-center text-amber-300 text-xs shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              </div>

              {/* Stage Title and Quote */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-semibold tracking-wider">
                    {stage.title}
                  </span>
                  <span className="text-sm font-serif-title text-neutral-400 italic">
                    {stage.subtitle}
                  </span>
                </div>
                <p className="text-base sm:text-lg text-neutral-300 font-serif-title">
                  “{stage.quote}”
                </p>
              </div>

              {/* Photos Grid for this Stage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {stage.items.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => onSelectPhoto(item)}
                    className="group relative bg-[#181c28] border border-white/10 hover:border-amber-400/40 rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                      
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-xs sm:text-sm font-serif-title line-clamp-1">
                          {item.caption}
                        </p>
                        {item.note && (
                          <p className="font-handwritten text-base text-amber-300">
                            {item.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline Final Climax Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center pt-8 border-t border-white/10 space-y-3 max-w-xl mx-auto"
        >
          <p className="text-2xl sm:text-3xl text-white font-serif-title">
            “Look how far you’ve already come.”
          </p>
          <p className="text-xl sm:text-2xl text-amber-300 font-serif-title italic">
            “Canada is just the beginning.” 🇨🇦 ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
};

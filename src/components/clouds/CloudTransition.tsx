import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sparkles } from 'lucide-react';

export const CloudTransition: React.FC = () => {
  return (
    <section
      id="scene-clouds"
      className="relative min-h-[70vh] sm:min-h-[80vh] w-full flex items-center justify-center bg-gradient-to-b from-[#0a0c13] via-[#121624] to-[#151926] text-[#ece8e1] overflow-hidden px-4 sm:px-6 py-20"
    >
      {/* Background Volumetric Cloud Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Cloud Layer 1 - Slow drifting back */}
        <motion.div
          className="absolute -top-10 -left-20 w-[120%] h-[350px] bg-gradient-to-r from-sky-300/10 via-white/10 to-amber-100/10 rounded-[100%] blur-[70px]"
          animate={{
            x: [-40, 40, -40],
            y: [-10, 15, -10],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Cloud Layer 2 - Mid drifting */}
        <motion.div
          className="absolute top-1/3 -right-20 w-[110%] h-[380px] bg-gradient-to-r from-indigo-300/10 via-white/15 to-rose-200/10 rounded-[100%] blur-[90px]"
          animate={{
            x: [30, -30, 30],
            y: [15, -15, 15],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Cloud Layer 3 - Lower misty floor */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#181b24] to-transparent pointer-events-none" />
      </div>

      {/* Floating Cloud Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Cloud className="absolute top-12 left-10 w-24 h-24 text-white/5 blur-[1px]" />
        <Cloud className="absolute bottom-16 right-16 w-32 h-32 text-white/5 blur-[2px]" />
      </div>

      {/* Text Message Sequence */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-amber-300/80 shadow-inner"
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>

        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-2xl sm:text-4xl md:text-5xl font-light font-serif-title tracking-tight text-white/90 leading-tight"
          >
            “Some journeys take you somewhere new…”
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="text-2xl sm:text-4xl md:text-5xl font-light font-serif-title tracking-tight text-amber-200/90 italic leading-tight"
          >
            “…while carrying pieces of home with you.”
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
          className="pt-4"
        >
          <p className="font-handwritten text-xl sm:text-2xl text-neutral-400">
            (The memories that will forever stay safe in your heart)
          </p>
        </motion.div>
      </div>
    </section>
  );
};

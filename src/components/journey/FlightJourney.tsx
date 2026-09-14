import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Compass, Navigation, Clock, Globe2, Sparkles, MapPin } from 'lucide-react';
import { appConfig } from '../../data/config';

export const FlightJourney: React.FC = () => {
  const [flightProgress, setFlightProgress] = useState(0.35);
  const [isAutoFlying, setIsAutoFlying] = useState(true);

  // Smooth flight loop
  useEffect(() => {
    if (!isAutoFlying) return;
    const interval = setInterval(() => {
      setFlightProgress((prev) => (prev >= 1 ? 0 : prev + 0.004));
    }, 40);
    return () => clearInterval(interval);
  }, [isAutoFlying]);

  // Quadratic Bezier Calculation for the curved flight path
  // Start: Kathmandu (x: 180, y: 320)
  // Control Point (High arc over Arctic / Asia / Europe): (x: 480, y: 60)
  // End: Canada (x: 820, y: 260)
  const startX = 160;
  const startY = 320;
  const ctrlX = 490;
  const ctrlY = 70;
  const endX = 820;
  const endY = 250;

  const t = flightProgress;
  const planeX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * ctrlX + t * t * endX;
  const planeY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * ctrlY + t * t * endY;

  // Tangent angle for plane orientation
  const dx = 2 * (1 - t) * (ctrlX - startX) + 2 * t * (endX - ctrlX);
  const dy = 2 * (1 - t) * (ctrlY - startY) + 2 * t * (endY - ctrlY);
  const planeAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 45; // adjust for plane icon base orientation

  const distanceTotal = 11620; // km
  const currentDistance = Math.round(distanceTotal * flightProgress);
  const flightHours = (16.5 * flightProgress).toFixed(1);

  return (
    <section
      id="scene-flight"
      className="relative min-h-screen w-full bg-[#0a0c13] text-[#ece8e1] py-20 px-4 sm:px-6 overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Background celestial grid lines and subtle glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(#4f6b9515_1px,transparent_1px)] [background-size:36px_36px]" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-sky-950/25 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-5xl w-full mx-auto space-y-12">
        {/* Section Header Text */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="space-y-1"
          >
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white font-serif-title">
              One flight.
            </h2>
            <p className="text-xl sm:text-3xl text-neutral-300 font-serif-title italic">
              A completely new chapter.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-sm sm:text-base text-neutral-400 font-sans"
          >
            Connecting Kathmandu, Nepal to Canada across 11,600+ km of open skies.
          </motion.p>
        </div>

        {/* Flight Route Map Canvas Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative bg-[#0f131d]/90 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl overflow-hidden"
        >
          {/* Top Bar flight info */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 text-xs sm:text-sm font-sans">
            {/* Origin */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-950/50 border border-red-500/40 flex items-center justify-center text-red-400 font-serif font-bold text-base">
                🇳🇵
              </div>
              <div>
                <div className="font-semibold text-white tracking-wide">KATHMANDU (KTM)</div>
                <div className="text-white/50 text-xs">Nepal • 27.7172° N, 85.3240° E</div>
              </div>
            </div>

            {/* Flight Stats Counter */}
            <div className="hidden md:flex items-center gap-6 px-4 py-2 rounded-2xl bg-white/5 border border-white/5 font-mono text-xs">
              <div className="text-center">
                <div className="text-white/40 text-[10px] uppercase tracking-wider">Distance</div>
                <div className="text-amber-300 font-medium">{currentDistance.toLocaleString()} / 11,620 km</div>
              </div>
              <div className="w-[1px] h-6 bg-white/10" />
              <div className="text-center">
                <div className="text-white/40 text-[10px] uppercase tracking-wider">Flight Time</div>
                <div className="text-white font-medium">{flightHours} hrs</div>
              </div>
              <div className="w-[1px] h-6 bg-white/10" />
              <div className="text-center">
                <div className="text-white/40 text-[10px] uppercase tracking-wider">Status</div>
                <div className="text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  In Air
                </div>
              </div>
            </div>

            {/* Destination */}
            <div className="flex items-center gap-3 text-right">
              <div>
                <div className="font-semibold text-white tracking-wide">CANADA (YYZ / YVR)</div>
                <div className="text-white/50 text-xs">A New Chapter • Canada</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-rose-950/50 border border-rose-500/40 flex items-center justify-center text-rose-400 font-serif font-bold text-base">
                🇨🇦
              </div>
            </div>
          </div>

          {/* SVG Geodesic Curved Flight Path Visualizer */}
          <div className="relative w-full h-[320px] sm:h-[400px] my-4 flex items-center justify-center">
            <svg
              viewBox="0 0 980 440"
              className="w-full h-full overflow-visible"
              style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }}
            >
              <defs>
                {/* Glowing gradient for flight arc */}
                <linearGradient id="flightArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e74c3c" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#f39c12" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
                </linearGradient>

                <linearGradient id="glowG" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e74c3c" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Background continent silhouette outlines (stylized minimalist) */}
              <g opacity="0.18" fill="none" stroke="#7e9bbd" strokeWidth="1">
                {/* Asia / Himalayas marker */}
                <circle cx="160" cy="320" r="45" strokeDasharray="3 3" />
                <circle cx="160" cy="320" r="90" strokeDasharray="5 5" />
                {/* North America / Canada marker */}
                <circle cx="820" cy="250" r="45" strokeDasharray="3 3" />
                <circle cx="820" cy="250" r="90" strokeDasharray="5 5" />
                {/* Latitude / longitude arcs */}
                <path d="M 50 180 Q 490 120 930 180" strokeDasharray="4 4" />
                <path d="M 50 300 Q 490 240 930 300" strokeDasharray="4 4" />
              </g>

              {/* Dashed background trajectory */}
              <path
                d={`M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`}
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />

              {/* Filled Travel Path based on progress */}
              <path
                d={`M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`}
                fill="none"
                stroke="url(#flightArcGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="1000"
                strokeDashoffset={1000 * (1 - flightProgress)}
              />

              {/* Glowing aura under the active path */}
              <path
                d={`M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`}
                fill="none"
                stroke="url(#glowG)"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.6"
              />

              {/* Origin City: Kathmandu Pin */}
              <g transform={`translate(${startX}, ${startY})`}>
                <circle r="14" fill="#c0392b" opacity="0.3" className="animate-ping" />
                <circle r="7" fill="#e74c3c" stroke="#ffffff" strokeWidth="2" />
                <text
                  x="0"
                  y="26"
                  textAnchor="middle"
                  fill="#fca5a5"
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  Kathmandu 🇳🇵
                </text>
                <text x="0" y="40" textAnchor="middle" fill="#ffffff" opacity="0.6" fontSize="10">
                  Home & Memories
                </text>
              </g>

              {/* Destination City: Canada Pin */}
              <g transform={`translate(${endX}, ${endY})`}>
                <circle r="14" fill="#38bdf8" opacity="0.3" className="animate-ping" />
                <circle r="7" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                <text
                  x="0"
                  y="26"
                  textAnchor="middle"
                  fill="#bae6fd"
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  Canada 🇨🇦
                </text>
                <text x="0" y="40" textAnchor="middle" fill="#ffffff" opacity="0.6" fontSize="10">
                  Dreams & Future
                </text>
              </g>

              {/* Flying Airplane on the path */}
              <g transform={`translate(${planeX}, ${planeY}) rotate(${planeAngle})`}>
                {/* Airplane contrail particles */}
                <ellipse cx="-18" cy="0" rx="14" ry="3" fill="#ffffff" opacity="0.6" />
                <ellipse cx="-32" cy="0" rx="20" ry="2" fill="#facc15" opacity="0.3" />

                {/* Plane Body */}
                <g transform="translate(-12, -12)">
                  <path
                    d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 20.5 3c-1-1-3-.5-4.5 1L12.5 7.5 4.3 5.7c-.5-.1-.9.1-1.2.4l-.8.8c-.3.3-.3.8 0 1.1l5.7 4.2-3.1 3.1-2.2-.6c-.3-.1-.7 0-.9.2l-.5.5c-.2.2-.2.6 0 .8l2.6 2.6 2.6 2.6c.2.2.6.2.8 0l.5-.5c.2-.2.3-.6.2-.9l-.6-2.2 3.1-3.1 4.2 5.7c.3.3.8.3 1.1 0l.8-.8c.3-.3.5-.7.4-1.2z"
                    fill="#ffffff"
                    stroke="#0f172a"
                    strokeWidth="1.5"
                  />
                </g>
              </g>
            </svg>

            {/* Interactive Flight Scrub Bar */}
            <div className="absolute bottom-2 left-6 right-6 flex items-center justify-between gap-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
              <button
                onClick={() => setIsAutoFlying(!isAutoFlying)}
                className="text-xs text-amber-300 hover:text-amber-200 font-medium px-2.5 py-1 rounded-lg bg-white/10"
              >
                {isAutoFlying ? 'Pause Simulation' : 'Auto Fly ▶'}
              </button>

              <div className="flex-1 flex items-center gap-3">
                <span className="text-[11px] text-white/50">KTM</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={flightProgress}
                  onChange={(e) => {
                    setIsAutoFlying(false);
                    setFlightProgress(parseFloat(e.target.value));
                  }}
                  className="flex-1 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#e74c3c]"
                />
                <span className="text-[11px] text-white/50">CAN</span>
              </div>
            </div>
          </div>

          {/* Bottom Emotional Quote */}
          <div className="pt-4 text-center border-t border-white/5">
            <p className="font-handwritten text-2xl sm:text-3xl text-amber-200/90 tracking-wide">
              “11,600 kilometres of distance, but 0 kilometres of difference in how much we love you.”
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

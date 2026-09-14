import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles as DreiSparkles } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wind, Cake as CakeIcon, RotateCw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundscape } from '../../utils/audio';
import { appConfig } from '../../data/config';

// 3D Procedural Canvas Textures for Piped Icing & Cake Writing
function createPipedCakeTextCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Transparent background
    ctx.clearRect(0, 0, 1024, 1024);

    // Subtle golden / crimson edible piping style
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Top decorative piping filigree
    ctx.fillStyle = '#b03a2e';
    ctx.font = 'bold 54px serif';
    ctx.fillText('✈️  ~ • ~  🍁', 512, 380);

    // Main line: "Have a Safe Flight" in edible calligraphy
    ctx.shadowColor = 'rgba(120, 20, 15, 0.4)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 3;

    ctx.fillStyle = '#902018';
    ctx.font = 'bold 74px "Newsreader", "Cormorant Garamond", Georgia, serif';
    ctx.fillText('Have a Safe Flight', 512, 470);

    // Second line: "Prasamsa Didi ✈️"
    ctx.fillStyle = '#c0392b';
    ctx.font = '62px "Caveat", "Brush Script MT", cursive, serif';
    ctx.fillText('Prasamsa Didi ✈️', 512, 570);

    // Decorative bottom flourish
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 36px serif';
    ctx.fillText('~ Nepal to Canada ~', 512, 650);
  }
  return new THREE.CanvasTexture(canvas);
}

// 3D Piped Rosette Rim along top and bottom edges
function PipedRosettes({ radius, count, y, color = '#fcf8ee' }: { radius: number; count: number; y: number; color?: string }) {
  const rosettes = Array.from({ length: count });
  return (
    <group position={[0, y, 0]}>
      {rosettes.map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <mesh key={i} position={[x, 0, z]} rotation={[0, angle, 0]} castShadow receiveShadow>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial
              color={color}
              roughness={0.4}
              metalness={0.05}
              bumpScale={0.05}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// 3D Candle with Dripping Wax & Natural Flickering Flame Light
function Candle({ position, isLit }: { position: [number, number, number]; isLit: boolean }) {
  const flameRef = useRef<THREE.PointLight>(null);
  const flameMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (flameRef.current && isLit) {
      const time = state.clock.getElapsedTime();
      // Natural organic candle flame flicker math
      const flicker =
        Math.sin(time * 12) * 0.15 +
        Math.sin(time * 23) * 0.08 +
        Math.sin(time * 37) * 0.05;
      flameRef.current.intensity = 1.4 + flicker;
      if (flameMeshRef.current) {
        flameMeshRef.current.scale.set(
          1 + flicker * 0.3,
          1.2 + flicker * 0.5,
          1 + flicker * 0.3
        );
      }
    }
  });

  return (
    <group position={position}>
      {/* Wax Candle Stick with Red/Gold Stripe */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.045, 0.9, 16]} />
        <meshStandardMaterial color="#fff4e0" roughness={0.3} metalness={0.05} />
      </mesh>

      {/* Decorative Gold Rings on Candle */}
      <mesh position={[0, 0.35, 0]}>
        <torusGeometry args={[0.043, 0.006, 8, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <torusGeometry args={[0.043, 0.006, 8, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Dripping Wax Droplets */}
      <mesh position={[0.035, 0.8, 0.02]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#fff4e0" roughness={0.3} />
      </mesh>

      {/* Candle Wick */}
      <mesh position={[0, 0.94, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.08, 8]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.9} />
      </mesh>

      {/* Glowing Flame */}
      {isLit && (
        <group position={[0, 1.02, 0]}>
          <mesh ref={flameMeshRef}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial color="#ff9f43" />
          </mesh>
          <mesh position={[0, 0.03, 0]}>
            <coneGeometry args={[0.03, 0.09, 12]} />
            <meshBasicMaterial color="#feca57" />
          </mesh>
          {/* Inner blue flame base */}
          <mesh position={[0, -0.015, 0]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#54a0ff" />
          </mesh>

          {/* Point Light casting realistic candle warmth */}
          <pointLight
            ref={flameRef}
            color="#ff9f43"
            intensity={1.5}
            distance={5}
            decay={2}
            castShadow
          />
        </group>
      )}
    </group>
  );
}

// 3D Airplane Cake Topper
function AirplaneTopper({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0.2, 0.4, 0.1]} scale={0.28}>
      {/* Fuselage */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.14, 1.4, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
      </mesh>
      {/* Nose cone */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <coneGeometry args={[0.1, 0.25, 16]} />
        <meshStandardMaterial color="#c0392b" metalness={0.3} roughness={0.3} />
      </mesh>
      {/* Wings */}
      <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <boxGeometry args={[0.03, 1.6, 0.4]} />
        <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.2} />
      </mesh>
      {/* Tail Fin */}
      <mesh position={[0, -0.6, 0.25]} rotation={[0.4, 0, 0]} castShadow>
        <boxGeometry args={[0.02, 0.35, 0.35]} />
        <meshStandardMaterial color="#c0392b" metalness={0.3} roughness={0.3} />
      </mesh>
    </group>
  );
}

// Complete Realistic 3D Celebration Cake Model
function RealisticCakeModel({ isLit, textTexture }: { isLit: boolean; textTexture: THREE.CanvasTexture }) {
  const cakeGroupRef = useRef<THREE.Group>(null);

  // Gentle continuous rotation
  useFrame((_, delta) => {
    if (cakeGroupRef.current) {
      cakeGroupRef.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group ref={cakeGroupRef} position={[0, -0.6, 0]}>
      {/* 1. Golden Luxury Cake Board */}
      <mesh position={[0, -0.06, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.9, 1.95, 0.08, 48]} />
        <meshStandardMaterial color="#e5c158" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Subtle Board Edge Bevel */}
      <mesh position={[0, -0.02, 0]}>
        <torusGeometry args={[1.9, 0.03, 16, 48]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* 2. Main Tier - Elegant Round Layered Cake */}
      {/* Cake Sponge / Base Cylinder with Vanilla Cream */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 1.2, 48]} />
        <meshStandardMaterial
          color="#faf6ec"
          roughness={0.35}
          metalness={0.03}
        />
      </mesh>

      {/* Cream Layer Dividers (subtle indent lines) */}
      <mesh position={[0, 0.35, 0]}>
        <torusGeometry args={[1.505, 0.015, 12, 48]} />
        <meshStandardMaterial color="#ebdfca" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <torusGeometry args={[1.505, 0.015, 12, 48]} />
        <meshStandardMaterial color="#ebdfca" roughness={0.4} />
      </mesh>

      {/* Top Surface Piped Texture & Writing Disc */}
      <mesh position={[0, 1.205, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.48, 48]} />
        <meshStandardMaterial
          map={textTexture}
          transparent={true}
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>

      {/* Top Rim Piped Rosettes */}
      <PipedRosettes radius={1.46} count={32} y={1.2} color="#fdfbf7" />

      {/* Bottom Rim Piped Rosettes */}
      <PipedRosettes radius={1.52} count={36} y={0.05} color="#f5eedc" />

      {/* 3. Real Candles Setup */}
      {/* Center Main Candle */}
      <Candle position={[0, 1.2, 0]} isLit={isLit} />
      {/* Surrounding Trio of Blessing Candles */}
      <Candle position={[0.7, 1.2, 0.4]} isLit={isLit} />
      <Candle position={[-0.7, 1.2, 0.4]} isLit={isLit} />
      <Candle position={[0, 1.2, -0.7]} isLit={isLit} />

      {/* 4. Tiny Airplane & Maple Leaf Cake Toppers */}
      <AirplaneTopper position={[0.65, 1.65, -0.45]} />

      {/* Edible Fresh Strawberry / Cherry Accents on Top Rim */}
      <mesh position={[1.1, 1.28, 0.7]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#c0392b" roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[-1.1, 1.28, 0.7]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#c0392b" roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.28, 1.2]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#c0392b" roughness={0.2} metalness={0.1} />
      </mesh>
    </group>
  );
}

export const FarewellCake3D: React.FC = () => {
  const [isLit, setIsLit] = useState(true);
  const [wished, setWished] = useState(false);
  const [textTexture] = useState(() => createPipedCakeTextCanvas());

  const handleBlowCandles = () => {
    if (!isLit) {
      // Relight
      setIsLit(true);
      setWished(false);
      return;
    }

    // Play breath and chime sound
    soundscape.playBlowSound();
    setIsLit(false);
    setWished(true);

    // Fire golden & maple confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c0392b', '#f39c12', '#d4af37', '#ffffff', '#e74c3c'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <section
      id="scene-cake"
      className="relative min-h-screen w-full bg-gradient-to-b from-[#0f1118] via-[#090b10] to-[#0b0c10] text-[#ece8e1] py-24 px-4 sm:px-6 overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* Atmospheric ambient lighting & sparkles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-900/15 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-4xl w-full mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase text-amber-300 font-sans"
          >
            <CakeIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Celebration & Wish</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white font-serif-title"
          >
            The Farewell Celebration Cake
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-neutral-400 font-sans"
          >
            A photorealistic 3D keepsake baked with sweet wishes for your flight. Drag to inspect 360°.
          </motion.p>
        </div>

        {/* 3D Three.js / React Three Fiber Canvas Viewport */}
        <div className="relative w-full h-[450px] sm:h-[520px] rounded-3xl bg-[#090a0f]/95 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Subtle rotation instruction hint */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-[11px] text-white/60 font-sans backdrop-blur-sm pointer-events-none">
            <RotateCw className="w-3.5 h-3.5 text-amber-400" />
            <span>Drag around to rotate cake</span>
          </div>

          <Canvas
            shadows
            camera={{ position: [0, 2.5, 4.2], fov: 42 }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            {/* Studio Lighting Setup */}
            <ambientLight intensity={0.7} />
            {/* Warm Key Light */}
            <directionalLight
              position={[4, 6, 4]}
              intensity={1.6}
              color="#fff8ed"
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            {/* Soft Fill Light */}
            <directionalLight position={[-4, 3, -2]} intensity={0.6} color="#dbeafe" />
            {/* Golden Rim Light from back */}
            <spotLight position={[0, 5, -4]} intensity={1.8} color="#f59e0b" angle={0.6} penumbra={1} />

            {/* Floating golden sparkle particles */}
            <DreiSparkles count={40} scale={5} size={2.5} speed={0.4} color="#facc15" opacity={0.5} />

            {/* The 3D Cake */}
            <RealisticCakeModel isLit={isLit} textTexture={textTexture} />

            {/* Orbit Controls (constrained to stay pleasant) */}
            <OrbitControls
              enableZoom={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2.1}
              autoRotate={false}
            />
          </Canvas>

          {/* Interactive Wish / Blow Candles Button Overlay */}
          <div className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center gap-3">
            <button
              id="blow-candles-button"
              onClick={handleBlowCandles}
              className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-neutral-950 font-semibold text-sm sm:text-base shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_45px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              {isLit ? (
                <>
                  <Wind className="w-5 h-5 text-neutral-900 group-hover:rotate-12 transition-transform" />
                  <span>Make a wish & Blow out candles 🎂</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-neutral-900" />
                  <span>Wish Made! ✨ (Click to re-light)</span>
                </>
              )}
            </button>

            {wished && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-1 bg-black/60 backdrop-blur-md px-6 py-2 rounded-2xl border border-amber-500/30"
              >
                <p className="font-serif-title text-lg text-white font-medium">
                  “Make a wish for the journey ahead.”
                </p>
                <p className="font-handwritten text-xl text-amber-300">
                  “Safe flight, Didi. ✈️🤍”
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

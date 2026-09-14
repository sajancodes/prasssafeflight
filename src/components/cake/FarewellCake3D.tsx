import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles as DreiSparkles } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Sparkles, RotateCw, Maximize2, Minimize2, Utensils, Heart, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundscape } from '../../utils/audio';

// 1. Procedural Texture: Secret Inscription Hidden DIRECTLY on the Golden Plate under the cake!
function createHiddenPlateSecretTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Polished gold and warm parchment disc base
    const grad = ctx.createRadialGradient(512, 512, 50, 512, 512, 500);
    grad.addColorStop(0, '#fef9e7');
    grad.addColorStop(0.65, '#faebd7');
    grad.addColorStop(0.85, '#e2c56a');
    grad.addColorStop(1, '#b48a28');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(512, 512, 500, 0, Math.PI * 2);
    ctx.fill();

    // Concentric royal filigree rings
    ctx.strokeStyle = '#996515';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(512, 512, 480, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(512, 512, 460, 0, Math.PI * 2);
    ctx.stroke();

    // Red velvet crumb specks left on plate
    for (let i = 0; i < 70; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = 160 + Math.random() * 300;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(122, 17, 30, 0.45)' : 'rgba(153, 27, 27, 0.35)';
      ctx.beginPath();
      ctx.arc(512 + Math.cos(a) * d, 512 + Math.sin(a) * d, 1.5 + Math.random() * 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Top icon flourish
    ctx.font = 'bold 50px serif';
    ctx.fillStyle = '#7a111e';
    ctx.fillText('✈️  ~ • ~  🍁', 512, 280);

    // Title of secret note
    ctx.shadowColor = 'rgba(70, 10, 15, 0.3)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 2;

    ctx.fillStyle = '#6b0d18';
    ctx.font = 'bold 54px "Newsreader", "Cormorant Garamond", Georgia, serif';
    ctx.fillText('A Secret Note for Prasamsa Didi', 512, 360);

    // Subtitle
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#854d0e';
    ctx.font = '32px "Newsreader", serif';
    ctx.fillText('You ate the whole cake! Here is what was hidden below:', 512, 430);

    // Embossed interactive button painted directly onto the golden plate
    const bx = 160;
    const by = 490;
    const bw = 704;
    const bh = 130;
    const r = 65;

    // Glowing Crimson / Golden Button Pill
    const btnGrad = ctx.createLinearGradient(bx, by, bx + bw, by + bh);
    btnGrad.addColorStop(0, '#991b1b');
    btnGrad.addColorStop(0.5, '#dc2626');
    btnGrad.addColorStop(1, '#b45309');

    ctx.shadowColor = 'rgba(185, 28, 28, 0.6)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 6;

    ctx.fillStyle = btnGrad;
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, r);
    ctx.fill();

    // Button golden border
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, r);
    ctx.stroke();

    // "CLICK HERE" BUTTON TEXT
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px "Newsreader", sans-serif';
    ctx.fillText('🍁  CLICK FOR NEW SURPRISE  ✈️', 512, 545);

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 25px sans-serif';
    ctx.fillText('( Tap plate to board flight to Didi\'s Arcade )', 512, 588);

    // Bottom love signature
    ctx.fillStyle = '#78350f';
    ctx.font = 'italic 34px "Caveat", "Brush Script MT", cursive, serif';
    ctx.fillText('“Nepal will always hold your roots. Canada will see you fly.” ✈️🤍', 512, 690);
  }
  return new THREE.CanvasTexture(canvas);
}

// 2. Procedural Texture: Center Calligraphy Fondant Plaque (sits atop cake slices)
function createCenterPlaqueTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#fffdf7';
    ctx.beginPath();
    ctx.arc(384, 384, 380, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 14;
    ctx.stroke();

    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(384, 384, 360, 0, Math.PI * 2);
    ctx.stroke();

    for (let i = 0; i < 90; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = Math.random() * 340;
      ctx.fillStyle = Math.random() > 0.4 ? 'rgba(136, 19, 36, 0.45)' : 'rgba(185, 28, 28, 0.35)';
      ctx.beginPath();
      ctx.arc(384 + Math.cos(a) * d, 384 + Math.sin(a) * d, 1.5 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.font = 'bold 38px serif';
    ctx.fillStyle = '#881324';
    ctx.fillText('✈️  ~ • ~  🍁', 384, 250);

    ctx.shadowColor = 'rgba(80, 10, 20, 0.3)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 2;

    ctx.fillStyle = '#780a17';
    ctx.font = 'bold 54px "Newsreader", "Cormorant Garamond", Georgia, serif';
    ctx.fillText('Have a Safe Flight', 384, 330);

    ctx.fillStyle = '#991b1b';
    ctx.font = 'bold 58px "Caveat", "Brush Script MT", cursive, serif';
    ctx.fillText('Prasamsa Didi ✈️', 384, 420);

    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 28px serif';
    ctx.fillText('~ Red Velvet • Nepal to Canada ~', 384, 510);
  }
  return new THREE.CanvasTexture(canvas);
}

// 3. Procedural Texture: Authentic Red Velvet Multi-Tier Layer Cake Cross-Section
function createRedVelvetInteriorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#7a111e';
    ctx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 3500; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      ctx.fillStyle = Math.random() > 0.5 ? '#941b2c' : '#600913';
      ctx.fillRect(x, y, 1.2 + Math.random() * 2, 1.2 + Math.random() * 2);
    }

    const frostingY = [128, 256, 384];
    frostingY.forEach((fy) => {
      ctx.fillStyle = '#fffdf7';
      ctx.fillRect(0, fy - 14, 512, 28);
      ctx.fillStyle = 'rgba(80, 10, 20, 0.25)';
      ctx.fillRect(0, fy - 15, 512, 2);
      ctx.fillRect(0, fy + 14, 512, 2);
    });

    ctx.fillStyle = '#fffdf7';
    ctx.fillRect(0, 0, 512, 22);

    ctx.fillStyle = '#4c0810';
    ctx.fillRect(0, 498, 512, 14);
  }
  return new THREE.CanvasTexture(canvas);
}

// 4. Watertight Solid Cut-Face Mesh
function CutFace({
  angle,
  radius,
  height,
  texture,
}: {
  angle: number;
  radius: number;
  height: number;
  texture: THREE.CanvasTexture;
}) {
  const geom = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const rx = radius * Math.sin(angle);
    const rz = radius * Math.cos(angle);

    const positions = new Float32Array([
      0, 0, 0,
      rx, 0, rz,
      rx, height, rz,

      0, 0, 0,
      rx, height, rz,
      0, height, 0,
    ]);

    const uvs = new Float32Array([
      0, 0,
      1, 0,
      1, 1,

      0, 0,
      1, 1,
      0, 1,
    ]);

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geometry.computeVertexNormals();
    return geometry;
  }, [angle, radius, height]);

  return (
    <mesh geometry={geom} castShadow receiveShadow>
      <meshStandardMaterial
        map={texture}
        roughness={0.4}
        metalness={0.02}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// 5. Rosettes on outer curved arc
function SliceRosettes({
  radius,
  count,
  y,
  startAngle,
  angleLength,
}: {
  radius: number;
  count: number;
  y: number;
  startAngle: number;
  angleLength: number;
}) {
  const rosettes = Array.from({ length: count });
  return (
    <group position={[0, y, 0]}>
      {rosettes.map((_, i) => {
        const ratio = count > 1 ? (i + 0.5) / count : 0.5;
        const angle = startAngle + ratio * angleLength;
        const x = radius * Math.sin(angle);
        const z = radius * Math.cos(angle);
        return (
          <mesh key={i} position={[x, 0, z]} castShadow receiveShadow>
            <sphereGeometry args={[0.075, 10, 10]} />
            <meshStandardMaterial color="#fffef7" roughness={0.35} metalness={0.05} />
          </mesh>
        );
      })}
    </group>
  );
}

// 6. Candle with flicking flame
function SliceCandle({ position, isLit }: { position: [number, number, number]; isLit: boolean }) {
  const flameRef = useRef<THREE.PointLight>(null);
  const flameMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (flameRef.current && isLit) {
      const time = state.clock.getElapsedTime();
      const flicker =
        Math.sin(time * 12) * 0.15 +
        Math.sin(time * 23) * 0.08 +
        Math.sin(time * 37) * 0.05;
      flameRef.current.intensity = 1.3 + flicker;
      if (flameMeshRef.current) {
        flameMeshRef.current.scale.set(1 + flicker * 0.25, 1.2 + flicker * 0.4, 1 + flicker * 0.25);
      }
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.04, 0.7, 12]} />
        <meshStandardMaterial color="#fff7ee" roughness={0.3} metalness={0.05} />
      </mesh>

      <mesh position={[0, 0.25, 0]}>
        <torusGeometry args={[0.038, 0.005, 8, 12]} />
        <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.2} />
      </mesh>

      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.06, 8]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.9} />
      </mesh>

      {isLit && (
        <group position={[0, 0.78, 0]}>
          <mesh ref={flameMeshRef}>
            <sphereGeometry args={[0.035, 10, 10]} />
            <meshBasicMaterial color="#ff9f43" />
          </mesh>
          <mesh position={[0, 0.025, 0]}>
            <coneGeometry args={[0.025, 0.07, 10]} />
            <meshBasicMaterial color="#feca57" />
          </mesh>
          <pointLight ref={flameRef} color="#ff9f43" intensity={1.3} distance={3.5} decay={2} />
        </group>
      )}
    </group>
  );
}

// 7. Solid 3D Red Velvet Wedge Slice Component
interface CakeSliceProps {
  index: number;
  startAngle: number;
  angleLength: number;
  radius: number;
  height: number;
  isCut: boolean;
  isEaten: boolean;
  isEating: boolean;
  cutProgress: number;
  isLit: boolean;
  interiorTexture: THREE.CanvasTexture;
  onSliceClick: (index: number) => void;
}

function CakeSlice({
  index,
  startAngle,
  angleLength,
  radius,
  height,
  isCut,
  isEaten,
  isEating,
  cutProgress,
  isLit,
  interiorTexture,
  onSliceClick,
}: CakeSliceProps) {
  if (isEaten) return null;

  const midAngle = startAngle + angleLength / 2;
  const dirX = Math.sin(midAngle);
  const dirZ = Math.cos(midAngle);

  const slideDistance = isCut ? cutProgress * 0.95 : 0;
  const liftY = isCut ? cutProgress * 0.15 : 0;
  const tilt = isCut ? cutProgress * 0.06 : 0;
  const scale = isEating ? 0.01 : 1;

  return (
    <group
      position={[dirX * slideDistance, liftY, dirZ * slideDistance]}
      rotation={[tilt * dirZ, 0, -tilt * dirX]}
      scale={[scale, scale, scale]}
      onClick={(e) => {
        e.stopPropagation();
        onSliceClick(index);
      }}
    >
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height, 24, 1, false, startAngle, angleLength]} />
        <meshStandardMaterial color="#fffef7" roughness={0.35} metalness={0.04} />
      </mesh>

      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[radius + 0.01, radius + 0.02, 0.13, 24, 1, true, startAngle, angleLength]} />
        <meshStandardMaterial color="#7a111e" roughness={0.85} metalness={0.02} />
      </mesh>

      <CutFace angle={startAngle} radius={radius} height={height} texture={interiorTexture} />
      <CutFace angle={startAngle + angleLength} radius={radius} height={height} texture={interiorTexture} />

      <SliceRosettes
        radius={radius - 0.05}
        count={5}
        y={height}
        startAngle={startAngle}
        angleLength={angleLength}
      />

      <mesh
        position={[(radius - 0.38) * Math.sin(midAngle), height + 0.08, (radius - 0.38) * Math.cos(midAngle)]}
        castShadow
      >
        <sphereGeometry args={[0.085, 14, 14]} />
        <meshStandardMaterial color="#881324" roughness={0.2} metalness={0.1} />
      </mesh>

      <SliceCandle
        position={[(radius - 0.72) * Math.sin(midAngle), height, (radius - 0.72) * Math.cos(midAngle)]}
        isLit={isLit}
      />

      {isCut && cutProgress > 0.1 && (
        <group
          position={[dirX * 0.7, -0.01, dirZ * 0.7]}
          rotation={[0, -midAngle + Math.PI / 2, 0]}
        >
          <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <coneGeometry args={[0.35, 1.4, 3]} />
            <meshStandardMaterial color="#e5c158" metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh position={[0, 0.02, 1.1]} rotation={[Math.PI / 2 - 0.1, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.04, 0.8, 16]} />
            <meshStandardMaterial color="#2e1208" roughness={0.4} metalness={0.2} />
          </mesh>
        </group>
      )}
    </group>
  );
}

// 8. Animated Chef's Cake Knife
function CakeKnife({
  knifeProgress,
  targetAngle,
  radius,
}: {
  knifeProgress: number;
  targetAngle: number;
  radius: number;
}) {
  if (knifeProgress < 0 || knifeProgress >= 1) return null;

  const dirX = Math.sin(targetAngle);
  const dirZ = Math.cos(targetAngle);

  let knifeY = 2.4;
  let knifeTilt = -0.25;
  let opacity = 1;

  if (knifeProgress <= 0.2) {
    const t = knifeProgress / 0.2;
    knifeY = THREE.MathUtils.lerp(2.5, 1.35, t);
    opacity = t;
  } else if (knifeProgress <= 0.65) {
    const t = (knifeProgress - 0.2) / 0.45;
    knifeY = THREE.MathUtils.lerp(1.35, 0.08, t);
    knifeTilt = THREE.MathUtils.lerp(-0.25, 0.05, t);
  } else {
    const t = (knifeProgress - 0.65) / 0.35;
    knifeY = THREE.MathUtils.lerp(0.08, 2.0, t);
    knifeTilt = 0.05;
    opacity = 1 - t;
  }

  return (
    <group
      position={[dirX * (radius * 0.55), knifeY, dirZ * (radius * 0.55)]}
      rotation={[0, -targetAngle + Math.PI / 2, knifeTilt]}
    >
      <mesh position={[0, 0, -0.65]} castShadow>
        <boxGeometry args={[0.02, 0.28, 1.35]} />
        <meshStandardMaterial
          color="#f1f5f9"
          metalness={0.95}
          roughness={0.08}
          transparent={opacity < 1}
          opacity={opacity}
        />
      </mesh>

      <mesh position={[0, 0, 0.05]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.08, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} transparent={opacity < 1} opacity={opacity} />
      </mesh>

      <mesh position={[0, 0, 0.55]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.05, 0.85, 16]} />
        <meshStandardMaterial color="#2e1208" roughness={0.4} metalness={0.1} transparent={opacity < 1} opacity={opacity} />
      </mesh>
    </group>
  );
}

interface FarewellCake3DProps {
  onNavigateSurprise?: () => void;
}

export const FarewellCake3D: React.FC<FarewellCake3DProps> = ({ onNavigateSurprise }) => {
  const [isLit, setIsLit] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Procedural textures
  const [hiddenPlateTexture] = useState(() => createHiddenPlateSecretTexture());
  const [centerPlaqueTexture] = useState(() => createCenterPlaqueTexture());
  const [interiorTexture] = useState(() => createRedVelvetInteriorTexture());

  // 6 Slices State
  const TOTAL_SLICES = 6;
  const [eatenSlices, setEatenSlices] = useState<boolean[]>([false, false, false, false, false, false]);
  const [activeCutIndex, setActiveCutIndex] = useState<number | null>(null);
  const [isEatingIndex, setIsEatingIndex] = useState<number | null>(null);

  // Animation states
  const [cutProgress, setCutProgress] = useState(0);
  const [knifeProgress, setKnifeProgress] = useState(-1);
  const [targetCutAngle, setTargetCutAngle] = useState(0);
  const [isBusy, setIsBusy] = useState(false);

  // Cake dimensions
  const R = 1.45;
  const H = 1.15;
  const angleStep = (Math.PI * 2) / TOTAL_SLICES;

  const eatenCount = eatenSlices.filter(Boolean).length;
  const isAllEaten = eatenCount === TOTAL_SLICES;

  // Listen for Escape key in fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Touch / Click on cake to cut next slice
  const handleTouchCakeToCut = () => {
    if (isBusy) return;

    // If whole cake is already eaten, tapping plate triggers the secret letter!
    if (isAllEaten) {
      handleFinishClickHere();
      return;
    }

    // If a slice is already cut and served, tapping cake prompts eating
    if (activeCutIndex !== null) {
      handleEatSlice();
      return;
    }

    // Find next uneaten slice
    const nextIndex = eatenSlices.findIndex((eaten) => !eaten);
    if (nextIndex === -1) return;

    setIsBusy(true);
    const startAngle = nextIndex * angleStep;
    setTargetCutAngle(startAngle);
    setKnifeProgress(0);

    const startTime = performance.now();
    const knifeDuration = 700;
    const slideDuration = 600;
    let knifeSoundPlayed = false;

    const animateCut = (now: number) => {
      const elapsed = now - startTime;

      if (elapsed <= knifeDuration) {
        const kp = elapsed / knifeDuration;
        setKnifeProgress(kp);

        if (!knifeSoundPlayed && kp >= 0.28) {
          knifeSoundPlayed = true;
          soundscape.playCakeCutSound();
        }

        requestAnimationFrame(animateCut);
      } else {
        setKnifeProgress(-1);

        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: isFullscreen ? 0.65 : 0.58 },
            colors: ['#7a111e', '#b91c1c', '#d4af37', '#ffffff', '#f59e0b'],
          });
        } catch {
          // ignore
        }

        setActiveCutIndex(nextIndex);

        const slideStartTime = performance.now();
        const animateSlide = (slideNow: number) => {
          const slideElapsed = slideNow - slideStartTime;
          const t = Math.min(1, slideElapsed / slideDuration);
          const c1 = 1.35;
          const c3 = c1 + 1;
          const ease = 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);

          setCutProgress(Math.min(1, ease));

          if (t < 1) {
            requestAnimationFrame(animateSlide);
          } else {
            setCutProgress(1);
            setIsBusy(false);
          }
        };

        requestAnimationFrame(animateSlide);
      }
    };

    requestAnimationFrame(animateCut);
  };

  // EAT SLICE ACTION
  const handleEatSlice = () => {
    if (activeCutIndex === null || isBusy) return;

    setIsBusy(true);
    setIsEatingIndex(activeCutIndex);
    soundscape.playEatSound();

    try {
      confetti({
        particleCount: 35,
        spread: 45,
        origin: { y: isFullscreen ? 0.65 : 0.6 },
        colors: ['#881324', '#f59e0b', '#fff'],
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setEatenSlices((prev) => {
        const updated = [...prev];
        updated[activeCutIndex] = true;
        return updated;
      });

      setActiveCutIndex(null);
      setIsEatingIndex(null);
      setCutProgress(0);
      setIsBusy(false);
    }, 450);
  };

  // RESET / RE-BAKE CAKE
  const handleResetCake = () => {
    setEatenSlices([false, false, false, false, false, false]);
    setActiveCutIndex(null);
    setIsEatingIndex(null);
    setCutProgress(0);
    setKnifeProgress(-1);
    setIsBusy(false);
    setIsLit(true);
    soundscape.playChime();
  };

  // SECRET BUTTON ON THE PLATE CLICKED: Navigate to new surprise & trigger celebration
  const handleFinishClickHere = () => {
    soundscape.playChime();
    try {
      confetti({
        particleCount: 110,
        spread: 95,
        origin: { y: 0.5 },
        colors: ['#d4af37', '#881324', '#ffffff', '#e74c3c', '#f39c12'],
      });
    } catch {
      // ignore
    }

    if (isFullscreen) {
      setIsFullscreen(false);
    }

    if (onNavigateSurprise) {
      onNavigateSurprise();
    } else {
      setTimeout(() => {
        const letterEl = document.getElementById('scene-final-letter') || document.getElementById('scene-silence');
        if (letterEl) {
          letterEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 350);
    }
  };

  const handleBlowCandles = () => {
    if (!isLit) {
      setIsLit(true);
      return;
    }
    soundscape.playBlowSound();
    setIsLit(false);
  };

  return (
    <section
      id="scene-cake"
      className="relative min-h-screen w-full bg-gradient-to-b from-[#0f1118] via-[#090b10] to-[#0b0c10] text-[#ece8e1] py-24 px-4 sm:px-6 overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-red-950/25 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-4xl w-full mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white font-serif-title"
          >
            The Red Velvet Farewell Cake
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-neutral-400 font-sans"
          >
            {isAllEaten
              ? '✨ Look! The secret surprise has been unlocked under the cake! Tap below to open.'
              : activeCutIndex !== null
              ? 'A delicious Red Velvet slice is served! Tap "Eat Slice" below 🍴'
              : 'Touch the cake to cut a slice. Eat each slice until it disappears! 🍰'}
          </motion.p>
        </div>

        {/* 3D Three.js Canvas Viewport */}
        <div className="relative w-full h-[480px] sm:h-[540px] rounded-3xl bg-[#090a0f]/95 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl group">
          {/* Top Bar: Hints & Slices Counter & Fullscreen */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 text-[11px] text-white/80 font-sans backdrop-blur-md">
              <RotateCw className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {isAllEaten
                  ? 'All slices eaten! Secret revealed below ✨'
                  : `Slices: ${TOTAL_SLICES - eatenCount} left (${eatenCount}/${TOTAL_SLICES} eaten)`}
              </span>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              {isAllEaten && (
                <button
                  onClick={handleResetCake}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-white/10 border border-white/15 text-xs text-white/70 hover:text-white transition-all backdrop-blur-md cursor-pointer"
                  title="Bake another cake"
                >
                  <RefreshCw className="w-3 h-3 text-amber-400" />
                  <span>Bake Again</span>
                </button>
              )}

              <button
                id="open-cake-fullscreen-button"
                onClick={() => setIsFullscreen(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-red-950/40 border border-white/15 hover:border-red-500/50 text-xs text-white/90 hover:text-red-200 transition-all backdrop-blur-md shadow-lg group cursor-pointer active:scale-95"
                title="Open Cake in Full Screen"
              >
                <Maximize2 className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Full Screen</span>
              </button>
            </div>
          </div>

          {/* Floating Touch / Action Prompt in 3D Scene */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md border text-xs font-medium shadow-lg transition-all ${
                isAllEaten
                  ? 'bg-amber-500/25 border-amber-400/80 text-amber-100 shadow-[0_0_25px_rgba(245,158,11,0.5)] animate-pulse'
                  : activeCutIndex !== null
                  ? 'bg-red-950/80 border-red-500/50 text-red-200'
                  : 'bg-black/70 border-amber-500/40 text-amber-200'
              }`}
            >
              <span>
                {isAllEaten
                  ? '🍁 Tap plate or button below for New Surprise!'
                  : activeCutIndex !== null
                  ? '🍰 Slice Served! Tap Eat below'
                  : '✨ Touch cake directly to cut a slice'}
              </span>
            </motion.div>
          </div>

          {/* Canvas */}
          <Canvas
            shadows
            camera={{ position: [0, 2.5, 4.2], fov: 42 }}
            className="w-full h-full cursor-pointer"
            onClick={() => {
              if (isAllEaten) {
                handleFinishClickHere();
              } else if (activeCutIndex === null) {
                handleTouchCakeToCut();
              }
            }}
          >
            <ambientLight intensity={0.75} />
            <directionalLight
              position={[4, 6, 4]}
              intensity={1.7}
              color="#fff8ed"
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <directionalLight position={[-4, 3, -2]} intensity={0.65} color="#fed7aa" />
            <spotLight position={[0, 5, -4]} intensity={1.8} color="#f59e0b" angle={0.6} penumbra={1} />

            <DreiSparkles count={45} scale={5.2} size={2.5} speed={0.4} color="#facc15" opacity={0.5} />

            {/* 3D CAKE GROUP */}
            <group position={[0, -0.6, 0]}>
              {/* Golden Cake Board / Plate Base */}
              <mesh position={[0, -0.06, 0]} receiveShadow castShadow>
                <cylinderGeometry args={[1.92, 1.96, 0.08, 48]} />
                <meshStandardMaterial color="#e2bc50" metalness={0.85} roughness={0.2} />
              </mesh>
              <mesh position={[0, -0.02, 0]}>
                <torusGeometry args={[1.92, 0.03, 16, 48]} />
                <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
              </mesh>

              {/* SECRET INSCRIPTION HIDDEN DIRECTLY IN THE PLATE UNDER THE CAKE! */}
              <group position={[0, 0.003, 0]}>
                <mesh
                  rotation={[-Math.PI / 2, 0, 0]}
                  receiveShadow
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isAllEaten) {
                      handleFinishClickHere();
                    }
                  }}
                >
                  <circleGeometry args={[1.68, 48]} />
                  <meshStandardMaterial
                    map={hiddenPlateTexture}
                    roughness={0.2}
                    metalness={0.4}
                    emissive={isAllEaten ? '#b45309' : '#000000'}
                    emissiveIntensity={isAllEaten ? 0.35 : 0}
                  />
                </mesh>

                {/* Warm golden light beaming from the secret message when uncovered */}
                {isAllEaten && (
                  <pointLight position={[0, 0.5, 0]} intensity={2.5} color="#fbbf24" distance={4} />
                )}
              </group>

              {/* Red velvet crumb clusters dusted on the golden board rim */}
              {Array.from({ length: 36 }).map((_, i) => {
                const a = (i / 36) * Math.PI * 2 + (i % 3) * 0.12;
                const d = 1.74 + (i % 4) * 0.04;
                return (
                  <mesh key={i} position={[Math.sin(a) * d, 0.01, Math.cos(a) * d]} castShadow>
                    <sphereGeometry args={[0.025 + (i % 3) * 0.01, 8, 8]} />
                    <meshStandardMaterial color={i % 2 === 0 ? '#7a111e' : '#991b1b'} roughness={0.8} />
                  </mesh>
                );
              })}

              {/* The 6 Solid Slices (hiding the plate underneath until eaten!) */}
              {Array.from({ length: TOTAL_SLICES }).map((_, i) => (
                <CakeSlice
                  key={i}
                  index={i}
                  startAngle={i * angleStep}
                  angleLength={angleStep}
                  radius={R}
                  height={H}
                  isCut={activeCutIndex === i}
                  isEaten={eatenSlices[i]}
                  isEating={isEatingIndex === i}
                  cutProgress={activeCutIndex === i ? cutProgress : 0}
                  isLit={isLit}
                  interiorTexture={interiorTexture}
                  onSliceClick={() => {
                    if (activeCutIndex === i) {
                      handleEatSlice();
                    } else if (activeCutIndex === null && !eatenSlices[i]) {
                      handleTouchCakeToCut();
                    }
                  }}
                />
              ))}

              {/* Center Commemorative Calligraphy Fondant Plaque atop cake */}
              {!isAllEaten && (
                <group position={[0, H + 0.006, 0]}>
                  <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                    <circleGeometry args={[0.74, 36]} />
                    <meshStandardMaterial map={centerPlaqueTexture} roughness={0.3} metalness={0.05} />
                  </mesh>
                  {/* Center Tiny Airplane Topper */}
                  <group position={[0, 0.28, 0]} scale={0.24} rotation={[0.2, 0.4, 0.1]}>
                    <mesh position={[0, 0, 0]} castShadow>
                      <cylinderGeometry args={[0.1, 0.14, 1.4, 16]} />
                      <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
                    </mesh>
                    <mesh position={[0, 0.75, 0]} castShadow>
                      <coneGeometry args={[0.1, 0.25, 16]} />
                      <meshStandardMaterial color="#881324" metalness={0.3} roughness={0.3} />
                    </mesh>
                    <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                      <boxGeometry args={[0.03, 1.6, 0.4]} />
                      <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.2} />
                    </mesh>
                  </group>
                </group>
              )}

              {/* Animated Slicing Knife */}
              <CakeKnife knifeProgress={knifeProgress} targetAngle={targetCutAngle} radius={R} />
            </group>

            <OrbitControls
              enableZoom={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2.1}
              autoRotate={activeCutIndex === null}
              autoRotateSpeed={isAllEaten ? 0.35 : 0.6}
            />
          </Canvas>

          {/* Bottom Controls: Eat Slice button & Candle toggle */}
          <div className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center gap-3 px-4 pointer-events-none">
            {/* When a slice is served: "Eat Slice" button */}
            <AnimatePresence>
              {activeCutIndex !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="flex items-center gap-3 pointer-events-auto"
                >
                  <button
                    id="eat-cake-slice-button"
                    onClick={handleEatSlice}
                    className="flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(220,38,38,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer animate-pulse"
                  >
                    <Utensils className="w-5 h-5 text-white" />
                    <span>Eat Slice 🍴😋</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* When all cake is eaten: glowing "Open New Surprise" button */}
            <AnimatePresence>
              {isAllEaten && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="pointer-events-auto"
                >
                  <button
                    id="cake-open-surprise-floating-button"
                    onClick={handleFinishClickHere}
                    className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 hover:brightness-110 text-white font-bold text-sm sm:text-base shadow-[0_0_35px_rgba(245,158,11,0.65)] hover:scale-105 active:scale-95 transition-all cursor-pointer animate-pulse"
                  >
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>Open New Surprise! 🍁✈️</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Candle blowing toggle */}
            {!isAllEaten && activeCutIndex === null && (
              <button
                id="blow-candles-button"
                onClick={handleBlowCandles}
                className="pointer-events-auto group flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-amber-500/40 text-amber-200 hover:text-amber-100 font-medium text-xs sm:text-sm backdrop-blur-md shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                {isLit ? (
                  <>
                    <Wind className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
                    <span>Blow out candles 🎂</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Candles Blown! ✨ (Re-light)</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Full Screen 3D Cake Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#07080b] flex flex-col select-none overflow-hidden"
          >
            {/* Header */}
            <div className="relative z-20 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-[#090b10]/95 via-[#090b10]/70 to-transparent backdrop-blur-sm border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
                  🍰
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-serif-title font-semibold text-white tracking-wide">
                    Prasamsa Didi&apos;s Red Velvet Farewell Cake
                  </h3>
                  <p className="text-xs text-white/50 font-sans hidden sm:block">
                    {isAllEaten
                      ? 'The cake was eaten! Tap the plate below to open the secret letter 💌'
                      : `Touch cake to slice • Eat each slice • ${TOTAL_SLICES - eatenCount} of ${TOTAL_SLICES} slices remaining`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {isAllEaten && (
                  <button
                    onClick={handleResetCake}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-medium transition-all shadow-md cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Bake Again</span>
                  </button>
                )}

                <button
                  id="exit-cake-fullscreen-button"
                  onClick={() => setIsFullscreen(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-medium transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Minimize2 className="w-4 h-4 text-amber-400" />
                  <span>Exit Fullscreen</span>
                  <span className="hidden sm:inline text-xs text-white/40 font-mono">(Esc)</span>
                </button>
              </div>
            </div>

            {/* Canvas */}
            <div className="relative flex-1 w-full h-full">
              {/* Floating Touch / Action Prompt in Fullscreen */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full backdrop-blur-md border text-xs sm:text-sm font-medium shadow-lg transition-all ${
                    isAllEaten
                      ? 'bg-amber-500/25 border-amber-400/80 text-amber-100 shadow-[0_0_25px_rgba(245,158,11,0.5)] animate-pulse'
                      : activeCutIndex !== null
                      ? 'bg-red-950/80 border-red-500/50 text-red-200'
                      : 'bg-black/70 border-amber-500/40 text-amber-200'
                  }`}
                >
                  <span>
                    {isAllEaten
                      ? '🍁 Tap plate or button below for New Surprise!'
                      : activeCutIndex !== null
                      ? '🍰 Slice Cut! Tap Eat below'
                      : '✨ Touch cake directly to cut a slice'}
                  </span>
                </motion.div>
              </div>

              <Canvas
                shadows
                camera={{ position: [0, 2.8, 4.4], fov: 40 }}
                className="w-full h-full cursor-pointer"
                onClick={() => {
                  if (isAllEaten) {
                    handleFinishClickHere();
                  } else if (activeCutIndex === null) {
                    handleTouchCakeToCut();
                  }
                }}
              >
                <ambientLight intensity={0.8} />
                <directionalLight
                  position={[4, 6, 4]}
                  intensity={1.7}
                  color="#fff8ed"
                  castShadow
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                />
                <directionalLight position={[-4, 3, -2]} intensity={0.7} color="#fed7aa" />
                <spotLight position={[0, 6, -4]} intensity={2.0} color="#f59e0b" angle={0.6} penumbra={1} />

                <DreiSparkles count={70} scale={7} size={3} speed={0.5} color="#facc15" opacity={0.6} />

                {/* 3D CAKE GROUP */}
                <group position={[0, -0.6, 0]}>
                  <mesh position={[0, -0.06, 0]} receiveShadow castShadow>
                    <cylinderGeometry args={[1.92, 1.96, 0.08, 48]} />
                    <meshStandardMaterial color="#e2bc50" metalness={0.85} roughness={0.2} />
                  </mesh>
                  <mesh position={[0, -0.02, 0]}>
                    <torusGeometry args={[1.92, 0.03, 16, 48]} />
                    <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
                  </mesh>

                  {/* SECRET INSCRIPTION HIDDEN IN PLATE */}
                  <group position={[0, 0.003, 0]}>
                    <mesh
                      rotation={[-Math.PI / 2, 0, 0]}
                      receiveShadow
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isAllEaten) {
                          handleFinishClickHere();
                        }
                      }}
                    >
                      <circleGeometry args={[1.68, 48]} />
                      <meshStandardMaterial
                        map={hiddenPlateTexture}
                        roughness={0.2}
                        metalness={0.4}
                        emissive={isAllEaten ? '#b45309' : '#000000'}
                        emissiveIntensity={isAllEaten ? 0.35 : 0}
                      />
                    </mesh>

                    {isAllEaten && (
                      <pointLight position={[0, 0.5, 0]} intensity={2.5} color="#fbbf24" distance={4} />
                    )}
                  </group>

                  {/* Slices */}
                  {Array.from({ length: TOTAL_SLICES }).map((_, i) => (
                    <CakeSlice
                      key={i}
                      index={i}
                      startAngle={i * angleStep}
                      angleLength={angleStep}
                      radius={R}
                      height={H}
                      isCut={activeCutIndex === i}
                      isEaten={eatenSlices[i]}
                      isEating={isEatingIndex === i}
                      cutProgress={activeCutIndex === i ? cutProgress : 0}
                      isLit={isLit}
                      interiorTexture={interiorTexture}
                      onSliceClick={() => {
                        if (activeCutIndex === i) {
                          handleEatSlice();
                        } else if (activeCutIndex === null && !eatenSlices[i]) {
                          handleTouchCakeToCut();
                        }
                      }}
                    />
                  ))}

                  {/* Plaque */}
                  {!isAllEaten && (
                    <group position={[0, H + 0.006, 0]}>
                      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                        <circleGeometry args={[0.74, 36]} />
                        <meshStandardMaterial map={centerPlaqueTexture} roughness={0.3} metalness={0.05} />
                      </mesh>
                    </group>
                  )}

                  <CakeKnife knifeProgress={knifeProgress} targetAngle={targetCutAngle} radius={R} />
                </group>

                <OrbitControls
                  enableZoom={true}
                  minDistance={1.8}
                  maxDistance={8}
                  minPolarAngle={Math.PI / 4.5}
                  maxPolarAngle={Math.PI / 2.05}
                  autoRotate={activeCutIndex === null}
                  autoRotateSpeed={isAllEaten ? 0.35 : 0.5}
                />
              </Canvas>

              {/* Bottom Interactive Controls in Fullscreen */}
              <div className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-3 px-4 pointer-events-none">
                {/* Eat Slice Button */}
                <AnimatePresence>
                  {activeCutIndex !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="pointer-events-auto"
                    >
                      <button
                        onClick={handleEatSlice}
                        className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-amber-500 text-white font-bold text-base shadow-[0_0_35px_rgba(220,38,38,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer animate-pulse"
                      >
                        <Utensils className="w-5 h-5 text-white" />
                        <span>Eat Slice 🍴😋</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* In fullscreen, when cake is eaten: glowing "Open New Surprise" button */}
                <AnimatePresence>
                  {isAllEaten && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="pointer-events-auto"
                    >
                      <button
                        id="fullscreen-cake-surprise-button"
                        onClick={handleFinishClickHere}
                        className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 hover:brightness-110 text-white font-bold text-base shadow-[0_0_35px_rgba(245,158,11,0.65)] hover:scale-105 active:scale-95 transition-all cursor-pointer animate-pulse"
                      >
                        <Sparkles className="w-5 h-5 text-amber-300" />
                        <span>Open New Surprise! 🍁✈️</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isAllEaten && activeCutIndex === null && (
                  <button
                    onClick={handleBlowCandles}
                    className="pointer-events-auto group flex items-center gap-2 px-6 py-3 rounded-full bg-black/70 hover:bg-black/90 border border-amber-500/40 text-amber-200 hover:text-amber-100 font-medium text-xs sm:text-sm backdrop-blur-md shadow-xl transition-all active:scale-95 cursor-pointer"
                  >
                    {isLit ? (
                      <>
                        <Wind className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
                        <span>Blow out candles 🎂</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Candles Blown! ✨ (Click to re-light)</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

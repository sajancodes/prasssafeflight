import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Luggage, Check, Plus, Minus, Sparkles, AlertTriangle, Award, RefreshCw, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundscape } from '../../utils/audio';

export interface PackingItem {
  id: string;
  name: string;
  category: 'Spices & Food' | 'Warmth & Clothes' | 'Memories & Keepsakes' | 'Survival & Essentials';
  weight: number; // in kg
  icon: string;
  description: string;
  humorNote: string;
}

// Exactly 26 items with weights totaling EXACTLY 50.0 KG
export const PACKING_ITEMS: PackingItem[] = [
  // --- SPICES & FOOD (7 items, 10.9 kg) ---
  {
    id: 'wai-wai',
    name: 'Carton of Wai Wai & Rara Noodles',
    category: 'Spices & Food',
    weight: 2.5,
    icon: '🍜',
    description: 'Golden fried chicken soup packs & authentic seasoning sachets',
    humorNote: 'Vital sustenance when Canadian salads feel too cold.',
  },
  {
    id: 'achar',
    name: "Aama's Homemade Mango & Bamboo Achar",
    category: 'Spices & Food',
    weight: 2.0,
    icon: '🌶️',
    description: 'Wrapped in 15 layers of plastic wrap and parcel tape',
    humorNote: 'The ultimate airport customs test. Must not leak a single drop!',
  },
  {
    id: 'momo-masala',
    name: 'Momo Masala, Timur Pepper & Jimbu',
    category: 'Spices & Food',
    weight: 0.8,
    icon: '🥟',
    description: 'Secret blend of 12 Himalayan mountain herbs and spices',
    humorNote: 'Will turn your Canadian apartment into a Kathmandu heaven.',
  },
  {
    id: 'tea-leaves',
    name: 'Organic Ilam CTC Golden Tea Leaves (Chiya)',
    category: 'Spices & Food',
    weight: 1.2,
    icon: '☕',
    description: 'Fresh eastern Nepal mountain milk chiya blend',
    humorNote: 'For late evening calls with family across the time zones.',
  },
  {
    id: 'shuddh-ghee',
    name: "Homemade Shuddh Cow's Ghee",
    category: 'Spices & Food',
    weight: 1.8,
    icon: '🧈',
    description: 'Pure golden clarified butter in double-sealed container',
    humorNote: 'A single spoonful in dal bhat instantly cures homesickness.',
  },
  {
    id: 'masala-kit',
    name: 'Whole Spices Kit (Methi, Cumin, Turmeric & Dal)',
    category: 'Spices & Food',
    weight: 1.6,
    icon: '🧂',
    description: 'Pre-portioned spices packed with motherly care',
    humorNote: 'Because Canadian grocery stores charge $10 for 50g of cumin.',
  },
  {
    id: 'gundruk-sukuti',
    name: 'Sun-Dried Gundruk & Spicy Sukuti Pack',
    category: 'Spices & Food',
    weight: 1.0,
    icon: '🥬',
    description: 'Fermented leafy greens and spicy dried bites',
    humorNote: 'Tastes like sunny Dashain afternoons on the terrace.',
  },

  // --- WARMTH & CLOTHES (7 items, 19.1 kg) ---
  {
    id: 'heavy-parka',
    name: 'Canadian Sub-Zero Winter Goose Down Parka',
    category: 'Warmth & Clothes',
    weight: 4.2,
    icon: '🧥',
    description: 'Heavy goose down insulation rated for -30°C blizzard weather',
    humorNote: 'Your daily bulletproof armor against Toronto blizzard winds.',
  },
  {
    id: 'snow-boots',
    name: 'Thermal Snow Boots with Ice Grip Soles',
    category: 'Warmth & Clothes',
    weight: 2.8,
    icon: '🥾',
    description: 'Waterproof insulated boots with non-slip ice treads',
    humorNote: 'Walking like a graceful penguin on frozen Canadian sidewalks!',
  },
  {
    id: 'dhaka-shawl',
    name: 'Handwoven Palpali Dhaka Shawl & Kurtha Sets',
    category: 'Warmth & Clothes',
    weight: 1.5,
    icon: '🧣',
    description: 'Intricate traditional geometric embroidery from Palpa',
    humorNote: 'To wear with immense Nepali pride at multicultural student events.',
  },
  {
    id: 'thamel-sweaters',
    name: 'Chunky Hand-Knit Wool Cardigans from Thamel',
    category: 'Warmth & Clothes',
    weight: 2.4,
    icon: '🧶',
    description: 'Thick pure Himalayan sheep wool sweaters',
    humorNote: 'Super warm, smells like cozy Kathmandu mountain vibes.',
  },
  {
    id: 'thermal-inners',
    name: 'Sub-Zero Fleece Thermal Base Layer Sets (x3)',
    category: 'Warmth & Clothes',
    weight: 1.5,
    icon: '🧦',
    description: 'Moisture-wicking tight thermal tops & leggings',
    humorNote: 'You will secretly wear these under everything from November to April.',
  },
  {
    id: 'extra-shoes',
    name: 'Campus Walking Sneakers & Running Shoes',
    category: 'Warmth & Clothes',
    weight: 2.2,
    icon: '👟',
    description: 'Cushioned daily walking footwear for Canadian university campus',
    humorNote: 'For crushing 15,000 steps a day across huge university grounds.',
  },
  {
    id: 'wool-blanket',
    name: 'Traditional Heavy Kathmandu Sirak Blanket',
    category: 'Warmth & Clothes',
    weight: 4.5,
    icon: '🛏️',
    description: 'Dense, super heavy quilted winter blanket from home',
    humorNote: 'Weighs 4.5 kg on the scale! Can Didi afford the weight sacrifice?',
  },

  // --- MEMORIES & KEEPSAKES (6 items, 8.8 kg) ---
  {
    id: 'photo-album',
    name: 'Family & Childhood Polaroid Scrapbook',
    category: 'Memories & Keepsakes',
    weight: 1.5,
    icon: '📸',
    description: 'Every birthday, school graduation, and rooftop sunset',
    humorNote: 'Heaviest item on your heart, priceless in your luggage.',
  },
  {
    id: 'wishes-notebook',
    name: 'Handwritten Letter Book of Good Wishes',
    category: 'Memories & Keepsakes',
    weight: 0.8,
    icon: '📖',
    description: 'Heartfelt goodbye notes and blessings from everyone',
    humorNote: 'Guaranteed to trigger warm happy tears whenever opened.',
  },
  {
    id: 'copper-bottle',
    name: 'Copper Amrit Water Vessel & Temple Bell',
    category: 'Memories & Keepsakes',
    weight: 1.1,
    icon: '🔔',
    description: 'Blessed puja brass bell and morning water vessel',
    humorNote: 'Brings morning serenity and peaceful positive energy.',
  },
  {
    id: 'maple-space',
    name: 'Reserved Space for Canadian Maple Syrup Souvenirs',
    category: 'Memories & Keepsakes',
    weight: 1.5,
    icon: '🍁',
    description: 'Empty cushioned compartment for future Quebec syrup jars',
    humorNote: 'Reserved for when Didi brings gifts back to Nepal!',
  },
  {
    id: 'teddy-bear',
    name: 'Sentimental Soft Giant Stuffed Teddy Bear',
    category: 'Memories & Keepsakes',
    weight: 2.4,
    icon: '🧸',
    description: 'Beloved oversized plush companion from your bedroom',
    humorNote: 'Takes up half the suitcase! Will Didi choose to pack or leave Teddy?',
  },
  {
    id: 'saree-jewelry',
    name: 'Dashain Red Silk Saree & Traditional Jewelry Box',
    category: 'Memories & Keepsakes',
    weight: 2.0,
    icon: '🥻',
    description: 'Tihar & Dashain festive attire with velvet case',
    humorNote: 'For celebrating Tihar bhai tika and Dashain tika abroad.',
  },

  // --- SURVIVAL & ESSENTIALS (6 items, 11.2 kg) ---
  {
    id: 'pressure-cooker',
    name: 'Authentic Nepali Pressure Cooker (Prestige 3L)',
    category: 'Survival & Essentials',
    weight: 3.5,
    icon: '🍲',
    description: 'The golden whistle that cooks dal bhat and mutton curry',
    humorNote: 'No Nepali student can truly survive Canada without that rhythmic whistle!',
  },
  {
    id: 'laptop-gear',
    name: 'Academic Laptop, Stand & Dual Power Bricks',
    category: 'Survival & Essentials',
    weight: 2.8,
    icon: '💻',
    description: 'Study powerhouse with heavy braided power bricks',
    humorNote: 'Where Didi will ace her exams, write papers, and video call home.',
  },
  {
    id: 'travel-adapters',
    name: 'Universal North America Travel Adapters & 3m Cable',
    category: 'Survival & Essentials',
    weight: 0.6,
    icon: '🔌',
    description: 'Type A/B plugs with USB-C fast charging ports',
    humorNote: 'Because the outlet is always 3 meters away from the bed.',
  },
  {
    id: 'titura-sweets',
    name: 'Emergency Sweet Titura, Paan Candy & Cadbury',
    category: 'Survival & Essentials',
    weight: 1.4,
    icon: '🍬',
    description: 'Sour spicy hog-plum titura and milk chocolate reserves',
    humorNote: 'Hidden inside winter socks for midnight study cravings.',
  },
  {
    id: 'first-aid',
    name: 'First-Aid Travel Medical Kit (Cetamol, Moov Spray)',
    category: 'Survival & Essentials',
    weight: 0.9,
    icon: '🩹',
    description: 'Cetamol, Sinarest, Vicks, band-aids & muscle pain spray',
    humorNote: 'Because getting a doctor’s appointment abroad takes weeks.',
  },
  {
    id: 'mini-cooker',
    name: 'Compact Travel Electric Multi-Cooker Hot Pot',
    category: 'Survival & Essentials',
    weight: 1.5,
    icon: '🍚',
    description: 'Boils eggs, soups, noodles, and mini rice portions',
    humorNote: 'Lifesaver in student dorms during late-night winter study sessions.',
  },
];

const MAX_WEIGHT = 23.0;
const OPTIMAL_MIN = 20.5;
const TOTAL_INVENTORY_WEIGHT = 50.0; // sum of all 26 items is 50.0 kg

type FilterCategory = 'All' | 'Packed' | 'Unpacked' | 'Spices & Food' | 'Warmth & Clothes' | 'Memories & Keepsakes' | 'Survival & Essentials';

export const PackingChallengeGame: React.FC = () => {
  // Initial starter selection (balanced ~12.2 kg)
  const [packedIds, setPackedIds] = useState<string[]>([
    'photo-album',
    'wishes-notebook',
    'tea-leaves',
    'wai-wai',
    'heavy-parka',
    'travel-adapters',
  ]);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [hasWon, setHasWon] = useState(false);

  // Calculate current weight
  const currentWeight = useMemo(() => {
    const sum = packedIds.reduce((total, id) => {
      const item = PACKING_ITEMS.find((it) => it.id === id);
      return total + (item ? item.weight : 0);
    }, 0);
    return Math.round(sum * 10) / 10;
  }, [packedIds]);

  const toggleItem = (id: string) => {
    soundscape.playBubblePopSound();
    if (packedIds.includes(id)) {
      setPackedIds((prev) => prev.filter((itId) => itId !== id));
      setHasWon(false);
    } else {
      const item = PACKING_ITEMS.find((it) => it.id === id);
      const nextWeight = Math.round((currentWeight + (item?.weight || 0)) * 10) / 10;
      setPackedIds((prev) => [...prev, id]);

      // Check for triumph
      if (nextWeight >= OPTIMAL_MIN && nextWeight <= MAX_WEIGHT) {
        setHasWon(true);
        soundscape.playSuccessChime();
        try {
          confetti({
            particleCount: 65,
            spread: 75,
            origin: { y: 0.6 },
            colors: ['#38bdf8', '#fbbf24', '#ffffff', '#ef4444'],
          });
        } catch {
          // ignore
        }
      } else {
        setHasWon(false);
      }
    }
  };

  const handleReset = () => {
    soundscape.playCardFlipSound();
    setPackedIds([]);
    setHasWon(false);
  };

  const handleAutoOptimize = () => {
    soundscape.playSuccessChime();
    // Ideal winning combination: 4.2 + 2.8 + 2.5 + 2.0 + 1.5 + 0.8 + 1.2 + 1.5 + 1.5 + 3.5 + 0.6 = 22.1 kg!
    setPackedIds([
      'heavy-parka',
      'snow-boots',
      'wai-wai',
      'achar',
      'photo-album',
      'wishes-notebook',
      'tea-leaves',
      'dhaka-shawl',
      'thermal-inners',
      'pressure-cooker',
      'travel-adapters',
    ]);
    setHasWon(true);
    try {
      confetti({
        particleCount: 90,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#b91c1c', '#38bdf8'],
      });
    } catch {
      // ignore
    }
  };

  const isOverweight = currentWeight > MAX_WEIGHT;
  const isPerfect = currentWeight >= OPTIMAL_MIN && currentWeight <= MAX_WEIGHT;
  const weightPercentage = Math.min(100, (currentWeight / MAX_WEIGHT) * 100);

  // Filtered items
  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return PACKING_ITEMS;
    if (activeFilter === 'Packed') return PACKING_ITEMS.filter((it) => packedIds.includes(it.id));
    if (activeFilter === 'Unpacked') return PACKING_ITEMS.filter((it) => !packedIds.includes(it.id));
    return PACKING_ITEMS.filter((it) => it.category === activeFilter);
  }, [activeFilter, packedIds]);

  return (
    <div className="bg-[#111420] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h3 className="text-2xl sm:text-3xl font-serif-title font-semibold text-white">
            The 50.0 KG Luggage Weigh-In Challenge 🧳
          </h3>
          <p className="text-sm text-neutral-300 font-sans mt-1">
            There are <strong>26 items totaling 50.0 KG</strong> of memories, warm clothes, and spices. You must choose what to <strong>TAKE</strong> or <strong>LEAVE</strong> to fit within the <strong>23.0 KG airline limit</strong>!
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleAutoOptimize}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-xs text-amber-300 font-medium transition-all active:scale-95 cursor-pointer shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Auto-Pack Ideal 22.1 KG</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white/70 hover:text-white transition-all active:scale-95 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Clear Bag</span>
          </button>
        </div>
      </div>

      {/* Live Scale Meter & Weight Diagnostics */}
      <div className="my-6 p-5 rounded-2xl bg-[#090b12] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-1/2 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400">
              Luggage Weight Scale ({packedIds.length} / 26 items chosen)
            </span>
            <span
              className={`font-bold text-base ${
                isOverweight
                  ? 'text-red-400 animate-pulse'
                  : isPerfect
                  ? 'text-emerald-400'
                  : 'text-sky-300'
              }`}
            >
              {currentWeight.toFixed(1)} / {MAX_WEIGHT.toFixed(1)} KG
            </span>
          </div>

          {/* Scale Bar */}
          <div className="relative w-full h-4 bg-neutral-800 rounded-full overflow-hidden p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${weightPercentage}%` }}
              transition={{ duration: 0.3 }}
              className={`h-full rounded-full transition-colors ${
                isOverweight
                  ? 'bg-gradient-to-r from-amber-500 to-red-500 shadow-[0_0_15px_rgba(239,68,68,0.7)]'
                  : isPerfect
                  ? 'bg-gradient-to-r from-sky-400 via-emerald-400 to-teal-300 shadow-[0_0_15px_rgba(52,211,153,0.7)]'
                  : 'bg-gradient-to-r from-blue-500 to-sky-400'
              }`}
            />
            {/* Target sweet spot markers */}
            <div className="absolute top-0 bottom-0 left-[89%] w-0.5 bg-white/50" title="20.5kg min" />
            <div className="absolute top-0 bottom-0 left-[100%] w-0.5 bg-red-400" title="23kg max" />
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-500 font-sans">
            <span>0.0 KG</span>
            <span className="text-emerald-400/90 font-medium">Target Zone: 20.5 - 23.0 KG</span>
            <span className="text-red-400/90 font-medium">23.0 KG Max</span>
          </div>
        </div>

        {/* Status Message Badge */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end">
          {isOverweight ? (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <div>
                <p className="font-bold text-red-300">Overweight by +{(currentWeight - MAX_WEIGHT).toFixed(1)} KG!</p>
                <p className="text-[11px] text-red-200/80">Airport check-in will charge $150 penalty. Choose items to leave behind!</p>
              </div>
            </div>
          ) : isPerfect ? (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-emerald-950/60 border border-emerald-400/50 text-emerald-200 text-xs shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              <Award className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <p className="font-bold text-white text-sm">Tribhuvan Airport Approved! ✈️</p>
                <p className="text-emerald-300/90 font-mono">
                  {currentWeight.toFixed(1)} KG — Priority Baggage Tagged directly to Canada!
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-neutral-300 text-xs">
              <Luggage className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <p className="font-bold text-white">Under Weight Allowance</p>
                <p className="text-neutral-400">
                  You have <strong>{(MAX_WEIGHT - currentWeight).toFixed(1)} KG</strong> remaining space to take more items!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category & Status Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {(
          [
            'All',
            'Packed',
            'Unpacked',
            'Spices & Food',
            'Warmth & Clothes',
            'Memories & Keepsakes',
            'Survival & Essentials',
          ] as FilterCategory[]
        ).map((cat) => {
          const isActive = activeFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-950'
                  : 'bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/5'
              }`}
            >
              {cat === 'All'
                ? `All Items (50.0 KG)`
                : cat === 'Packed'
                ? `Packed (${packedIds.length})`
                : cat === 'Unpacked'
                ? `Left at Home (${26 - packedIds.length})`
                : cat}
            </button>
          );
        })}
      </div>

      {/* Item Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredItems.map((item) => {
          const isPacked = packedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all relative flex flex-col justify-between ${
                isPacked
                  ? 'bg-sky-950/40 border-sky-500/50 shadow-md shadow-sky-950/50'
                  : 'bg-[#0d101a] border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-white/10 text-amber-300">
                      {item.weight.toFixed(1)} KG
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md ${
                        isPacked
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {isPacked ? 'TAKING' : 'LEAVING'}
                    </span>
                  </div>
                </div>

                <h4 className="text-sm font-semibold text-white leading-snug">{item.name}</h4>
                <p className="text-xs text-neutral-400 mt-1 font-sans leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                <span className="text-[10px] text-amber-200/70 italic line-clamp-1 flex-1">
                  &ldquo;{item.humorNote}&rdquo;
                </span>

                {/* Explicit Choose to Take or Leave Button */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 active:scale-95 ${
                    isPacked
                      ? 'bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300'
                      : 'bg-sky-500 hover:bg-sky-400 text-black shadow-md shadow-sky-950'
                  }`}
                >
                  {isPacked ? (
                    <span className="flex items-center gap-1">
                      <Minus className="w-3 h-3" />
                      <span>Leave (Unpack)</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Plus className="w-3 h-3 stroke-[3]" />
                      <span>Take (Pack)</span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

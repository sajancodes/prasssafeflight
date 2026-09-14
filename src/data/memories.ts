export interface SuitcaseItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  color: string;
}

export const suitcaseItems: SuitcaseItem[] = [
  {
    id: 'memories',
    name: 'MEMORIES',
    category: 'Treasures',
    icon: 'Camera',
    description: 'Every shared sunset, conversation, tea break, and festival in Nepal.',
    color: '#e74c3c'
  },
  {
    id: 'laughter',
    name: 'LAUGHTER',
    category: 'Joy',
    icon: 'Smile',
    description: 'Uncontrollable giggles, inside jokes, and sweet moments that made our days brighter.',
    color: '#f39c12'
  },
  {
    id: 'family',
    name: 'FAMILY',
    category: 'Roots',
    icon: 'Home',
    description: 'The unconditional warmth and prayers that will protect you across any ocean.',
    color: '#27ae60'
  },
  {
    id: 'friends',
    name: 'FRIENDS',
    category: 'Bonds',
    icon: 'Users',
    description: 'The lifelong circle who will always pick up your video calls no matter the time zone.',
    color: '#2980b9'
  },
  {
    id: 'dreams',
    name: 'DREAMS',
    category: 'Aspirations',
    icon: 'Sparkles',
    description: 'All the boundless ambition and goals ready to unfold across Canada.',
    color: '#8e44ad'
  },
  {
    id: 'home',
    name: 'HOME',
    category: 'Heart',
    icon: 'Mountain',
    description: 'The spirit of the Himalayas, momos, chiya, and the warmth of Nepal.',
    color: '#d35400'
  }
];

export interface CanadaHope {
  id: string;
  title: string;
  quote: string;
  description: string;
  iconName: string;
  themeColor: string;
  bgGradient: string;
}

export const canadaHopes: CanadaHope[] = [
  {
    id: 'places',
    title: 'NEW PLACES',
    quote: '“I hope you discover places that make you stop and say, ‘Wow… I’m really here.’”',
    description: 'From the snowy pines of Ontario to the majestic Canadian Rockies, may every road you walk bring you awe and wonder.',
    iconName: 'Compass',
    themeColor: '#38bdf8',
    bgGradient: 'from-sky-950/40 via-sky-900/10 to-transparent'
  },
  {
    id: 'people',
    title: 'GOOD PEOPLE',
    quote: '“I hope you meet people who make a foreign place feel like home.”',
    description: 'May you find warm-hearted friends who celebrate your quirks, share warm meals, and walk with you through every season.',
    iconName: 'Users2',
    themeColor: '#fb7185',
    bgGradient: 'from-rose-950/40 via-rose-900/10 to-transparent'
  },
  {
    id: 'growth',
    title: 'GROWTH',
    quote: '“I hope you become everything you’ve dreamed of becoming.”',
    description: 'May Canada give you the canvas to paint your biggest ambitions, achieve professional heights, and discover new passions.',
    iconName: 'TrendingUp',
    themeColor: '#34d399',
    bgGradient: 'from-emerald-950/40 via-emerald-900/10 to-transparent'
  },
  {
    id: 'happiness',
    title: 'HAPPINESS',
    quote: '“And more than anything, I hope you’re genuinely happy there.”',
    description: 'Beyond success and achievements, our deepest wish is that peace and true joy find you every single morning.',
    iconName: 'HeartHandshake',
    themeColor: '#facc15',
    bgGradient: 'from-amber-950/40 via-amber-900/10 to-transparent'
  }
];

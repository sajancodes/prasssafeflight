export interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  location?: string;
  category: 'scrapbook' | 'timeline-then' | 'timeline-growth' | 'timeline-now' | 'portrait' | 'highlight';
  rotation?: number; // degrees for scrapbook polaroid look
  date?: string;
  note?: string;
}

// All images are directly loaded from /images/ or /public/images/
// Easily replace, add or rearrange photos here!
export const photos: PhotoItem[] = [
  // Best portraits / Highlights
  {
    id: 'portrait-1',
    src: '/images/p1.jpg',
    alt: 'Prasamsa Didi radiant smile',
    caption: 'That signature smile that lights up every room.',
    location: 'Nepal',
    category: 'portrait',
    rotation: -2,
    note: 'Always carrying sunshine wherever you go.'
  },
  {
    id: 'highlight-1',
    src: '/images/p22.jpg',
    alt: 'Prasamsa Didi glowing portrait',
    caption: 'Unstoppable grace and quiet strength.',
    location: 'Kathmandu',
    category: 'portrait',
    rotation: 2,
    note: 'Ready to conquer new horizons across the world.'
  },
  {
    id: 'highlight-2',
    src: '/images/p30.jpg',
    alt: 'Prasamsa Didi candid moment',
    caption: 'Some moments become memories before we even realize it.',
    location: 'Nepal',
    category: 'highlight',
    rotation: -1,
    note: 'Cherishing every candid second.'
  },

  // Scrapbook Photos (Interactive polaroid cards)
  {
    id: 'scrapbook-1',
    src: '/images/p3.jpg',
    alt: 'Prasamsa memory',
    caption: 'This smile deserves to be remembered forever.',
    location: 'Kathmandu',
    category: 'scrapbook',
    rotation: 3,
    note: 'Proof that joy looks best on you.'
  },
  {
    id: 'scrapbook-2',
    src: '/images/p4.jpg',
    alt: 'Prasamsa memory',
    caption: 'So many little moments that mean everything.',
    location: 'Nepal',
    category: 'scrapbook',
    rotation: -3,
    note: 'Simple days, timeless memories.'
  },
  {
    id: 'scrapbook-3',
    src: '/images/p5.jpg',
    alt: 'Prasamsa memory',
    caption: 'Pure warmth and spontaneous laughter.',
    location: 'Nepal',
    category: 'scrapbook',
    rotation: 2,
    note: 'Never lose this spark in Canada.'
  },
  {
    id: 'scrapbook-4',
    src: '/images/p6.jpg',
    alt: 'Prasamsa memory',
    caption: 'Every snapshot tells a story of happiness.',
    location: 'Nepal',
    category: 'scrapbook',
    rotation: -2,
    note: 'The best chapters are yet to come.'
  },
  {
    id: 'scrapbook-5',
    src: '/images/p7.jpg',
    alt: 'Prasamsa memory',
    caption: 'A heart full of dreams and kindness.',
    location: 'Nepal',
    category: 'scrapbook',
    rotation: 4,
    note: 'Always lifting up everyone around you.'
  },
  {
    id: 'scrapbook-6',
    src: '/images/p8.jpg',
    alt: 'Prasamsa memory',
    caption: 'Unfiltered, authentic, and beautiful.',
    location: 'Nepal',
    category: 'scrapbook',
    rotation: -4,
    note: 'Unapologetically you.'
  },
  {
    id: 'scrapbook-7',
    src: '/images/p9.jpg',
    alt: 'Prasamsa memory',
    caption: 'Cherished afternoons and endless talks.',
    location: 'Nepal',
    category: 'scrapbook',
    rotation: 1,
    note: 'Conversations that stayed in our hearts.'
  },
  {
    id: 'scrapbook-8',
    src: '/images/p10.jpg',
    alt: 'Prasamsa memory',
    caption: 'A sister who is also a guiding star.',
    location: 'Nepal',
    category: 'scrapbook',
    rotation: -2,
    note: 'Always proud of who you are.'
  },
  {
    id: 'scrapbook-9',
    src: '/images/p11.jpg',
    alt: 'Prasamsa memory',
    caption: 'The warmth that made home feel like home.',
    location: 'Nepal',
    category: 'scrapbook',
    rotation: 3,
    note: 'Carrying a piece of Nepal with you.'
  },
  {
    id: 'scrapbook-10',
    src: '/images/p12.jpg',
    alt: 'Prasamsa memory',
    caption: 'Making ordinary moments feel golden.',
    location: 'Nepal',
    category: 'scrapbook',
    rotation: -1,
    note: 'Gold memories that will never fade.'
  },
  {
    id: 'scrapbook-11',
    src: '/images/p13.jpg',
    alt: 'Prasamsa memory',
    caption: 'Quiet confidence and big aspirations.',
    location: 'Nepal',
    category: 'scrapbook',
    rotation: 2,
    note: 'Ready to write history in Canada.'
  },
  {
    id: 'scrapbook-12',
    src: '/images/p14.jpg',
    alt: 'Prasamsa memory',
    caption: 'Laughter that echoes across any distance.',
    location: 'Nepal',
    category: 'scrapbook',
    rotation: -3,
    note: 'Distance cannot silence this bond.'
  },
  {
    id: 'scrapbook-13',
    src: '/images/p15.jpg',
    alt: 'Prasamsa memory',
    caption: 'A gentle reminder of all the love around you.',
    location: 'Nepal',
    category: 'scrapbook',
    rotation: 2,
    note: 'You are so deeply loved.'
  },
  {
    id: 'scrapbook-14',
    src: '/images/p16.jpg',
    alt: 'Prasamsa memory',
    caption: 'Moments that became forever treasures.',
    location: 'Nepal',
    category: 'scrapbook',
    rotation: -2,
    note: 'Locked safe in our hearts.'
  },
  {
    id: 'scrapbook-15',
    src: '/images/p17.jpg',
    alt: 'Prasamsa memory',
    caption: 'Smiles that warmed the coldest winter days.',
    location: 'Nepal',
    category: 'scrapbook',
    rotation: 3,
    note: 'Keep Canada warm with your smile.'
  },
  {
    id: 'scrapbook-16',
    src: '/images/p18.jpg',
    alt: 'Prasamsa memory',
    caption: 'Every little glance, every happy cheer.',
    location: 'Nepal',
    category: 'scrapbook',
    rotation: -1,
    note: 'To all the celebrations we shared.'
  },
  {
    id: 'scrapbook-17',
    src: '/images/p19.jpg',
    alt: 'Prasamsa memory',
    caption: 'Always stepping forward with dignity.',
    location: 'Nepal',
    category: 'scrapbook',
    rotation: 2,
    note: 'Grace in every step.'
  },
  {
    id: 'scrapbook-18',
    src: '/images/p21.jpg',
    alt: 'Prasamsa memory',
    caption: 'Unforgettable times with the best Didi.',
    location: 'Nepal',
    category: 'scrapbook',
    rotation: -3,
    note: 'Nobody can take your place.'
  },
  {
    id: 'scrapbook-19',
    src: '/images/p23.jpg',
    alt: 'Prasamsa memory',
    caption: 'Memories etched in gold.',
    location: 'Nepal',
    category: 'scrapbook',
    rotation: 1,
    note: 'Grateful for every second.'
  },
  {
    id: 'scrapbook-20',
    src: '/images/p24.jpg',
    alt: 'Prasamsa memory',
    caption: 'The sparkle in your eyes when you dream.',
    location: 'Nepal',
    category: 'scrapbook',
    rotation: -2,
    note: 'Chase every star you ever wanted.'
  },

  // Timeline Photos
  // 1. THEN
  {
    id: 'timeline-then-1',
    src: '/images/p25.jpg',
    alt: 'Then - Humble beginnings',
    caption: 'Where the journey first began.',
    category: 'timeline-then',
    date: 'The Beginning',
    note: 'Wide-eyed, curious, and gentle.'
  },
  {
    id: 'timeline-then-2',
    src: '/images/p26.jpg',
    alt: 'Then - Sweet early days',
    caption: 'Simple days filled with honest laughter.',
    category: 'timeline-then',
    date: 'Early Years',
    note: 'The roots that shaped your character.'
  },

  // 2. GROWING UP
  {
    id: 'timeline-growth-1',
    src: '/images/p27.jpg',
    alt: 'Growing up - Learning and exploring',
    caption: 'Discovering the world and your own courage.',
    category: 'timeline-growth',
    date: 'Growth Chapter',
    note: 'Stepping into your true self.'
  },
  {
    id: 'timeline-growth-2',
    src: '/images/p28.jpg',
    alt: 'Growing up - Cherished milestones',
    caption: 'Overcoming challenges with an open heart.',
    category: 'timeline-growth',
    date: 'Building Wings',
    note: 'Every milestone made you stronger.'
  },
  {
    id: 'timeline-growth-3',
    src: '/images/p29.jpg',
    alt: 'Growing up - Unshakeable bond',
    caption: 'Surrounded by love, spreading love.',
    category: 'timeline-growth',
    date: 'Golden Milestones',
    note: 'Always bringing people together.'
  },

  // 3. THE PERSON YOU BECAME
  {
    id: 'timeline-now-1',
    src: '/images/p31.jpg',
    alt: 'The person you became - Strong & Radiant',
    caption: 'A thoughtful, determined, and deeply caring soul.',
    category: 'timeline-now',
    date: 'Our Inspiration',
    note: 'The Didi we all admire and look up to.'
  },
  {
    id: 'timeline-now-2',
    src: '/images/p32.jpg',
    alt: 'The person you became - Ready for the world',
    caption: 'Confident, kind, and ready for global skies.',
    category: 'timeline-now',
    date: 'Standing Tall',
    note: 'A rare combination of strength and tenderness.'
  },

  // 4. AND NOW (CANADA BOUND)
  {
    id: 'timeline-now-3',
    src: '/images/p33.jpg',
    alt: 'And Now - Ready for Canada',
    caption: 'Boarding pass in hand, dreams in your eyes.',
    category: 'timeline-now',
    date: 'Now & Tomorrow',
    note: 'Canada is so lucky to have you.'
  },
  {
    id: 'timeline-now-4',
    src: '/images/p34.jpg',
    alt: 'And Now - Ready to fly',
    caption: 'Spreading wings from the Himalayas to Canada.',
    category: 'timeline-now',
    date: 'A New Chapter',
    note: 'Fly high, Prasamsa Didi!'
  },

  // More real photos for the gallery / scrapbook extra
  {
    id: 'extra-1',
    src: '/images/p35.jpg',
    alt: 'Memory',
    caption: 'Joy in every frame.',
    category: 'scrapbook',
    rotation: 2
  },
  {
    id: 'extra-2',
    src: '/images/p36.jpg',
    alt: 'Memory',
    caption: 'Cherished smile.',
    category: 'scrapbook',
    rotation: -3
  },
  {
    id: 'extra-3',
    src: '/images/p37.jpg',
    alt: 'Memory',
    caption: 'Memories of home.',
    category: 'scrapbook',
    rotation: 1
  },
  {
    id: 'extra-4',
    src: '/images/p38.jpg',
    alt: 'Memory',
    caption: 'A celebration of you.',
    category: 'scrapbook',
    rotation: -2
  },
  {
    id: 'extra-5',
    src: '/images/p39.jpg',
    alt: 'Memory',
    caption: 'Forever loved.',
    category: 'scrapbook',
    rotation: 3
  },
  {
    id: 'extra-6',
    src: '/images/p40.jpg',
    alt: 'Memory',
    caption: 'Radiant moments.',
    category: 'scrapbook',
    rotation: -1
  },
  {
    id: 'extra-7',
    src: '/images/p41.jpg',
    alt: 'Memory',
    caption: 'Golden laughter.',
    category: 'scrapbook',
    rotation: 2
  },
  {
    id: 'extra-8',
    src: '/images/p42.jpg',
    alt: 'Memory',
    caption: 'Pure warmth.',
    category: 'scrapbook',
    rotation: -2
  },
  {
    id: 'extra-9',
    src: '/images/p43.jpg',
    alt: 'Memory',
    caption: 'Unforgettable days.',
    category: 'scrapbook',
    rotation: 1
  },
  {
    id: 'extra-10',
    src: '/images/p44.jpg',
    alt: 'Memory',
    caption: 'Always our pride.',
    category: 'scrapbook',
    rotation: -3
  },
  {
    id: 'extra-11',
    src: '/images/p45.jpg',
    alt: 'Memory',
    caption: 'Sweetest farewell.',
    category: 'scrapbook',
    rotation: 2
  },
  {
    id: 'extra-12',
    src: '/images/slap.jpg',
    alt: 'Playful candid memory',
    caption: 'The fun, mischievous, and playful side of Didi! 😄',
    category: 'scrapbook',
    rotation: -4,
    note: 'These funny memories will make us smile every single time.'
  }
];

// Helper to get photos by category
export const getPhotosByCategory = (category: PhotoItem['category']) => {
  return photos.filter(p => p.category === category);
};

// Best portrait photo for Scene 10 (Emotional Silence)
export const bestPortraitPhoto = photos.find(p => p.id === 'portrait-1') || photos[0];

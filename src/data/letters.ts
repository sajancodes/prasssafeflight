export interface OpenWhenLetter {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  sealColor: string;
  badge: string;
  letter: string;
  reminder: string;
}

export const openWhenLetters: OpenWhenLetter[] = [
  {
    id: 'miss-nepal',
    title: 'Open when you miss Nepal',
    subtitle: 'When you crave the Himalayan air, morning chiya, or the chaos of Kathmandu',
    iconName: 'Mountain',
    sealColor: '#c0392b',
    badge: 'Home & Roots',
    letter: `Dearest Prasamsa Didi,

Home isn’t only a pin on a map or the streets of Nepal. Home is the warmth you carry inside you, the values you hold, and the people who are always thinking of you back here.

Whenever you smell freshly brewed tea, see the morning sun, or hear a song from back home, close your eyes and remember: every single prayer and blessing from Kathmandu is traveling with you across the oceans.

Nepal will always be right here, waiting with open arms for your visits, forever proud of its daughter.

Take a deep breath. You are never as far away as you feel. 🏔️🤍`,
    reminder: '“Home isn’t only a place. Sometimes it’s the people waiting for you.”'
  },
  {
    id: 'feels-lonely',
    title: 'Open when Canada feels lonely',
    subtitle: 'When the winter is cold and the new city feels overwhelming',
    iconName: 'Heart',
    sealColor: '#2980b9',
    badge: 'Comfort & Warmth',
    letter: `Dear Didi,

Moving to the other side of the world takes unbelievable bravery. There will be quiet evenings when the silence feels heavier and the Canadian snow feels colder than usual.

On those days, please remember: it is completely okay to miss the people you left behind. It only means the love was real and deep.

Pick up your phone. Call us anytime — day or night. There is no time zone difference that can make our love for you even a millimeter smaller.

You are never truly alone. Our hearts are right there beside you. ☕🧣`,
    reminder: '“It’s okay to miss the people you left behind. It only means they mattered.”'
  },
  {
    id: 'achieve-something',
    title: 'Open when you achieve something',
    subtitle: 'When you get that job, ace that milestone, or conquer a big goal',
    iconName: 'Sparkles',
    sealColor: '#f39c12',
    badge: 'Pride & Celebration',
    letter: `Yay Prasamsa Didi!! 🎉✨

We always knew you would do it! From the very first day, your dedication, intelligence, and grace have set you apart.

Whenever you cross a new milestone in Canada — whether it’s a big career achievement, mastering a new skill, or simply making it through a tough week with flying colors — take a moment to celebrate yourself.

Before you rush to the next goal, remember there is a whole cheering squad back home in Nepal who are celebrating your success with tears of pure pride in their eyes.

Keep shining, Didi. You were born to achieve wonderful things! 🌟👏`,
    reminder: '“Before you celebrate, remember there are people back home who are incredibly proud of you.”'
  },
  {
    id: 'feel-lost',
    title: 'Open when you feel lost',
    subtitle: 'When you doubt yourself or wonder if you made the right choices',
    iconName: 'Compass',
    sealColor: '#27ae60',
    badge: 'Strength & Courage',
    letter: `Dear Prasamsa Didi,

Look at how far you have already come in life. You didn’t get to where you are by pure chance; you got here through your courage, resilience, and beautiful soul.

If a day ever comes when things feel uncertain or difficult, pause and look in the mirror. You are stronger than any temporary setback. One difficult day cannot erase how far you have journeyed.

Trust the timing of your life. Every step you are taking in Canada is part of the extraordinary story you are writing.

Believe in yourself as fiercely as we believe in you. 🕊️💪`,
    reminder: '“You’ve already made it this far. One difficult day cannot erase how far you’ve come.”'
  }
];

export interface FinalLetterData {
  greeting: string;
  paragraphs: string[];
  signoff: string;
  sender: string;
  date: string;
  location: string;
}

export const finalLetterContent: FinalLetterData = {
  greeting: "Dear Prasamsa Didi,",
  paragraphs: [
    "As the day of your flight comes closer, it’s hard to put into words how many different emotions we are feeling. There is a quiet sadness in seeing you pack your bags and leave Nepal, but above everything else, there is an immense sense of joy, pride, and excitement for what lies ahead for you.",
    "You have always been someone with a golden heart — someone who brings light, calm, and genuine kindness to everyone around you. Watching you take this big leap and step onto Canadian soil to build your future is an inspiration.",
    "Canada is about to gain one of the most hardworking, kind, and wonderful human beings we know. We hope you embrace every new street, every snowfall, every new friendship, and every challenge with that trademark Prasamsa smile.",
    "Never forget where you come from, but never let fear hold you back from where you want to go. Chase your highest dreams, take care of your health, eat well, stay warm, and know that back home in Nepal, you will always have our unconditional love and support.",
    "This isn't goodbye. It’s just the beginning of the most exciting chapter of your life. We will miss you so muchh."
  ],
  signoff: "Wishing you clear skies, safe flights, and a lifetime of happiness,",
  sender: "With all our love & blessings from Nepal 🇳🇵 ❤️ 🇨🇦",
  date: "September 2026",
  location: "Kathmandu, Nepal"
};

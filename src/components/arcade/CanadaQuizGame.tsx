import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundscape } from '../../utils/audio';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  funFact: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "When someone in Toronto asks: 'Wanna grab a Double-Double at Timmies?', what are they saying?",
    options: [
      {
        text: 'A coffee with two creams and two sugars from Tim Hortons',
        isCorrect: true,
        explanation: 'Spot on! It is Canada’s unofficial national beverage and your morning fuel.',
      },
      {
        text: 'A double-patty burger at a fast food diner',
        isCorrect: false,
        explanation: 'Nope! While tasty, Timmies is sacred coffee territory in Canada.',
      },
      {
        text: 'Two tickets to a hockey match',
        isCorrect: false,
        explanation: 'Not quite! Though hockey is Canada’s second religion after coffee.',
      },
    ],
    funFact: 'Tim Hortons sells over 5 million cups of coffee every single day in Canada!',
  },
  {
    id: 2,
    question: "What on earth is a 'Toque' (pronounced 'took') in Canadian English?",
    options: [
      {
        text: 'A type of Canadian maple candy',
        isCorrect: false,
        explanation: 'Sounds yummy, but a toque won’t satisfy your sweet tooth!',
      },
      {
        text: 'A warm knitted winter beanie hat',
        isCorrect: true,
        explanation: 'Exactly! Never leave your apartment without one once November arrives.',
      },
      {
        text: 'A special snow shovel for your driveway',
        isCorrect: false,
        explanation: 'No, that’s just a snow shovel (which you will also get to know very well!).',
      },
    ],
    funFact: 'The word comes from French-Canadian fur traders who needed warm knit caps to survive.',
  },
  {
    id: 3,
    question: "If a stranger accidentally bumps into YOU on the sidewalk, what will they almost certainly say?",
    options: [
      {
        text: "'Watch where you're going!'",
        isCorrect: false,
        explanation: 'Very un-Canadian! That almost never happens here.',
      },
      {
        text: "'Sorry!' (Even though it was totally your fault)",
        isCorrect: true,
        explanation: '100% true! In Canada, apologies are reflex greetings. You will start saying it within 48 hours.',
      },
      {
        text: "They remain silent and stare into the snow",
        isCorrect: false,
        explanation: 'Nope, Canadians are famous for apologizing to furniture when they stub their toe!',
      },
    ],
    funFact: 'In 2009, Ontario passed the "Apology Act" stating that saying sorry cannot be used as an admission of legal guilt!',
  },
  {
    id: 4,
    question: "What is Canada's iconic culinary treasure 'Poutine' made of?",
    options: [
      {
        text: 'Mashed potatoes with cheese and sour cream',
        isCorrect: false,
        explanation: 'Comforting, but not the legendary Quebec recipe.',
      },
      {
        text: 'Crispy French fries smothered in fresh squeaky cheese curds & piping hot brown gravy',
        isCorrect: true,
        explanation: 'Heaven on a winter night! The squeak in the cheese curd is mandatory.',
      },
      {
        text: 'Pancakes drenched in Canadian maple syrup',
        isCorrect: false,
        explanation: 'Delicious breakfast, but poutine is the king of savory midnight cravings.',
      },
    ],
    funFact: 'It originated in rural Quebec in the 1950s and is now celebrated globally.',
  },
  {
    id: 5,
    question: "What does adding '..., eh?' to the end of a sentence mean in Canada?",
    options: [
      {
        text: "It functions just like the Nepali 'Haina ta?' — seeking agreement and connection",
        isCorrect: true,
        explanation: 'Bingo! "It’s pretty cold today, eh?" = "Aaja kasto chiso cha, haina ta?"',
      },
      {
        text: 'It means the speaker didn’t hear what you said',
        isCorrect: false,
        explanation: 'That would be "Huh?" — "Eh" is conversational glue!',
      },
      {
        text: 'It signals that the conversation is over',
        isCorrect: false,
        explanation: 'Quite the opposite, it invites the other person to chime in warmly.',
      },
    ],
    funFact: 'Linguists consider "eh" an invariant tag that builds social warmth and politeness.',
  },
];

export const CanadaQuizGame: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const q = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);

    if (q.options[index].isCorrect) {
      setScore((s) => s + 1);
      soundscape.playSuccessChime();
    } else {
      soundscape.playBubblePopSound();
    }
  };

  const handleNext = () => {
    soundscape.playCardFlipSound();
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((c) => c + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
      soundscape.playSuccessChime();
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ef4444', '#ffffff', '#fbbf24'],
        });
      } catch {
        // ignore
      }
    }
  };

  const handleRestart = () => {
    soundscape.playCardFlipSound();
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-[#111420] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Red maple leaf watermark */}
      <div className="absolute top-2 right-4 text-8xl opacity-5 pointer-events-none select-none">
        🍁
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Mini-Game 2: Survival Training</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif-title font-semibold text-white">
            Canadian Slang & Culture Quiz 🍁
          </h3>
          <p className="text-sm text-neutral-400 font-sans mt-1">
            Test your knowledge before touchdown in Canada! Will you pass with flying colors?
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-white/70">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
            Score: <strong className="text-amber-400">{score}</strong> / {QUIZ_QUESTIONS.length}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="py-6">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Question progress */}
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>QUESTION {currentIdx + 1} OF {QUIZ_QUESTIONS.length}</span>
                <span className="text-red-400 font-semibold">{Math.round(((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100)}% Complete</span>
              </div>

              {/* Question Text */}
              <h4 className="text-lg sm:text-xl font-serif text-white leading-relaxed">
                {q.question}
              </h4>

              {/* Options */}
              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  const isSelected = selectedOption === i;
                  const isRevealed = selectedOption !== null;
                  let btnStyle = 'bg-[#0d101a] border-white/10 hover:border-white/25 text-neutral-200';

                  if (isRevealed) {
                    if (opt.isCorrect) {
                      btnStyle = 'bg-emerald-950/60 border-emerald-500/60 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
                    } else if (isSelected) {
                      btnStyle = 'bg-red-950/60 border-red-500/60 text-red-100';
                    } else {
                      btnStyle = 'bg-[#0d101a]/50 border-white/5 text-neutral-500 opacity-60';
                    }
                  }

                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleSelectOption(i)}
                      whileTap={{ scale: isRevealed ? 1 : 0.99 }}
                      disabled={isRevealed}
                      className={`w-full text-left p-4 rounded-2xl border transition-all text-sm font-sans flex items-start justify-between gap-3 cursor-pointer ${btnStyle}`}
                    >
                      <div className="space-y-1">
                        <span className="font-medium">{opt.text}</span>
                        {isRevealed && isSelected && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-xs mt-1 text-white/80"
                          >
                            {opt.explanation}
                          </motion.p>
                        )}
                      </div>

                      {isRevealed && (
                        <div className="shrink-0 mt-0.5">
                          {opt.isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : isSelected ? (
                            <XCircle className="w-5 h-5 text-red-400" />
                          ) : null}
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Fun Fact Footer */}
              {selectedOption !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2.5"
                >
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300">Canadian Fun Fact: </span>
                    <span>{q.funFact}</span>
                  </div>
                </motion.div>
              )}

              {/* Next Button */}
              {selectedOption !== null && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold text-sm shadow-lg shadow-red-950 transition-all cursor-pointer active:scale-95"
                  >
                    {currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question ➔' : 'View Results & Badge 🏆'}
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            /* Quiz Completed View */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-6"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                🍁
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl sm:text-3xl font-serif-title font-bold text-white">
                  Certified Canadian Survivor! 🇨🇦
                </h4>
                <p className="text-sm text-neutral-300 max-w-md mx-auto">
                  Prasamsa Didi scored <strong>{score} out of {QUIZ_QUESTIONS.length}</strong>! You are officially equipped with conversational slang, winter wits, and polite Canadian charm!
                </p>
              </div>

              {/* Honorary Certificate Badge */}
              <div className="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-b from-[#171a29] to-[#0d101a] border border-amber-400/40 shadow-xl text-left space-y-3 relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span className="font-serif-title font-bold text-sm text-white tracking-wide">
                      HONORARY DIPLOMA
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-red-400 uppercase">Class of 2026</span>
                </div>
                <div className="text-xs text-neutral-300 space-y-1">
                  <p className="font-semibold text-white">Awarded To: Prasamsa Didi</p>
                  <p>Status: Cleared for Tim Hortons, Snowstorms, & Saying &lsquo;Sorry, eh?&rsquo;</p>
                  <p className="text-amber-300 italic pt-1">&ldquo;Ready to conquer Canada while keeping Nepal in her heart.&rdquo;</p>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-medium transition-all active:scale-95 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

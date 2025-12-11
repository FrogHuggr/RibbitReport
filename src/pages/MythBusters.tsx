import { useState } from 'react';

interface MythCard {
  id: string;
  myth: string;
  truth: string;
  emoji: string;
}

const MYTHS: MythCard[] = [
  {
    id: 'warts',
    myth: "Touching a toad will give you warts",
    truth: "Warts are caused by a human virus, not toads! Those bumps on toads are glands that help them stay moist and can produce toxins to deter predators.",
    emoji: '🐸',
  },
  {
    id: 'frogs-toads',
    myth: "Frogs and toads are completely different animals",
    truth: "All toads ARE frogs! 'Toad' is just a common name for frogs with dry, bumpy skin. Scientists call them all 'anurans.'",
    emoji: '🤝',
  },
  {
    id: 'water',
    myth: "Frogs always live in water",
    truth: "While many frogs need water to breed, some live in trees, underground, or even deserts! The Purple Frog spends most of its life underground.",
    emoji: '🏜️',
  },
  {
    id: 'green',
    myth: "All frogs are green",
    truth: "Frogs come in almost every color! Blue poison dart frogs, red tomato frogs, purple frogs, and even transparent glass frogs exist!",
    emoji: '🌈',
  },
  {
    id: 'slimy',
    myth: "Frogs are slimy and gross",
    truth: "That mucus is actually amazing! It keeps them hydrated, protects against bacteria, and scientists use some frog substances to make medicine!",
    emoji: '✨',
  },
  {
    id: 'prince',
    myth: "Kissing a frog might turn it into a prince",
    truth: "Sorry, fairy tales got this wrong! But frogs ARE royalty of the amphibian world - they've been around for over 200 million years!",
    emoji: '👑',
  },
];

function MythCard({ myth, revealed, onReveal }: { myth: MythCard; revealed: boolean; onReveal: () => void }) {
  return (
    <div
      className={`
        relative min-h-[280px] rounded-3xl overflow-hidden cursor-pointer
        transition-all duration-500 transform-gpu
        ${revealed ? '' : 'hover:scale-[1.02]'}
      `}
      onClick={!revealed ? onReveal : undefined}
      style={{
        perspective: '1000px',
      }}
    >
      <div
        className={`
          relative w-full h-full transition-transform duration-500
          ${revealed ? '[transform:rotateY(180deg)]' : ''}
        `}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front - Myth */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 p-6 flex flex-col items-center justify-center text-white text-center backface-hidden rounded-3xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute top-4 left-4 bg-white/20 px-3 py-1 rounded-full">
            <span className="text-xs font-bold">🚫 MYTH</span>
          </div>
          <span className="text-5xl mb-4">{myth.emoji}</span>
          <p className="text-xl font-display leading-tight">"{myth.myth}"</p>
          <div className="mt-6 bg-white/20 px-4 py-2 rounded-full">
            <span className="text-sm font-semibold">Tap to reveal the truth!</span>
          </div>
        </div>

        {/* Back - Truth */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-asa-green to-asa-green-dark p-6 flex flex-col items-center justify-center text-white text-center backface-hidden rounded-3xl [transform:rotateY(180deg)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute top-4 left-4 bg-white/20 px-3 py-1 rounded-full">
            <span className="text-xs font-bold">✓ TRUTH</span>
          </div>
          <span className="text-5xl mb-4">💡</span>
          <p className="text-lg leading-relaxed">{myth.truth}</p>
        </div>
      </div>
    </div>
  );
}

export function MythBusters() {
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleReveal = (id: string) => {
    setRevealedCards(prev => new Set([...prev, id]));
  };

  const handleNext = () => {
    if (currentIndex < MYTHS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const currentMyth = MYTHS[currentIndex];
  const isRevealed = revealedCards.has(currentMyth.id);
  const allRevealed = revealedCards.size === MYTHS.length;

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <header className="bg-white sticky top-0 z-40 border-b border-asa-grey/10">
        <div className="px-5 py-4">
          <h1 className="text-2xl font-display text-ink">Myth Busters</h1>
          <p className="text-sm text-asa-grey-light mt-1">
            Can you separate fact from fiction?
          </p>
        </div>
      </header>

      {/* Progress */}
      <div className="px-5 py-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-asa-grey">
          {revealedCards.size} of {MYTHS.length} busted!
        </span>
        <div className="flex gap-1">
          {MYTHS.map((m, i) => (
            <div
              key={m.id}
              className={`
                w-2 h-2 rounded-full transition-colors
                ${revealedCards.has(m.id) ? 'bg-asa-green' : 'bg-asa-grey/20'}
                ${i === currentIndex ? 'ring-2 ring-asa-yellow ring-offset-1' : ''}
              `}
            />
          ))}
        </div>
      </div>

      {/* Card area */}
      <main className="px-5">
        {/* Current card */}
        <MythCard
          myth={currentMyth}
          revealed={isRevealed}
          onReveal={() => handleReveal(currentMyth.id)}
        />

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${currentIndex === 0
                ? 'bg-asa-grey/10 text-asa-grey/30'
                : 'bg-white shadow-md text-asa-grey hover:bg-asa-green hover:text-white'
              }
              transition-colors
            `}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span className="text-lg font-bold text-asa-grey">
            {currentIndex + 1} / {MYTHS.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentIndex === MYTHS.length - 1}
            className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${currentIndex === MYTHS.length - 1
                ? 'bg-asa-grey/10 text-asa-grey/30'
                : 'bg-white shadow-md text-asa-grey hover:bg-asa-green hover:text-white'
              }
              transition-colors
            `}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Completion message */}
        {allRevealed && (
          <div className="mt-8 p-6 bg-asa-yellow/20 rounded-3xl text-center animate-bounce-in">
            <span className="text-5xl">🧠</span>
            <h3 className="font-display text-xl text-ink mt-3">Myth Master!</h3>
            <p className="text-sm text-asa-grey mt-2">
              You've busted all the myths! Now you can share these facts with your friends.
            </p>
          </div>
        )}

        {/* Hint for unrevealed cards */}
        {!isRevealed && (
          <p className="text-center text-sm text-asa-grey-light mt-6 animate-pulse">
            👆 Tap the card to reveal the truth!
          </p>
        )}
      </main>
    </div>
  );
}

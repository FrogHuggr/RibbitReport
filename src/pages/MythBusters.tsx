import { useState } from 'react';
import { ASALogo, IconX, IconCheck, IconChevronLeft, IconChevronRight, IconLightbulb, IconBrain, IconFrog } from '../components/ui';

interface MythCard {
  id: string;
  myth: string;
  truth: string;
  category: string;
}

const MYTHS: MythCard[] = [
  {
    id: 'warts',
    myth: "Touching a toad will give you warts",
    truth: "Warts are caused by a human virus, not toads! Those bumps on toads are glands that help them stay moist and can produce toxins to deter predators.",
    category: 'Health',
  },
  {
    id: 'frogs-toads',
    myth: "Frogs and toads are completely different animals",
    truth: "All toads ARE frogs! 'Toad' is just a common name for frogs with dry, bumpy skin. Scientists call them all 'anurans.'",
    category: 'Biology',
  },
  {
    id: 'water',
    myth: "Frogs always live in water",
    truth: "While many frogs need water to breed, some live in trees, underground, or even deserts! The Purple Frog spends most of its life underground.",
    category: 'Habitat',
  },
  {
    id: 'green',
    myth: "All frogs are green",
    truth: "Frogs come in almost every color! Blue poison dart frogs, red tomato frogs, purple frogs, and even transparent glass frogs exist!",
    category: 'Appearance',
  },
  {
    id: 'slimy',
    myth: "Frogs are slimy and gross",
    truth: "That mucus is actually amazing! It keeps them hydrated, protects against bacteria, and scientists use some frog substances to make medicine!",
    category: 'Biology',
  },
  {
    id: 'prince',
    myth: "Kissing a frog might turn it into a prince",
    truth: "Sorry, fairy tales got this wrong! But frogs ARE royalty of the amphibian world - they've been around for over 200 million years!",
    category: 'Folklore',
  },
];

function MythCardComponent({ myth, revealed, onReveal }: { myth: MythCard; revealed: boolean; onReveal: () => void }) {
  return (
    <div
      className={`
        relative min-h-[320px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-500 transform-gpu
        ${revealed ? '' : 'hover:scale-[1.01]'}
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
          className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 p-6 flex flex-col backface-hidden rounded-2xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
              <IconX size={14} className="text-white" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Myth</span>
            </div>
            <span className="text-xs font-medium text-white/60 bg-white/10 px-3 py-1 rounded-full">
              {myth.category}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
              <IconFrog size={32} className="text-white/80" />
            </div>
            <p className="text-xl font-display text-white leading-tight">"{myth.myth}"</p>
          </div>

          {/* CTA */}
          <div className="mt-6 bg-white/20 px-5 py-3 rounded-xl text-center">
            <span className="text-sm font-semibold text-white">Tap to reveal the truth</span>
          </div>
        </div>

        {/* Back - Truth */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-asa-green to-asa-green-dark p-6 flex flex-col backface-hidden rounded-2xl [transform:rotateY(180deg)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
              <IconCheck size={14} className="text-white" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Truth</span>
            </div>
            <span className="text-xs font-medium text-white/60 bg-white/10 px-3 py-1 rounded-full">
              {myth.category}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
              <IconLightbulb size={32} className="text-white/80" />
            </div>
            <p className="text-lg text-white leading-relaxed">{myth.truth}</p>
          </div>

          {/* Busted label */}
          <div className="mt-6 text-center">
            <span className="text-sm font-bold text-white/60 uppercase tracking-wider">Myth Busted!</span>
          </div>
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
      <header className="relative bg-gradient-to-br from-asa-grey to-ink overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative px-5 pt-12 pb-6">
          <div className="flex items-center gap-3 mb-3">
            <ASALogo variant="icon" className="w-8 h-8" color="white" />
            <span className="text-white/40 text-sm">|</span>
            <span className="text-white/60 text-sm font-medium">Education</span>
          </div>
          <h1 className="text-3xl font-display text-white">Myth Busters</h1>
          <p className="text-white/60 mt-2 text-sm">
            Can you separate fact from fiction?
          </p>
        </div>
      </header>

      {/* Progress indicator */}
      <div className="px-5 py-4 bg-white border-b border-asa-grey/10">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-asa-grey">
            <span className="text-asa-green">{revealedCards.size}</span> of {MYTHS.length} myths busted
          </span>
          <div className="flex gap-1.5">
            {MYTHS.map((m, i) => (
              <div
                key={m.id}
                className={`
                  w-2 h-2 rounded-full transition-all
                  ${revealedCards.has(m.id) ? 'bg-asa-green' : 'bg-asa-grey/20'}
                  ${i === currentIndex ? 'ring-2 ring-asa-yellow ring-offset-2' : ''}
                `}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Card area */}
      <main className="px-5 py-6">
        {/* Current card */}
        <MythCardComponent
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
                : 'bg-white shadow-card text-asa-grey hover:bg-asa-green hover:text-white'
              }
              transition-colors
            `}
          >
            <IconChevronLeft size={24} />
          </button>

          <div className="text-center">
            <span className="text-2xl font-bold text-ink">{currentIndex + 1}</span>
            <span className="text-asa-grey mx-1">/</span>
            <span className="text-lg text-asa-grey">{MYTHS.length}</span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === MYTHS.length - 1}
            className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${currentIndex === MYTHS.length - 1
                ? 'bg-asa-grey/10 text-asa-grey/30'
                : 'bg-white shadow-card text-asa-grey hover:bg-asa-green hover:text-white'
              }
              transition-colors
            `}
          >
            <IconChevronRight size={24} />
          </button>
        </div>

        {/* Completion message */}
        {allRevealed && (
          <div className="mt-8 bg-gradient-to-br from-asa-yellow/20 to-asa-green/20 rounded-2xl p-6 text-center border border-asa-green/20 animate-bounce-in">
            <div className="w-16 h-16 mx-auto bg-asa-green rounded-full flex items-center justify-center mb-4">
              <IconBrain size={32} className="text-white" />
            </div>
            <h3 className="font-display text-xl text-ink">Myth Master!</h3>
            <p className="text-sm text-asa-grey mt-2">
              You've busted all the myths! Now you can share these facts with your friends.
            </p>
          </div>
        )}

        {/* Hint for unrevealed cards */}
        {!isRevealed && (
          <div className="mt-6 flex items-center justify-center gap-2 text-asa-grey-light animate-pulse">
            <IconLightbulb size={16} />
            <p className="text-sm">Tap the card to reveal the truth</p>
          </div>
        )}
      </main>
    </div>
  );
}

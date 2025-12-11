import { Link } from 'react-router-dom';
import { useStamps, useProgress } from '../hooks';

// Sample Amphibian of the Day data - will rotate through your 9 species
const AMPHIBIAN_OF_THE_DAY = {
  id: 'purple-frog',
  name: 'Purple Frog',
  scientificName: 'Nasikabatrachus sahyadrensis',
  emoji: '🟣',
  status: 'EN',
  country: 'India',
  countryFlag: '🇮🇳',
  funFact: "I spend most of my life underground and only come up for about two weeks each year to find love!",
  image: '/images/species/purple-frog.jpg',
  dispatchId: 'karina-purple-frog',
};

// MarshMellow greetings that rotate
const GREETINGS = [
  "Hey there, explorer!",
  "Ribbit ribbit! Welcome back!",
  "Ready to discover something amazing?",
  "Hop on in, friend!",
  "Great to see you!",
];

export function Home() {
  const { totalStamps } = useStamps();
  const { progress } = useProgress();
  const completedArticles = progress.filter(p => p.completed).length;

  // Get a greeting based on time of day
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // Pick a random greeting (in real app, could be based on date)
  const randomGreeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="bg-gradient-to-br from-asa-green via-asa-green to-asa-green-dark pt-safe-top">
        <div className="px-5 pt-6 pb-8">
          {/* MarshMellow greeting */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg animate-bounce-in">
              🐸
            </div>
            <div className="flex-1 text-white pt-1">
              <p className="text-asa-yellow font-fun font-semibold text-sm">{timeGreeting}!</p>
              <h1 className="text-2xl font-display mt-1">{randomGreeting}</h1>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex gap-3 mt-6">
            <Link
              to="/passport"
              className="flex-1 bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-white hover:bg-white/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="text-2xl font-bold">{totalStamps}</p>
                  <p className="text-xs opacity-80">Stamps</p>
                </div>
              </div>
            </Link>
            <Link
              to="/dispatches"
              className="flex-1 bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-white hover:bg-white/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📚</span>
                <div>
                  <p className="text-2xl font-bold">{completedArticles}</p>
                  <p className="text-xs opacity-80">Stories Read</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Curved bottom */}
        <div className="h-6 bg-cream rounded-t-[2rem]" />
      </header>

      {/* Main content */}
      <main className="px-5 -mt-1 bg-cream">
        {/* Amphibian of the Day */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display text-ink">
              <span className="text-asa-yellow">✨</span> Amphibian of the Day
            </h2>
            <span className="text-xs text-asa-grey-light font-medium bg-paper px-3 py-1 rounded-full">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>

          <Link
            to={`/dispatches/${AMPHIBIAN_OF_THE_DAY.dispatchId}`}
            className="block bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1"
          >
            {/* Image placeholder */}
            <div className="h-48 bg-gradient-to-br from-asa-blue-light to-asa-blue flex items-center justify-center">
              <span className="text-8xl">{AMPHIBIAN_OF_THE_DAY.emoji}</span>
            </div>

            <div className="p-5">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-3">
                <span className="country-badge">
                  {AMPHIBIAN_OF_THE_DAY.countryFlag} {AMPHIBIAN_OF_THE_DAY.country}
                </span>
                <span className={`status-badge status-badge--${AMPHIBIAN_OF_THE_DAY.status.toLowerCase()}`}>
                  {AMPHIBIAN_OF_THE_DAY.status === 'EN' ? '⚠️ Endangered' : AMPHIBIAN_OF_THE_DAY.status}
                </span>
              </div>

              {/* Name */}
              <h3 className="text-2xl font-display text-ink">
                {AMPHIBIAN_OF_THE_DAY.name}
              </h3>
              <p className="text-sm text-asa-grey-light italic">
                {AMPHIBIAN_OF_THE_DAY.scientificName}
              </p>

              {/* Fun fact */}
              <div className="mt-4 p-4 bg-asa-yellow/10 rounded-2xl border-l-4 border-asa-yellow">
                <p className="text-sm text-asa-grey font-medium flex items-start gap-2">
                  <span className="text-lg">💬</span>
                  "{AMPHIBIAN_OF_THE_DAY.funFact}"
                </p>
              </div>

              {/* CTA */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-asa-green font-semibold text-sm">Learn more about me!</span>
                <div className="w-10 h-10 bg-asa-green rounded-full flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-xl font-display text-ink mb-4">Explore</h2>

          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/dispatches"
              className="fun-card p-5 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-asa-green/10 rounded-2xl flex items-center justify-center mb-3">
                <span className="text-3xl">📬</span>
              </div>
              <h3 className="font-bold text-ink">Field Dispatches</h3>
              <p className="text-xs text-asa-grey-light mt-1">Stories from researchers</p>
            </Link>

            <Link
              to="/map"
              className="fun-card p-5 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-asa-blue/20 rounded-2xl flex items-center justify-center mb-3">
                <span className="text-3xl">🗺️</span>
              </div>
              <h3 className="font-bold text-ink">World Map</h3>
              <p className="text-xs text-asa-grey-light mt-1">Explore by location</p>
            </Link>

            <Link
              to="/myths"
              className="fun-card p-5 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-asa-yellow/20 rounded-2xl flex items-center justify-center mb-3">
                <span className="text-3xl">🤔</span>
              </div>
              <h3 className="font-bold text-ink">Myth Busters</h3>
              <p className="text-xs text-asa-grey-light mt-1">Fact or fiction?</p>
            </Link>

            <Link
              to="/passport"
              className="fun-card p-5 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-status-en/10 rounded-2xl flex items-center justify-center mb-3">
                <span className="text-3xl">🛂</span>
              </div>
              <h3 className="font-bold text-ink">My Passport</h3>
              <p className="text-xs text-asa-grey-light mt-1">Stamps & achievements</p>
            </Link>
          </div>
        </section>

        {/* Did You Know? */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-asa-green to-asa-green-dark rounded-3xl p-6 text-white">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🤯</span>
              <div>
                <h3 className="font-display text-lg">Did You Know?</h3>
                <p className="text-sm opacity-90 mt-2 leading-relaxed">
                  There are over <span className="font-bold text-asa-yellow">8,000 species</span> of amphibians in the world, and nearly <span className="font-bold text-asa-yellow">half of them</span> are threatened with extinction!
                </p>
                <Link
                  to="/myths"
                  className="inline-flex items-center gap-2 mt-4 bg-white text-asa-green px-4 py-2 rounded-full text-sm font-bold hover:bg-asa-yellow transition-colors"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer attribution */}
        <footer className="text-center pb-8">
          <p className="text-xs text-asa-grey-light">
            Made with 💚 by the <span className="font-semibold">Amphibian Survival Alliance</span>
          </p>
        </footer>
      </main>
    </div>
  );
}

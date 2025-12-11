import { Link } from 'react-router-dom';
import { useProgress, useStamps } from '../hooks';

// Placeholder data for 9 dispatches - will be replaced with your actual content
const DISPATCHES = [
  {
    id: 'karina-purple-frog',
    researcher: 'Dr. Karina Patel',
    species: 'Purple Frog',
    country: 'India',
    countryFlag: '🇮🇳',
    emoji: '🟣',
    status: 'EN',
    teaser: 'Meet a frog that spends most of its life underground!',
    color: 'from-purple-500 to-purple-700',
  },
  {
    id: 'luis-glass-frog',
    researcher: 'Luis Coloma',
    species: 'Glass Frog',
    country: 'Ecuador',
    countryFlag: '🇪🇨',
    emoji: '🪟',
    status: 'LC',
    teaser: 'Discover a frog you can see right through!',
    color: 'from-emerald-400 to-teal-600',
  },
  {
    id: 'maria-axolotl',
    researcher: 'Dr. María García',
    species: 'Axolotl',
    country: 'Mexico',
    countryFlag: '🇲🇽',
    emoji: '🦎',
    status: 'CR',
    teaser: 'The salamander that never grows up!',
    color: 'from-pink-400 to-rose-600',
  },
  {
    id: 'james-poison-dart',
    researcher: 'Dr. James Morton',
    species: 'Poison Dart Frog',
    country: 'Colombia',
    countryFlag: '🇨🇴',
    emoji: '🎯',
    status: 'VU',
    teaser: 'Tiny, colorful, and incredibly toxic!',
    color: 'from-blue-400 to-indigo-600',
  },
  {
    id: 'yuki-giant-salamander',
    researcher: 'Dr. Yuki Tanaka',
    species: 'Giant Salamander',
    country: 'Japan',
    countryFlag: '🇯🇵',
    emoji: '🐉',
    status: 'NT',
    teaser: 'Meet the worlds largest amphibian!',
    color: 'from-slate-500 to-slate-700',
  },
  {
    id: 'amara-goliath-frog',
    researcher: 'Dr. Amara Ndiaye',
    species: 'Goliath Frog',
    country: 'Cameroon',
    countryFlag: '🇨🇲',
    emoji: '💪',
    status: 'EN',
    teaser: 'A frog as big as a house cat!',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'diego-marsupial-frog',
    researcher: 'Diego Almeida',
    species: 'Marsupial Frog',
    country: 'Peru',
    countryFlag: '🇵🇪',
    emoji: '🎒',
    status: 'VU',
    teaser: 'This mom carries babies in a pouch on her back!',
    color: 'from-lime-500 to-green-600',
  },
  {
    id: 'sophie-fire-salamander',
    researcher: 'Dr. Sophie Weber',
    species: 'Fire Salamander',
    country: 'Germany',
    countryFlag: '🇩🇪',
    emoji: '🔥',
    status: 'LC',
    teaser: 'Ancient legend meets modern science!',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    id: 'raj-caecilian',
    researcher: 'Dr. Raj Sharma',
    species: 'Caecilian',
    country: 'Sri Lanka',
    countryFlag: '🇱🇰',
    emoji: '🐛',
    status: 'DD',
    teaser: 'Is it a worm? Is it a snake? Its an amphibian!',
    color: 'from-stone-500 to-stone-700',
  },
];

export function Dispatches() {
  const { isArticleComplete } = useProgress();
  const { hasStamp } = useStamps();

  const completedCount = DISPATCHES.filter(d => isArticleComplete(d.id)).length;

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <header className="bg-white sticky top-0 z-40 border-b border-asa-grey/10">
        <div className="px-5 py-4">
          <h1 className="text-2xl font-display text-ink">Field Dispatches</h1>
          <p className="text-sm text-asa-grey-light mt-1">
            Stories from researchers around the world
          </p>
        </div>
      </header>

      {/* Progress indicator */}
      <div className="px-5 py-4 bg-asa-green/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-asa-grey">Your Progress</span>
          <span className="text-sm font-bold text-asa-green">{completedCount}/{DISPATCHES.length}</span>
        </div>
        <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-asa-green to-asa-green-dark rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / DISPATCHES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Dispatch cards */}
      <main className="px-5 py-6">
        <div className="space-y-4">
          {DISPATCHES.map((dispatch, index) => {
            const isComplete = isArticleComplete(dispatch.id);
            const hasStampCollected = hasStamp(dispatch.id);

            return (
              <Link
                key={dispatch.id}
                to={`/dispatches/${dispatch.id}`}
                className={`
                  block bg-white rounded-2xl overflow-hidden shadow-card
                  hover:shadow-card-hover transition-all hover:-translate-y-1
                  ${isComplete ? 'ring-2 ring-asa-green ring-offset-2' : ''}
                `}
              >
                <div className="flex">
                  {/* Left color bar with emoji */}
                  <div className={`w-20 bg-gradient-to-b ${dispatch.color} flex flex-col items-center justify-center py-4`}>
                    <span className="text-4xl">{dispatch.emoji}</span>
                    {hasStampCollected && (
                      <div className="mt-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <span className="text-sm">✓</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{dispatch.countryFlag}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full status-badge--${dispatch.status.toLowerCase()}`}>
                            {dispatch.status}
                          </span>
                          {isComplete && (
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-asa-green text-white">
                              ✓ Read
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-lg text-ink">{dispatch.species}</h3>
                        <p className="text-xs text-asa-grey-light">with {dispatch.researcher}</p>
                      </div>
                      <span className="text-xs text-asa-grey-light bg-paper px-2 py-1 rounded-full">
                        #{index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-asa-grey mt-2">{dispatch.teaser}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Encouragement message */}
        {completedCount === DISPATCHES.length ? (
          <div className="mt-8 p-6 bg-asa-yellow/20 rounded-3xl text-center">
            <span className="text-5xl">🎉</span>
            <h3 className="font-display text-xl text-ink mt-3">Amazing Explorer!</h3>
            <p className="text-sm text-asa-grey mt-2">
              You've read all the dispatches! Check your passport for your stamps.
            </p>
          </div>
        ) : completedCount > 0 ? (
          <div className="mt-8 p-6 bg-asa-blue/10 rounded-3xl text-center">
            <span className="text-4xl">🐸</span>
            <p className="text-sm text-asa-grey mt-2">
              Keep going! {DISPATCHES.length - completedCount} more adventures await!
            </p>
          </div>
        ) : null}
      </main>
    </div>
  );
}

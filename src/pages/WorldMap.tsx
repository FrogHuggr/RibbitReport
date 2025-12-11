import { Link } from 'react-router-dom';
import { useProgress, useStamps } from '../hooks';

// Map pin data matching the dispatches
const MAP_PINS = [
  { id: 'karina-purple-frog', country: 'India', flag: '🇮🇳', emoji: '🟣', x: 72, y: 45, species: 'Purple Frog' },
  { id: 'luis-glass-frog', country: 'Ecuador', flag: '🇪🇨', emoji: '🪟', x: 24, y: 52, species: 'Glass Frog' },
  { id: 'maria-axolotl', country: 'Mexico', flag: '🇲🇽', emoji: '🦎', x: 18, y: 42, species: 'Axolotl' },
  { id: 'james-poison-dart', country: 'Colombia', flag: '🇨🇴', emoji: '🎯', x: 26, y: 50, species: 'Poison Dart Frog' },
  { id: 'yuki-giant-salamander', country: 'Japan', flag: '🇯🇵', emoji: '🐉', x: 85, y: 38, species: 'Giant Salamander' },
  { id: 'amara-goliath-frog', country: 'Cameroon', flag: '🇨🇲', emoji: '💪', x: 50, y: 52, species: 'Goliath Frog' },
  { id: 'diego-marsupial-frog', country: 'Peru', flag: '🇵🇪', emoji: '🎒', x: 25, y: 56, species: 'Marsupial Frog' },
  { id: 'sophie-fire-salamander', country: 'Germany', flag: '🇩🇪', emoji: '🔥', x: 50, y: 32, species: 'Fire Salamander' },
  { id: 'raj-caecilian', country: 'Sri Lanka', flag: '🇱🇰', emoji: '🐛', x: 74, y: 52, species: 'Caecilian' },
];

export function WorldMap() {
  const { isArticleComplete } = useProgress();
  const { hasStamp } = useStamps();

  const visitedCount = MAP_PINS.filter(p => isArticleComplete(p.id)).length;

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <header className="bg-white sticky top-0 z-40 border-b border-asa-grey/10">
        <div className="px-5 py-4">
          <h1 className="text-2xl font-display text-ink">Explorer's Map</h1>
          <p className="text-sm text-asa-grey-light mt-1">
            {visitedCount} of {MAP_PINS.length} locations discovered
          </p>
        </div>
      </header>

      {/* Map container */}
      <main className="px-5 py-6">
        {/* Simple world map representation */}
        <div className="relative bg-asa-blue/20 rounded-3xl overflow-hidden aspect-[16/10] shadow-lg">
          {/* Background "continents" - simplified shapes */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 60"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Very simplified continent shapes */}
            {/* North America */}
            <ellipse cx="20" cy="30" rx="12" ry="15" fill="#97B3CA" opacity="0.5" />
            {/* South America */}
            <ellipse cx="28" cy="52" rx="6" ry="10" fill="#97B3CA" opacity="0.5" />
            {/* Europe */}
            <ellipse cx="50" cy="28" rx="8" ry="8" fill="#97B3CA" opacity="0.5" />
            {/* Africa */}
            <ellipse cx="52" cy="48" rx="8" ry="12" fill="#97B3CA" opacity="0.5" />
            {/* Asia */}
            <ellipse cx="75" cy="35" rx="15" ry="12" fill="#97B3CA" opacity="0.5" />
            {/* Australia */}
            <ellipse cx="85" cy="55" rx="6" ry="5" fill="#97B3CA" opacity="0.5" />
          </svg>

          {/* Map pins */}
          {MAP_PINS.map((pin) => {
            const isVisited = isArticleComplete(pin.id);
            const hasStampCollected = hasStamp(pin.id);

            return (
              <Link
                key={pin.id}
                to={`/dispatches/${pin.id}`}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              >
                {/* Pulse animation for unvisited */}
                {!isVisited && (
                  <div className="absolute inset-0 w-10 h-10 -m-2 bg-asa-yellow rounded-full animate-ping opacity-30" />
                )}

                {/* Pin */}
                <div
                  className={`
                    relative w-10 h-10 rounded-full flex items-center justify-center text-xl
                    transition-all duration-300 shadow-lg
                    ${isVisited
                      ? 'bg-asa-green scale-100'
                      : 'bg-white hover:scale-125 hover:bg-asa-yellow'
                    }
                    ${hasStampCollected ? 'ring-2 ring-asa-yellow ring-offset-2' : ''}
                  `}
                >
                  {pin.emoji}
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-ink text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                    <p className="font-bold">{pin.flag} {pin.country}</p>
                    <p className="opacity-80">{pin.species}</p>
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-ink" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white rounded-full border-2 border-asa-grey/30" />
            <span className="text-xs text-asa-grey">Undiscovered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-asa-green rounded-full" />
            <span className="text-xs text-asa-grey">Visited</span>
          </div>
        </div>

        {/* Location list */}
        <section className="mt-8">
          <h2 className="text-lg font-display text-ink mb-4">All Locations</h2>
          <div className="grid grid-cols-3 gap-3">
            {MAP_PINS.map((pin) => {
              const isVisited = isArticleComplete(pin.id);

              return (
                <Link
                  key={pin.id}
                  to={`/dispatches/${pin.id}`}
                  className={`
                    p-4 rounded-2xl text-center transition-all
                    ${isVisited
                      ? 'bg-asa-green/10 border-2 border-asa-green'
                      : 'bg-white shadow-card hover:shadow-card-hover'
                    }
                  `}
                >
                  <span className="text-2xl">{pin.flag}</span>
                  <p className="text-xs font-semibold text-ink mt-2">{pin.country}</p>
                  {isVisited && (
                    <span className="text-[10px] text-asa-green font-bold">✓ Visited</span>
                  )}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Encouragement */}
        {visitedCount === MAP_PINS.length ? (
          <div className="mt-8 p-6 bg-asa-yellow/20 rounded-3xl text-center">
            <span className="text-5xl">🌍</span>
            <h3 className="font-display text-xl text-ink mt-3">World Traveler!</h3>
            <p className="text-sm text-asa-grey mt-2">
              You've explored every corner of the amphibian world!
            </p>
          </div>
        ) : (
          <div className="mt-8 p-6 bg-asa-blue/10 rounded-3xl text-center">
            <span className="text-4xl">🧭</span>
            <p className="text-sm text-asa-grey mt-2">
              {MAP_PINS.length - visitedCount} more locations waiting to be discovered!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

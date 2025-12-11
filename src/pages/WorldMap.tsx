import { Link } from 'react-router-dom';
import { useProgress, useStamps } from '../hooks';
import { ASALogo, IconMapPin, IconCheck, IconCompass, IconGlobe } from '../components/ui';

// Map pin data matching the dispatches
const MAP_PINS = [
  { id: 'karina-purple-frog', country: 'India', region: 'Western Ghats', x: 72, y: 45, species: 'Purple Frog', color: 'purple' },
  { id: 'luis-glass-frog', country: 'Ecuador', region: 'Cloud Forests', x: 24, y: 52, species: 'Glass Frog', color: 'emerald' },
  { id: 'maria-axolotl', country: 'Mexico', region: 'Lake Xochimilco', x: 18, y: 42, species: 'Axolotl', color: 'pink' },
  { id: 'james-poison-dart', country: 'Colombia', region: 'Chocó', x: 26, y: 50, species: 'Poison Dart Frog', color: 'blue' },
  { id: 'yuki-giant-salamander', country: 'Japan', region: 'Mountain Streams', x: 85, y: 38, species: 'Giant Salamander', color: 'slate' },
  { id: 'amara-goliath-frog', country: 'Cameroon', region: 'Coastal Rivers', x: 50, y: 52, species: 'Goliath Frog', color: 'amber' },
  { id: 'diego-marsupial-frog', country: 'Peru', region: 'Andes', x: 25, y: 56, species: 'Marsupial Frog', color: 'lime' },
  { id: 'sophie-fire-salamander', country: 'Germany', region: 'Black Forest', x: 50, y: 32, species: 'Fire Salamander', color: 'yellow' },
  { id: 'raj-caecilian', country: 'Sri Lanka', region: 'Tropical Lowlands', x: 74, y: 52, species: 'Caecilian', color: 'stone' },
];

// Generate travel path between visited locations
function generateTravelPath(visitedPins: typeof MAP_PINS) {
  if (visitedPins.length < 2) return '';

  // Sort by x position for a logical travel path
  const sorted = [...visitedPins].sort((a, b) => a.x - b.x);

  let path = `M ${sorted[0].x} ${sorted[0].y}`;
  for (let i = 1; i < sorted.length; i++) {
    path += ` L ${sorted[i].x} ${sorted[i].y}`;
  }
  return path;
}

export function WorldMap() {
  const { isArticleComplete } = useProgress();
  const { hasStamp } = useStamps();

  const visitedCount = MAP_PINS.filter(p => isArticleComplete(p.id)).length;
  const visitedPins = MAP_PINS.filter(p => isArticleComplete(p.id));
  const travelPath = generateTravelPath(visitedPins);

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#2C1810' }}>
      {/* Header - Adventure style */}
      <header className="relative overflow-hidden" style={{ backgroundColor: '#3D2317' }}>
        {/* Worn paper texture overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative px-5 pt-12 pb-6">
          <div className="flex items-center gap-3 mb-3">
            <ASALogo variant="icon" className="w-8 h-8" color="white" />
            <span className="text-amber-200/40 text-sm">|</span>
            <span className="text-amber-200/80 text-sm font-medium tracking-wider uppercase">Field Research Division</span>
          </div>
          <h1 className="text-3xl font-display text-amber-100" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Explorer's Map
          </h1>
          <p className="text-amber-200/60 mt-2 text-sm italic">
            "X marks the spot... of amphibian discovery"
          </p>
        </div>
      </header>

      {/* Expedition Stats bar */}
      <div className="px-5 py-4 border-b" style={{ backgroundColor: '#3D2317', borderColor: '#5D3A2A' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconCompass size={18} className="text-amber-400" />
            <span className="text-sm font-semibold text-amber-100">
              {visitedCount} of {MAP_PINS.length} expeditions complete
            </span>
          </div>
          <div className="flex items-center gap-1">
            {MAP_PINS.map((pin) => (
              <div
                key={pin.id}
                className={`w-2 h-2 rounded-full ${
                  isArticleComplete(pin.id) ? 'bg-amber-400' : 'bg-amber-900/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Map container - Indiana Jones style */}
      <main className="px-4 py-6">
        {/* The Ancient Map */}
        <div
          className="relative rounded-lg overflow-hidden shadow-2xl"
          style={{
            aspectRatio: '16/11',
            background: 'linear-gradient(135deg, #D4B896 0%, #C4A882 25%, #B89B6A 50%, #C9A870 75%, #D4B896 100%)',
            boxShadow: 'inset 0 0 100px rgba(139, 90, 43, 0.4), 0 10px 40px rgba(0,0,0,0.5)',
          }}
        >
          {/* Aged paper texture */}
          <div
            className="absolute inset-0 opacity-30 mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' result='noise'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%23D4B896' surfaceScale='2'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Coffee stain marks for authenticity */}
          <div
            className="absolute w-24 h-24 rounded-full opacity-10"
            style={{
              top: '10%',
              right: '5%',
              background: 'radial-gradient(ellipse, #8B5A2B 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute w-16 h-16 rounded-full opacity-8"
            style={{
              bottom: '15%',
              left: '10%',
              background: 'radial-gradient(ellipse, #8B5A2B 0%, transparent 70%)',
            }}
          />

          {/* Burn marks on edges */}
          <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-amber-900/30 to-transparent rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-amber-900/20 to-transparent rounded-tl-full" />

          {/* SVG Map */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 65"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Compass Rose - top right */}
            <g transform="translate(88, 8)">
              <circle cx="0" cy="0" r="6" fill="none" stroke="#5D3A2A" strokeWidth="0.3" opacity="0.6" />
              <circle cx="0" cy="0" r="4" fill="none" stroke="#5D3A2A" strokeWidth="0.2" opacity="0.4" />
              {/* N S E W points */}
              <path d="M0,-5 L0.8,-1 L0,0 L-0.8,-1 Z" fill="#8B4513" opacity="0.8" /> {/* North arrow */}
              <path d="M0,5 L0.6,1 L0,0 L-0.6,1 Z" fill="#5D3A2A" opacity="0.5" /> {/* South */}
              <path d="M5,0 L1,0.6 L0,0 L1,-0.6 Z" fill="#5D3A2A" opacity="0.5" /> {/* East */}
              <path d="M-5,0 L-1,0.6 L0,0 L-1,-0.6 Z" fill="#5D3A2A" opacity="0.5" /> {/* West */}
              <text x="0" y="-6.5" textAnchor="middle" fontSize="1.5" fill="#5D3A2A" fontWeight="bold">N</text>
            </g>

            {/* Hand-drawn style continents */}
            {/* North America */}
            <path
              d="M8,20 Q12,15 20,18 Q28,20 30,28 Q28,38 22,42 Q18,44 12,40 Q6,35 8,25 Z"
              fill="#A08060"
              stroke="#7D5A3C"
              strokeWidth="0.5"
              opacity="0.7"
            />
            {/* South America */}
            <path
              d="M22,48 Q28,46 30,52 Q32,60 28,65 Q24,68 22,62 Q20,55 22,48 Z"
              fill="#A08060"
              stroke="#7D5A3C"
              strokeWidth="0.5"
              opacity="0.7"
            />
            {/* Europe */}
            <path
              d="M44,22 Q52,20 56,24 Q58,28 54,32 Q48,34 44,30 Q42,26 44,22 Z"
              fill="#A08060"
              stroke="#7D5A3C"
              strokeWidth="0.5"
              opacity="0.7"
            />
            {/* Africa */}
            <path
              d="M44,38 Q52,36 58,42 Q62,52 56,62 Q48,66 44,58 Q40,48 44,38 Z"
              fill="#A08060"
              stroke="#7D5A3C"
              strokeWidth="0.5"
              opacity="0.7"
            />
            {/* Asia */}
            <path
              d="M58,20 Q72,16 85,22 Q92,30 88,42 Q80,48 70,46 Q62,42 60,34 Q58,26 58,20 Z"
              fill="#A08060"
              stroke="#7D5A3C"
              strokeWidth="0.5"
              opacity="0.7"
            />
            {/* Australia */}
            <path
              d="M78,52 Q86,50 90,54 Q92,60 88,62 Q82,64 78,58 Q76,54 78,52 Z"
              fill="#A08060"
              stroke="#7D5A3C"
              strokeWidth="0.5"
              opacity="0.7"
            />

            {/* Dotted travel path between visited locations */}
            {travelPath && (
              <path
                d={travelPath}
                fill="none"
                stroke="#8B0000"
                strokeWidth="0.4"
                strokeDasharray="1,1"
                opacity="0.7"
              />
            )}

            {/* "Here be dragons" style sea monsters decorations */}
            <text x="5" y="58" fontSize="2" fill="#7D5A3C" opacity="0.3" fontStyle="italic">~ ~ ~</text>
            <text x="92" y="45" fontSize="2" fill="#7D5A3C" opacity="0.3" fontStyle="italic">~ ~</text>
          </svg>

          {/* Map pins - Treasure map style */}
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
                {/* Glowing pulse for unvisited */}
                {!isVisited && (
                  <div
                    className="absolute inset-0 w-10 h-10 -m-2 rounded-full animate-ping"
                    style={{ backgroundColor: 'rgba(212, 175, 55, 0.3)' }}
                  />
                )}

                {/* The pin marker */}
                <div
                  className={`
                    relative flex items-center justify-center transition-all duration-300
                    ${isVisited ? 'scale-100' : 'hover:scale-125'}
                  `}
                >
                  {isVisited ? (
                    // Red X mark for visited - treasure found!
                    <div className="relative">
                      <svg width="24" height="24" viewBox="0 0 24 24" className="drop-shadow-lg">
                        <path
                          d="M4,4 L20,20 M20,4 L4,20"
                          stroke="#8B0000"
                          strokeWidth="4"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </svg>
                      {hasStampCollected && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border border-amber-600" />
                      )}
                    </div>
                  ) : (
                    // Mysterious marker for unvisited
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-lg"
                      style={{
                        backgroundColor: '#F5DEB3',
                        borderColor: '#8B4513',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                      }}
                    >
                      <span className="text-amber-900 font-bold text-sm">?</span>
                    </div>
                  )}
                </div>

                {/* Tooltip - Parchment style */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div
                    className="text-xs px-3 py-2 rounded shadow-lg whitespace-nowrap"
                    style={{
                      backgroundColor: '#F5DEB3',
                      color: '#3D2317',
                      border: '1px solid #8B4513',
                      boxShadow: '2px 2px 8px rgba(0,0,0,0.3)'
                    }}
                  >
                    <p className="font-bold">{pin.country}</p>
                    <p className="opacity-70 text-[10px]">{pin.species}</p>
                  </div>
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent"
                    style={{ borderTopColor: '#8B4513' }}
                  />
                </div>
              </Link>
            );
          })}

          {/* Map title cartouche */}
          <div
            className="absolute bottom-3 left-3 px-3 py-1.5 rounded"
            style={{
              backgroundColor: 'rgba(245, 222, 179, 0.9)',
              border: '2px solid #8B4513',
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#5D3A2A' }}>
              Amphibian Research Expeditions
            </p>
          </div>
        </div>

        {/* Legend - Old scroll style */}
        <div
          className="mt-4 p-4 rounded-lg"
          style={{
            backgroundColor: '#F5DEB3',
            border: '2px solid #8B4513',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}
        >
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#5D3A2A' }}>
            Map Legend
          </p>
          <div className="flex items-center justify-around">
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold"
                style={{ backgroundColor: '#F5DEB3', borderColor: '#8B4513', color: '#8B4513' }}
              >
                ?
              </div>
              <span className="text-xs" style={{ color: '#5D3A2A' }}>Undiscovered</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M4,4 L20,20 M20,4 L4,20" stroke="#8B0000" strokeWidth="4" strokeLinecap="round" fill="none" />
              </svg>
              <span className="text-xs" style={{ color: '#5D3A2A' }}>Expedition Complete</span>
            </div>
          </div>
        </div>

        {/* Location list - Field journal style */}
        <section className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-px" style={{ backgroundColor: '#5D3A2A' }} />
            <h2 className="text-lg font-display text-amber-100 px-3">Field Journal</h2>
            <div className="flex-1 h-px" style={{ backgroundColor: '#5D3A2A' }} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {MAP_PINS.map((pin) => {
              const isVisited = isArticleComplete(pin.id);

              return (
                <Link
                  key={pin.id}
                  to={`/dispatches/${pin.id}`}
                  className="p-3 rounded-lg text-center transition-all"
                  style={{
                    backgroundColor: isVisited ? 'rgba(212, 175, 55, 0.2)' : 'rgba(93, 58, 42, 0.5)',
                    border: isVisited ? '2px solid #D4AF37' : '1px solid #5D3A2A',
                  }}
                >
                  <div
                    className="w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2"
                    style={{
                      backgroundColor: isVisited ? '#D4AF37' : '#3D2317',
                    }}
                  >
                    {isVisited ? (
                      <IconCheck size={14} className="text-amber-900" />
                    ) : (
                      <IconMapPin size={14} className="text-amber-200/50" />
                    )}
                  </div>
                  <p className="text-xs font-semibold text-amber-100">{pin.country}</p>
                  <p className="text-[10px] text-amber-200/60 mt-0.5">{pin.region}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Encouragement - Adventure style */}
        {visitedCount === MAP_PINS.length ? (
          <div
            className="mt-8 rounded-lg p-6 text-center"
            style={{
              backgroundColor: 'rgba(212, 175, 55, 0.2)',
              border: '2px solid #D4AF37',
            }}
          >
            <div
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: '#D4AF37' }}
            >
              <IconGlobe size={32} className="text-amber-900" />
            </div>
            <h3 className="font-display text-xl text-amber-100">Legendary Explorer!</h3>
            <p className="text-sm text-amber-200/80 mt-2 italic">
              "You've charted every corner of the amphibian world. Your name shall be remembered!"
            </p>
          </div>
        ) : (
          <div
            className="mt-8 rounded-lg p-6 text-center"
            style={{ backgroundColor: 'rgba(93, 58, 42, 0.5)' }}
          >
            <div className="w-12 h-12 mx-auto bg-amber-900/50 rounded-full flex items-center justify-center mb-3">
              <IconCompass size={24} className="text-amber-400" />
            </div>
            <p className="text-sm text-amber-200/80 italic">
              "{MAP_PINS.length - visitedCount} more expeditions await, brave explorer..."
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

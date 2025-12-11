import { Link } from 'react-router-dom';
import { useProgress, useStamps } from '../hooks';
import { ASALogo, IconCheck, IconChevronRight, IconMapPin, IconStatusDot, IconFrog, IconParty } from '../components/ui';

// Placeholder data for 9 dispatches - will be replaced with your actual content
const DISPATCHES = [
  {
    id: 'karina-purple-frog',
    researcher: 'Dr. Karina Patel',
    species: 'Purple Frog',
    country: 'India',
    countryCode: 'IN',
    region: 'Western Ghats',
    status: 'EN',
    statusLabel: 'Endangered',
    teaser: 'Meet a frog that spends most of its life underground!',
    stampColor: '#7B2D8E',
    date: 'March 15, 2024',
  },
  {
    id: 'luis-glass-frog',
    researcher: 'Luis Coloma',
    species: 'Glass Frog',
    country: 'Ecuador',
    countryCode: 'EC',
    region: 'Cloud Forests',
    status: 'LC',
    statusLabel: 'Least Concern',
    teaser: 'Discover a frog you can see right through!',
    stampColor: '#10B981',
    date: 'February 28, 2024',
  },
  {
    id: 'maria-axolotl',
    researcher: 'Dr. María García',
    species: 'Axolotl',
    country: 'Mexico',
    countryCode: 'MX',
    region: 'Lake Xochimilco',
    status: 'CR',
    statusLabel: 'Critically Endangered',
    teaser: 'The salamander that never grows up!',
    stampColor: '#EC4899',
    date: 'April 2, 2024',
  },
  {
    id: 'james-poison-dart',
    researcher: 'Dr. James Morton',
    species: 'Poison Dart Frog',
    country: 'Colombia',
    countryCode: 'CO',
    region: 'Chocó Rainforest',
    status: 'VU',
    statusLabel: 'Vulnerable',
    teaser: 'Tiny, colorful, and incredibly toxic!',
    stampColor: '#3B82F6',
    date: 'January 10, 2024',
  },
  {
    id: 'yuki-giant-salamander',
    researcher: 'Dr. Yuki Tanaka',
    species: 'Giant Salamander',
    country: 'Japan',
    countryCode: 'JP',
    region: 'Mountain Streams',
    status: 'NT',
    statusLabel: 'Near Threatened',
    teaser: 'Meet the world\'s largest amphibian!',
    stampColor: '#64748B',
    date: 'March 22, 2024',
  },
  {
    id: 'amara-goliath-frog',
    researcher: 'Dr. Amara Ndiaye',
    species: 'Goliath Frog',
    country: 'Cameroon',
    countryCode: 'CM',
    region: 'Coastal Rivers',
    status: 'EN',
    statusLabel: 'Endangered',
    teaser: 'A frog as big as a house cat!',
    stampColor: '#F59E0B',
    date: 'February 5, 2024',
  },
  {
    id: 'diego-marsupial-frog',
    researcher: 'Diego Almeida',
    species: 'Marsupial Frog',
    country: 'Peru',
    countryCode: 'PE',
    region: 'Andes Mountains',
    status: 'VU',
    statusLabel: 'Vulnerable',
    teaser: 'This mom carries babies in a pouch on her back!',
    stampColor: '#84CC16',
    date: 'April 18, 2024',
  },
  {
    id: 'sophie-fire-salamander',
    researcher: 'Dr. Sophie Weber',
    species: 'Fire Salamander',
    country: 'Germany',
    countryCode: 'DE',
    region: 'Black Forest',
    status: 'LC',
    statusLabel: 'Least Concern',
    teaser: 'Ancient legend meets modern science!',
    stampColor: '#EAB308',
    date: 'March 8, 2024',
  },
  {
    id: 'raj-caecilian',
    researcher: 'Dr. Raj Sharma',
    species: 'Caecilian',
    country: 'Sri Lanka',
    countryCode: 'LK',
    region: 'Tropical Lowlands',
    status: 'DD',
    statusLabel: 'Data Deficient',
    teaser: 'Is it a worm? Is it a snake? It\'s an amphibian!',
    stampColor: '#78716C',
    date: 'January 25, 2024',
  },
];

// Postage stamp component
function PostageStamp({ countryCode, color, collected }: { countryCode: string; color: string; collected: boolean }) {
  return (
    <div className="relative">
      <svg width="60" height="72" viewBox="0 0 60 72" className="drop-shadow-md">
        <defs>
          <clipPath id={`stamp-edge-${countryCode}`}>
            <path d="
              M 4 0
              Q 6 2, 8 0 Q 10 2, 12 0 Q 14 2, 16 0 Q 18 2, 20 0 Q 22 2, 24 0
              Q 26 2, 28 0 Q 30 2, 32 0 Q 34 2, 36 0 Q 38 2, 40 0 Q 42 2, 44 0
              Q 46 2, 48 0 Q 50 2, 52 0 Q 54 2, 56 0
              L 60 0 L 60 4
              Q 58 6, 60 8 Q 58 10, 60 12 Q 58 14, 60 16 Q 58 18, 60 20
              Q 58 22, 60 24 Q 58 26, 60 28 Q 58 30, 60 32 Q 58 34, 60 36
              Q 58 38, 60 40 Q 58 42, 60 44 Q 58 46, 60 48 Q 58 50, 60 52
              Q 58 54, 60 56 Q 58 58, 60 60 Q 58 62, 60 64 Q 58 66, 60 68
              L 60 72
              L 56 72
              Q 54 70, 52 72 Q 50 70, 48 72 Q 46 70, 44 72 Q 42 70, 40 72
              Q 38 70, 36 72 Q 34 70, 32 72 Q 30 70, 28 72 Q 26 70, 24 72
              Q 22 70, 20 72 Q 18 70, 16 72 Q 14 70, 12 72 Q 10 70, 8 72
              Q 6 70, 4 72
              L 0 72 L 0 68
              Q 2 66, 0 64 Q 2 62, 0 60 Q 2 58, 0 56 Q 2 54, 0 52
              Q 2 50, 0 48 Q 2 46, 0 44 Q 2 42, 0 40 Q 2 38, 0 36
              Q 2 34, 0 32 Q 2 30, 0 28 Q 2 26, 0 24 Q 2 22, 0 20
              Q 2 18, 0 16 Q 2 14, 0 12 Q 2 10, 0 8 Q 2 6, 0 4
              L 0 0 Z
            " />
          </clipPath>
        </defs>

        {/* Stamp background */}
        <rect
          x="0" y="0" width="60" height="72"
          fill={collected ? color : '#E5E7EB'}
          clipPath={`url(#stamp-edge-${countryCode})`}
        />

        {/* Inner border */}
        <rect
          x="4" y="4" width="52" height="64"
          fill="none"
          stroke={collected ? 'rgba(255,255,255,0.4)' : '#D1D5DB'}
          strokeWidth="1"
          rx="1"
        />

        {/* Country code */}
        <text
          x="30" y="28"
          textAnchor="middle"
          fill={collected ? 'white' : '#9CA3AF'}
          fontSize="14"
          fontWeight="bold"
          fontFamily="serif"
        >
          {countryCode}
        </text>

        {/* Frog icon */}
        <g transform="translate(22, 34)">
          <path
            d="M8 0C5 0 3 2 3 4C1 4 0 5 0 7C0 9 2 10 4 10C4 12 6 14 8 14C10 14 12 12 12 10C14 10 16 9 16 7C16 5 15 4 13 4C13 2 11 0 8 0Z"
            fill={collected ? 'rgba(255,255,255,0.9)' : '#D1D5DB'}
          />
        </g>

        {/* Denomination */}
        <text
          x="30" y="62"
          textAnchor="middle"
          fill={collected ? 'rgba(255,255,255,0.8)' : '#9CA3AF'}
          fontSize="8"
          fontFamily="serif"
        >
          FIELD POST
        </text>

        {/* Postmark overlay when collected */}
        {collected && (
          <g opacity="0.6">
            <circle cx="45" cy="15" r="12" fill="none" stroke="#1F2937" strokeWidth="2" />
            <line x1="33" y1="15" x2="57" y2="15" stroke="#1F2937" strokeWidth="1" />
            <line x1="33" y1="11" x2="57" y2="11" stroke="#1F2937" strokeWidth="0.5" />
            <line x1="33" y1="19" x2="57" y2="19" stroke="#1F2937" strokeWidth="0.5" />
          </g>
        )}
      </svg>
    </div>
  );
}

// Airmail stripe pattern
function AirmailStripes() {
  return (
    <div className="flex">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="flex">
          <div className="w-3 h-2 bg-[#C41E3A]" />
          <div className="w-3 h-2 bg-[#1E4B8E]" />
        </div>
      ))}
    </div>
  );
}

export function Dispatches() {
  const { isArticleComplete } = useProgress();
  const { hasStamp } = useStamps();

  const completedCount = DISPATCHES.filter(d => isArticleComplete(d.id)).length;

  return (
    <div className="min-h-screen pb-24" style={{
      background: 'linear-gradient(180deg, #2C1810 0%, #3D2317 100%)',
    }}>
      {/* Header - Field Station style */}
      <header className="relative overflow-hidden">
        {/* Leather texture background */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, #2C1810 0%, #3D2317 50%, #2C1810 100%)',
        }}>
          {/* Stitching pattern */}
          <div className="absolute top-0 left-0 right-0 h-1 flex justify-center">
            <div className="w-full max-w-md flex items-center justify-between px-8">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-2 h-0.5 bg-amber-700/30" />
              ))}
            </div>
          </div>
        </div>

        <div className="relative px-5 pt-12 pb-6">
          <div className="flex items-center gap-3 mb-4">
            {/* Wax seal */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
              background: 'radial-gradient(circle at 30% 30%, #C41E3A 0%, #8B0000 100%)',
              boxShadow: '0 3px 10px rgba(0,0,0,0.5), inset 0 1px 5px rgba(255,255,255,0.2)',
            }}>
              <ASALogo variant="icon" className="w-5 h-5" color="white" />
            </div>
            <div>
              <p className="text-amber-400/60 text-xs tracking-[0.2em] uppercase">Amphibian Survival Alliance</p>
              <p className="text-amber-200/40 text-xs">Research Division • Field Communications</p>
            </div>
          </div>

          <h1 className="text-3xl text-amber-100 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            Field Dispatches
          </h1>
          <p className="text-amber-200/50 mt-2 text-sm italic">
            Correspondence from researchers stationed across the globe
          </p>
        </div>
      </header>

      {/* Progress - Expedition tracking */}
      <div className="mx-5 -mt-1 relative z-10">
        <div className="bg-amber-50 rounded-lg p-4 shadow-lg" style={{
          background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}>
          {/* Typewriter header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-amber-800/60 uppercase tracking-wider" style={{ fontFamily: 'Courier, monospace' }}>
                EXPEDITION LOG
              </p>
              <p className="text-lg font-bold text-amber-900" style={{ fontFamily: 'Courier, monospace' }}>
                {completedCount} OF {DISPATCHES.length} RECEIVED
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-amber-700" style={{ fontFamily: 'Courier, monospace' }}>
                {Math.round((completedCount / DISPATCHES.length) * 100)}%
              </span>
            </div>
          </div>

          {/* Progress bar styled as telegram tape */}
          <div className="h-3 bg-amber-200 rounded-full overflow-hidden border border-amber-400">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(completedCount / DISPATCHES.length) * 100}%`,
                background: 'repeating-linear-gradient(90deg, #7AC143 0px, #7AC143 10px, #5A9A2F 10px, #5A9A2F 20px)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Dispatch cards - Airmail envelope style */}
      <main className="px-5 py-6">
        <div className="space-y-5">
          {DISPATCHES.map((dispatch, index) => {
            const isComplete = isArticleComplete(dispatch.id);
            const hasStampCollected = hasStamp(dispatch.id);

            return (
              <Link
                key={dispatch.id}
                to={`/dispatches/${dispatch.id}`}
                className="block group"
              >
                {/* Envelope card */}
                <div
                  className={`
                    relative rounded-lg overflow-hidden transition-all duration-300
                    hover:-translate-y-1 hover:shadow-2xl
                    ${isComplete ? 'ring-2 ring-asa-green ring-offset-2 ring-offset-[#3D2317]' : ''}
                  `}
                  style={{
                    background: 'linear-gradient(135deg, #FFFEF7 0%, #FBF8F1 50%, #F5F0E6 100%)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 0 30px rgba(139, 90, 43, 0.05)',
                  }}
                >
                  {/* Airmail stripes top */}
                  <AirmailStripes />

                  {/* Card content */}
                  <div className="p-4 pt-3">
                    {/* Top row: From address and stamp */}
                    <div className="flex justify-between items-start mb-3">
                      {/* From address */}
                      <div className="flex-1">
                        <p className="text-[10px] text-stone-400 uppercase tracking-wider mb-1">
                          Dispatch #{String(index + 1).padStart(2, '0')}
                        </p>
                        <p className="text-xs text-stone-500 italic" style={{ fontFamily: 'Georgia, serif' }}>
                          From the field:
                        </p>
                        <p className="text-sm font-semibold text-stone-800" style={{ fontFamily: 'Georgia, serif' }}>
                          {dispatch.researcher}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <IconMapPin size={10} className="text-stone-400" />
                          <p className="text-xs text-stone-500">
                            {dispatch.region}, {dispatch.country}
                          </p>
                        </div>
                      </div>

                      {/* Postage stamp */}
                      <PostageStamp
                        countryCode={dispatch.countryCode}
                        color={dispatch.stampColor}
                        collected={hasStampCollected}
                      />
                    </div>

                    {/* Divider line - like envelope fold */}
                    <div className="border-t border-dashed border-stone-300 my-3" />

                    {/* Main content area */}
                    <div>
                      {/* Subject line */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] text-stone-400 uppercase">RE:</span>
                        <h3 className="text-lg font-bold text-stone-800 group-hover:text-asa-green transition-colors"
                            style={{ fontFamily: 'Georgia, serif' }}>
                          {dispatch.species}
                        </h3>
                      </div>

                      {/* Status badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1.5 bg-stone-100 px-2 py-1 rounded">
                          <IconStatusDot status={dispatch.status} />
                          <span className="text-xs font-medium text-stone-600">{dispatch.statusLabel}</span>
                        </div>
                        <span className="text-xs text-stone-400">• {dispatch.date}</span>
                      </div>

                      {/* Teaser - typewriter style */}
                      <p className="text-sm text-stone-600 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                        "{dispatch.teaser}"
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-stone-200">
                      {isComplete ? (
                        <div className="flex items-center gap-2 text-asa-green">
                          <div className="w-5 h-5 bg-asa-green rounded-full flex items-center justify-center">
                            <IconCheck size={12} className="text-white" />
                          </div>
                          <span className="text-sm font-semibold" style={{ fontFamily: 'Courier, monospace' }}>
                            READ & FILED
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm font-semibold text-asa-green" style={{ fontFamily: 'Courier, monospace' }}>
                          OPEN DISPATCH
                        </span>
                      )}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isComplete
                          ? 'bg-asa-green/10 text-asa-green'
                          : 'bg-stone-100 text-stone-400 group-hover:bg-asa-green group-hover:text-white'
                      }`}>
                        <IconChevronRight size={18} />
                      </div>
                    </div>
                  </div>

                  {/* Airmail stripes bottom */}
                  <AirmailStripes />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Completion messages */}
        {completedCount === DISPATCHES.length ? (
          <div className="mt-8 rounded-lg p-6 text-center" style={{
            background: 'linear-gradient(135deg, #FEF3C7 0%, #D4AF37 100%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 2px 10px rgba(255,255,255,0.3)',
          }}>
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{
              background: 'radial-gradient(circle at 30% 30%, #7AC143 0%, #5A9A2F 100%)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            }}>
              <IconParty size={32} className="text-white" />
            </div>
            <h3 className="text-xl text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
              All Dispatches Received!
            </h3>
            <p className="text-sm text-amber-800/70 mt-2" style={{ fontFamily: 'Georgia, serif' }}>
              Outstanding work, Explorer! Your correspondence is complete.
            </p>
            <Link
              to="/passport"
              className="inline-flex items-center gap-2 mt-4 bg-amber-900 text-amber-100 px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-amber-800 transition-colors"
            >
              View your stamps
              <IconChevronRight size={16} />
            </Link>
          </div>
        ) : completedCount > 0 ? (
          <div className="mt-8 rounded-lg p-6 text-center" style={{
            background: 'linear-gradient(135deg, #FFFEF7 0%, #FBF8F1 100%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}>
            <div className="w-12 h-12 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-3">
              <IconFrog size={24} className="text-amber-600" />
            </div>
            <p className="text-sm text-stone-600" style={{ fontFamily: 'Georgia, serif' }}>
              Excellent progress, Explorer!<br />
              <span className="font-semibold text-stone-800">{DISPATCHES.length - completedCount}</span> more dispatches await your attention.
            </p>
          </div>
        ) : null}
      </main>
    </div>
  );
}

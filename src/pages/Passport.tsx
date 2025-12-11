import { Link } from 'react-router-dom';
import { useStamps, useProgress, useAnalytics } from '../hooks';
import { ASALogo, IconStar, IconTrophy, IconTarget, IconGlobe, IconLightbulb, IconLock, IconCheck, IconChevronRight, IconFrog } from '../components/ui';

// Stamp data for each country
const STAMP_DATA: Record<string, { country: string; species: string; color: string }> = {
  'karina-purple-frog': { country: 'India', species: 'Purple Frog', color: '#9333EA' },
  'luis-glass-frog': { country: 'Ecuador', species: 'Glass Frog', color: '#10B981' },
  'maria-axolotl': { country: 'Mexico', species: 'Axolotl', color: '#EC4899' },
  'james-poison-dart': { country: 'Colombia', species: 'Poison Dart', color: '#3B82F6' },
  'yuki-giant-salamander': { country: 'Japan', species: 'Giant Salamander', color: '#64748B' },
  'amara-goliath-frog': { country: 'Cameroon', species: 'Goliath Frog', color: '#F59E0B' },
  'diego-marsupial-frog': { country: 'Peru', species: 'Marsupial Frog', color: '#84CC16' },
  'sophie-fire-salamander': { country: 'Germany', species: 'Fire Salamander', color: '#EAB308' },
  'raj-caecilian': { country: 'Sri Lanka', species: 'Caecilian', color: '#78716C' },
};

// Achievement definitions
const ACHIEVEMENTS = [
  {
    id: 'first-explorer',
    title: 'First Explorer',
    description: 'Read your first dispatch',
    icon: IconStar,
    requirement: (stats: { articlesRead: number }) => stats.articlesRead >= 1,
  },
  {
    id: 'stamp-collector',
    title: 'Stamp Collector',
    description: 'Collect 3 stamps',
    icon: IconFrog,
    requirement: (stats: { stamps: number }) => stats.stamps >= 3,
  },
  {
    id: 'globe-trotter',
    title: 'Globe Trotter',
    description: 'Visit 5 countries',
    icon: IconGlobe,
    requirement: (stats: { stamps: number }) => stats.stamps >= 5,
  },
  {
    id: 'myth-buster',
    title: 'Myth Buster',
    description: 'Learn about frogs vs toads',
    icon: IconLightbulb,
    requirement: () => false,
  },
  {
    id: 'completionist',
    title: 'Completionist',
    description: 'Read all 9 dispatches',
    icon: IconTrophy,
    requirement: (stats: { articlesRead: number }) => stats.articlesRead >= 9,
  },
  {
    id: 'super-fan',
    title: 'Amphibian Super Fan',
    description: 'Collect all stamps',
    icon: IconTarget,
    requirement: (stats: { stamps: number }) => stats.stamps >= 9,
  },
];

// Vintage passport stamp component
function PassportStamp({ id, collected }: { id: string; collected: boolean }) {
  const data = STAMP_DATA[id];
  if (!data) return null;

  const rotation = Math.random() * 20 - 10; // Random rotation for authentic look

  if (!collected) {
    return (
      <div
        className="aspect-square rounded-lg flex items-center justify-center border-2 border-dashed"
        style={{ borderColor: '#5D3A2A', opacity: 0.3 }}
      >
        <span className="text-2xl font-bold" style={{ color: '#5D3A2A' }}>?</span>
      </div>
    );
  }

  return (
    <div
      className="aspect-square relative"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Outer stamp border */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Wavy/serrated stamp edge */}
        <defs>
          <clipPath id={`stamp-${id}`}>
            <path d="M10,5 Q15,10 20,5 Q25,10 30,5 Q35,10 40,5 Q45,10 50,5 Q55,10 60,5 Q65,10 70,5 Q75,10 80,5 Q85,10 90,5 L95,10 Q90,15 95,20 Q90,25 95,30 Q90,35 95,40 Q90,45 95,50 Q90,55 95,60 Q90,65 95,70 Q90,75 95,80 Q90,85 95,90 L90,95 Q85,90 80,95 Q75,90 70,95 Q65,90 60,95 Q55,90 50,95 Q45,90 40,95 Q35,90 30,95 Q25,90 20,95 Q15,90 10,95 L5,90 Q10,85 5,80 Q10,75 5,70 Q10,65 5,60 Q10,55 5,50 Q10,45 5,40 Q10,35 5,30 Q10,25 5,20 Q10,15 5,10 Z" />
          </clipPath>
        </defs>

        {/* Stamp background */}
        <rect
          x="5" y="5" width="90" height="90"
          fill={data.color}
          clipPath={`url(#stamp-${id})`}
          opacity="0.9"
        />

        {/* Inner circle */}
        <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="2" opacity="0.8" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />

        {/* Country name curved on top */}
        <defs>
          <path id={`curve-top-${id}`} d="M 15,50 A 35,35 0 0,1 85,50" fill="none" />
          <path id={`curve-bottom-${id}`} d="M 85,55 A 35,35 0 0,1 15,55" fill="none" />
        </defs>
        <text fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">
          <textPath href={`#curve-top-${id}`} startOffset="50%">
            {data.country.toUpperCase()}
          </textPath>
        </text>

        {/* Species name curved on bottom */}
        <text fill="white" fontSize="7" textAnchor="middle" opacity="0.9">
          <textPath href={`#curve-bottom-${id}`} startOffset="50%">
            {data.species}
          </textPath>
        </text>

        {/* Center icon - frog silhouette */}
        <g transform="translate(35, 35) scale(0.6)">
          <path
            d="M25,8 C20,8 16,12 16,17 C16,20 18,22 18,22 L14,28 C14,28 12,26 8,26 C4,26 2,30 2,30 L6,32 C6,32 8,30 10,30 C12,30 14,32 16,34 L18,38 C18,38 16,42 18,46 C20,50 25,50 25,50 C25,50 30,50 32,46 C34,42 32,38 32,38 L34,34 C36,32 38,30 40,30 C42,30 44,32 44,32 L48,30 C48,30 46,26 42,26 C38,26 36,28 36,28 L32,22 C32,22 34,20 34,17 C34,12 30,8 25,8 Z M20,14 C22,14 23,16 23,18 C23,20 22,21 20,21 C18,21 17,20 17,18 C17,16 18,14 20,14 Z M30,14 C32,14 33,16 33,18 C33,20 32,21 30,21 C28,21 27,20 27,18 C27,16 28,14 30,14 Z"
            fill="white"
            opacity="0.9"
          />
        </g>

        {/* "VERIFIED" text */}
        <text x="50" y="90" fill="white" fontSize="6" fontWeight="bold" textAnchor="middle" opacity="0.7">
          VERIFIED
        </text>
      </svg>
    </div>
  );
}

export function Passport() {
  const { stamps, totalStamps } = useStamps();
  const { progress } = useProgress();
  const { getStats } = useAnalytics();

  const completedArticles = progress.filter(p => p.completed).length;
  const stats = getStats();
  const collectedStampIds = stamps.map(s => s.id);

  const userStats = {
    articlesRead: completedArticles,
    stamps: totalStamps,
  };

  const earnedAchievements = ACHIEVEMENTS.filter(a => a.requirement(userStats));
  const unearnedAchievements = ACHIEVEMENTS.filter(a => !a.requirement(userStats));

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#2C1810' }}>
      {/* Header - Leather passport cover style */}
      <header
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #5D3A2A 0%, #3D2317 50%, #2C1810 100%)',
        }}
      >
        {/* Leather texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Gold embossed border effect */}
        <div
          className="absolute inset-4 rounded-lg opacity-30"
          style={{
            border: '2px solid #D4AF37',
            boxShadow: 'inset 0 0 20px rgba(212, 175, 55, 0.2)',
          }}
        />

        <div className="relative pt-12 pb-8 px-5">
          {/* Wax seal / Official badge */}
          <div className="flex justify-center mb-6">
            <div
              className="relative w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #C41E3A 0%, #8B0000 100%)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.4), inset 0 2px 10px rgba(255,255,255,0.2)',
              }}
            >
              {/* Seal texture */}
              <div className="absolute inset-0 rounded-full opacity-30" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='seal'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.05' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23seal)'/%3E%3C/svg%3E")`,
              }} />
              <ASALogo variant="icon" className="w-10 h-10" color="white" />
            </div>
          </div>

          {/* Title - embossed gold style */}
          <div className="text-center">
            <p
              className="text-xs font-bold uppercase tracking-[0.3em] mb-2"
              style={{ color: '#D4AF37' }}
            >
              Official
            </p>
            <h1
              className="text-3xl font-display"
              style={{
                color: '#D4AF37',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.3)',
              }}
            >
              Explorer's Passport
            </h1>
            <p className="text-amber-200/60 text-sm mt-2 italic">
              Amphibian Survival Alliance
            </p>
          </div>

          {/* Stats row - handwritten style */}
          <div
            className="flex justify-center gap-8 mt-8 pt-6"
            style={{ borderTop: '1px solid rgba(212, 175, 55, 0.3)' }}
          >
            <div className="text-center">
              <p className="text-3xl font-bold" style={{ color: '#D4AF37' }}>{totalStamps}</p>
              <p className="text-xs text-amber-200/60 mt-1 uppercase tracking-wider">Stamps</p>
            </div>
            <div className="w-px" style={{ backgroundColor: 'rgba(212, 175, 55, 0.3)' }} />
            <div className="text-center">
              <p className="text-3xl font-bold" style={{ color: '#D4AF37' }}>{completedArticles}</p>
              <p className="text-xs text-amber-200/60 mt-1 uppercase tracking-wider">Dispatches</p>
            </div>
            <div className="w-px" style={{ backgroundColor: 'rgba(212, 175, 55, 0.3)' }} />
            <div className="text-center">
              <p className="text-3xl font-bold" style={{ color: '#D4AF37' }}>{earnedAchievements.length}</p>
              <p className="text-xs text-amber-200/60 mt-1 uppercase tracking-wider">Badges</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-6">
        {/* Stamps Section - Vintage passport pages */}
        <section
          className="rounded-lg mb-6 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #F5DEB3 0%, #DEB887 50%, #D2B48C 100%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          {/* Page header */}
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{ borderBottom: '2px solid #8B4513' }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg" style={{ color: '#5D3A2A' }}>📜</span>
              <h2 className="font-display text-lg" style={{ color: '#3D2317' }}>Visa Stamps</h2>
            </div>
            <span className="text-sm font-medium" style={{ color: '#8B4513' }}>
              {totalStamps}/9 collected
            </span>
          </div>

          {/* Stamps grid */}
          <div className="p-5">
            {totalStamps === 0 ? (
              <div className="text-center py-8">
                <div
                  className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4"
                  style={{
                    border: '3px dashed #8B4513',
                    opacity: 0.5,
                  }}
                >
                  <IconFrog size={40} className="text-amber-800/50" />
                </div>
                <p className="text-sm" style={{ color: '#5D3A2A' }}>
                  Your passport awaits its first stamp!
                </p>
                <p className="text-xs mt-1" style={{ color: '#8B4513' }}>
                  Complete Field Dispatches to collect stamps
                </p>
                <Link
                  to="/dispatches"
                  className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-full font-semibold text-sm transition-colors"
                  style={{
                    backgroundColor: '#5D3A2A',
                    color: '#F5DEB3',
                  }}
                >
                  Begin Expedition
                  <IconChevronRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {Object.keys(STAMP_DATA).map((id) => (
                  <PassportStamp
                    key={id}
                    id={id}
                    collected={collectedStampIds.includes(id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Aged paper effect footer */}
          <div
            className="px-5 py-3 text-center"
            style={{
              backgroundColor: 'rgba(139, 69, 19, 0.1)',
              borderTop: '1px solid rgba(139, 69, 19, 0.2)',
            }}
          >
            <p className="text-[10px] uppercase tracking-widest" style={{ color: '#8B4513' }}>
              Amphibian Survival Alliance · Conservation Division
            </p>
          </div>
        </section>

        {/* Achievements Section - Expedition Patches */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-px" style={{ backgroundColor: '#5D3A2A' }} />
            <h2 className="text-lg font-display text-amber-100 px-3">Expedition Badges</h2>
            <div className="flex-1 h-px" style={{ backgroundColor: '#5D3A2A' }} />
          </div>

          {/* Earned badges */}
          {earnedAchievements.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#D4AF37' }}>
                Earned ({earnedAchievements.length})
              </p>
              <div className="space-y-3">
                {earnedAchievements.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className="flex items-center gap-4 p-4 rounded-lg"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(139, 69, 19, 0.3) 100%)',
                        border: '2px solid #D4AF37',
                      }}
                    >
                      {/* Badge icon - shield/patch style */}
                      <div
                        className="w-14 h-14 rounded-lg flex items-center justify-center relative"
                        style={{
                          background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        }}
                      >
                        <IconComponent size={28} className="text-amber-900" />
                        {/* Shine effect */}
                        <div
                          className="absolute inset-0 rounded-lg opacity-30"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 50%)',
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-amber-100">{achievement.title}</h4>
                        <p className="text-xs text-amber-200/60">{achievement.description}</p>
                      </div>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#D4AF37' }}
                      >
                        <IconCheck size={16} className="text-amber-900" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Locked badges */}
          {unearnedAchievements.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-3 text-amber-200/40">
                Locked ({unearnedAchievements.length})
              </p>
              <div className="space-y-3">
                {unearnedAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-4 p-4 rounded-lg opacity-50"
                    style={{
                      backgroundColor: 'rgba(93, 58, 42, 0.5)',
                      border: '1px solid #5D3A2A',
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: '#3D2317' }}
                    >
                      <IconLock size={24} className="text-amber-200/30" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-amber-200/60">{achievement.title}</h4>
                      <p className="text-xs text-amber-200/40">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Field Notes - Stats section */}
        <section
          className="rounded-lg p-5 mb-6"
          style={{
            background: 'linear-gradient(135deg, #F5DEB3 0%, #DEB887 100%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span style={{ color: '#5D3A2A' }}>📊</span>
            <h2 className="font-display text-lg" style={{ color: '#3D2317' }}>Field Notes</h2>
          </div>

          {/* Handwritten-style stats */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="p-4 rounded-lg text-center"
              style={{ backgroundColor: 'rgba(139, 69, 19, 0.1)' }}
            >
              <p className="text-2xl font-bold" style={{ color: '#5D3A2A' }}>{stats.articleViews}</p>
              <p className="text-xs" style={{ color: '#8B4513' }}>Articles Viewed</p>
            </div>
            <div
              className="p-4 rounded-lg text-center"
              style={{ backgroundColor: 'rgba(139, 69, 19, 0.1)' }}
            >
              <p className="text-2xl font-bold" style={{ color: '#5D3A2A' }}>{completedArticles}</p>
              <p className="text-xs" style={{ color: '#8B4513' }}>Completed</p>
            </div>
            <div
              className="p-4 rounded-lg text-center"
              style={{ backgroundColor: 'rgba(139, 69, 19, 0.1)' }}
            >
              <p className="text-2xl font-bold" style={{ color: '#5D3A2A' }}>{totalStamps}</p>
              <p className="text-xs" style={{ color: '#8B4513' }}>Countries</p>
            </div>
            <div
              className="p-4 rounded-lg text-center"
              style={{ backgroundColor: 'rgba(139, 69, 19, 0.1)' }}
            >
              <p className="text-2xl font-bold" style={{ color: '#5D3A2A' }}>{earnedAchievements.length}</p>
              <p className="text-xs" style={{ color: '#8B4513' }}>Badges</p>
            </div>
          </div>

          {/* Signature line */}
          <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(139, 69, 19, 0.3)' }}>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider" style={{ color: '#8B4513' }}>
                  Explorer Signature
                </p>
                <div
                  className="w-32 mt-1"
                  style={{ borderBottom: '1px solid #8B4513' }}
                />
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider" style={{ color: '#8B4513' }}>
                  Date Issued
                </p>
                <p className="text-xs font-medium" style={{ color: '#5D3A2A' }}>
                  {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Encouragement */}
        {totalStamps < 9 && (
          <div className="text-center">
            <p className="text-sm text-amber-200/60 italic">
              "The world awaits, brave explorer..."
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

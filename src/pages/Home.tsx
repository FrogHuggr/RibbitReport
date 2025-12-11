import { Link } from 'react-router-dom';
import { useStamps, useProgress } from '../hooks';
import { ASALogo, IconChevronRight, IconGlobe, IconMail, IconLightbulb, IconAward, IconStatusDot, IconCalendar, IconSettings } from '../components/ui';
import { MarshMellow } from '../components/MarshMellow';

// Sample Amphibian of the Day data - will rotate through your 9 species
const AMPHIBIAN_OF_THE_DAY = {
  id: 'purple-frog',
  name: 'Purple Frog',
  scientificName: 'Nasikabatrachus sahyadrensis',
  status: 'EN',
  statusLabel: 'Endangered',
  country: 'India',
  region: 'Western Ghats',
  funFact: "This extraordinary species spends most of its life underground, emerging for only about two weeks each year during monsoon season to breed.",
  image: '/images/species/purple-frog.jpg',
  dispatchId: 'karina-purple-frog',
};

// Mini compass rose SVG
function CompassRose({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none">
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      {/* N S E W points */}
      <path d="M20 2 L22 10 L20 8 L18 10 Z" fill="currentColor" opacity="0.8" />
      <path d="M20 38 L18 30 L20 32 L22 30 Z" fill="currentColor" opacity="0.4" />
      <path d="M38 20 L30 18 L32 20 L30 22 Z" fill="currentColor" opacity="0.4" />
      <path d="M2 20 L10 22 L8 20 L10 18 Z" fill="currentColor" opacity="0.4" />
      {/* Center dot */}
      <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function Home() {
  const { totalStamps } = useStamps();
  const { progress } = useProgress();
  const completedArticles = progress.filter(p => p.completed).length;

  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen pb-24" style={{
      background: 'linear-gradient(180deg, #2C1810 0%, #3D2317 15%, #F5F0E6 15%, #F5F0E6 100%)',
    }}>
      {/* Hero Header - Explorer's Headquarters */}
      <header className="relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #2C1810 0%, #3D2317 50%, #2C1810 100%)',
      }}>
        {/* Subtle topographic pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="topo" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 Q25 30, 50 50 T100 50" stroke="white" fill="none" strokeWidth="0.5"/>
              <path d="M0 70 Q25 50, 50 70 T100 70" stroke="white" fill="none" strokeWidth="0.5"/>
              <path d="M0 30 Q25 10, 50 30 T100 30" stroke="white" fill="none" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#topo)"/>
          </svg>
        </div>

        {/* Decorative compass in corner */}
        <div className="absolute top-8 right-4 text-amber-600/20">
          <CompassRose className="w-16 h-16" />
        </div>

        <div className="relative px-5 pt-12 pb-8">
          {/* Logo and settings */}
          <div className="flex items-center justify-between mb-6">
            {/* ASA Badge */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{
                background: 'radial-gradient(circle at 30% 30%, #C41E3A 0%, #8B0000 100%)',
                boxShadow: '0 3px 10px rgba(0,0,0,0.5), inset 0 1px 5px rgba(255,255,255,0.2)',
              }}>
                <ASALogo variant="icon" className="w-6 h-6" color="white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-amber-400/40 text-[10px] tracking-[0.15em] uppercase">Amphibian Survival Alliance</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-amber-200/50 text-xs px-3 py-1.5 rounded-full" style={{
                background: 'rgba(255,255,255,0.05)',
              }}>
                <IconCalendar size={14} />
                <span>{dateString}</span>
              </div>
              <Link
                to="/settings"
                className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-amber-200/50 hover:text-amber-200 transition-colors"
              >
                <IconSettings size={18} />
              </Link>
            </div>
          </div>

          {/* Title with MarshMellow */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            {/* MarshMellow mascot */}
            <div className="relative">
              <MarshMellow
                pose="explorer"
                size="lg"
                className="drop-shadow-2xl"
                alt="MarshMellow the explorer frog welcomes you"
              />
            </div>

            {/* Title text */}
            <div className="text-center sm:text-left">
              <p className="text-amber-400/50 text-xs tracking-[0.2em] uppercase mb-1">Welcome to</p>
              <h1 className="text-3xl sm:text-4xl text-amber-100 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                The Ribbit Report
              </h1>
              <p className="text-amber-200/40 mt-2 text-sm italic">
                Your gateway to the world of amphibians
              </p>
            </div>
          </div>

          {/* Stats bar - Expedition metrics */}
          <div className="flex justify-center">
            <div className="inline-flex gap-1 p-1 rounded-lg" style={{
              background: 'rgba(0,0,0,0.3)',
            }}>
              <Link to="/dispatches" className="group px-5 py-3 rounded-md hover:bg-white/5 transition-colors text-center">
                <p className="text-2xl font-bold text-amber-100" style={{ fontFamily: 'Georgia, serif' }}>{completedArticles}</p>
                <p className="text-[10px] text-amber-200/40 uppercase tracking-wider group-hover:text-amber-200/60 transition-colors">Dispatches</p>
              </Link>
              <div className="w-px bg-amber-200/10 my-2" />
              <Link to="/passport" className="group px-5 py-3 rounded-md hover:bg-white/5 transition-colors text-center">
                <p className="text-2xl font-bold text-amber-100" style={{ fontFamily: 'Georgia, serif' }}>{totalStamps}</p>
                <p className="text-[10px] text-amber-200/40 uppercase tracking-wider group-hover:text-amber-200/60 transition-colors">Stamps</p>
              </Link>
              <div className="w-px bg-amber-200/10 my-2" />
              <Link to="/map" className="group px-5 py-3 rounded-md hover:bg-white/5 transition-colors text-center">
                <p className="text-2xl font-bold text-amber-100" style={{ fontFamily: 'Georgia, serif' }}>9</p>
                <p className="text-[10px] text-amber-200/40 uppercase tracking-wider group-hover:text-amber-200/60 transition-colors">Countries</p>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="px-5 py-6">
        {/* Featured: Species of the Day - Field Sketch Card style */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-asa-green uppercase tracking-wider">Today's Discovery</p>
              <h2 className="text-lg text-stone-800" style={{ fontFamily: 'Georgia, serif' }}>Species of the Day</h2>
            </div>
          </div>

          <Link
            to={`/dispatches/${AMPHIBIAN_OF_THE_DAY.dispatchId}`}
            className="block overflow-hidden transition-all group hover:-translate-y-1"
          >
            {/* Field sketch card */}
            <div className="rounded-xl overflow-hidden shadow-xl" style={{
              background: 'linear-gradient(135deg, #FFFEF7 0%, #FBF8F1 50%, #F5F0E6 100%)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15), inset 0 0 40px rgba(139, 90, 43, 0.05)',
            }}>
              {/* Top edge - aged paper effect */}
              <div className="h-1" style={{
                background: 'linear-gradient(90deg, #D4B896 0%, #C4A882 50%, #D4B896 100%)',
              }} />

              {/* Image area styled as field sketch */}
              <div className="relative h-52" style={{
                background: 'linear-gradient(135deg, #97B3CA 0%, #7A9BB5 100%)',
              }}>
                {/* Sketch placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <ASALogo variant="icon" className="w-20 h-20 mx-auto text-white/20" />
                    <p className="text-white/30 text-xs mt-2 italic" style={{ fontFamily: 'Georgia, serif' }}>
                      Field illustration pending
                    </p>
                  </div>
                </div>

                {/* Status badge - specimen tag style */}
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded" style={{
                    background: 'rgba(255,254,247,0.95)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}>
                    <IconStatusDot status={AMPHIBIAN_OF_THE_DAY.status} />
                    <span className="text-xs font-semibold text-stone-700">{AMPHIBIAN_OF_THE_DAY.statusLabel}</span>
                  </div>
                </div>

                {/* Location tag */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded" style={{
                  background: 'rgba(44,24,16,0.8)',
                }}>
                  <p className="text-amber-100 text-sm font-medium">
                    {AMPHIBIAN_OF_THE_DAY.region}, {AMPHIBIAN_OF_THE_DAY.country}
                  </p>
                </div>
              </div>

              {/* Content area - naturalist's notes */}
              <div className="p-5">
                {/* Specimen header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl text-stone-800 group-hover:text-asa-green transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
                      {AMPHIBIAN_OF_THE_DAY.name}
                    </h3>
                    <p className="text-sm text-stone-500 italic">
                      {AMPHIBIAN_OF_THE_DAY.scientificName}
                    </p>
                  </div>
                  {/* Stamp corner */}
                  <div className="w-12 h-12 rounded border-2 border-dashed border-stone-300 flex items-center justify-center">
                    <span className="text-[8px] text-stone-400 text-center leading-tight">STAMP<br/>HERE</span>
                  </div>
                </div>

                {/* Notes section */}
                <div className="border-t border-stone-200 pt-3 mt-3">
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider mb-1">Field Notes</p>
                  <p className="text-sm text-stone-600 leading-relaxed line-clamp-3" style={{ fontFamily: 'Georgia, serif' }}>
                    "{AMPHIBIAN_OF_THE_DAY.funFact}"
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-stone-200">
                  <span className="text-sm font-semibold text-asa-green" style={{ fontFamily: 'Courier, monospace' }}>
                    READ FULL DISPATCH
                  </span>
                  <div className="w-8 h-8 bg-asa-green/10 rounded-full flex items-center justify-center text-asa-green group-hover:bg-asa-green group-hover:text-white transition-colors">
                    <IconChevronRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Explore Sections - Expedition menu */}
        <section className="mb-8">
          <h2 className="text-lg text-stone-800 mb-4" style={{ fontFamily: 'Georgia, serif' }}>Begin Your Expedition</h2>

          <div className="space-y-3">
            {/* Field Dispatches */}
            <Link
              to="/dispatches"
              className="flex items-center gap-4 p-4 rounded-xl transition-all group hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #FFFEF7 0%, #FBF8F1 100%)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #7AC143 0%, #5A9A2F 100%)',
              }}>
                <IconMail size={22} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-stone-800 group-hover:text-asa-green transition-colors">Field Dispatches</h3>
                <p className="text-sm text-stone-500">Letters from researchers worldwide</p>
              </div>
              <IconChevronRight className="text-stone-400 group-hover:text-asa-green transition-colors" size={20} />
            </Link>

            {/* Explorer's Map */}
            <Link
              to="/map"
              className="flex items-center gap-4 p-4 rounded-xl transition-all group hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #FFFEF7 0%, #FBF8F1 100%)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #97B3CA 0%, #7A9BB5 100%)',
              }}>
                <IconGlobe size={22} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-stone-800 group-hover:text-asa-green transition-colors">Explorer's Map</h3>
                <p className="text-sm text-stone-500">Chart your discoveries by region</p>
              </div>
              <IconChevronRight className="text-stone-400 group-hover:text-asa-green transition-colors" size={20} />
            </Link>

            {/* Myth Busters */}
            <Link
              to="/myths"
              className="flex items-center gap-4 p-4 rounded-xl transition-all group hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #FFFEF7 0%, #FBF8F1 100%)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #FFD100 0%, #E5BC00 100%)',
              }}>
                <IconLightbulb size={22} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-stone-800 group-hover:text-asa-green transition-colors">Myth Busters</h3>
                <p className="text-sm text-stone-500">Separate fact from fiction</p>
              </div>
              <IconChevronRight className="text-stone-400 group-hover:text-asa-green transition-colors" size={20} />
            </Link>

            {/* My Passport */}
            <Link
              to="/passport"
              className="flex items-center gap-4 p-4 rounded-xl transition-all group hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #FFFEF7 0%, #FBF8F1 100%)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #C41E3A 0%, #8B0000 100%)',
              }}>
                <IconAward size={22} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-stone-800 group-hover:text-asa-green transition-colors">My Passport</h3>
                <p className="text-sm text-stone-500">Collect stamps & track achievements</p>
              </div>
              <IconChevronRight className="text-stone-400 group-hover:text-asa-green transition-colors" size={20} />
            </Link>
          </div>
        </section>

        {/* Did You Know - Explorer's journal note */}
        <section className="mb-8">
          <div className="rounded-xl p-6 relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, #2C1810 0%, #3D2317 100%)',
          }}>
            {/* Corner compass decoration */}
            <div className="absolute top-4 right-4 text-amber-600/10">
              <CompassRose className="w-20 h-20" />
            </div>

            <div className="relative">
              <p className="text-amber-400/60 text-xs tracking-[0.15em] uppercase mb-3">Did You Know</p>
              <p className="text-amber-100 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                There are over <span className="font-bold text-asa-yellow">8,000 species</span> of amphibians
                discovered so far, and scientists estimate there may be thousands more waiting to be found.
                Sadly, nearly <span className="font-bold text-asa-yellow">41%</span> are threatened with extinction.
              </p>
              <Link
                to="/myths"
                className="inline-flex items-center gap-2 mt-4 text-amber-200/60 hover:text-amber-200 text-sm font-medium transition-colors"
              >
                Learn more about conservation
                <IconChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-6 border-t border-stone-200">
          <div className="flex flex-col items-center gap-3">
            <ASALogo variant="full" className="w-32" color="grey" />
            <p className="text-xs text-stone-400">
              Powered by the Amphibian Survival Alliance
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useProgress, useStamps } from '../hooks';
import { MarshMellow } from '../components/MarshMellow';

// Import dispatch data
import indiaDispatch from '../data/dispatches/india-resplendent-grass-frog.json';

// ═══════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════

interface DispatchImage {
  src: string;
  type: 'hero' | 'detail' | 'field' | 'researcher';
  caption?: string;
  credit?: string;
}

interface DispatchFact {
  title: string;
  text: string;
}

interface DispatchData {
  id: string;
  title: string;
  subtitle: string;
  species: {
    commonName: string;
    scientificName: string;
    status: string;
    range: string[];
  };
  location: {
    country: string;
    region: string;
    flagColors: string[];
  };
  researcher: {
    name: string;
    organization?: string;
    quote: string;
    photoCredit?: string;
  };
  content: {
    intro: string;
    facts: DispatchFact[];
    fieldNote: string;
  };
  images: DispatchImage[];
  photoCredits: string[];
}

const DISPATCHES: Record<string, DispatchData> = {
  'india-resplendent-grass-frog': indiaDispatch as DispatchData,
};

const STATUS_LABELS: Record<string, { label: string; color: string; bgColor: string }> = {
  'CR': { label: 'Critically Endangered', color: '#FFFFFF', bgColor: '#DC2626' },
  'EN': { label: 'Endangered', color: '#FFFFFF', bgColor: '#EA580C' },
  'VU': { label: 'Vulnerable', color: '#1A1A1A', bgColor: '#FBBF24' },
  'NT': { label: 'Near Threatened', color: '#FFFFFF', bgColor: '#65A30D' },
  'LC': { label: 'Least Concern', color: '#FFFFFF', bgColor: '#16A34A' },
  'DD': { label: 'Data Deficient', color: '#FFFFFF', bgColor: '#6B7280' },
};

// ═══════════════════════════════════════════════════════════════
// ADVENTURE PALETTE - BOLD & SATURATED
// ═══════════════════════════════════════════════════════════════
const ADVENTURE_COLORS = {
  gold: '#D4A634',
  jungleGreen: '#1B4D3E',
  adventureRed: '#C41E3A',
  sunsetOrange: '#E86A33',
  deepBlue: '#1B3A5F',
  warmAmber: '#C9A227',
};

// ═══════════════════════════════════════════════════════════════
// BOLD ADVENTURE COMPONENTS
// ═══════════════════════════════════════════════════════════════

// Species info bar - bold, graphic, punchy
function SpeciesBar({ dispatch }: { dispatch: DispatchData }) {
  const status = STATUS_LABELS[dispatch.species.status] || STATUS_LABELS['DD'];

  return (
    <div
      className="mx-4 p-4 rounded-lg"
      style={{
        background: 'linear-gradient(135deg, #1B4D3E 0%, #0F2F26 100%)',
        boxShadow: '0 4px 20px rgba(27, 77, 62, 0.4)',
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Species name */}
        <div>
          <h3
            className="text-xl sm:text-2xl font-bold text-white leading-tight"
            style={{ fontFamily: "'Lilita One', cursive" }}
          >
            {dispatch.species.commonName}
          </h3>
          <p className="text-emerald-200 italic text-sm mt-0.5" style={{ fontFamily: "'Libre Baskerville', serif" }}>
            {dispatch.species.scientificName}
          </p>
        </div>

        {/* Status badge */}
        <div
          className="px-4 py-2 rounded-full font-bold text-sm tracking-wide"
          style={{
            background: status.bgColor,
            color: status.color,
            fontFamily: "'Nunito', sans-serif",
            boxShadow: `0 2px 10px ${status.bgColor}66`,
          }}
        >
          {status.label}
        </div>
      </div>

      {/* Location bar */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-emerald-700/50">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-emerald-100 text-sm font-medium">{dispatch.location.region}</span>
        </div>
        <div className="text-emerald-400">•</div>
        <span className="text-emerald-100 text-sm font-bold">{dispatch.location.country}</span>
      </div>
    </div>
  );
}

// Bold fact card - saturated colors, white text, punchy
function BoldFactCard({
  title,
  text,
  index,
}: {
  title: string;
  text: string;
  index: number;
}) {
  // Saturated adventure colors
  const cardStyles = [
    { bg: 'linear-gradient(135deg, #1B4D3E 0%, #0F2F26 100%)', accent: '#4ADE80' }, // Jungle green
    { bg: 'linear-gradient(135deg, #1B3A5F 0%, #0F2440 100%)', accent: '#60A5FA' }, // Deep blue
    { bg: 'linear-gradient(135deg, #7C2D12 0%, #451A03 100%)', accent: '#FB923C' }, // Rich brown
    { bg: 'linear-gradient(135deg, #6B21A8 0%, #3B0764 100%)', accent: '#C084FC' }, // Royal purple
  ];
  const style = cardStyles[index % cardStyles.length];

  return (
    <div
      className="p-5 rounded-xl relative overflow-hidden"
      style={{
        background: style.bg,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Decorative number */}
      <div
        className="absolute -top-2 -right-2 text-6xl font-black opacity-10"
        style={{ fontFamily: "'Lilita One', cursive", color: style.accent }}
      >
        {index + 1}
      </div>

      {/* Title */}
      <h4
        className="text-lg font-bold text-white mb-2 relative z-10"
        style={{ fontFamily: "'Lilita One', cursive" }}
      >
        {title}
      </h4>

      {/* Fact text */}
      <p
        className="text-white/90 leading-relaxed relative z-10"
        style={{ fontFamily: "'Nunito', sans-serif", fontSize: '15px' }}
      >
        {text}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: style.accent }}
      />
    </div>
  );
}

// Field notes - clean, readable, with accent border
function FieldNotes({ text }: { text: string }) {
  return (
    <div
      className="mx-4 p-5 rounded-xl relative"
      style={{
        background: '#FFFBEB',
        borderLeft: `4px solid ${ADVENTURE_COLORS.gold}`,
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: ADVENTURE_COLORS.gold }}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
        <h3
          className="font-bold text-amber-800"
          style={{ fontFamily: "'Lilita One', cursive", fontSize: '18px' }}
        >
          Field Notes
        </h3>
      </div>

      <p
        className="text-stone-700 leading-relaxed"
        style={{ fontFamily: "'Nunito', sans-serif", fontSize: '16px', lineHeight: '1.7' }}
      >
        {text}
      </p>
    </div>
  );
}

// Researcher card - bold, engaging
function ResearcherCard({
  src,
  name,
  organization,
  quote,
}: {
  src: string;
  name: string;
  organization?: string;
  quote: string;
}) {
  return (
    <div
      className="mx-4 rounded-xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1B3A5F 0%, #0F2440 100%)',
        boxShadow: '0 4px 20px rgba(27, 58, 95, 0.4)',
      }}
    >
      <div className="p-5">
        <h3
          className="text-white font-bold mb-4"
          style={{ fontFamily: "'Lilita One', cursive", fontSize: '20px' }}
        >
          Meet the Researcher
        </h3>

        <div className="flex gap-4">
          {/* Photo */}
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0"
            style={{ border: '3px solid #D4A634' }}
          >
            <img
              src={src}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <p
              className="text-white font-bold text-lg"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {name}
            </p>
            {organization && (
              <p className="text-blue-200 text-sm">{organization}</p>
            )}
          </div>
        </div>
      </div>

      {/* Quote section */}
      <div
        className="px-5 py-4"
        style={{ background: 'rgba(212, 166, 52, 0.15)' }}
      >
        <p
          className="text-blue-100 italic leading-relaxed"
          style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '15px' }}
        >
          "{quote}"
        </p>
      </div>
    </div>
  );
}

// Epic stamp for completion - BIG, satisfying
function VictoryStamp({
  country,
  flagColors,
  animate = false,
}: {
  country: string;
  flagColors: string[];
  animate?: boolean;
}) {
  const gradientId = `victory-flag-${country.replace(/\s/g, '')}`;

  return (
    <div
      className={`relative ${animate ? 'animate-stamp-thud' : ''}`}
      style={{ width: '140px', height: '140px' }}
    >
      <svg viewBox="0 0 140 140" className="w-full h-full">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={flagColors[0]} />
            <stop offset="33%" stopColor={flagColors[0]} />
            <stop offset="33%" stopColor={flagColors[1]} />
            <stop offset="66%" stopColor={flagColors[1]} />
            <stop offset="66%" stopColor={flagColors[2]} />
            <stop offset="100%" stopColor={flagColors[2]} />
          </linearGradient>
        </defs>

        {/* Outer ring - bold gold */}
        <circle
          cx="70"
          cy="70"
          r="65"
          fill="none"
          stroke="#D4A634"
          strokeWidth="6"
        />

        {/* Inner fill */}
        <circle
          cx="70"
          cy="70"
          r="58"
          fill="#1B3A5F"
        />

        {/* Flag stripe */}
        <rect
          x="25"
          y="55"
          width="90"
          height="30"
          fill={`url(#${gradientId})`}
        />

        {/* Country name - curved top */}
        <path id="victoryTopArc" d="M 15 70 A 55 55 0 0 1 125 70" fill="none" />
        <text
          fill="#D4A634"
          fontSize="14"
          fontWeight="bold"
          fontFamily="serif"
        >
          <textPath href="#victoryTopArc" startOffset="50%" textAnchor="middle">
            {country.toUpperCase()}
          </textPath>
        </text>

        {/* "EXPLORER" at bottom */}
        <path id="victoryBottomArc" d="M 15 70 A 55 55 0 0 0 125 70" fill="none" />
        <text
          fill="#D4A634"
          fontSize="11"
          fontFamily="serif"
          letterSpacing="3"
        >
          <textPath href="#victoryBottomArc" startOffset="50%" textAnchor="middle">
            ★ EXPLORER ★
          </textPath>
        </text>

        {/* Center checkmark */}
        <circle cx="70" cy="70" r="12" fill="#D4A634" />
        <path
          d="M 63 70 L 68 75 L 78 65"
          fill="none"
          stroke="#1B3A5F"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN DISPATCH DETAIL PAGE - ADVENTURE MOVIE STYLE
// ═══════════════════════════════════════════════════════════════

export function DispatchDetail() {
  const { dispatchId } = useParams();
  const navigate = useNavigate();
  const { markArticleComplete, isArticleComplete } = useProgress();
  const { addStamp, hasStamp } = useStamps();
  const [showStampAnimation, setShowStampAnimation] = useState(false);

  const dispatch = dispatchId ? DISPATCHES[dispatchId] : null;

  useEffect(() => {
    if (dispatch && !isArticleComplete(dispatch.id)) {
      const timer = setTimeout(() => {
        setShowStampAnimation(true);
        markArticleComplete(dispatch.id, 'dispatches');
        if (!hasStamp(dispatch.id)) {
          addStamp({
            id: dispatch.id,
            articleId: dispatch.id,
            emoji: '🐸',
            title: dispatch.species.commonName,
            country: dispatch.location.country,
          });
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, isArticleComplete, markArticleComplete, hasStamp, addStamp]);

  if (!dispatch) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-8"
        style={{ background: 'linear-gradient(180deg, #1B4D3E 0%, #0F2F26 100%)' }}
      >
        <MarshMellow pose="lost" size="md" className="mb-6" />
        <h2
          className="text-2xl text-white mb-2"
          style={{ fontFamily: "'Lilita One', cursive" }}
        >
          Dispatch Not Found
        </h2>
        <p className="text-emerald-200 text-sm mb-6">
          This dispatch seems to have gotten lost in the jungle...
        </p>
        <Link
          to="/dispatches"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm"
          style={{
            background: ADVENTURE_COLORS.gold,
            color: '#1A1A1A',
          }}
        >
          ← Back to Dispatches
        </Link>
      </div>
    );
  }

  const heroImage = dispatch.images.find(img => img.type === 'hero');
  const detailImage = dispatch.images.find(img => img.type === 'detail');
  const researcherImage = dispatch.images.find(img => img.type === 'researcher');
  const basePath = `/images/dispatches/${dispatch.id}`;

  return (
    <div
      className="min-h-screen pb-24"
      style={{
        background: '#F5EFE0',
      }}
    >
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION - Full bleed, dramatic, cinematic
          ═══════════════════════════════════════════════════════════════ */}
      <header className="relative">
        {/* Hero image - full width, dramatic */}
        {heroImage && (
          <div className="relative">
            <div
              className="w-full h-64 sm:h-80 md:h-96 bg-cover bg-center"
              style={{
                backgroundImage: `url(${basePath}/${heroImage.src})`,
              }}
            />
            {/* Dark gradient overlay for text readability */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 100%)',
              }}
            />

            {/* Back button */}
            <button
              onClick={() => navigate('/dispatches')}
              className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-sm font-medium z-10"
              style={{
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)',
              }}
            >
              ← Back
            </button>

            {/* Stamp badge in corner */}
            <div className="absolute top-4 right-4 z-10">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${dispatch.location.flagColors[0]} 0%, ${dispatch.location.flagColors[0]} 33%, ${dispatch.location.flagColors[1]} 33%, ${dispatch.location.flagColors[1]} 66%, ${dispatch.location.flagColors[2]} 66%, ${dispatch.location.flagColors[2]} 100%)`,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                  border: '3px solid white',
                }}
              >
                <span className="text-white text-xs font-bold text-center leading-tight drop-shadow-lg" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                  {dispatch.location.country.split(' ').map(w => w[0]).join('')}
                </span>
              </div>
            </div>

            {/* Title overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
              {/* Region tag */}
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-2"
                style={{
                  background: ADVENTURE_COLORS.gold,
                  color: '#1A1A1A',
                }}
              >
                {dispatch.location.region.toUpperCase()}
              </div>

              {/* BIG TITLE - Movie poster style */}
              <h1
                className="text-3xl sm:text-4xl md:text-5xl text-white font-black leading-none tracking-tight"
                style={{
                  fontFamily: "'Lilita One', cursive",
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                }}
              >
                {dispatch.title}
              </h1>

              {/* Subtitle */}
              <p
                className="text-white/90 text-lg sm:text-xl mt-2 italic"
                style={{
                  fontFamily: "'Libre Baskerville', Georgia, serif",
                  textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                }}
              >
                {dispatch.subtitle}
              </p>
            </div>
          </div>
        )}

        {/* No hero fallback */}
        {!heroImage && (
          <div
            className="w-full py-16 px-5"
            style={{ background: 'linear-gradient(135deg, #1B4D3E 0%, #0F2F26 100%)' }}
          >
            <button
              onClick={() => navigate('/dispatches')}
              className="flex items-center gap-2 text-emerald-200 text-sm mb-6"
            >
              ← Back
            </button>
            <h1
              className="text-3xl sm:text-4xl text-white font-black"
              style={{ fontFamily: "'Lilita One', cursive" }}
            >
              {dispatch.title}
            </h1>
          </div>
        )}
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          MAIN CONTENT
          ═══════════════════════════════════════════════════════════════ */}
      <main className="pt-6 space-y-8">
        {/* Species info bar */}
        <section>
          <SpeciesBar dispatch={dispatch} />
        </section>

        {/* Introduction */}
        <section className="px-5">
          <p
            className="text-stone-700 leading-relaxed"
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: '17px',
              lineHeight: '1.8',
            }}
          >
            {dispatch.content.intro}
          </p>
        </section>

        {/* Detail photo */}
        {detailImage && (
          <section className="px-4">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={`${basePath}/${detailImage.src}`}
                alt={detailImage.caption || 'Detail photo'}
                className="w-full h-auto"
              />
              {detailImage.caption && (
                <div className="bg-stone-800 px-4 py-2">
                  <p className="text-stone-200 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    {detailImage.caption}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Amazing Facts - Bold cards */}
        <section className="px-4">
          <h2
            className="text-2xl font-black mb-4"
            style={{
              fontFamily: "'Lilita One', cursive",
              color: ADVENTURE_COLORS.jungleGreen,
            }}
          >
            Amazing Facts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dispatch.content.facts.map((fact, index) => (
              <BoldFactCard
                key={index}
                title={fact.title}
                text={fact.text}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Field Notes */}
        <section>
          <FieldNotes text={dispatch.content.fieldNote} />
        </section>

        {/* Meet the Researcher */}
        {researcherImage && (
          <section>
            <ResearcherCard
              src={`${basePath}/${researcherImage.src}`}
              name={dispatch.researcher.name}
              organization={dispatch.researcher.organization}
              quote={dispatch.researcher.quote}
            />
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            VICTORY SECTION - Epic completion moment
            ═══════════════════════════════════════════════════════════════ */}
        <section className="px-4 pt-8">
          <div
            className="rounded-2xl p-6 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1B4D3E 0%, #0F2F26 100%)',
              boxShadow: '0 8px 32px rgba(27, 77, 62, 0.4)',
            }}
          >
            {/* Decorative elements */}
            <div
              className="absolute top-0 left-0 w-32 h-32 rounded-full opacity-10"
              style={{ background: ADVENTURE_COLORS.gold, transform: 'translate(-50%, -50%)' }}
            />
            <div
              className="absolute bottom-0 right-0 w-24 h-24 rounded-full opacity-10"
              style={{ background: ADVENTURE_COLORS.gold, transform: 'translate(50%, 50%)' }}
            />

            {/* Content */}
            <div className="relative z-10">
              <h3
                className="text-3xl text-white font-black mb-2"
                style={{ fontFamily: "'Lilita One', cursive" }}
              >
                MISSION COMPLETE!
              </h3>

              <p className="text-emerald-200 mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
                You earned a new stamp for your explorer's passport
              </p>

              {/* Victory stamp */}
              <div className="flex justify-center mb-6">
                <VictoryStamp
                  country={dispatch.location.country}
                  flagColors={dispatch.location.flagColors}
                  animate={showStampAnimation}
                />
              </div>

              {/* MarshMellow - small, celebrating */}
              <div className="mb-6">
                <MarshMellow pose="celebrating" size="sm" className="mx-auto" />
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/passport"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-transform hover:scale-105"
                  style={{
                    background: ADVENTURE_COLORS.gold,
                    color: '#1A1A1A',
                    boxShadow: '0 4px 15px rgba(212, 166, 52, 0.4)',
                  }}
                >
                  View My Passport
                </Link>
                <Link
                  to="/dispatches"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-colors"
                  style={{
                    border: '2px solid rgba(255,255,255,0.3)',
                  }}
                >
                  More Dispatches →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Photo credits */}
        <footer className="px-6 pt-4 pb-8 text-center">
          <p className="text-stone-400 text-xs">
            Photos: {dispatch.photoCredits.join(' • ')}
          </p>
        </footer>
      </main>
    </div>
  );
}

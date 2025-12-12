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

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  'CR': { label: 'Critically Endangered', color: '#DC2626' },
  'EN': { label: 'Endangered', color: '#EA580C' },
  'VU': { label: 'Vulnerable', color: '#CA8A04' },
  'NT': { label: 'Near Threatened', color: '#65A30D' },
  'LC': { label: 'Least Concern', color: '#16A34A' },
  'DD': { label: 'Data Deficient', color: '#6B7280' },
};

// ═══════════════════════════════════════════════════════════════
// TACTILE COMPONENTS - These feel like real objects
// ═══════════════════════════════════════════════════════════════

// Photo with tape holding it down - feels stuck to the page
function TapedPhoto({
  src,
  alt,
  caption,
  rotation = -2,
  tapeColor = 'cream',
}: {
  src: string;
  alt: string;
  caption?: string;
  rotation?: number;
  tapeColor?: 'cream' | 'green' | 'blue';
}) {
  const tapeColors = {
    cream: 'rgba(255, 235, 205, 0.75)',
    green: 'rgba(122, 193, 67, 0.55)',
    blue: 'rgba(151, 179, 202, 0.55)',
  };

  return (
    <div
      className="relative mx-auto"
      style={{ transform: `rotate(${rotation}deg)`, maxWidth: '340px' }}
    >
      {/* The photo itself */}
      <div className="relative bg-white p-2 shadow-lg">
        {/* Tape pieces */}
        <div
          className="absolute -top-3 left-1/4 w-16 h-6 z-10"
          style={{
            background: tapeColors[tapeColor],
            transform: 'rotate(-4deg)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}
        />
        <div
          className="absolute -top-3 right-1/4 w-14 h-6 z-10"
          style={{
            background: tapeColors[tapeColor],
            transform: 'rotate(6deg)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}
        />

        {/* Photo image */}
        <img
          src={src}
          alt={alt}
          className="w-full h-auto"
          style={{ filter: 'saturate(1.05) contrast(1.02)' }}
        />
      </div>

      {/* Handwritten caption below */}
      {caption && (
        <p
          className="mt-3 text-center text-stone-600 text-sm px-4"
          style={{
            fontFamily: "'Patrick Hand', cursive",
            fontSize: '15px',
            lineHeight: '1.4',
          }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}

// Index card with ruled lines - feels like a real specimen card
function SpecimenCard({ dispatch }: { dispatch: DispatchData }) {
  const status = STATUS_LABELS[dispatch.species.status] || STATUS_LABELS['DD'];

  return (
    <div
      className="relative paper-index-card mx-4 p-0 overflow-hidden"
      style={{
        transform: 'rotate(0.5deg)',
        boxShadow: '2px 3px 8px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.1)',
      }}
    >
      {/* Red line at top like a real index card */}
      <div className="h-1 w-full" style={{ background: '#E57373' }} />

      {/* Horizontal rules */}
      <div
        className="absolute inset-0 top-1 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(transparent 0px, transparent 23px, #B8D4E8 23px, #B8D4E8 24px)',
          backgroundSize: '100% 24px',
        }}
      />

      {/* Card content */}
      <div className="relative p-4 pt-3">
        {/* Header row with specimen number */}
        <div className="flex justify-between items-start mb-1">
          <span
            className="text-stone-400 text-xs tracking-wider"
            style={{ fontFamily: "'Special Elite', monospace" }}
          >
            SPECIMEN #{dispatch.id.split('-').pop()?.toUpperCase()}
          </span>
          <div
            className="px-2 py-0.5 rounded text-xs font-bold text-white"
            style={{ background: status.color }}
          >
            {dispatch.species.status}
          </div>
        </div>

        {/* Species name - handwritten style */}
        <h3
          className="text-2xl text-stone-800 mb-0.5 leading-tight"
          style={{ fontFamily: "'Patrick Hand', cursive" }}
        >
          {dispatch.species.commonName}
        </h3>

        {/* Scientific name - italic, formal */}
        <p
          className="text-stone-500 italic mb-4"
          style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: '14px' }}
        >
          {dispatch.species.scientificName}
        </p>

        {/* Location info - typewriter style labels */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <span
              className="text-stone-400 text-[10px] tracking-widest block"
              style={{ fontFamily: "'Special Elite', monospace" }}
            >
              LOCATION:
            </span>
            <span
              className="text-stone-700"
              style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '16px' }}
            >
              {dispatch.location.region}
            </span>
          </div>
          <div>
            <span
              className="text-stone-400 text-[10px] tracking-widest block"
              style={{ fontFamily: "'Special Elite', monospace" }}
            >
              COUNTRY:
            </span>
            <span
              className="text-stone-700"
              style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '16px' }}
            >
              {dispatch.location.country}
            </span>
          </div>
        </div>

        {/* Status explanation */}
        <div className="mt-3 pt-2 border-t border-stone-200">
          <span
            className="text-stone-400 text-[10px] tracking-widest block mb-0.5"
            style={{ fontFamily: "'Special Elite', monospace" }}
          >
            STATUS:
          </span>
          <span
            className="font-medium"
            style={{ color: status.color, fontFamily: "'Libre Baskerville', serif", fontSize: '13px' }}
          >
            {status.label}
          </span>
        </div>
      </div>

      {/* Paperclip decoration */}
      <div className="absolute -top-2 right-6 w-5 h-12">
        <svg viewBox="0 0 20 48" className="w-full h-full">
          <path
            d="M10 0 L10 8 Q10 12 6 12 L6 40 Q6 46 10 46 Q14 46 14 40 L14 16 Q14 12 10 12 L10 8"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="2.5"
          />
        </svg>
      </div>
    </div>
  );
}

// Torn paper fact scrap - feels like ripped notebook paper
function FactScrap({
  title,
  text,
  rotation = 0,
  variant = 0,
}: {
  title: string;
  text: string;
  rotation?: number;
  variant?: number;
}) {
  // Different paper colors for variety
  const papers = [
    { bg: '#FFF9E6', accent: '#D4AF37' }, // Cream/gold
    { bg: '#F0FDF4', accent: '#22C55E' }, // Pale green
    { bg: '#FFF7ED', accent: '#EA580C' }, // Warm cream
    { bg: '#EFF6FF', accent: '#3B82F6' }, // Cool blue tint
  ];
  const paper = papers[variant % papers.length];

  return (
    <div
      className="relative p-4 pb-5"
      style={{
        background: paper.bg,
        transform: `rotate(${rotation}deg)`,
        boxShadow: '2px 3px 6px rgba(0,0,0,0.12)',
        clipPath: `polygon(
          0% 3%, 4% 0%, 8% 4%, 12% 1%, 16% 3%, 20% 0%, 24% 2%, 28% 0%, 32% 3%, 36% 1%,
          40% 4%, 44% 0%, 48% 2%, 52% 0%, 56% 3%, 60% 1%, 64% 4%, 68% 0%, 72% 2%,
          76% 0%, 80% 3%, 84% 1%, 88% 4%, 92% 0%, 96% 2%, 100% 0%,
          100% 97%, 96% 100%, 92% 96%, 88% 99%, 84% 97%, 80% 100%, 76% 98%,
          72% 100%, 68% 97%, 64% 99%, 60% 96%, 56% 100%, 52% 98%, 48% 100%,
          44% 97%, 40% 99%, 36% 96%, 32% 100%, 28% 98%, 24% 100%, 20% 97%,
          16% 99%, 12% 96%, 8% 100%, 4% 98%, 0% 100%
        )`,
      }}
    >
      {/* Title with underline */}
      <h4
        className="font-bold mb-2 pb-1 border-b-2"
        style={{
          fontFamily: "'Patrick Hand', cursive",
          fontSize: '17px',
          color: '#3D2317',
          borderColor: paper.accent,
        }}
      >
        {title}
      </h4>

      {/* Fact text */}
      <p
        className="text-stone-700 leading-relaxed"
        style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: '14px',
        }}
      >
        {text}
      </p>
    </div>
  );
}

// Polaroid with handwritten name underneath
function ResearcherPolaroid({
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
    <div className="relative">
      {/* Polaroid frame */}
      <div
        className="bg-white p-2 pb-12 mx-auto relative"
        style={{
          maxWidth: '200px',
          transform: 'rotate(2deg)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <img
          src={src}
          alt={name}
          className="w-full aspect-square object-cover"
          style={{ filter: 'saturate(0.95)' }}
        />

        {/* Handwritten name at bottom of polaroid */}
        <p
          className="absolute bottom-3 left-0 right-0 text-center text-stone-700"
          style={{
            fontFamily: "'Patrick Hand', cursive",
            fontSize: '16px',
          }}
        >
          {name}
        </p>
      </div>

      {/* Quote as a separate note, slightly overlapping */}
      <div
        className="relative -mt-4 ml-8 mr-4 p-4 paper-sticky"
        style={{
          transform: 'rotate(-1deg)',
          boxShadow: '2px 2px 5px rgba(0,0,0,0.15)',
        }}
      >
        <p
          className="text-stone-700 italic leading-relaxed"
          style={{
            fontFamily: "'Libre Baskerville', Georgia, serif",
            fontSize: '14px',
          }}
        >
          "{quote}"
        </p>
        {organization && (
          <p
            className="text-stone-500 text-xs mt-2"
            style={{ fontFamily: "'Special Elite', monospace" }}
          >
            — {organization}
          </p>
        )}
      </div>
    </div>
  );
}

// Notebook page for field notes
function FieldNotePage({ text }: { text: string }) {
  return (
    <div
      className="relative paper-lined p-5 pt-8 mx-4"
      style={{
        boxShadow: '2px 3px 8px rgba(0,0,0,0.12)',
        transform: 'rotate(-0.5deg)',
      }}
    >
      {/* "Field Notes" header stamp */}
      <div
        className="absolute top-2 right-4 px-3 py-1 border-2 border-green-700 text-green-700 text-xs font-bold tracking-wider"
        style={{
          fontFamily: "'Special Elite', monospace",
          transform: 'rotate(3deg)',
          opacity: 0.7,
        }}
      >
        FIELD NOTES
      </div>

      <p
        className="text-stone-700 leading-[28px] relative z-10"
        style={{
          fontFamily: "'Patrick Hand', cursive",
          fontSize: '17px',
        }}
      >
        {text}
      </p>
    </div>
  );
}

// Passport stamp for completion
function PassportStamp({
  country,
  flagColors,
  animate = false,
}: {
  country: string;
  flagColors: string[];
  animate?: boolean;
}) {
  return (
    <div
      className={`relative ${animate ? 'animate-stamp-thud' : ''}`}
      style={{ width: '120px', height: '120px' }}
    >
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="flag-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={flagColors[0]} />
            <stop offset="33%" stopColor={flagColors[0]} />
            <stop offset="33%" stopColor={flagColors[1]} />
            <stop offset="66%" stopColor={flagColors[1]} />
            <stop offset="66%" stopColor={flagColors[2]} />
            <stop offset="100%" stopColor={flagColors[2]} />
          </linearGradient>
        </defs>

        {/* Outer ring */}
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="#1E3A5F"
          strokeWidth="4"
          opacity="0.8"
        />

        {/* Inner ring */}
        <circle
          cx="60"
          cy="60"
          r="44"
          fill="none"
          stroke="#1E3A5F"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* Country name curved at top */}
        <path
          id="topArc"
          d="M 20 60 A 40 40 0 0 1 100 60"
          fill="none"
        />
        <text
          fill="#1E3A5F"
          fontSize="11"
          fontWeight="bold"
          fontFamily="serif"
          opacity="0.85"
        >
          <textPath href="#topArc" startOffset="50%" textAnchor="middle">
            {country.toUpperCase()}
          </textPath>
        </text>

        {/* Flag stripe in center */}
        <rect
          x="30"
          y="50"
          width="60"
          height="20"
          fill="url(#flag-grad)"
          opacity="0.9"
        />

        {/* Frog silhouette */}
        <g transform="translate(48, 42)">
          <ellipse cx="12" cy="8" rx="10" ry="6" fill="#1E3A5F" opacity="0.7" />
          <circle cx="5" cy="4" r="3" fill="#1E3A5F" opacity="0.7" />
          <circle cx="19" cy="4" r="3" fill="#1E3A5F" opacity="0.7" />
        </g>

        {/* "FIELD POST" at bottom */}
        <path
          id="bottomArc"
          d="M 20 60 A 40 40 0 0 0 100 60"
          fill="none"
        />
        <text
          fill="#1E3A5F"
          fontSize="9"
          fontFamily="serif"
          letterSpacing="2"
          opacity="0.7"
        >
          <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
            FIELD POST • ASA
          </textPath>
        </text>
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN DISPATCH DETAIL PAGE
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
      // Delay stamp animation for dramatic effect
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
      <div className="min-h-screen flex flex-col items-center justify-center p-8 paper-kraft">
        <MarshMellow pose="lost" size="lg" className="mb-6 opacity-80" />
        <h2
          className="text-xl text-stone-700 mb-2"
          style={{ fontFamily: "'Patrick Hand', cursive" }}
        >
          Dispatch Not Found
        </h2>
        <p className="text-stone-500 text-sm mb-6">
          This dispatch seems to have gotten lost in the mail...
        </p>
        <Link
          to="/dispatches"
          className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-6 py-2.5 rounded font-semibold text-sm hover:bg-amber-50 transition-colors"
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
    <div className="min-h-screen pb-24 paper-kraft">
      {/* ─────────────────────────────────────────────────────────────
          HEADER - Like the top of an envelope
          ───────────────────────────────────────────────────────────── */}
      <header className="relative texture-leather text-white">
        {/* Airmail stripe at very top */}
        <div className="airmail-stripe" />

        <div className="px-5 pt-6 pb-8">
          {/* Back button */}
          <button
            onClick={() => navigate('/dispatches')}
            className="flex items-center gap-2 text-amber-200/80 hover:text-amber-100 transition-colors mb-6"
            style={{ fontFamily: "'Special Elite', monospace", fontSize: '13px' }}
          >
            ← ALL DISPATCHES
          </button>

          {/* Title area - like a label stuck on */}
          <div
            className="paper-parchment p-4 relative"
            style={{
              transform: 'rotate(-0.5deg)',
              boxShadow: '2px 3px 8px rgba(0,0,0,0.3)',
            }}
          >
            <p
              className="text-amber-700 text-xs tracking-widest mb-1"
              style={{ fontFamily: "'Special Elite', monospace" }}
            >
              FIELD DISPATCH • {dispatch.location.region.toUpperCase()}
            </p>
            <h1
              className="text-2xl sm:text-3xl text-stone-800 leading-tight"
              style={{ fontFamily: "'Lilita One', cursive" }}
            >
              {dispatch.title}
            </h1>
            <p
              className="text-stone-600 text-lg mt-1 italic"
              style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            >
              {dispatch.subtitle}
            </p>
          </div>

          {/* Stamp in corner */}
          <div className="absolute top-16 right-4">
            <PassportStamp
              country={dispatch.location.country}
              flagColors={dispatch.location.flagColors}
            />
          </div>
        </div>

        {/* Bottom airmail stripe */}
        <div className="airmail-stripe" />
      </header>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT - The journal pages
          ───────────────────────────────────────────────────────────── */}
      <main className="py-8 space-y-8">
        {/* Hero photo - taped to the page */}
        {heroImage && (
          <section className="px-4">
            <TapedPhoto
              src={`${basePath}/${heroImage.src}`}
              alt={dispatch.species.commonName}
              caption={heroImage.caption}
              rotation={-1.5}
              tapeColor="cream"
            />
          </section>
        )}

        {/* Species info card */}
        <section>
          <SpecimenCard dispatch={dispatch} />
        </section>

        {/* Introduction text - handwritten feel */}
        <section className="px-6">
          <p
            className="text-stone-700 leading-relaxed"
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: '16px',
              lineHeight: '1.8',
            }}
          >
            {dispatch.content.intro}
          </p>
        </section>

        {/* Detail photo if exists */}
        {detailImage && (
          <section className="px-4">
            <TapedPhoto
              src={`${basePath}/${detailImage.src}`}
              alt={detailImage.caption || 'Detail photo'}
              caption={detailImage.caption}
              rotation={1.5}
              tapeColor="green"
            />
          </section>
        )}

        {/* Fun Facts - torn paper scraps */}
        <section className="px-4">
          <h2
            className="text-xl text-stone-800 mb-4 ml-2"
            style={{ fontFamily: "'Lilita One', cursive" }}
          >
            Amazing Facts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dispatch.content.facts.map((fact, index) => (
              <FactScrap
                key={index}
                title={fact.title}
                text={fact.text}
                rotation={index % 2 === 0 ? -1 : 1.5}
                variant={index}
              />
            ))}
          </div>
        </section>

        {/* Field Notes */}
        <section>
          <FieldNotePage text={dispatch.content.fieldNote} />
        </section>

        {/* Meet the Researcher */}
        {researcherImage && (
          <section className="px-4">
            <h2
              className="text-xl text-stone-800 mb-4"
              style={{ fontFamily: "'Lilita One', cursive" }}
            >
              Meet the Researcher
            </h2>
            <ResearcherPolaroid
              src={`${basePath}/${researcherImage.src}`}
              name={dispatch.researcher.name}
              organization={dispatch.researcher.organization}
              quote={dispatch.researcher.quote}
            />
          </section>
        )}

        {/* Mission Complete - Stamp moment */}
        <section className="px-4 mt-12">
          <div
            className="paper-parchment p-6 text-center relative overflow-hidden"
            style={{
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            {/* Decorative border */}
            <div
              className="absolute inset-2 border-2 border-dashed border-amber-300 pointer-events-none"
              style={{ borderRadius: '4px' }}
            />

            <h3
              className="text-2xl text-stone-800 mb-2"
              style={{ fontFamily: "'Lilita One', cursive" }}
            >
              Mission Complete!
            </h3>

            <p className="text-stone-600 mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
              You've earned a new stamp for your passport
            </p>

            {/* Animated stamp */}
            <div className="flex justify-center mb-6">
              <PassportStamp
                country={dispatch.location.country}
                flagColors={dispatch.location.flagColors}
                animate={showStampAnimation}
              />
            </div>

            {/* MarshMellow celebrating */}
            <div className="mb-6">
              <MarshMellow pose="celebrating" size="md" className="mx-auto" />
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/passport"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sm transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                  color: '#2C1810',
                  fontFamily: "'Nunito', sans-serif",
                  boxShadow: '0 3px 8px rgba(212,175,55,0.4)',
                }}
              >
                View My Passport
              </Link>
              <Link
                to="/dispatches"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sm transition-colors border-2 border-stone-300 text-stone-600 hover:border-stone-400 hover:text-stone-700"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                More Dispatches →
              </Link>
            </div>
          </div>
        </section>

        {/* Photo credits - typewriter style */}
        <footer className="px-6 text-center">
          <p
            className="text-stone-400 text-xs"
            style={{ fontFamily: "'Special Elite', monospace" }}
          >
            Photos: {dispatch.photoCredits.join(' • ')}
          </p>
        </footer>
      </main>
    </div>
  );
}

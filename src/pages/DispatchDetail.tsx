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
// REFINED TACTILE COMPONENTS
// ═══════════════════════════════════════════════════════════════

// Photo with photo corners - like it's mounted in an album
function MountedPhoto({
  src,
  alt,
  caption,
  rotation = -2,
}: {
  src: string;
  alt: string;
  caption?: string;
  rotation?: number;
}) {
  return (
    <div
      className="relative mx-auto"
      style={{
        transform: `rotate(${rotation}deg)`,
        maxWidth: '320px',
      }}
    >
      {/* Photo with warm shadow suggesting thickness */}
      <div
        className="relative bg-white p-1"
        style={{
          boxShadow: '4px 6px 16px rgba(60, 40, 20, 0.35), 2px 2px 4px rgba(60, 40, 20, 0.15)',
        }}
      >
        {/* Photo corners - aged gold color */}
        <div
          className="absolute -top-1 -left-1 w-6 h-6 z-10"
          style={{
            background: 'linear-gradient(135deg, transparent 50%, #8B7355 50%)',
          }}
        />
        <div
          className="absolute -top-1 -right-1 w-6 h-6 z-10"
          style={{
            background: 'linear-gradient(225deg, transparent 50%, #8B7355 50%)',
          }}
        />
        <div
          className="absolute -bottom-1 -left-1 w-6 h-6 z-10"
          style={{
            background: 'linear-gradient(45deg, transparent 50%, #8B7355 50%)',
          }}
        />
        <div
          className="absolute -bottom-1 -right-1 w-6 h-6 z-10"
          style={{
            background: 'linear-gradient(315deg, transparent 50%, #8B7355 50%)',
          }}
        />

        {/* Photo image */}
        <img
          src={src}
          alt={alt}
          className="w-full h-auto block"
        />
      </div>

      {/* Handwritten caption below */}
      {caption && (
        <p
          className="mt-4 text-center text-stone-600 px-2"
          style={{
            fontFamily: "'Patrick Hand', cursive",
            fontSize: '16px',
            lineHeight: '1.4',
          }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}

// Index card with ruled lines - like an actual specimen card
function SpecimenCard({ dispatch }: { dispatch: DispatchData }) {
  const status = STATUS_LABELS[dispatch.species.status] || STATUS_LABELS['DD'];

  return (
    <div
      className="relative mx-4"
      style={{
        transform: 'rotate(1deg)',
        background: `
          repeating-linear-gradient(
            transparent,
            transparent 27px,
            #d4cfc4 27px,
            #d4cfc4 28px
          ),
          linear-gradient(135deg, #f8f4eb 0%, #f5f0e4 50%, #f2ece0 100%)
        `,
        boxShadow: '3px 4px 12px rgba(60, 40, 20, 0.2), 1px 1px 3px rgba(60, 40, 20, 0.1)',
      }}
    >
      {/* Red line at top like a real index card */}
      <div className="h-1.5 w-full" style={{ background: '#C9544D' }} />

      {/* Paperclip at top right - silver colored, rotated */}
      <div
        className="absolute -top-3 right-8 w-6 h-14 z-20"
        style={{ transform: 'rotate(15deg)' }}
      >
        <svg viewBox="0 0 24 56" className="w-full h-full">
          <path
            d="M12 0 L12 10 Q12 16 6 16 L6 48 Q6 54 12 54 Q18 54 18 48 L18 20 Q18 14 12 14 L12 10"
            fill="none"
            stroke="#A8A8A8"
            strokeWidth="3"
          />
          <path
            d="M12 0 L12 10 Q12 16 6 16 L6 48 Q6 54 12 54 Q18 54 18 48 L18 20 Q18 14 12 14 L12 10"
            fill="none"
            stroke="#C0C0C0"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Card content */}
      <div className="relative p-5 pt-4">
        {/* Header row with specimen number */}
        <div className="flex justify-between items-start mb-2">
          <span
            className="text-stone-400 text-xs tracking-wider"
            style={{ fontFamily: "'Special Elite', monospace" }}
          >
            SPECIMEN #{dispatch.id.split('-').pop()?.toUpperCase()}
          </span>
          <div
            className="px-2.5 py-1 rounded text-xs font-bold text-white"
            style={{ background: status.color }}
          >
            {dispatch.species.status}
          </div>
        </div>

        {/* Species name - handwritten style */}
        <h3
          className="text-2xl text-stone-800 mb-1 leading-tight"
          style={{ fontFamily: "'Patrick Hand', cursive" }}
        >
          {dispatch.species.commonName}
        </h3>

        {/* Scientific name - italic, formal */}
        <p
          className="text-stone-500 italic mb-5"
          style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: '15px' }}
        >
          {dispatch.species.scientificName}
        </p>

        {/* Location info - typewriter style labels */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <div>
            <span
              className="text-stone-400 text-[10px] tracking-widest block mb-0.5"
              style={{ fontFamily: "'Special Elite', monospace" }}
            >
              LOCATION:
            </span>
            <span
              className="text-stone-700"
              style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '17px' }}
            >
              {dispatch.location.region}
            </span>
          </div>
          <div>
            <span
              className="text-stone-400 text-[10px] tracking-widest block mb-0.5"
              style={{ fontFamily: "'Special Elite', monospace" }}
            >
              COUNTRY:
            </span>
            <span
              className="text-stone-700"
              style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '17px' }}
            >
              {dispatch.location.country}
            </span>
          </div>
        </div>

        {/* Status explanation */}
        <div className="mt-4 pt-3 border-t border-stone-300/50">
          <span
            className="text-stone-400 text-[10px] tracking-widest block mb-1"
            style={{ fontFamily: "'Special Elite', monospace" }}
          >
            CONSERVATION STATUS:
          </span>
          <span
            className="font-semibold"
            style={{ color: status.color, fontFamily: "'Libre Baskerville', serif", fontSize: '14px' }}
          >
            {status.label}
          </span>
        </div>
      </div>
    </div>
  );
}

// Aged paper fact card - torn edges, warm colors, varied rotation
function FactCard({
  title,
  text,
  index,
}: {
  title: string;
  text: string;
  index: number;
}) {
  // Aged paper colors - NOT pastel, warm and vintage
  const papers = [
    { bg: '#f4edd8', accent: '#8B7355' }, // Aged cream
    { bg: '#f9f3e3', accent: '#9B8B6B' }, // Warm ivory
    { bg: '#faf6e9', accent: '#7D6B4D' }, // Manila
    { bg: '#f5efe0', accent: '#8B7B5B' }, // Legal pad
  ];
  const paper = papers[index % papers.length];

  // Varied rotations for each card
  const rotations = [-2.5, 1.5, -1, 2, -1.5, 1];
  const rotation = rotations[index % rotations.length];

  // Vertical offset for overlap effect
  const offsets = [0, -8, 4, -4, 8, -6];
  const offset = offsets[index % offsets.length];

  return (
    <div
      className="relative p-4 pb-5"
      style={{
        background: paper.bg,
        transform: `rotate(${rotation}deg) translateY(${offset}px)`,
        boxShadow: '3px 4px 8px rgba(60, 40, 20, 0.18)',
        // Torn paper edges - irregular polygon
        clipPath: `polygon(
          0% 2%, 3% 0%, 7% 3%, 11% 1%, 15% 4%, 19% 0%, 23% 2%, 27% 0%, 31% 3%, 35% 1%,
          39% 4%, 43% 0%, 47% 2%, 51% 0%, 55% 3%, 59% 1%, 63% 4%, 67% 0%, 71% 2%,
          75% 0%, 79% 3%, 83% 1%, 87% 4%, 91% 0%, 95% 2%, 100% 1%,
          100% 98%, 97% 100%, 93% 97%, 89% 99%, 85% 96%, 81% 100%, 77% 98%,
          73% 100%, 69% 97%, 65% 99%, 61% 96%, 57% 100%, 53% 98%, 49% 100%,
          45% 97%, 41% 99%, 37% 96%, 33% 100%, 29% 98%, 25% 100%, 21% 97%,
          17% 99%, 13% 96%, 9% 100%, 5% 98%, 1% 100%, 0% 97%
        )`,
      }}
    >
      {/* Small pushpin at top */}
      <div
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #DC4444 0%, #AA2222 100%)',
          boxShadow: '0 2px 3px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)',
        }}
      />

      {/* Title with underline */}
      <h4
        className="font-bold mb-2 pb-1 border-b-2 mt-2"
        style={{
          fontFamily: "'Patrick Hand', cursive",
          fontSize: '18px',
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
          lineHeight: '1.6',
        }}
      >
        {text}
      </p>
    </div>
  );
}

// Proper notebook page for field notes - margin on LEFT, text sits on lines
function FieldNotesPage({ text }: { text: string }) {
  return (
    <div
      className="relative mx-4"
      style={{
        // Yellow-tinted paper with blue lines and red margin
        background: `
          linear-gradient(to right, transparent 38px, #d4a4a4 38px, #d4a4a4 40px, transparent 40px),
          repeating-linear-gradient(
            transparent,
            transparent 27px,
            #c9d4e8 27px,
            #c9d4e8 28px
          ),
          #faf8e8
        `,
        boxShadow: '3px 4px 12px rgba(60, 40, 20, 0.15)',
        transform: 'rotate(-0.5deg)',
        minHeight: '160px',
      }}
    >
      {/* "Field Notes" stamp in corner */}
      <div
        className="absolute top-3 right-3 px-3 py-1 border-2 text-xs font-bold tracking-wider"
        style={{
          fontFamily: "'Special Elite', monospace",
          transform: 'rotate(4deg)',
          borderColor: '#2D5A3D',
          color: '#2D5A3D',
          opacity: 0.75,
        }}
      >
        FIELD NOTES
      </div>

      {/* Text content - padded left for margin */}
      <div className="p-5 pl-12 pt-8">
        <p
          className="text-stone-700 relative z-10"
          style={{
            fontFamily: "'Patrick Hand', cursive",
            fontSize: '18px',
            lineHeight: '28px', // Match the ruled line spacing
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

// Proper polaroid with thick bottom border and handwritten name
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
    <div className="flex flex-col sm:flex-row items-start gap-6">
      {/* Polaroid frame - proper proportions */}
      <div
        className="relative flex-shrink-0"
        style={{
          transform: 'rotate(3deg)',
        }}
      >
        <div
          className="bg-white relative"
          style={{
            padding: '10px 10px 50px 10px', // Thick bottom for name
            boxShadow: '3px 4px 12px rgba(0,0,0,0.25), 1px 1px 4px rgba(0,0,0,0.1)',
          }}
        >
          {/* Small tape piece at top corner */}
          <div
            className="absolute -top-2 left-4 w-12 h-5 z-10"
            style={{
              background: 'rgba(255, 235, 200, 0.7)',
              transform: 'rotate(-3deg)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}
          />

          <img
            src={src}
            alt={name}
            className="w-40 h-40 object-cover block"
            style={{ filter: 'saturate(0.95) contrast(1.02)' }}
          />

          {/* Handwritten name at bottom */}
          <p
            className="absolute bottom-3 left-0 right-0 text-center text-stone-700"
            style={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: '17px',
            }}
          >
            {name}
          </p>
        </div>
      </div>

      {/* Quote on sticky note - overlapping */}
      <div
        className="relative flex-1 sm:-ml-4 sm:mt-8"
        style={{
          transform: 'rotate(-1.5deg)',
        }}
      >
        <div
          className="p-4"
          style={{
            background: 'linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%)',
            boxShadow: '2px 3px 6px rgba(0,0,0,0.15)',
          }}
        >
          {/* Highlighter effect on quote - uneven, real looking */}
          <p
            className="text-stone-700 leading-relaxed relative"
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: '15px',
            }}
          >
            <span
              style={{
                background: `linear-gradient(
                  104deg,
                  rgba(255, 200, 0, 0) 0.9%,
                  rgba(255, 200, 0, 0.4) 2.4%,
                  rgba(255, 200, 0, 0.3) 5.8%,
                  rgba(255, 200, 0, 0.25) 93%,
                  rgba(255, 200, 0, 0.4) 96%,
                  rgba(255, 200, 0, 0) 98%
                )`,
                padding: '0.1em 0.2em',
                boxDecorationBreak: 'clone',
                WebkitBoxDecorationBreak: 'clone',
              }}
            >
              "{quote}"
            </span>
          </p>
          {organization && (
            <p
              className="text-stone-500 text-xs mt-3"
              style={{ fontFamily: "'Special Elite', monospace" }}
            >
              — {organization}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Ink stamp with imperfect, textured look
function InkStamp({
  country,
  flagColors,
  animate = false,
}: {
  country: string;
  flagColors: string[];
  animate?: boolean;
}) {
  // Generate unique ID for this stamp's gradient
  const gradientId = `flag-grad-${country.replace(/\s/g, '')}`;

  return (
    <div
      className={`relative ${animate ? 'animate-stamp-thud' : ''}`}
      style={{
        width: '130px',
        height: '130px',
        transform: 'rotate(-4deg)',
        // Ink texture - slight roughness
        filter: 'contrast(1.1)',
      }}
    >
      {/* Slight double-stamp offset effect */}
      <div
        className="absolute inset-0"
        style={{
          transform: 'translate(1px, 1px)',
          opacity: 0.15,
        }}
      >
        <svg viewBox="0 0 130 130" className="w-full h-full">
          <circle cx="65" cy="65" r="58" fill="none" stroke="#1E3A5F" strokeWidth="4" />
          <circle cx="65" cy="65" r="48" fill="none" stroke="#1E3A5F" strokeWidth="2" />
        </svg>
      </div>

      {/* Main stamp */}
      <svg viewBox="0 0 130 130" className="w-full h-full relative">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={flagColors[0]} />
            <stop offset="33%" stopColor={flagColors[0]} />
            <stop offset="33%" stopColor={flagColors[1]} />
            <stop offset="66%" stopColor={flagColors[1]} />
            <stop offset="66%" stopColor={flagColors[2]} />
            <stop offset="100%" stopColor={flagColors[2]} />
          </linearGradient>

          {/* Noise filter for ink texture */}
          <filter id="inkTexture">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        <g filter="url(#inkTexture)" opacity="0.88">
          {/* Outer ring - slightly uneven */}
          <circle
            cx="65"
            cy="65"
            r="58"
            fill="none"
            stroke="#1E3A5F"
            strokeWidth="5"
          />

          {/* Inner ring */}
          <circle
            cx="65"
            cy="65"
            r="48"
            fill="none"
            stroke="#1E3A5F"
            strokeWidth="2.5"
          />

          {/* Country name curved at top */}
          <path
            id="topArcStamp"
            d="M 18 65 A 47 47 0 0 1 112 65"
            fill="none"
          />
          <text
            fill="#1E3A5F"
            fontSize="12"
            fontWeight="bold"
            fontFamily="serif"
          >
            <textPath href="#topArcStamp" startOffset="50%" textAnchor="middle">
              {country.toUpperCase()}
            </textPath>
          </text>

          {/* Flag stripe in center */}
          <rect
            x="30"
            y="52"
            width="70"
            height="22"
            fill={`url(#${gradientId})`}
            opacity="0.9"
          />

          {/* Frog silhouette */}
          <g transform="translate(50, 44)">
            <ellipse cx="15" cy="10" rx="12" ry="7" fill="#1E3A5F" />
            <circle cx="6" cy="5" r="4" fill="#1E3A5F" />
            <circle cx="24" cy="5" r="4" fill="#1E3A5F" />
          </g>

          {/* "FIELD POST" at bottom */}
          <path
            id="bottomArcStamp"
            d="M 18 65 A 47 47 0 0 0 112 65"
            fill="none"
          />
          <text
            fill="#1E3A5F"
            fontSize="10"
            fontFamily="serif"
            letterSpacing="2"
          >
            <textPath href="#bottomArcStamp" startOffset="50%" textAnchor="middle">
              FIELD POST • ASA
            </textPath>
          </text>
        </g>
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
    <div
      className="min-h-screen pb-24"
      style={{
        // Kraft paper with more visible grain
        backgroundColor: '#C9B896',
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"),
          linear-gradient(180deg,
            rgba(160, 140, 100, 0.2) 0%,
            transparent 15%,
            transparent 85%,
            rgba(100, 80, 50, 0.15) 100%
          )
        `,
        backgroundBlendMode: 'multiply, normal',
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          HEADER - Leather envelope top
          ───────────────────────────────────────────────────────────── */}
      <header className="relative texture-leather text-white">
        <div className="airmail-stripe" />

        <div className="px-5 pt-6 pb-8 relative">
          {/* Back button */}
          <button
            onClick={() => navigate('/dispatches')}
            className="flex items-center gap-2 text-amber-200/80 hover:text-amber-100 transition-colors mb-6"
            style={{ fontFamily: "'Special Elite', monospace", fontSize: '13px' }}
          >
            ← ALL DISPATCHES
          </button>

          {/* Title label - stuck on like a shipping label */}
          <div
            className="paper-parchment p-4 relative mr-28"
            style={{
              transform: 'rotate(-0.8deg)',
              boxShadow: '3px 4px 10px rgba(0,0,0,0.35)',
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
          <div className="absolute top-14 right-3">
            <InkStamp
              country={dispatch.location.country}
              flagColors={dispatch.location.flagColors}
            />
          </div>

          {/* MarshMellow peeking from corner */}
          <div className="absolute -bottom-6 right-6 z-20">
            <MarshMellow pose="reading" size="sm" />
          </div>
        </div>

        <div className="airmail-stripe" />
      </header>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT - Journal pages
          ───────────────────────────────────────────────────────────── */}
      <main className="pt-10 pb-8">
        {/* Hero photo with photo corners */}
        {heroImage && (
          <section className="px-4 mb-10">
            <MountedPhoto
              src={`${basePath}/${heroImage.src}`}
              alt={dispatch.species.commonName}
              caption={heroImage.caption}
              rotation={-2.5}
            />
          </section>
        )}

        {/* Species specimen card */}
        <section className="mb-10">
          <SpecimenCard dispatch={dispatch} />
        </section>

        {/* Introduction text */}
        <section className="px-6 mb-10">
          <p
            className="text-stone-700 leading-relaxed"
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: '16px',
              lineHeight: '1.85',
            }}
          >
            {dispatch.content.intro}
          </p>
        </section>

        {/* Detail photo if exists */}
        {detailImage && (
          <section className="px-4 mb-10">
            <MountedPhoto
              src={`${basePath}/${detailImage.src}`}
              alt={detailImage.caption || 'Detail photo'}
              caption={detailImage.caption}
              rotation={2}
            />
          </section>
        )}

        {/* Amazing Facts - aged paper scraps with pushpins */}
        <section className="px-4 mb-10">
          <h2
            className="text-xl text-stone-800 mb-5 ml-2"
            style={{ fontFamily: "'Lilita One', cursive" }}
          >
            Amazing Facts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {dispatch.content.facts.map((fact, index) => (
              <FactCard
                key={index}
                title={fact.title}
                text={fact.text}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Field Notes - proper notebook paper */}
        <section className="mb-10">
          <FieldNotesPage text={dispatch.content.fieldNote} />
        </section>

        {/* Meet the Researcher - polaroid + sticky note */}
        {researcherImage && (
          <section className="px-5 mb-12">
            <h2
              className="text-xl text-stone-800 mb-5"
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

        {/* Mission Complete - with ink stamp */}
        <section className="px-4 mt-14">
          <div
            className="p-6 text-center relative"
            style={{
              background: `
                repeating-linear-gradient(
                  transparent,
                  transparent 27px,
                  rgba(200, 190, 170, 0.3) 27px,
                  rgba(200, 190, 170, 0.3) 28px
                ),
                linear-gradient(135deg, #f8f4eb 0%, #f5f0e4 100%)
              `,
              boxShadow: '0 4px 16px rgba(60, 40, 20, 0.2)',
            }}
          >
            {/* Decorative border */}
            <div
              className="absolute inset-3 border-2 border-dashed pointer-events-none"
              style={{ borderColor: '#C9B896' }}
            />

            <h3
              className="text-2xl text-stone-800 mb-2"
              style={{ fontFamily: "'Lilita One', cursive" }}
            >
              Mission Complete!
            </h3>

            <p
              className="text-stone-600 mb-6"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              You've earned a new stamp for your passport
            </p>

            {/* Animated stamp */}
            <div className="flex justify-center mb-6">
              <InkStamp
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sm transition-colors border-2 border-stone-400 text-stone-600 hover:border-stone-500 hover:text-stone-700"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                More Dispatches →
              </Link>
            </div>
          </div>
        </section>

        {/* Photo credits - typewriter style, small */}
        <footer className="px-6 mt-8 text-center">
          <p
            className="text-stone-400 text-[11px] tracking-wide"
            style={{ fontFamily: "'Special Elite', monospace" }}
          >
            PHOTOS: {dispatch.photoCredits.join(' • ')}
          </p>
        </footer>
      </main>
    </div>
  );
}

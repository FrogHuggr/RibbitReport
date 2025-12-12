import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useProgress, useStamps } from '../hooks';
import { IconChevronLeft, IconChevronRight, IconStatusDot, IconMapPin, IconCheck, IconAward } from '../components/ui';
import { MarshMellow } from '../components/MarshMellow';

// Import dispatch data - we'll make this dynamic later
import indiaDispatch from '../data/dispatches/india-resplendent-grass-frog.json';

// Type definitions
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

// Dispatch registry - add new dispatches here
const DISPATCHES: Record<string, DispatchData> = {
  'india-resplendent-grass-frog': indiaDispatch as DispatchData,
};

// Conservation status labels
const STATUS_LABELS: Record<string, string> = {
  'CR': 'Critically Endangered',
  'EN': 'Endangered',
  'VU': 'Vulnerable',
  'NT': 'Near Threatened',
  'LC': 'Least Concern',
  'DD': 'Data Deficient',
};

// Flag-colored postage stamp component
function FlagStamp({ country, flagColors, collected }: { country: string; flagColors: string[]; collected: boolean }) {
  const [color1, color2, color3] = flagColors;

  return (
    <div className="relative">
      <svg width="80" height="96" viewBox="0 0 80 96" className="drop-shadow-lg">
        <defs>
          <clipPath id="stamp-edge-detail">
            <path d="
              M 5 0
              Q 8 3, 11 0 Q 14 3, 17 0 Q 20 3, 23 0 Q 26 3, 29 0 Q 32 3, 35 0
              Q 38 3, 41 0 Q 44 3, 47 0 Q 50 3, 53 0 Q 56 3, 59 0 Q 62 3, 65 0
              Q 68 3, 71 0 Q 74 3, 77 0
              L 80 0 L 80 5
              Q 77 8, 80 11 Q 77 14, 80 17 Q 77 20, 80 23 Q 77 26, 80 29
              Q 77 32, 80 35 Q 77 38, 80 41 Q 77 44, 80 47 Q 77 50, 80 53
              Q 77 56, 80 59 Q 77 62, 80 65 Q 77 68, 80 71 Q 77 74, 80 77
              Q 77 80, 80 83 Q 77 86, 80 89 Q 77 92, 80 95
              L 80 96
              L 75 96
              Q 72 93, 69 96 Q 66 93, 63 96 Q 60 93, 57 96 Q 54 93, 51 96
              Q 48 93, 45 96 Q 42 93, 39 96 Q 36 93, 33 96 Q 30 93, 27 96
              Q 24 93, 21 96 Q 18 93, 15 96 Q 12 93, 9 96 Q 6 93, 3 96
              L 0 96 L 0 91
              Q 3 88, 0 85 Q 3 82, 0 79 Q 3 76, 0 73 Q 3 70, 0 67
              Q 3 64, 0 61 Q 3 58, 0 55 Q 3 52, 0 49 Q 3 46, 0 43
              Q 3 40, 0 37 Q 3 34, 0 31 Q 3 28, 0 25 Q 3 22, 0 19
              Q 3 16, 0 13 Q 3 10, 0 7 Q 3 4, 0 1
              L 0 0 Z
            " />
          </clipPath>
          {/* Flag gradient */}
          <linearGradient id="flag-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color1} />
            <stop offset="33%" stopColor={color1} />
            <stop offset="33%" stopColor={color2} />
            <stop offset="66%" stopColor={color2} />
            <stop offset="66%" stopColor={color3} />
            <stop offset="100%" stopColor={color3} />
          </linearGradient>
        </defs>

        {/* Stamp background with flag colors */}
        <rect
          x="0" y="0" width="80" height="96"
          fill={collected ? "url(#flag-gradient)" : '#E5E7EB'}
          clipPath="url(#stamp-edge-detail)"
        />

        {/* Inner decorative border */}
        <rect
          x="6" y="6" width="68" height="84"
          fill="none"
          stroke={collected ? 'rgba(255,255,255,0.5)' : '#D1D5DB'}
          strokeWidth="2"
          rx="2"
        />

        {/* Country name */}
        <text
          x="40" y="30"
          textAnchor="middle"
          fill={collected ? 'white' : '#9CA3AF'}
          fontSize="11"
          fontWeight="bold"
          fontFamily="serif"
          style={{ textShadow: collected ? '0 1px 2px rgba(0,0,0,0.5)' : 'none' }}
        >
          {country.toUpperCase()}
        </text>

        {/* Frog silhouette */}
        <g transform="translate(28, 38)">
          <path
            d="M12 0C8 0 5 3 5 6C2 6 0 8 0 11C0 14 3 16 6 16C6 19 9 22 12 22C15 22 18 19 18 16C21 16 24 14 24 11C24 8 22 6 19 6C19 3 16 0 12 0Z"
            fill={collected ? 'rgba(255,255,255,0.9)' : '#D1D5DB'}
            style={{ filter: collected ? 'drop-shadow(0 1px 1px rgba(0,0,0,0.3))' : 'none' }}
          />
        </g>

        {/* Decorative text */}
        <text
          x="40" y="72"
          textAnchor="middle"
          fill={collected ? 'rgba(255,255,255,0.8)' : '#9CA3AF'}
          fontSize="7"
          fontFamily="serif"
          letterSpacing="1"
          style={{ textShadow: collected ? '0 1px 1px rgba(0,0,0,0.3)' : 'none' }}
        >
          FIELD POST
        </text>

        <text
          x="40" y="84"
          textAnchor="middle"
          fill={collected ? 'rgba(255,255,255,0.7)' : '#9CA3AF'}
          fontSize="8"
          fontFamily="serif"
          style={{ textShadow: collected ? '0 1px 1px rgba(0,0,0,0.3)' : 'none' }}
        >
          ASA
        </text>

        {/* Postmark when collected */}
        {collected && (
          <g opacity="0.5">
            <circle cx="60" cy="20" r="15" fill="none" stroke="#1F2937" strokeWidth="2" />
            <line x1="45" y1="20" x2="75" y2="20" stroke="#1F2937" strokeWidth="1" />
            <line x1="45" y1="16" x2="75" y2="16" stroke="#1F2937" strokeWidth="0.5" />
            <line x1="45" y1="24" x2="75" y2="24" stroke="#1F2937" strokeWidth="0.5" />
          </g>
        )}
      </svg>
    </div>
  );
}

// Airmail stripes
function AirmailStripes() {
  return (
    <div className="flex overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <div key={i} className="flex flex-shrink-0">
          <div className="w-4 h-3 bg-[#C41E3A]" />
          <div className="w-4 h-3 bg-[#1E4B8E]" />
        </div>
      ))}
    </div>
  );
}

// Polaroid-style photo component
function Polaroid({
  src,
  caption,
  credit,
  className = ''
}: {
  src: string;
  caption?: string;
  credit?: string;
  className?: string;
}) {
  return (
    <div className={`${className}`}>
      <div
        className="bg-white p-2 shadow-xl rounded-sm"
        style={{
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}
      >
        <img
          src={src}
          alt={caption || ''}
          className="w-full h-auto rounded-sm"
        />
      </div>
      {(caption || credit) && (
        <div className="mt-2 text-center px-2">
          {caption && (
            <p className="text-sm text-stone-600 leading-snug italic" style={{ fontFamily: 'Georgia, serif' }}>
              {caption}
            </p>
          )}
          {credit && (
            <p className="text-xs text-stone-400 mt-1">
              Photo: {credit}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Interactive Flip Card component for facts
function FlipCard({ title, text, index }: { title: string; text: string; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Card style variations - nature/adventure themed
  const cardStyles = [
    { front: '#2D4A3E', accent: '#7AC143', label: 'DID YOU KNOW?' }, // Deep forest
    { front: '#4A3D2D', accent: '#D4AF37', label: 'FIELD FACT' }, // Rich earth
    { front: '#2D3D4A', accent: '#97B3CA', label: 'DISCOVERY' }, // Deep slate
  ];
  const style = cardStyles[index % cardStyles.length];

  return (
    <div
      className="flip-card-container cursor-pointer h-48"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setIsFlipped(!isFlipped)}
      aria-label={`Flip card: ${title}`}
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Front of card */}
        <div
          className="flip-card-face p-5 flex flex-col items-center justify-center text-center overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${style.front} 0%, ${style.front}ee 100%)`,
            boxShadow: '0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          {/* Decorative top label */}
          <span
            className="text-[9px] tracking-[0.2em] font-bold mb-3 px-3 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)' }}
          >
            {style.label}
          </span>

          <h4 className="font-bold text-white text-lg leading-snug mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            {title}
          </h4>

          {/* Tap indicator */}
          <div className="mt-auto flex items-center gap-2 text-white/50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span className="text-xs">Tap to reveal</span>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="flip-card-face flip-card-back p-5 flex flex-col overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #FFFEF7 0%, #F8F4EA 100%)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            borderLeft: `5px solid ${style.accent}`,
          }}
        >
          <h4 className="font-bold text-stone-800 text-sm mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            {title}
          </h4>
          <p className="text-sm text-stone-600 leading-relaxed flex-1 overflow-y-auto">
            {text}
          </p>
          <p className="text-stone-400 text-xs mt-3 text-right flex items-center justify-end gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            Tap to flip
          </p>
        </div>
      </div>
    </div>
  );
}

export function DispatchDetail() {
  const { dispatchId } = useParams();
  const navigate = useNavigate();
  const { markArticleComplete, isArticleComplete } = useProgress();
  const { addStamp, hasStamp } = useStamps();

  const dispatch = dispatchId ? DISPATCHES[dispatchId] : null;

  // Mark as complete and add stamp when viewing
  useEffect(() => {
    if (dispatch && !isArticleComplete(dispatch.id)) {
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
    }
  }, [dispatch, isArticleComplete, markArticleComplete, hasStamp, addStamp]);

  if (!dispatch) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8" style={{
        background: 'linear-gradient(180deg, #2C1810 0%, #3D2317 100%)',
      }}>
        <MarshMellow pose="lost" size="lg" className="mb-6 opacity-80" />
        <h2 className="text-xl text-amber-100 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          Dispatch Not Found
        </h2>
        <p className="text-amber-200/60 text-sm mb-6">
          This dispatch seems to have gotten lost in the mail...
        </p>
        <Link
          to="/dispatches"
          className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-amber-50 transition-colors"
        >
          <IconChevronLeft size={16} />
          Back to Dispatches
        </Link>
      </div>
    );
  }

  const heroImage = dispatch.images.find(img => img.type === 'hero');
  const detailImage = dispatch.images.find(img => img.type === 'detail');
  const fieldImages = dispatch.images.filter(img => img.type === 'field');
  const researcherImage = dispatch.images.find(img => img.type === 'researcher');
  const basePath = `/images/dispatches/${dispatch.id}`;

  return (
    <div className="min-h-screen pb-24" style={{
      background: 'linear-gradient(180deg, #2C1810 0%, #3D2317 15%, #F5F0E6 15%, #F5F0E6 100%)',
    }}>
      {/* Header - Envelope style with improved readability */}
      <header className="relative" style={{
        background: 'linear-gradient(135deg, #2C1810 0%, #3D2317 100%)',
      }}>
        <div className="px-5 pt-12 pb-8">
          {/* Back button and stamp */}
          <div className="flex items-start justify-between mb-6">
            <button
              onClick={() => navigate('/dispatches')}
              className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full text-amber-100 hover:bg-black/40 transition-colors"
            >
              <IconChevronLeft size={18} />
              <span className="text-sm font-medium">All Dispatches</span>
            </button>

            <FlagStamp
              country={dispatch.location.country}
              flagColors={dispatch.location.flagColors}
              collected={hasStamp(dispatch.id)}
            />
          </div>

          {/* Title card - parchment style overlay for readability */}
          <div className="mr-20 rounded-lg p-4" style={{
            background: 'linear-gradient(135deg, rgba(253,248,243,0.95) 0%, rgba(245,230,211,0.95) 100%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}>
            <p className="text-amber-700 text-xs tracking-[0.15em] uppercase mb-1 font-semibold">
              Field Dispatch  •  {dispatch.location.region}
            </p>
            <h1 className="text-2xl sm:text-3xl text-stone-800 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              {dispatch.title}
            </h1>
            <p className="text-stone-600 text-lg mt-1 italic" style={{ fontFamily: 'Georgia, serif' }}>
              {dispatch.subtitle}
            </p>
          </div>
        </div>

        {/* Airmail border */}
        <AirmailStripes />
      </header>

      {/* Main content - Letter/Journal style */}
      <main className="px-5 py-6 -mt-1">
        {/* Hero photo - Polaroid style */}
        {heroImage && (
          <div className="flex justify-center mb-8">
            <Polaroid
              src={`${basePath}/${heroImage.src}`}
              caption={heroImage.caption}
              credit={heroImage.credit}
              className="max-w-md w-full"
            />
          </div>
        )}

        {/* Species Field Card - Vintage Specimen Tag Style */}
        <div className="rounded-lg overflow-hidden shadow-xl mb-8 relative" style={{
          background: 'linear-gradient(135deg, #FFFEF7 0%, #F5ECD8 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          border: '2px solid #D4A574',
        }}>
          {/* Specimen tag header with hole punch effect */}
          <div className="relative px-4 py-3 border-b-2 border-dashed border-amber-300" style={{
            background: 'linear-gradient(90deg, #E8DCC8 0%, #F5ECD8 100%)',
          }}>
            {/* Hole punch */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-amber-400 bg-amber-100" />

            <div className="ml-8 flex items-center justify-between">
              <div>
                <span className="text-amber-800 font-bold text-xs tracking-[0.2em] uppercase" style={{ fontFamily: 'Georgia, serif' }}>
                  FIELD SPECIMEN
                </span>
                <span className="text-amber-600 text-xs ml-2">#{dispatch.id.split('-').pop()?.toUpperCase()}</span>
              </div>
              {/* Conservation status badge */}
              <div className="flex items-center gap-1.5 px-2 py-1 rounded border" style={{
                borderColor: dispatch.species.status === 'CR' ? '#DC2626' : dispatch.species.status === 'EN' ? '#EA580C' : '#65A30D',
                background: dispatch.species.status === 'CR' ? '#FEF2F2' : dispatch.species.status === 'EN' ? '#FFF7ED' : '#F7FEE7',
              }}>
                <IconStatusDot status={dispatch.species.status} />
                <span className="text-xs font-bold" style={{
                  color: dispatch.species.status === 'CR' ? '#DC2626' : dispatch.species.status === 'EN' ? '#EA580C' : '#65A30D',
                }}>
                  {STATUS_LABELS[dispatch.species.status] || dispatch.species.status}
                </span>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="p-4">
            {/* Species name - typewriter style */}
            <div className="mb-4">
              <p className="text-[10px] text-amber-700 uppercase tracking-wider mb-1 font-semibold">Common Name</p>
              <h3 className="text-xl font-bold text-stone-800" style={{ fontFamily: 'Georgia, serif' }}>
                {dispatch.species.commonName}
              </h3>
              <p className="text-sm text-stone-500 italic mt-0.5" style={{ fontFamily: 'Georgia, serif' }}>
                {dispatch.species.scientificName}
              </p>
            </div>

            {/* Location grid */}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-amber-200">
              <div>
                <p className="text-[10px] text-amber-700 uppercase tracking-wider mb-0.5 font-semibold">Location</p>
                <div className="flex items-center gap-1.5 text-stone-700">
                  <IconMapPin size={14} className="text-amber-600" />
                  <span className="text-sm font-medium">{dispatch.location.region}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-amber-700 uppercase tracking-wider mb-0.5 font-semibold">Country</p>
                <span className="text-sm font-medium text-stone-700">{dispatch.location.country}</span>
              </div>
            </div>

            {dispatch.species.range.length > 1 && (
              <p className="text-xs text-stone-500 mt-3 pt-2 border-t border-amber-200">
                <span className="font-semibold">Range:</span> {dispatch.species.range.join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* Introduction text */}
        <div className="mb-8 relative">
          <div className="absolute -left-2 top-0 w-1 h-full rounded-full" style={{
            background: 'linear-gradient(180deg, #7AC143 0%, #5A9A2F 100%)',
          }} />
          <p className="text-lg text-stone-700 leading-relaxed pl-4" style={{ fontFamily: 'Georgia, serif' }}>
            {dispatch.content.intro}
          </p>
        </div>

        {/* Detail photo if exists */}
        {detailImage && (
          <div className="flex justify-center mb-8">
            <Polaroid
              src={`${basePath}/${detailImage.src}`}
              caption={detailImage.caption}
              credit={detailImage.credit}
              className="max-w-sm w-full"
            />
          </div>
        )}

        {/* Fun Facts section - Interactive Flip Cards */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
            }}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-xl text-stone-800" style={{ fontFamily: 'Georgia, serif' }}>
              Amazing Facts
            </h2>
          </div>
          <p className="text-sm text-stone-500 mb-4 ml-11">Tap each card to discover something amazing!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dispatch.content.facts.map((fact, index) => (
              <FlipCard key={index} title={fact.title} text={fact.text} index={index} />
            ))}
          </div>
        </section>

        {/* Field photos if any */}
        {fieldImages.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #97B3CA 0%, #7A9BB5 100%)',
              }}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-xl text-stone-800" style={{ fontFamily: 'Georgia, serif' }}>
                From the Field
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {fieldImages.map((img, index) => (
                <Polaroid
                  key={index}
                  src={`${basePath}/${img.src}`}
                  caption={img.caption}
                  credit={img.credit}
                  className="w-full"
                />
              ))}
            </div>
          </section>
        )}

        {/* Conservation Field Note */}
        <section className="mb-8">
          <div className="rounded-xl overflow-hidden" style={{
            background: 'linear-gradient(135deg, #FDF8F3 0%, #F5E6D3 100%)',
            boxShadow: '0 4px 20px rgba(139, 90, 43, 0.15)',
          }}>
            {/* Header bar */}
            <div className="px-5 py-3 flex items-center gap-3" style={{
              background: 'linear-gradient(90deg, #5D6B4D 0%, #4A5A3D 100%)',
              borderBottom: '3px solid #7AC143',
            }}>
              {/* Clipboard icon */}
              <svg className="w-5 h-5 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-amber-100 text-xs font-bold tracking-[0.15em] uppercase">
                Field Note
              </p>
            </div>

            {/* Content */}
            <div className="p-5 relative">
              {/* Decorative corner flourish */}
              <div className="absolute bottom-3 right-3 opacity-10">
                <svg className="w-12 h-12 text-amber-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>

              <p className="text-stone-700 leading-relaxed relative z-10 text-[15px]" style={{ fontFamily: 'Georgia, serif' }}>
                {dispatch.content.fieldNote}
              </p>
            </div>
          </div>
        </section>

        {/* Meet the Researcher */}
        <section className="mb-8">
          <div className="rounded-xl overflow-hidden shadow-xl" style={{
            background: 'linear-gradient(135deg, #FFFEF7 0%, #FBF8F1 100%)',
          }}>
            {/* Header */}
            <div className="px-4 py-3" style={{
              background: 'linear-gradient(90deg, #97B3CA 0%, #7A9BB5 100%)',
            }}>
              <span className="text-white font-bold text-sm tracking-wide uppercase">
                Meet the Researcher
              </span>
            </div>

            <div className="p-4 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              {/* Researcher photo */}
              {researcherImage && (
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={`${basePath}/${researcherImage.src}`}
                      alt={dispatch.researcher.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-stone-800" style={{ fontFamily: 'Georgia, serif' }}>
                  {dispatch.researcher.name}
                </h3>
                {dispatch.researcher.organization && (
                  <p className="text-sm text-stone-500">
                    {dispatch.researcher.organization}
                  </p>
                )}
                <blockquote className="mt-3 text-stone-600 italic leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                  "{dispatch.researcher.quote}"
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Complete - Achievement Card */}
        <div className="rounded-xl overflow-hidden shadow-xl" style={{
          background: 'linear-gradient(145deg, #F8F4EA 0%, #EDE8DC 100%)',
          border: '2px solid #D4AF37',
        }}>
          {/* Header with achievement ribbon */}
          <div className="relative py-4 px-6" style={{
            background: 'linear-gradient(135deg, #2D4A3E 0%, #1F3A2F 100%)',
          }}>
            {/* Ribbon corners */}
            <div className="absolute left-0 bottom-0 w-0 h-0" style={{
              borderLeft: '12px solid transparent',
              borderTop: '12px solid #1F3A2F',
            }} />
            <div className="absolute right-0 bottom-0 w-0 h-0" style={{
              borderRight: '12px solid transparent',
              borderTop: '12px solid #1F3A2F',
            }} />

            <div className="flex items-center justify-center gap-3">
              {/* Checkmark badge */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #7AC143 0%, #5A9A2F 100%)',
                boxShadow: '0 2px 8px rgba(122, 193, 67, 0.4)',
              }}>
                <IconCheck size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg text-white font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                  Mission Complete
                </h3>
                <p className="text-amber-200/80 text-xs tracking-wider">
                  FIELD DISPATCH RECEIVED
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 text-center">
            {/* Stamp earned display */}
            <div className="mb-5">
              <p className="text-stone-500 text-sm mb-2">You've earned a new stamp!</p>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-lg" style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(184,134,11,0.1) 100%)',
                border: '2px solid #D4AF37',
              }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                }}>
                  <IconAward size={24} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="text-stone-800 font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                    {dispatch.location.country}
                  </p>
                  <p className="text-stone-500 text-xs">Added to your Explorer's Passport</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/passport"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                  color: '#2C1810',
                  boxShadow: '0 4px 15px rgba(212,175,55,0.3)',
                }}
              >
                <IconAward size={18} />
                View Passport
              </Link>
              <Link
                to="/dispatches"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
                style={{
                  background: 'linear-gradient(135deg, #2D4A3E 0%, #1F3A2F 100%)',
                  color: '#F5F0E6',
                }}
              >
                More Dispatches
                <IconChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Photo credits */}
        <div className="mt-6 text-center">
          <p className="text-xs text-stone-400">
            Photos: {dispatch.photoCredits.join(', ')}
          </p>
        </div>
      </main>
    </div>
  );
}

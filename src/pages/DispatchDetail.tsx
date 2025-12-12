import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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

// Fact card component - adventure/nature colors
function FactCard({ title, text, index }: { title: string; text: string; index: number }) {
  // Earthy, adventure-themed colors
  const cardStyles = [
    { bg: 'linear-gradient(135deg, #FDF8F3 0%, #F5E6D3 100%)', border: '#D4A574' }, // Parchment/tan
    { bg: 'linear-gradient(135deg, #F0F7F4 0%, #D4E6DC 100%)', border: '#7AC143' }, // Sage green
    { bg: 'linear-gradient(135deg, #FEF9E7 0%, #F7ECD0 100%)', border: '#D4AF37' }, // Gold/wheat
  ];
  const style = cardStyles[index % cardStyles.length];

  return (
    <div
      className="rounded-xl p-4 shadow-md relative overflow-hidden border-l-4"
      style={{
        background: style.bg,
        borderLeftColor: style.border,
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      }}
    >
      <h4 className="font-bold text-stone-800 text-base mb-2" style={{ fontFamily: 'Georgia, serif' }}>
        {title}
      </h4>
      <p className="text-sm text-stone-600 leading-relaxed">
        {text}
      </p>
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
      {/* Header - Envelope style */}
      <header className="relative" style={{
        background: 'linear-gradient(135deg, #2C1810 0%, #3D2317 100%)',
      }}>
        <div className="px-5 pt-12 pb-6">
          {/* Back button and stamp */}
          <div className="flex items-start justify-between mb-4">
            <button
              onClick={() => navigate('/dispatches')}
              className="flex items-center gap-2 text-amber-200/70 hover:text-amber-200 transition-colors"
            >
              <IconChevronLeft size={20} />
              <span className="text-sm font-medium">All Dispatches</span>
            </button>

            <FlagStamp
              country={dispatch.location.country}
              flagColors={dispatch.location.flagColors}
              collected={hasStamp(dispatch.id)}
            />
          </div>

          {/* Title area */}
          <div className="pr-24">
            <p className="text-amber-400/60 text-xs tracking-[0.15em] uppercase mb-1">
              Field Dispatch • {dispatch.location.region}
            </p>
            <h1 className="text-2xl sm:text-3xl text-amber-100 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              {dispatch.title}
            </h1>
            <p className="text-amber-200/60 text-lg mt-1 italic" style={{ fontFamily: 'Georgia, serif' }}>
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

        {/* Species Field Card */}
        <div className="rounded-xl overflow-hidden shadow-xl mb-8" style={{
          background: 'linear-gradient(135deg, #FFFEF7 0%, #FBF8F1 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}>
          {/* Field card header */}
          <div className="px-4 py-3 flex items-center gap-2" style={{
            background: 'linear-gradient(90deg, #7AC143 0%, #5A9A2F 100%)',
          }}>
            <span className="text-xl">🐸</span>
            <span className="text-white font-bold text-sm tracking-wide uppercase">Field Card</span>
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-[10px] text-stone-400 uppercase tracking-wider mb-0.5">Species</p>
                <h3 className="text-lg font-bold text-stone-800" style={{ fontFamily: 'Georgia, serif' }}>
                  {dispatch.species.commonName}
                </h3>
                <p className="text-sm text-stone-500 italic">
                  {dispatch.species.scientificName}
                </p>
              </div>

              {/* Status badge */}
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-lg">
                  <IconStatusDot status={dispatch.species.status} />
                  <span className="text-xs font-semibold text-stone-700">
                    {STATUS_LABELS[dispatch.species.status] || dispatch.species.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mt-3 pt-3 border-t border-stone-200">
              <div className="flex items-center gap-2 text-stone-600">
                <IconMapPin size={14} className="text-stone-400" />
                <span className="text-sm">
                  {dispatch.location.region}, {dispatch.location.country}
                </span>
              </div>
              {dispatch.species.range.length > 1 && (
                <p className="text-xs text-stone-400 mt-1 ml-6">
                  Also found in: {dispatch.species.range.filter(r => r !== dispatch.location.country).join(', ')}
                </p>
              )}
            </div>
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

        {/* Fun Facts section */}
        <section className="mb-8">
          <h2 className="text-xl text-stone-800 mb-4 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
            <span className="text-2xl">🔍</span> Amazing Facts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dispatch.content.facts.map((fact, index) => (
              <FactCard key={index} title={fact.title} text={fact.text} index={index} />
            ))}
          </div>
        </section>

        {/* Field photos if any */}
        {fieldImages.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl text-stone-800 mb-4 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
              <span className="text-2xl">📸</span> From the Field
            </h2>
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

        {/* Conservation Note */}
        <section className="mb-8">
          <div className="rounded-xl p-5 relative overflow-hidden border border-amber-200" style={{
            background: 'linear-gradient(135deg, #FDF8F3 0%, #F5E6D3 100%)',
          }}>
            {/* Decorative leaf/nature corner */}
            <div className="absolute top-3 right-3 text-3xl opacity-20">
              🌿
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">📋</span>
              <p className="text-amber-800 text-xs font-bold tracking-[0.15em] uppercase">
                Field Note
              </p>
            </div>
            <p className="text-stone-700 leading-relaxed relative z-10" style={{ fontFamily: 'Georgia, serif' }}>
              {dispatch.content.fieldNote}
            </p>
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

        {/* Stamp earned notification */}
        <div className="rounded-xl p-5 text-center" style={{
          background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        }}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #7AC143 0%, #5A9A2F 100%)',
            }}>
              <IconCheck size={20} className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
              Dispatch Complete!
            </h3>
          </div>

          <p className="text-sm text-amber-800/70 mb-4">
            You've earned the <strong>{dispatch.location.country}</strong> stamp for your passport!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/passport"
              className="inline-flex items-center justify-center gap-2 bg-amber-900 text-amber-100 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-amber-800 transition-colors"
            >
              <IconAward size={16} />
              View Passport
            </Link>
            <Link
              to="/dispatches"
              className="inline-flex items-center justify-center gap-2 bg-white text-amber-900 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-amber-50 transition-colors border border-amber-300"
            >
              More Dispatches
              <IconChevronRight size={16} />
            </Link>
          </div>
        </div>

        {/* Photo credits */}
        <div className="mt-8 pt-4 border-t border-stone-200">
          <p className="text-xs text-stone-400 text-center">
            Photos: {dispatch.photoCredits.join(', ')}
          </p>
        </div>
      </main>
    </div>
  );
}

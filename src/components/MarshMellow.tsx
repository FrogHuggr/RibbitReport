/**
 * MarshMellow - The Ribbit Report's explorer frog mascot!
 *
 * Available poses:
 * - explorer: Default pose with binoculars and fedora
 * - wave: Friendly greeting wave
 * - celebrating: Excited celebration pose
 * - reading: Reading a book/document
 * - mapPointing: Pointing at a map
 * - thinking: Contemplative pose
 * - stampCollecting: Collecting stamps for passport
 * - searching: Looking/searching for something
 * - lost: Confused or lost expression
 * - sleeping: Sleepy/resting pose
 * - head: Just the head (for tight spaces)
 * - outline: Silhouette version
 */

export type MarshMellowPose =
  | 'explorer'
  | 'wave'
  | 'celebrating'
  | 'reading'
  | 'mapPointing'
  | 'thinking'
  | 'stampCollecting'
  | 'searching'
  | 'lost'
  | 'sleeping'
  | 'head'
  | 'outline';

interface MarshMellowProps {
  pose?: MarshMellowPose;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  alt?: string;
}

const POSE_IMAGES: Record<MarshMellowPose, string> = {
  explorer: '/images/mascot/marshmellow-explorer.png',
  wave: '/images/mascot/marshmellow-wave.png',
  celebrating: '/images/mascot/marshmellow-celebrating.png',
  reading: '/images/mascot/marshmellow-reading.png',
  mapPointing: '/images/mascot/marshmellow-map-pointing.png',
  thinking: '/images/mascot/marshmellow-thinking.png',
  stampCollecting: '/images/mascot/marshmellow-stampcollecting.png',
  searching: '/images/mascot/marshmellow-searching.png',
  lost: '/images/mascot/marshmellow-lost.png',
  sleeping: '/images/mascot/marshmellow-sleeping.png',
  head: '/images/mascot/marshmellow-head.png',
  outline: '/images/mascot/marshmellow-outline.png',
};

const SIZE_CLASSES = {
  sm: 'w-16 h-16',      // 64px - nav, small badges
  md: 'w-32 h-32',      // 128px - empty states, cards
  lg: 'w-48 h-48',      // 192px - featured sections
  xl: 'w-64 h-64',      // 256px - hero areas
  full: 'w-full h-auto', // responsive full width
};

export function MarshMellow({
  pose = 'explorer',
  size = 'md',
  className = '',
  alt = 'MarshMellow the explorer frog'
}: MarshMellowProps) {
  return (
    <img
      src={POSE_IMAGES[pose]}
      alt={alt}
      className={`object-contain ${SIZE_CLASSES[size]} ${className}`}
      loading="lazy"
    />
  );
}

// Convenience components for common use cases
export function MarshMellowHero({ className = '' }: { className?: string }) {
  return (
    <MarshMellow
      pose="explorer"
      size="xl"
      className={`drop-shadow-lg ${className}`}
      alt="MarshMellow welcomes you to The Ribbit Report"
    />
  );
}

export function MarshMellowBadge({ className = '' }: { className?: string }) {
  return (
    <MarshMellow
      pose="explorer"
      size="sm"
      className={className}
      alt="MarshMellow"
    />
  );
}

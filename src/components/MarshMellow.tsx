/**
 * MarshMellow - The Ribbit Report's explorer frog mascot!
 *
 * Available poses (add more as they're created):
 * - explorer: Default pose with binoculars and fedora
 * - (future) waving, celebrating, reading, pointing, thinking, etc.
 */

export type MarshMellowPose = 'explorer';

interface MarshMellowProps {
  pose?: MarshMellowPose;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  alt?: string;
}

const POSE_IMAGES: Record<MarshMellowPose, string> = {
  explorer: '/images/mascot/marshmellow-explorer.png',
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

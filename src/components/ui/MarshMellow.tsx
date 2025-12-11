import type { MarshMellowPose } from '../../types';

interface MarshMellowProps {
  pose: MarshMellowPose;
  size?: 'small' | 'medium' | 'large';
  speech?: string;
  animate?: boolean;
  className?: string;
}

// Placeholder emoji representations for each pose
// Will be replaced with actual artwork
const POSE_EMOJIS: Record<MarshMellowPose, string> = {
  waving: '(^o^)/',
  reading: '(-.-)zzZ',
  celebrating: '\\(^o^)/',
  thinking: '(o.O)',
  pointing: '(^_^)b',
  sleeping: '(-_-)zzZ',
  surprised: '(O.O)!',
  sad: '(T_T)',
};

const SIZE_CLASSES = {
  small: 'w-12 h-12 text-xl',
  medium: 'w-24 h-24 text-3xl',
  large: 'w-40 h-40 text-5xl',
};

export function MarshMellow({
  pose,
  size = 'medium',
  speech,
  animate = false,
  className = '',
}: MarshMellowProps) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {/* Speech bubble */}
      {speech && (
        <div
          className="relative bg-white rounded-2xl px-4 py-2 shadow-md max-w-xs text-center"
          role="note"
          aria-label={`MarshMellow says: ${speech}`}
        >
          <p className="text-sm text-ink font-body">{speech}</p>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 shadow-md" />
        </div>
      )}

      {/* MarshMellow character */}
      <div
        className={`
          ${SIZE_CLASSES[size]}
          flex items-center justify-center
          bg-asa-green rounded-full
          ${animate ? 'animate-bounce' : ''}
        `}
        role="img"
        aria-label={`MarshMellow the frog mascot, ${pose} pose`}
      >
        {/* Placeholder - will be replaced with actual SVG/image */}
        <span className="text-white font-handwritten select-none">
          {POSE_EMOJIS[pose]}
        </span>
      </div>

      {/* Frog body placeholder */}
      <div
        className={`
          ${size === 'small' ? 'h-1' : size === 'medium' ? 'h-2' : 'h-4'}
          w-3/4 bg-asa-green/20 rounded-full -mt-2
        `}
        aria-hidden="true"
      />
    </div>
  );
}

// Pre-configured variants for common use cases
export function MarshMellowWelcome({ message }: { message?: string }) {
  return (
    <MarshMellow
      pose="waving"
      size="large"
      speech={message ?? 'Welcome, explorer!'}
      animate
    />
  );
}

export function MarshMellowLoading() {
  return <MarshMellow pose="reading" size="medium" speech="Loading..." animate />;
}

export function MarshMellowOffline() {
  return (
    <MarshMellow
      pose="sad"
      size="medium"
      speech="Looks like you're offline!"
    />
  );
}

export function MarshMellowError() {
  return (
    <MarshMellow
      pose="surprised"
      size="medium"
      speech="Oops! Something went wrong."
    />
  );
}

export function MarshMellowEmpty({ message }: { message: string }) {
  return <MarshMellow pose="thinking" size="medium" speech={message} />;
}

export function MarshMellowCelebration({ message }: { message?: string }) {
  return (
    <MarshMellow
      pose="celebrating"
      size="large"
      speech={message ?? 'Amazing work!'}
      animate
    />
  );
}

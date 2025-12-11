interface ASALogoProps {
  variant?: 'full' | 'icon' | 'text';
  className?: string;
  color?: 'green' | 'white' | 'grey';
}

export function ASALogo({ variant = 'full', className = '', color = 'green' }: ASALogoProps) {
  const frogColor = color === 'white' ? '#FFFFFF' : '#7AC143';
  const textColor = color === 'white' ? '#FFFFFF' : color === 'green' ? '#7AC143' : '#455560';

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        aria-label="ASA Logo"
      >
        {/* Frog silhouette */}
        <path
          d="M45 15c-8 0-15 4-20 10-3 4-5 8-5 13 0 3 1 6 2 8l-12 8c-2 1-3 4-2 6 1 2 3 3 5 3l15-3c2 4 6 8 10 10l-5 15c-1 2 0 4 2 5 2 1 4 1 5-1l10-12c3 1 6 2 10 2s7-1 10-2l10 12c1 2 3 2 5 1 2-1 3-3 2-5l-5-15c4-2 8-6 10-10l15 3c2 0 4-1 5-3 1-2 0-5-2-6l-12-8c1-2 2-5 2-8 0-5-2-9-5-13-5-6-12-10-20-10-5 0-10 2-15 5-5-3-10-5-15-5z"
          fill={frogColor}
        />
        {/* Eye */}
        <circle cx="35" cy="35" r="5" fill={color === 'white' ? '#7AC143' : '#FFFFFF'} />
      </svg>
    );
  }

  if (variant === 'text') {
    return (
      <svg
        viewBox="0 0 200 60"
        className={className}
        aria-label="Amphibian Survival Alliance"
      >
        <text x="0" y="45" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="400" fill={textColor}>
          asa
        </text>
        <text x="0" y="58" fontFamily="Arial, sans-serif" fontSize="10" fill={textColor}>
          amphibian survival alliance
        </text>
      </svg>
    );
  }

  // Full logo
  return (
    <svg
      viewBox="0 0 300 80"
      className={className}
      aria-label="Amphibian Survival Alliance"
    >
      {/* Frog silhouette */}
      <g transform="translate(0, 5) scale(0.7)">
        <path
          d="M45 10c-12 0-22 5-28 14-4 5-6 11-6 18 0 4 1 8 3 11L0 62c-1 1 0 3 1 4s3 1 4 0l18-12c3 5 8 10 14 13l-6 20c0 2 1 3 2 4 2 0 3 0 4-2l12-18c4 2 9 3 14 3s10-1 14-3l12 18c1 2 2 2 4 2 1-1 2-2 2-4l-6-20c6-3 11-8 14-13l18 12c1 1 3 1 4 0s2-3 1-4l-14-9c2-3 3-7 3-11 0-7-2-13-6-18-6-9-16-14-28-14-7 0-14 2-21 7-7-5-14-7-21-7z"
          fill={frogColor}
        />
      </g>

      {/* Text: asa */}
      <text x="85" y="52" fontFamily="Arial, sans-serif" fontSize="52" fontWeight="400" letterSpacing="-2" fill={textColor}>
        asa
      </text>

      {/* Tagline */}
      <text x="85" y="72" fontFamily="Arial, sans-serif" fontSize="12" letterSpacing="1" fill={textColor}>
        amphibian survival alliance
      </text>
    </svg>
  );
}

// Compact logo for headers
export function ASALogoCompact({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <ASALogo variant="icon" className="w-8 h-8" />
      <span className="font-semibold text-asa-grey text-sm tracking-wide">
        RIBBIT REPORT
      </span>
    </div>
  );
}

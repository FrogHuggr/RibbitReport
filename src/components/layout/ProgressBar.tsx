interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className={`w-full ${className}`} role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-asa-green transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface PageDotsProps {
  current: number;
  total: number;
  onDotClick?: (index: number) => void;
  className?: string;
}

export function PageDots({ current, total, onDotClick, className = '' }: PageDotsProps) {
  return (
    <div
      className={`flex items-center justify-center gap-2 ${className}`}
      role="tablist"
      aria-label={`Page ${current + 1} of ${total}`}
    >
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick?.(index)}
          disabled={!onDotClick}
          className={`
            w-2 h-2 rounded-full transition-all
            ${index === current ? 'bg-asa-green w-4' : 'bg-gray-300'}
            ${onDotClick ? 'cursor-pointer hover:bg-asa-green/70' : 'cursor-default'}
          `}
          role="tab"
          aria-selected={index === current}
          aria-label={`Go to page ${index + 1}`}
        />
      ))}
    </div>
  );
}

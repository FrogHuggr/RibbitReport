import { MarshMellow } from '../ui/MarshMellow';

interface UnknownArticleTypeProps {
  type?: string;
}

export function UnknownArticleType({ type }: UnknownArticleTypeProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <MarshMellow
        pose="thinking"
        size="medium"
        speech={
          type
            ? `Hmm, the "${type}" article type isn't ready yet!`
            : "This article type isn't available yet!"
        }
      />
      <p className="text-sm text-slate mt-4 max-w-xs">
        Check back soon - we're always adding new types of content to explore!
      </p>
    </div>
  );
}

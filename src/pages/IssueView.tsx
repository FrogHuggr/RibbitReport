import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '../components/layout';
import { useProgress } from '../hooks';
import { MarshMellowLoading } from '../components/ui/MarshMellow';

// Placeholder data - will be loaded from JSON
const PLACEHOLDER_ARTICLES = [
  {
    id: 'welcome',
    type: 'welcome-letter',
    title: "MarshMellow's Welcome",
    thumbnail: '🐸',
    readingTime: 2,
  },
  {
    id: 'postcard-karina',
    type: 'field-postcard',
    title: 'Purple Frog Discovery',
    thumbnail: '🇮🇳',
    readingTime: 5,
  },
  {
    id: 'postcard-luis',
    type: 'field-postcard',
    title: 'Glass Frog Adventure',
    thumbnail: '🇪🇨',
    readingTime: 5,
  },
  {
    id: 'myth-frogs-toads',
    type: 'myth-buster',
    title: 'Frogs vs Toads',
    thumbnail: '🤔',
    readingTime: 3,
  },
  {
    id: 'species-axolotl',
    type: 'species-spotlight',
    title: 'Amazing Axolotl',
    thumbnail: '🦎',
    readingTime: 4,
  },
  {
    id: 'quiz-issue-2',
    type: 'quiz',
    title: 'Test Your Knowledge!',
    thumbnail: '❓',
    readingTime: 5,
  },
];

const TYPE_ICONS: Record<string, string> = {
  'welcome-letter': '✉️',
  'field-postcard': '📮',
  'myth-buster': '🔍',
  'species-spotlight': '🔬',
  quiz: '🎯',
  story: '📖',
};

export function IssueView() {
  const { issueNumber } = useParams<{ issueNumber: string }>();
  const { t } = useTranslation();
  const { isArticleComplete, getIssueProgress } = useProgress();

  // TODO: Load issue data from JSON
  const issueId = `issue-${issueNumber}`;
  const progress = getIssueProgress(issueId, PLACEHOLDER_ARTICLES.length);

  if (!issueNumber) {
    return <MarshMellowLoading />;
  }

  return (
    <div className="min-h-screen">
      <Header title={`Issue #${issueNumber}`} showBack />

      {/* Issue header */}
      <div className="pt-16 px-4 pb-4 bg-gradient-to-br from-asa-green to-asa-green/80 text-white">
        <h1 className="font-display text-2xl">Global Explorers</h1>
        <p className="text-sm opacity-80 mt-1">Issue #{issueNumber}</p>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>{t('issue.tableOfContents')}</span>
            <span>
              {progress.completed}/{progress.total} {t('issue.completed').toLowerCase()}
            </span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-asa-gold transition-all"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Article list */}
      <div className="p-4">
        <h2 className="font-display text-lg mb-4">{t('issue.articles')}</h2>

        <div className="space-y-3">
          {PLACEHOLDER_ARTICLES.map((article, index) => {
            const isComplete = isArticleComplete(article.id);

            return (
              <Link
                key={article.id}
                to={`/issue/${issueNumber}/article/${article.id}`}
                className={`
                  block bg-paper rounded-xl p-4 hover:shadow-md transition-shadow
                  ${isComplete ? 'border-l-4 border-asa-green' : ''}
                `}
              >
                <div className="flex items-start gap-4">
                  {/* Thumbnail/emoji */}
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    {article.thumbnail}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm" title={article.type}>
                        {TYPE_ICONS[article.type] || '📄'}
                      </span>
                      <span className="text-xs text-slate uppercase tracking-wide">
                        {article.type.replace('-', ' ')}
                      </span>
                    </div>
                    <h3 className="font-display text-base mt-1 truncate">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate mt-1">
                      {t('issue.readingTime', { minutes: article.readingTime })}
                    </p>
                  </div>

                  {/* Completion indicator */}
                  <div className="flex-shrink-0">
                    {isComplete ? (
                      <div className="w-6 h-6 bg-asa-green rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center text-sm text-slate">
                        {index + 1}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '../components/layout';
import { useProgress, useAnalytics } from '../hooks';
import { MarshMellowLoading, MarshMellowEmpty } from '../components/ui/MarshMellow';
import { getArticleComponent } from '../components/articles';
import { useEffect } from 'react';

export function ArticleView() {
  const { issueNumber, articleId } = useParams<{
    issueNumber: string;
    articleId: string;
  }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { markArticleComplete } = useProgress();
  const { trackEvent } = useAnalytics();

  // Track article view
  useEffect(() => {
    if (articleId && issueNumber) {
      trackEvent('article_view', {
        articleId,
        issueId: `issue-${issueNumber}`,
      });
    }
  }, [articleId, issueNumber, trackEvent]);

  if (!issueNumber || !articleId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <MarshMellowLoading />
      </div>
    );
  }

  // TODO: Load article data from JSON based on articleId
  // For now, show placeholder

  const handleComplete = () => {
    markArticleComplete(articleId, `issue-${issueNumber}`);
    trackEvent('article_complete', {
      articleId,
      issueId: `issue-${issueNumber}`,
    });
  };

  const handleNextArticle = () => {
    // TODO: Get next article from issue data
    navigate(`/issue/${issueNumber}`);
  };

  // Get the article component for this type
  // TODO: This will be dynamic based on loaded article data
  const ArticleComponent = getArticleComponent('unknown');

  return (
    <div className="min-h-screen">
      <Header title="Article" showBack />

      <div className="pt-16 px-4 pb-8">
        {/* Placeholder content */}
        <div className="text-center py-12">
          <MarshMellowEmpty message="Article content coming soon!" />

          <div className="mt-8 p-6 bg-paper rounded-xl">
            <h2 className="font-display text-xl mb-4">Article: {articleId}</h2>
            <p className="text-slate mb-6">
              This is a placeholder for the article content. The actual content
              will be loaded from JSON data files and rendered using the
              appropriate article component.
            </p>

            {/* Article component preview */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6">
              <ArticleComponent type="placeholder" />
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <button
                onClick={handleComplete}
                className="w-full bg-asa-green text-white py-3 rounded-xl font-medium hover:bg-asa-green/90 transition-colors"
              >
                Mark as Complete
              </button>

              <button
                onClick={handleNextArticle}
                className="w-full bg-paper border-2 border-asa-green text-asa-green py-3 rounded-xl font-medium hover:bg-asa-green/10 transition-colors"
              >
                {t('article.backToIssue')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

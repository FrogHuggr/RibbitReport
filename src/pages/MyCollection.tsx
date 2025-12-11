import { useTranslation } from 'react-i18next';
import { Header } from '../components/layout';
import { useStamps, useProgress, useAnalytics } from '../hooks';
import { MarshMellowEmpty } from '../components/ui/MarshMellow';

export function MyCollection() {
  const { t } = useTranslation();
  const { stamps, totalStamps, getStampsByCountry } = useStamps();
  const { progress } = useProgress();
  const { getStats } = useAnalytics();

  const stampsByCountry = getStampsByCountry();
  const stats = getStats();
  const completedArticles = progress.filter((p) => p.completed).length;

  return (
    <div className="min-h-screen">
      <Header title={t('collection.title')} />

      <div className="pt-16 px-4 pb-8">
        {/* Stats overview */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-paper rounded-xl p-4 text-center">
            <p className="text-2xl font-display text-asa-green">{totalStamps}</p>
            <p className="text-xs text-slate mt-1">Stamps</p>
          </div>
          <div className="bg-paper rounded-xl p-4 text-center">
            <p className="text-2xl font-display text-asa-green">
              {completedArticles}
            </p>
            <p className="text-xs text-slate mt-1">Articles Read</p>
          </div>
          <div className="bg-paper rounded-xl p-4 text-center">
            <p className="text-2xl font-display text-asa-green">
              {stats.quizzesCompleted}
            </p>
            <p className="text-xs text-slate mt-1">Quizzes</p>
          </div>
        </div>

        {/* Stamps section */}
        <section>
          <h2 className="font-display text-xl mb-4">{t('collection.stamps')}</h2>

          {totalStamps === 0 ? (
            <div className="py-8">
              <MarshMellowEmpty message={t('collection.noStamps')} />
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(stampsByCountry).map(([country, countryStamps]) => (
                <div key={country} className="bg-paper rounded-xl p-4">
                  <h3 className="font-display text-base mb-3">{country}</h3>
                  <div className="flex flex-wrap gap-3">
                    {countryStamps.map((stamp) => (
                      <div
                        key={stamp.id}
                        className="w-16 h-16 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center"
                      >
                        <span className="text-2xl">{stamp.emoji}</span>
                        <span className="text-xs text-slate mt-1 truncate max-w-full px-1">
                          {stamp.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Progress section */}
        <section className="mt-8">
          <h2 className="font-display text-xl mb-4">{t('collection.progress')}</h2>

          {completedArticles === 0 ? (
            <div className="bg-paper rounded-xl p-6 text-center">
              <p className="text-slate">
                Start reading articles to track your progress!
              </p>
            </div>
          ) : (
            <div className="bg-paper rounded-xl p-4">
              <div className="space-y-3">
                {progress
                  .filter((p) => p.completed)
                  .slice(0, 10)
                  .map((p) => (
                    <div
                      key={p.articleId}
                      className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0"
                    >
                      <div>
                        <p className="font-medium">{p.articleId}</p>
                        <p className="text-xs text-slate">
                          {p.completedAt
                            ? new Date(p.completedAt).toLocaleDateString()
                            : ''}
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-asa-green"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </section>

        {/* Passport-style stamp book (visual representation) */}
        <section className="mt-8">
          <h2 className="font-display text-xl mb-4">Stamp Passport</h2>
          <div className="bg-asa-green/10 rounded-xl p-6 border-2 border-dashed border-asa-green">
            <div className="grid grid-cols-4 gap-4">
              {/* Show collected stamps + empty slots */}
              {stamps.map((stamp) => (
                <div
                  key={stamp.id}
                  className="aspect-square bg-white rounded-lg shadow-md flex items-center justify-center text-3xl transform rotate-[-3deg] hover:rotate-0 transition-transform"
                >
                  {stamp.emoji}
                </div>
              ))}
              {/* Empty slots to show more stamps can be collected */}
              {Array.from({ length: Math.max(0, 8 - stamps.length) }).map(
                (_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"
                  >
                    <span className="text-gray-400 text-2xl">?</span>
                  </div>
                )
              )}
            </div>
            <p className="text-center text-sm text-slate mt-4">
              {t('collection.stampsCollected', { count: totalStamps })}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

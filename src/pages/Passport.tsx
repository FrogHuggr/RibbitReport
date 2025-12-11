import { Link } from 'react-router-dom';
import { useStamps, useProgress, useAnalytics } from '../hooks';

// Achievement definitions
const ACHIEVEMENTS = [
  {
    id: 'first-explorer',
    title: 'First Explorer',
    description: 'Read your first dispatch',
    emoji: '🌟',
    requirement: (stats: { articlesRead: number }) => stats.articlesRead >= 1,
  },
  {
    id: 'stamp-collector',
    title: 'Stamp Collector',
    description: 'Collect 3 stamps',
    emoji: '📮',
    requirement: (stats: { stamps: number }) => stats.stamps >= 3,
  },
  {
    id: 'globe-trotter',
    title: 'Globe Trotter',
    description: 'Visit 5 countries',
    emoji: '🌍',
    requirement: (stats: { stamps: number }) => stats.stamps >= 5,
  },
  {
    id: 'myth-buster',
    title: 'Myth Buster',
    description: 'Learn about frogs vs toads',
    emoji: '🔍',
    requirement: () => false, // Will track myth completion
  },
  {
    id: 'completionist',
    title: 'Completionist',
    description: 'Read all 9 dispatches',
    emoji: '🏆',
    requirement: (stats: { articlesRead: number }) => stats.articlesRead >= 9,
  },
  {
    id: 'super-fan',
    title: 'Amphibian Super Fan',
    description: 'Collect all stamps',
    emoji: '💎',
    requirement: (stats: { stamps: number }) => stats.stamps >= 9,
  },
];

export function Passport() {
  const { stamps, totalStamps, getStampsByCountry } = useStamps();
  const { progress } = useProgress();
  const { getStats } = useAnalytics();

  const completedArticles = progress.filter(p => p.completed).length;
  const stampsByCountry = getStampsByCountry();
  const stats = getStats();

  const userStats = {
    articlesRead: completedArticles,
    stamps: totalStamps,
  };

  const earnedAchievements = ACHIEVEMENTS.filter(a => a.requirement(userStats));
  const unearnedAchievements = ACHIEVEMENTS.filter(a => !a.requirement(userStats));

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header - Passport style */}
      <header className="bg-gradient-to-br from-asa-green-dark to-asa-green pt-8 pb-12 px-5">
        <div className="text-center text-white">
          <div className="inline-block bg-asa-yellow/20 px-4 py-1 rounded-full mb-4">
            <span className="text-xs font-bold text-asa-yellow">OFFICIAL</span>
          </div>
          <h1 className="text-3xl font-display">Explorer's Passport</h1>
          <p className="text-sm opacity-80 mt-2">Amphibian Survival Alliance</p>

          {/* Stats row */}
          <div className="flex justify-center gap-8 mt-6">
            <div>
              <p className="text-3xl font-bold">{totalStamps}</p>
              <p className="text-xs opacity-80">Stamps</p>
            </div>
            <div className="w-px bg-white/20" />
            <div>
              <p className="text-3xl font-bold">{completedArticles}</p>
              <p className="text-xs opacity-80">Dispatches</p>
            </div>
            <div className="w-px bg-white/20" />
            <div>
              <p className="text-3xl font-bold">{earnedAchievements.length}</p>
              <p className="text-xs opacity-80">Badges</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-5 -mt-6">
        {/* Stamps Section */}
        <section className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display text-ink">My Stamps</h2>
            <span className="text-sm text-asa-grey-light">{totalStamps}/9 collected</span>
          </div>

          {totalStamps === 0 ? (
            <div className="text-center py-8">
              <span className="text-5xl">📭</span>
              <p className="text-sm text-asa-grey mt-4">
                No stamps yet! Read Field Dispatches to collect stamps from around the world.
              </p>
              <Link
                to="/dispatches"
                className="inline-block mt-4 bg-asa-green text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-asa-green-dark transition-colors"
              >
                Start Exploring
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {stamps.map((stamp) => (
                <div
                  key={stamp.id}
                  className="stamp animate-stamp-collect"
                >
                  {stamp.emoji}
                </div>
              ))}
              {/* Empty slots */}
              {Array.from({ length: Math.max(0, 9 - stamps.length) }).map((_, i) => (
                <div key={`empty-${i}`} className="stamp stamp--empty">
                  <span className="text-asa-grey/30 text-2xl">?</span>
                </div>
              ))}
            </div>
          )}

          {/* By country breakdown */}
          {Object.keys(stampsByCountry).length > 0 && (
            <div className="mt-6 pt-6 border-t border-asa-grey/10">
              <h3 className="text-sm font-bold text-asa-grey mb-3">Countries Visited</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(stampsByCountry).map(([country, countryStamps]) => (
                  <div
                    key={country}
                    className="bg-paper px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    {countryStamps[0]?.emoji} {country}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Achievements Section */}
        <section className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-display text-ink mb-4">Achievements</h2>

          {/* Earned */}
          {earnedAchievements.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold text-asa-green uppercase tracking-wider mb-3">
                Unlocked ({earnedAchievements.length})
              </h3>
              <div className="space-y-3">
                {earnedAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-4 p-3 bg-asa-green/10 rounded-2xl border-2 border-asa-green"
                  >
                    <div className="w-12 h-12 bg-asa-green rounded-xl flex items-center justify-center text-2xl shadow-md">
                      {achievement.emoji}
                    </div>
                    <div>
                      <h4 className="font-bold text-ink">{achievement.title}</h4>
                      <p className="text-xs text-asa-grey">{achievement.description}</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-asa-green text-xl">✓</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Locked */}
          {unearnedAchievements.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-asa-grey-light uppercase tracking-wider mb-3">
                Locked ({unearnedAchievements.length})
              </h3>
              <div className="space-y-3">
                {unearnedAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-4 p-3 bg-paper/50 rounded-2xl opacity-60"
                  >
                    <div className="w-12 h-12 bg-asa-grey/20 rounded-xl flex items-center justify-center text-2xl">
                      🔒
                    </div>
                    <div>
                      <h4 className="font-bold text-asa-grey">{achievement.title}</h4>
                      <p className="text-xs text-asa-grey-light">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Quick Stats */}
        <section className="bg-gradient-to-br from-asa-blue to-asa-blue-light rounded-3xl p-6 text-white">
          <h2 className="text-lg font-display mb-4">Your Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/20 rounded-2xl p-4">
              <p className="text-2xl font-bold">{stats.articleViews}</p>
              <p className="text-xs opacity-80">Articles Viewed</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-4">
              <p className="text-2xl font-bold">{completedArticles}</p>
              <p className="text-xs opacity-80">Completed</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-4">
              <p className="text-2xl font-bold">{Object.keys(stampsByCountry).length}</p>
              <p className="text-xs opacity-80">Countries</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-4">
              <p className="text-2xl font-bold">{earnedAchievements.length}</p>
              <p className="text-xs opacity-80">Badges</p>
            </div>
          </div>
        </section>

        {/* Motivation */}
        {totalStamps < 9 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-asa-grey">
              🐸 Keep exploring to fill your passport!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

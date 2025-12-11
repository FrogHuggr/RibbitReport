import { useTranslation } from 'react-i18next';
import { Header } from '../components/layout';
import { useAnalytics } from '../hooks';
import { SUPPORTED_LANGUAGES, setLanguage } from '../i18n';
import { MarshMellow } from '../components/ui/MarshMellow';

export function About() {
  const { t, i18n } = useTranslation();
  const { exportAnalytics, getStats } = useAnalytics();

  const stats = getStats();

  const handleLanguageChange = (code: string) => {
    setLanguage(code as 'en');
  };

  return (
    <div className="min-h-screen">
      <Header title={t('about.title')} />

      <div className="pt-16 px-4 pb-8 space-y-6">
        {/* Mascot */}
        <div className="flex justify-center py-4">
          <MarshMellow pose="waving" size="large" />
        </div>

        {/* About ASA */}
        <section className="bg-paper rounded-xl p-6">
          <h2 className="font-display text-lg mb-3">
            {t('about.aboutASA')}
          </h2>
          <p className="text-slate text-sm leading-relaxed">
            The Amphibian Survival Alliance (ASA) is a global partnership working
            to save threatened amphibians and their habitats. We bring together
            researchers, conservationists, and educators from around the world to
            protect these amazing creatures.
          </p>
          <a
            href="https://www.amphibians.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-asa-green font-medium hover:underline"
          >
            Visit ASA Website
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </section>

        {/* About the Magazine */}
        <section className="bg-paper rounded-xl p-6">
          <h2 className="font-display text-lg mb-3">
            {t('about.aboutMagazine')}
          </h2>
          <p className="text-slate text-sm leading-relaxed">
            The Ribbit Report is a digital magazine for young explorers ages 9-12.
            Each issue features stories from real researchers in the field,
            amazing species spotlights, fun quizzes, and myth-busting facts about
            amphibians from around the world.
          </p>
          <p className="text-slate text-sm leading-relaxed mt-3">
            Collect stamps from Field Postcards, track your reading progress, and
            learn how you can help protect amphibians in your own backyard!
          </p>
        </section>

        {/* Settings */}
        <section className="bg-paper rounded-xl p-6">
          <h2 className="font-display text-lg mb-4">{t('about.settings')}</h2>

          {/* Language selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate mb-2">
              {t('about.language')}
            </label>
            <select
              value={i18n.language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 focus:border-asa-green focus:outline-none"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate mt-2">
              More languages coming soon!
            </p>
          </div>

          {/* Export data */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-slate mb-2">Your Data</h3>
            <p className="text-xs text-slate mb-3">
              All your progress and stamps are stored on your device. You can
              export your reading history if you'd like.
            </p>
            <button
              onClick={exportAnalytics}
              className="text-sm text-asa-green font-medium hover:underline"
            >
              Export Reading History
            </button>
          </div>
        </section>

        {/* Stats (for fun) */}
        <section className="bg-asa-green/10 rounded-xl p-6">
          <h2 className="font-display text-lg mb-4">Your Reading Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-display text-asa-green">
                {stats.articleViews}
              </p>
              <p className="text-xs text-slate">Articles Viewed</p>
            </div>
            <div>
              <p className="text-2xl font-display text-asa-green">
                {stats.articlesCompleted}
              </p>
              <p className="text-xs text-slate">Articles Completed</p>
            </div>
            <div>
              <p className="text-2xl font-display text-asa-green">
                {stats.stampsEarned}
              </p>
              <p className="text-xs text-slate">Stamps Earned</p>
            </div>
            <div>
              <p className="text-2xl font-display text-asa-green">
                {stats.avgQuizScore}%
              </p>
              <p className="text-xs text-slate">Avg Quiz Score</p>
            </div>
          </div>
        </section>

        {/* Credits */}
        <section className="text-center text-sm text-slate py-4">
          <p>Made with 💚 by the Amphibian Survival Alliance</p>
          <p className="mt-1">Version 1.0.0</p>
        </section>
      </div>
    </div>
  );
}

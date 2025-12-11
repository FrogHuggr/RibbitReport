import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '../components/layout';
import { MarshMellowEmpty } from '../components/ui/MarshMellow';

type FilterTab = 'species' | 'region' | 'topic';

// Placeholder data - will come from aggregating all articles
const PLACEHOLDER_DATA = {
  species: [
    { id: 'purple-frog', name: 'Purple Frog', emoji: '🟣', articleCount: 1 },
    { id: 'glass-frog', name: 'Glass Frog', emoji: '🪟', articleCount: 1 },
    { id: 'axolotl', name: 'Axolotl', emoji: '🦎', articleCount: 1 },
    { id: 'poison-dart', name: 'Poison Dart Frog', emoji: '🎯', articleCount: 0 },
  ],
  regions: [
    { id: 'india', name: 'India', emoji: '🇮🇳', articleCount: 1 },
    { id: 'ecuador', name: 'Ecuador', emoji: '🇪🇨', articleCount: 1 },
    { id: 'mexico', name: 'Mexico', emoji: '🇲🇽', articleCount: 1 },
    { id: 'madagascar', name: 'Madagascar', emoji: '🇲🇬', articleCount: 0 },
  ],
  topics: [
    { id: 'conservation', name: 'Conservation', emoji: '🌍', articleCount: 3 },
    { id: 'research', name: 'Research', emoji: '🔬', articleCount: 2 },
    { id: 'myths', name: 'Myths & Facts', emoji: '🤔', articleCount: 1 },
    { id: 'habitat', name: 'Habitats', emoji: '🌿', articleCount: 2 },
  ],
};

export function Explore() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<FilterTab>('species');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'species', label: t('explore.bySpecies') },
    { key: 'region', label: t('explore.byRegion') },
    { key: 'topic', label: t('explore.byTopic') },
  ];

  const getData = () => {
    switch (activeTab) {
      case 'species':
        return PLACEHOLDER_DATA.species;
      case 'region':
        return PLACEHOLDER_DATA.regions;
      case 'topic':
        return PLACEHOLDER_DATA.topics;
    }
  };

  const filteredData = getData().filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Header title={t('explore.title')} />

      <div className="pt-16 px-4 pb-8">
        {/* Search bar */}
        <div className="relative mb-4">
          <input
            type="search"
            placeholder={t('explore.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-paper rounded-xl px-4 py-3 pl-10 border-2 border-transparent focus:border-asa-green focus:outline-none transition-colors"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                ${
                  activeTab === tab.key
                    ? 'bg-asa-green text-white'
                    : 'bg-paper text-slate hover:bg-gray-200'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results grid */}
        {filteredData.length === 0 ? (
          <div className="py-8">
            <MarshMellowEmpty message="No results found. Try a different search!" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredData.map((item) => (
              <Link
                key={item.id}
                to={`/explore/${activeTab}/${item.id}`}
                className={`
                  bg-paper rounded-xl p-4 hover:shadow-md transition-shadow
                  ${item.articleCount === 0 ? 'opacity-50' : ''}
                `}
              >
                <div className="text-3xl mb-2">{item.emoji}</div>
                <h3 className="font-display text-sm">{item.name}</h3>
                <p className="text-xs text-slate mt-1">
                  {item.articleCount} {item.articleCount === 1 ? 'article' : 'articles'}
                </p>
              </Link>
            ))}
          </div>
        )}

        {/* Featured section */}
        <section className="mt-8">
          <h2 className="font-display text-lg mb-4">Featured</h2>
          <div className="bg-gradient-to-br from-asa-green to-asa-green/80 rounded-xl p-6 text-white">
            <span className="text-4xl">🐸</span>
            <h3 className="font-display text-xl mt-3">Did You Know?</h3>
            <p className="text-sm opacity-90 mt-2">
              There are over 8,000 species of amphibians in the world, and nearly
              half of them are threatened with extinction!
            </p>
            <Link
              to="/issue/2/article/myth-frogs-toads"
              className="inline-block mt-4 bg-white text-asa-green px-4 py-2 rounded-full text-sm font-medium hover:bg-cream transition-colors"
            >
              Learn More
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

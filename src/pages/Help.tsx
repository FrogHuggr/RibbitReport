import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ASALogo, IconChevronRight, IconChevronLeft, IconMail, IconGlobe, IconLightbulb, IconAward } from '../components/ui';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What is The Ribbit Report?",
    answer: "The Ribbit Report is an educational app created by the Amphibian Survival Alliance (ASA) to help young explorers learn about the amazing world of amphibians. Through stories from real researchers, interactive maps, and fun myth-busting activities, you'll discover the incredible diversity of frogs, salamanders, and caecilians around the world."
  },
  {
    question: "How do I earn stamps?",
    answer: "You earn stamps by reading Field Dispatches from researchers around the world. Each dispatch you complete earns you a stamp from that country. Collect all 9 stamps to become a certified Amphibian Explorer!"
  },
  {
    question: "What are achievements?",
    answer: "Achievements are special badges you can earn by completing various activities in the app. For example, reading your first dispatch earns you the 'First Explorer' badge, while collecting all 9 stamps earns you the 'Amphibian Super Fan' badge."
  },
  {
    question: "Can I use the app offline?",
    answer: "Yes! The Ribbit Report is designed to work offline. Once you've loaded the app, you can access most content without an internet connection. This is perfect for exploring amphibians even when you're out in nature!"
  },
  {
    question: "What does the conservation status mean?",
    answer: "Conservation status tells us how at-risk a species is. The categories range from 'Least Concern' (LC) - species that are doing well, to 'Critically Endangered' (CR) - species that are at very high risk of extinction. Understanding these statuses helps us know which amphibians need the most protection."
  },
  {
    question: "How can I help amphibians?",
    answer: "Great question! You can help by: learning about amphibians and sharing what you learn, never disturbing amphibians in their natural habitat, supporting organizations like ASA that work to protect amphibians, and helping keep local waterways clean."
  },
];

function FAQAccordion({ faq, isOpen, onToggle }: { faq: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-asa-grey/10 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-semibold text-ink pr-4">{faq.question}</span>
        <IconChevronRight
          size={20}
          className={`text-asa-grey-light flex-shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="pb-4 pr-8">
          <p className="text-sm text-asa-grey leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export function Help() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <header className="relative bg-gradient-to-br from-asa-blue to-asa-blue-light overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative px-5 pt-12 pb-6">
          <Link to="/settings" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors">
            <IconChevronLeft size={16} />
            Settings
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <ASALogo variant="icon" className="w-8 h-8" color="white" />
            <span className="text-white/40 text-sm">|</span>
            <span className="text-white/80 text-sm font-medium">Support</span>
          </div>
          <h1 className="text-3xl font-display text-white">Help & FAQ</h1>
          <p className="text-white/70 mt-2 text-sm">
            Everything you need to know about The Ribbit Report
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="px-5 py-6">
        {/* Quick Guide */}
        <section className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
          <div className="px-5 py-4 border-b border-asa-grey/10">
            <h2 className="font-display text-lg text-ink">Quick Guide</h2>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-asa-green/5 rounded-xl">
                <div className="w-12 h-12 mx-auto bg-asa-green/10 rounded-xl flex items-center justify-center mb-3">
                  <IconMail size={24} className="text-asa-green" />
                </div>
                <h3 className="font-semibold text-ink text-sm">Dispatches</h3>
                <p className="text-xs text-asa-grey mt-1">Read stories from real researchers</p>
              </div>

              <div className="text-center p-4 bg-asa-blue/5 rounded-xl">
                <div className="w-12 h-12 mx-auto bg-asa-blue/10 rounded-xl flex items-center justify-center mb-3">
                  <IconGlobe size={24} className="text-asa-blue" />
                </div>
                <h3 className="font-semibold text-ink text-sm">Map</h3>
                <p className="text-xs text-asa-grey mt-1">Explore amphibians by location</p>
              </div>

              <div className="text-center p-4 bg-asa-yellow/10 rounded-xl">
                <div className="w-12 h-12 mx-auto bg-asa-yellow/20 rounded-xl flex items-center justify-center mb-3">
                  <IconLightbulb size={24} className="text-asa-yellow" />
                </div>
                <h3 className="font-semibold text-ink text-sm">Myths</h3>
                <p className="text-xs text-asa-grey mt-1">Learn the truth about amphibians</p>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="w-12 h-12 mx-auto bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                  <IconAward size={24} className="text-purple-500" />
                </div>
                <h3 className="font-semibold text-ink text-sm">Passport</h3>
                <p className="text-xs text-asa-grey mt-1">Track your stamps & badges</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
          <div className="px-5 py-4 border-b border-asa-grey/10">
            <h2 className="font-display text-lg text-ink">Frequently Asked Questions</h2>
          </div>

          <div className="px-5">
            {FAQS.map((faq, index) => (
              <FAQAccordion
                key={index}
                faq={faq}
                isOpen={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </section>

        {/* Conservation Status Guide */}
        <section className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
          <div className="px-5 py-4 border-b border-asa-grey/10">
            <h2 className="font-display text-lg text-ink">Conservation Status Guide</h2>
          </div>

          <div className="p-5 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-status-lc"></span>
              <span className="text-sm"><strong>LC</strong> - Least Concern</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-status-nt"></span>
              <span className="text-sm"><strong>NT</strong> - Near Threatened</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-status-vu"></span>
              <span className="text-sm"><strong>VU</strong> - Vulnerable</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-status-en"></span>
              <span className="text-sm"><strong>EN</strong> - Endangered</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-status-cr"></span>
              <span className="text-sm"><strong>CR</strong> - Critically Endangered</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-status-dd"></span>
              <span className="text-sm"><strong>DD</strong> - Data Deficient</span>
            </div>
          </div>
        </section>

        {/* About ASA */}
        <section className="bg-gradient-to-br from-asa-green to-asa-green-dark rounded-2xl p-6 text-white">
          <div className="text-center">
            <ASALogo variant="full" className="w-48 mx-auto mb-4" color="white" />
            <p className="text-sm opacity-90 leading-relaxed">
              The Amphibian Survival Alliance brings the global amphibian conservation community together
              to address the amphibian extinction crisis. Through research, education, and advocacy,
              ASA works to ensure a future for amphibians and the ecosystems they support.
            </p>
            <a
              href="https://www.amphibians.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 bg-white/20 hover:bg-white/30 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
            >
              Visit amphibians.org
              <IconChevronRight size={16} />
            </a>
          </div>
        </section>

        {/* Footer info */}
        <div className="text-center mt-6">
          <p className="text-xs text-asa-grey-light">
            Powered by Amphibian Survival Alliance
          </p>
        </div>
      </main>
    </div>
  );
}

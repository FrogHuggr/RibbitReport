import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ASALogo, IconHelp, IconChevronRight } from '../components/ui';

interface SettingToggleProps {
  label: string;
  description?: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

function SettingToggle({ label, description, enabled, onChange }: SettingToggleProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex-1 pr-4">
        <p className="font-semibold text-ink">{label}</p>
        {description && (
          <p className="text-xs text-asa-grey-light mt-0.5">{description}</p>
        )}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative w-12 h-7 rounded-full transition-colors ${
          enabled ? 'bg-asa-green' : 'bg-asa-grey/30'
        }`}
      >
        <span
          className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

export function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [offlineMode, setOfflineMode] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [animations, setAnimations] = useState(true);

  const handleClearProgress = () => {
    if (confirm('Are you sure you want to clear all your progress? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <header className="relative bg-gradient-to-br from-asa-grey to-ink overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative px-5 pt-12 pb-6">
          <div className="flex items-center gap-3 mb-3">
            <ASALogo variant="icon" className="w-8 h-8" color="white" />
            <span className="text-white/40 text-sm">|</span>
            <span className="text-white/60 text-sm font-medium">App Settings</span>
          </div>
          <h1 className="text-3xl font-display text-white">Settings</h1>
          <p className="text-white/60 mt-2 text-sm">
            Customize your Ribbit Report experience
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="px-5 py-6">
        {/* Preferences Section */}
        <section className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
          <div className="px-5 py-4 border-b border-asa-grey/10">
            <h2 className="font-display text-lg text-ink">Preferences</h2>
          </div>

          <div className="px-5 divide-y divide-asa-grey/10">
            <SettingToggle
              label="Push Notifications"
              description="Get notified about new dispatches"
              enabled={notifications}
              onChange={setNotifications}
            />
            <SettingToggle
              label="Offline Mode"
              description="Download content for offline reading"
              enabled={offlineMode}
              onChange={setOfflineMode}
            />
            <SettingToggle
              label="Sound Effects"
              description="Play sounds when earning stamps"
              enabled={soundEffects}
              onChange={setSoundEffects}
            />
            <SettingToggle
              label="Animations"
              description="Show animations throughout the app"
              enabled={animations}
              onChange={setAnimations}
            />
          </div>
        </section>

        {/* Links Section */}
        <section className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
          <div className="px-5 py-4 border-b border-asa-grey/10">
            <h2 className="font-display text-lg text-ink">Information</h2>
          </div>

          <div className="divide-y divide-asa-grey/10">
            <Link
              to="/help"
              className="flex items-center gap-4 px-5 py-4 hover:bg-asa-grey/5 transition-colors"
            >
              <div className="w-10 h-10 bg-asa-blue/10 rounded-xl flex items-center justify-center">
                <IconHelp size={20} className="text-asa-blue" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-ink">Help & FAQ</p>
                <p className="text-xs text-asa-grey-light">Get answers to common questions</p>
              </div>
              <IconChevronRight size={20} className="text-asa-grey-light" />
            </Link>

            <a
              href="https://www.amphibians.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-5 py-4 hover:bg-asa-grey/5 transition-colors"
            >
              <div className="w-10 h-10 bg-asa-green/10 rounded-xl flex items-center justify-center">
                <ASALogo variant="icon" className="w-5 h-5" color="green" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-ink">About ASA</p>
                <p className="text-xs text-asa-grey-light">Learn about the Amphibian Survival Alliance</p>
              </div>
              <IconChevronRight size={20} className="text-asa-grey-light" />
            </a>
          </div>
        </section>

        {/* Data Section */}
        <section className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
          <div className="px-5 py-4 border-b border-asa-grey/10">
            <h2 className="font-display text-lg text-ink">Data</h2>
          </div>

          <div className="px-5 py-4">
            <button
              onClick={handleClearProgress}
              className="w-full py-3 px-4 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors text-sm"
            >
              Clear All Progress
            </button>
            <p className="text-xs text-asa-grey-light text-center mt-2">
              This will reset all stamps, achievements, and reading history
            </p>
          </div>
        </section>

        {/* App Info */}
        <section className="text-center py-4">
          <ASALogo variant="full" className="w-32 mx-auto mb-3" color="grey" />
          <p className="text-xs text-asa-grey-light">The Ribbit Report v1.0.0</p>
          <p className="text-xs text-asa-grey-light mt-1">
            Powered by Amphibian Survival Alliance
          </p>
        </section>
      </main>
    </div>
  );
}

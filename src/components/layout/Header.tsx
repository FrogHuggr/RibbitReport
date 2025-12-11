import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useOffline } from '../../hooks';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showOfflineIndicator?: boolean;
  transparent?: boolean;
}

export function Header({
  title,
  showBack = false,
  showOfflineIndicator = true,
  transparent = false,
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { isOnline } = useOffline();

  const handleBack = () => {
    // If we can go back in history, do that; otherwise go home
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  // Don't show header on home page unless transparent
  const isHome = location.pathname === '/';
  if (isHome && !transparent) {
    return null;
  }

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-40
        ${transparent ? 'bg-transparent' : 'bg-cream/95 backdrop-blur-sm border-b border-gray-200'}
      `}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="flex items-center justify-between h-14 px-4 max-w-mobile mx-auto">
        {/* Back button */}
        <div className="w-10">
          {showBack && (
            <button
              onClick={handleBack}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={t('common.back')}
            >
              <svg
                className="w-6 h-6 text-ink"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Title */}
        {title && (
          <h1 className="text-lg font-display text-ink truncate flex-1 text-center">
            {title}
          </h1>
        )}

        {/* Right side - offline indicator / menu */}
        <div className="w-10 flex justify-end">
          {showOfflineIndicator && !isOnline && (
            <div
              className="flex items-center gap-1 text-amber-600"
              role="status"
              aria-label={t('offline.youAreOffline')}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

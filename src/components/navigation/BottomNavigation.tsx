import { Home, MessageCircle, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface TabConfig {
  id: 'home' | 'chats' | 'profile';
  label: string;
  path: string;
  icon: typeof Home;
}

const TABS: TabConfig[] = [
  { id: 'home', label: 'Рекомендации', path: '/home', icon: Home },
  { id: 'chats', label: 'Чаты', path: '/chats', icon: MessageCircle },
  { id: 'profile', label: 'Профиль', path: '/profile', icon: User },
];

function getActiveTab(pathname: string): TabConfig['id'] {
  if (pathname.startsWith('/chats')) return 'chats';
  if (pathname.startsWith('/profile')) return 'profile';
  return 'home';
}

export function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = getActiveTab(location.pathname);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 border-t border-[#E2E8F0] bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex h-full max-w-md items-center justify-around px-4">
        {TABS.map(({ id, label, path, icon: Icon }) => {
          const isActive = activeTab === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => navigate(path)}
              className={`flex flex-1 flex-col items-center justify-center gap-1 transition-colors ${
                isActive
                  ? 'text-[#2563EB]'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

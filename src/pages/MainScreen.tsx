import { Outlet, useLocation } from 'react-router-dom';
import { BottomNavigation } from '../components/navigation/BottomNavigation';

export function MainScreen() {
  const location = useLocation();
  const isChatDetail = /^\/chats\/[^/]+$/.test(location.pathname);

  return (
    <main className="flex min-h-[100dvh] w-full flex-1 flex-col bg-[#F8FAFC]">
      <div
        className={`mx-auto flex w-full max-w-md flex-1 flex-col ${
          isChatDetail ? 'min-h-0 overflow-hidden' : 'p-4'
        }`}
      >
        <Outlet />
      </div>
      <BottomNavigation />
    </main>
  );
}

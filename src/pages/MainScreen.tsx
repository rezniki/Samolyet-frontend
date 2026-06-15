import { BottomNavigation } from '../components/navigation/BottomNavigation';
import { useNavigationStore } from '../store/navigationStore';
import { ChatsScreen } from './ChatsScreen';
import { HomeScreen } from './HomeScreen';
import { ProfileScreen } from './ProfileScreen';

export function MainScreen() {
  const activeTab = useNavigationStore((state) => state.activeTab);

  return (
    <main className="flex min-h-[100dvh] w-full flex-1 flex-col bg-[#F8FAFC] pb-20">
      <div className="mx-auto w-full max-w-md flex-1 p-4">
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'chats' && <ChatsScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
      </div>
      <BottomNavigation />
    </main>
  );
}

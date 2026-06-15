import { create } from 'zustand';

export type TabId = 'home' | 'chats' | 'profile';

interface NavigationState {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

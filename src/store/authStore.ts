import { create } from 'zustand';
import * as authService from '../services/auth';

const TOKEN_KEY = 'samolyet_token';
const USER_KEY = 'samolyet_user';

export interface AuthUser {
  id: string;
  username: string;
  displayName: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  initialize: () => void;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, displayName: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  initialize: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userRaw = localStorage.getItem(USER_KEY);

    if (!token || !userRaw) return;

    try {
      const user = JSON.parse(userRaw) as AuthUser;
      set({ token, user });
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },

  login: async (username, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.login({ username, password });

      localStorage.setItem(TOKEN_KEY, response.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.user));

      set({
        token: response.token,
        user: response.user,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Не удалось войти';
      set({ isLoading: false, error: message });
      throw error;
    }
  },

  register: async (username, displayName, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.register({ username, displayName, password });

      localStorage.setItem(TOKEN_KEY, response.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.user));

      set({
        token: response.token,
        user: response.user,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Не удалось зарегистрироваться';
      set({ isLoading: false, error: message });
      throw error;
    }
  },

  logout: () => {
    void authService.logout();
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    set({ user: null, token: null, error: null, isLoading: false });
  },

  clearError: () => set({ error: null }),
}));

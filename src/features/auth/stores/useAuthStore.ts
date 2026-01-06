import Cookies from 'js-cookie';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface UserInfo {
  id: number;
  email: string;
  name: string;
}

export interface AuthState {
  userInfo: UserInfo | null;
  isLoggedIn: boolean;
  unreadNotisCount: number;

  login: (user: UserInfo) => void;
  logout: () => void;

  setUnreadNotisCount: (count: number) => void;
  increaseNotisCount: () => void;
  decreaseNotisCount: () => void;
  resetNotisCount: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userInfo: null,
      isLoggedIn: false,
      unreadNotisCount: 0,

      login: (user) => set({ userInfo: user, isLoggedIn: true }),
      logout: () => set({ userInfo: null, isLoggedIn: false, unreadNotisCount: 0 }),

      setUnreadNotisCount: (count) => set({ unreadNotisCount: count }),
      increaseNotisCount: () => set((state) => ({ unreadNotisCount: state.unreadNotisCount + 1 })),
      decreaseNotisCount: () => set((state) => ({ unreadNotisCount: state.unreadNotisCount - 1 })),
      resetNotisCount: () => set({ unreadNotisCount: 0 }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => ({
        getItem: (key) => {
          return Cookies.get(key) || null;
        },
        setItem: (key, value) => {
          Cookies.set(key, value, { expires: 1, path: '/' });
        },
        removeItem: (key) => {
          Cookies.remove(key, { path: '/' });
        },
      })),
    },
  ),
);

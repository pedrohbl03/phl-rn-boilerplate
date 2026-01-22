import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import { storage } from '@/data/storage';

/**
 * Adapter para usar MMKV Storage singleton como storage do Zustand
 */
const zustandStorage: StateStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    storage.setString(name, value);
  },
  removeItem: (name: string) => {
    storage.delete(name);
  },
};

export type ThemeMode = 'light' | 'dark';
export type Language = 'pt-BR' | 'en-US';

export interface AppPreferences {
  theme: ThemeMode;
  language: Language;
}

interface AppState {
  theme: ThemeMode;
  language: Language;
  onboardingCompleted: boolean;
  
  // Actions
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: Language) => void;
  setOnboardingCompleted: (completed: boolean) => void;
  getPreferences: () => AppPreferences;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      language: 'pt-BR',
      onboardingCompleted: false,

      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setOnboardingCompleted: (onboardingCompleted) =>
        set({ onboardingCompleted }),
      getPreferences: () => ({
        theme: get().theme,
        language: get().language,
      }),
    }),
    {
      name: 'app-preferences',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import { getStorage } from '@/core/config';

/**
 * Adapter para usar storageService como storage do Zustand
 * O storageService deve ser inicializado via bootstrapApp antes do uso
 */

const storageService = getStorage();

const zustandStorage: StateStorage = {
  getItem: (name: string) => {
    const value = storageService.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    storageService.setString(name, value);
  },
  removeItem: (name: string) => {
    storageService.delete(name);
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

import React, { createContext, useContext, useEffect, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';

import { queryClient } from './query-client';
import { bootstrapApp } from '@/core/config';
import i18n, { syncLanguageWithStore } from '@/i18n';
import { useAppStore } from '@/stores/app.store';
import '@/styles/global.css';

interface AppReadyContextType {
  isReady: boolean;
}

const AppReadyContext = createContext<AppReadyContextType>({ isReady: false });

/**
 * Hook para verificar se o app está pronto
 */
export function useAppReady() {
  return useContext(AppReadyContext);
}

interface AppProviderProps {
  children: React.ReactNode;
}

/**
 * Provider principal que encapsula toda a aplicação
 * Responsável por:
 * - Inicializar dependências (httpClient)
 * - Configurar React Query
 * - Configurar i18n
 * - Configurar SafeArea e GestureHandler
 * - Controlar o estado de carregamento do app
 */
export function AppProvider({ children }: AppProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const language = useAppStore((state) => state.language);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Inicializa dependências (httpClient, etc.)
        // O storage já é auto-inicializado quando acessado
        bootstrapApp();

        // Sincroniza o idioma do i18n com o store
        syncLanguageWithStore(language);

        // Simula um pequeno delay para garantir que tudo está carregado
        // Remova ou ajuste conforme necessário
        await new Promise(resolve => setTimeout(resolve, 500));

        setIsReady(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setIsReady(true); // Continua mesmo com erro para mostrar tela de erro
      }
    };

    initialize();
  }, []);

  // Sincroniza quando o idioma muda
  useEffect(() => {
    if (isReady) {
      syncLanguageWithStore(language);
    }
  }, [language, isReady]);

  return (
    <AppReadyContext.Provider value={{ isReady }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18n}>
              {children}
            </I18nextProvider>
          </QueryClientProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </AppReadyContext.Provider>
  );
}

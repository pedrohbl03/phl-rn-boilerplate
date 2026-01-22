import React, { useEffect, useCallback } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import { AppProvider, useAppReady } from '@/providers';
import { ThemeProvider, useTheme } from '@/providers/ThemeProvider';

// Mantém a splash screen visível enquanto o app carrega
SplashScreen.preventAutoHideAsync();

/**
 * Componente interno que usa o tema
 */
function RootLayoutContent() {
  const { isDark } = useTheme();
  const { isReady } = useAppReady();

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      // Esconde a splash screen com uma animação suave
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}

/**
 * Layout raiz da aplicação
 * Configura os providers e a estrutura de navegação
 */
export default function RootLayout() {
  return (
    <AppProvider>
      <ThemeProvider>
        <RootLayoutContent />
      </ThemeProvider>
    </AppProvider>
  );
}

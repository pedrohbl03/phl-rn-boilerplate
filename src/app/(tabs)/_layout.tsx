import React from 'react';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { FloatingTabBar } from '@/components';

/**
 * Layout das Tabs - Navegação principal do app
 * 
 * Utiliza o componente FloatingTabBar customizado.
 * Para remover a tab bar flutuante, substitua por:
 * tabBar={() => null} ou use a tab bar padrão removendo a prop tabBar
 */
export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home'),
        }}
      />
      <Tabs.Screen
        name="arch"
        options={{
          title: t('tabs.arch'),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('tabs.settings'),
        }}
      />
    </Tabs>
  );
}

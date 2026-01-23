import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/providers/ThemeProvider';
import { useAppStore, Language } from '@/stores/app.store';

/**
 * ViewModel para a tela Settings
 * Seguindo o padrão MVVM com functional components
 * 
 * O ViewModel é responsável por:
 * - Gerenciar o estado da View
 * - Expor dados formatados para exibição
 * - Expor ações que a View pode executar
 * - Abstrair a lógica de negócio da View
 */
export function useSettingsViewModel() {
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage } = useAppStore();

  // Dados formatados para a View
  const title = t('settings.title');
  const appearanceTitle = t('settings.appearanceTitle');
  const preferencesTitle = t('settings.preferencesTitle');
  const themeLabel = t('settings.theme');
  const themeDescription = t('settings.themeDescription');
  const languageLabel = t('settings.language');
  const languageDescription = t('settings.languageDescription');

  // Language options
  const languageOptions = [
    {
      label: t('settings.portuguese'),
      value: 'pt-BR' as Language,
      flag: '🇧🇷',
    },
    {
      label: t('settings.english'),
      value: 'en-US' as Language,
      flag: '🇺🇸',
    },
  ];

  // Texto informativo
  const infoText = language === 'pt-BR'
    ? 'Suas preferências são salvas automaticamente no dispositivo.'
    : 'Your preferences are automatically saved on the device.';

  // Icon color based on theme (used in components that don't support dark: prefix)
  const colors = {
    iconColor: isDark ? '#60a5fa' : '#2563eb',
  };

  // Available actions
  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  const handleLanguageChange = useCallback((newLanguage: Language) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  }, [setLanguage, i18n]);

  return {
    // Estado
    isDark,
    language,
    
    // Textos
    title,
    appearanceTitle,
    preferencesTitle,
    themeLabel,
    themeDescription,
    languageLabel,
    languageDescription,
    infoText,
    
    // Dados
    languageOptions,
    
    // Cores
    colors,
    
    // Actions
    handleToggleTheme,
    handleLanguageChange,
  };
}

// Tipo exportado para tipagem do ViewModel
export type SettingsViewModel = ReturnType<typeof useSettingsViewModel>;

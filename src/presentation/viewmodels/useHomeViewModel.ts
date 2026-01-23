import { useTranslation } from 'react-i18next';
import { useTheme } from '@/providers/ThemeProvider';

/**
 * ViewModel para a tela Home
 * Seguindo o padrão MVVM com functional components
 * 
 * O ViewModel é responsável por:
 * - Gerenciar o estado da View
 * - Expor dados formatados para exibição
 * - Expor ações que a View pode executar
 * - Abstrair a lógica de negócio da View
 */
export function useHomeViewModel() {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  // Dados formatados para a View
  const title = t('home.welcome');
  const subtitle = t('home.subtitle');
  const description = t('home.description');
  const featuresTitle = t('home.features');
  const getStartedText = t('home.getStarted');

  // Features do template
  const features = [
    {
      icon: 'flash' as const,
      title: t('home.featureExpo'),
      description: t('home.featureExpoDesc'),
    },
    {
      icon: 'color-palette' as const,
      title: t('home.featureNativewind'),
      description: t('home.featureNativewindDesc'),
    },
    {
      icon: 'layers' as const,
      title: t('home.featureMvvm'),
      description: t('home.featureMvvmDesc'),
    },
    {
      icon: 'server' as const,
      title: t('home.featureQuery'),
      description: t('home.featureQueryDesc'),
    },
    {
      icon: 'cube' as const,
      title: t('home.featureZustand'),
      description: t('home.featureZustandDesc'),
    },
    {
      icon: 'language' as const,
      title: t('home.featureI18n'),
      description: t('home.featureI18nDesc'),
    },
  ];

  // Icon color based on theme (used in components that don't support dark: prefix)
  const colors = {
    iconColor: isDark ? '#60a5fa' : '#2563eb',
  };

  return {
    // Textos
    title,
    subtitle,
    description,
    featuresTitle,
    getStartedText,
    
    // Dados
    features,
    
    // Cores
    colors,
  };
}

// Tipo exportado para tipagem do ViewModel
export type HomeViewModel = ReturnType<typeof useHomeViewModel>;

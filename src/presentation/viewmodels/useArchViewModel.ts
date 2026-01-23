import { useTranslation } from 'react-i18next';
import { useTheme } from '@/providers/ThemeProvider';

/**
 * ViewModel para a tela Arquitetura
 * Seguindo o padrão MVVM com functional components
 * 
 * O ViewModel é responsável por:
 * - Gerenciar o estado da View
 * - Expor dados formatados para exibição
 * - Abstrair a lógica de negócio da View
 */
export function useArchViewModel() {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  // Dados formatados para a View
  const mvvmTitle = t('arch.mvvmTitle');
  const mvvmDescription = t('arch.mvvmDescription');
  const benefitsTitle = t('arch.benefitsTitle');
  const structureTitle = t('arch.structureTitle');

  // Componentes MVVM
  const mvvmComponents = [
    {
      icon: 'cube' as const,
      title: t('arch.modelTitle'),
      description: t('arch.modelDescription'),
      color: '#10b981',
    },
    {
      icon: 'phone-portrait' as const,
      title: t('arch.viewTitle'),
      description: t('arch.viewDescription'),
      color: '#f59e0b',
    },
    {
      icon: 'git-compare' as const,
      title: t('arch.viewModelTitle'),
      description: t('arch.viewModelDescription'),
      color: '#8b5cf6',
    },
  ];

  // Architecture benefits
  const benefits = [
    t('arch.benefit1'),
    t('arch.benefit2'),
    t('arch.benefit3'),
    t('arch.benefit4'),
  ];

  // Estrutura de pastas
  const folderStructure = [
    { text: 'src/', isFolder: true },
    { text: '├── app/', isFolder: true },
    { text: '├── components/', isFolder: true },
    { text: '├── core/', isFolder: true },
    { text: '├── data/', isFolder: true },
    { text: '│   ├── api/', isFolder: true },
    { text: '│   └── storage/', isFolder: true },
    { text: '├── domain/', isFolder: true },
    { text: '│   ├── entities/', isFolder: true },
    { text: '│   └── schemas/', isFolder: true },
    { text: '├── presentation/', isFolder: true },
    { text: '│   ├── screens/', isFolder: true },
    { text: '│   └── viewmodels/', isFolder: true },
    { text: '├── providers/', isFolder: true },
    { text: '├── stores/', isFolder: true },
    { text: '└── i18n/', isFolder: true },
  ];

  // Icon color based on theme (used in components that don't support dark: prefix)
  const colors = {
    iconColor: isDark ? '#60a5fa' : '#2563eb',
  };

  return {
    // Textos
    mvvmTitle,
    mvvmDescription,
    benefitsTitle,
    structureTitle,
    
    // Dados
    mvvmComponents,
    benefits,
    folderStructure,
    
    // Cores
    colors,
  };
}

// Tipo exportado para tipagem do ViewModel
export type ArchViewModel = ReturnType<typeof useArchViewModel>;

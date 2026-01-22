import { QueryClient } from '@tanstack/react-query';

/**
 * Configuração do React Query Client
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tempo que os dados são considerados "frescos"
      staleTime: 1000 * 60 * 5, // 5 minutos
      
      // Tempo que dados ficam em cache após não serem mais usados
      gcTime: 1000 * 60 * 30, // 30 minutos (antigo cacheTime)
      
      // Número de tentativas em caso de erro
      retry: 2,
      
      // Não refetch automaticamente ao focar a janela (mobile)
      refetchOnWindowFocus: false,
      
      // Refetch quando reconectar à internet
      refetchOnReconnect: true,
    },
    mutations: {
      // Número de tentativas para mutations
      retry: 1,
    },
  },
});

import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { getHttpClient } from '@/core/config';
import { HttpResponse } from '@/data/api';

/**
 * Hook para fazer requisições GET com React Query
 */
export function useApiQuery<TData>(
  key: string[],
  url: string,
  options?: Omit<UseQueryOptions<HttpResponse<TData>, Error>, 'queryKey' | 'queryFn'>
) {
  const httpClient = getHttpClient();

  return useQuery({
    queryKey: key,
    queryFn: () => httpClient.get<TData>(url),
    ...options,
  });
}

/**
 * Hook para fazer mutations (POST, PUT, PATCH, DELETE)
 */
export function useApiMutation<TData, TVariables>(
  method: 'post' | 'put' | 'patch' | 'delete',
  url: string | ((variables: TVariables) => string),
  options?: UseMutationOptions<HttpResponse<TData>, Error, TVariables>
) {
  const httpClient = getHttpClient();

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const endpoint = typeof url === 'function' ? url(variables) : url;
      
      switch (method) {
        case 'post':
          return httpClient.post<TData, TVariables>(endpoint, variables);
        case 'put':
          return httpClient.put<TData, TVariables>(endpoint, variables);
        case 'patch':
          return httpClient.patch<TData, TVariables>(endpoint, variables);
        case 'delete':
          return httpClient.delete<TData>(endpoint);
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
    },
    ...options,
  });
}

/**
 * Interface abstrata para cliente HTTP
 * Permite trocar a implementação (Axios, Fetch, etc.) sem afetar o resto do código
 */

export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  timeout?: number;
}

export interface HttpResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

export interface IHttpClient {
  /**
   * Requisição GET
   */
  get<T>(url: string, config?: RequestConfig): Promise<HttpResponse<T>>;

  /**
   * Requisição POST
   */
  post<T, D = unknown>(
    url: string,
    data?: D,
    config?: RequestConfig
  ): Promise<HttpResponse<T>>;

  /**
   * Requisição PUT
   */
  put<T, D = unknown>(
    url: string,
    data?: D,
    config?: RequestConfig
  ): Promise<HttpResponse<T>>;

  /**
   * Requisição PATCH
   */
  patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: RequestConfig
  ): Promise<HttpResponse<T>>;

  /**
   * Requisição DELETE
   */
  delete<T>(url: string, config?: RequestConfig): Promise<HttpResponse<T>>;

  /**
   * Define o token de autorização
   */
  setAuthToken(token: string | null): void;

  /**
   * Define a URL base
   */
  setBaseUrl(url: string): void;
}

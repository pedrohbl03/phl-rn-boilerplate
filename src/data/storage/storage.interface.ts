/**
 * Interface abstrata para Storage
 * Permite trocar a implementação (MMKV, AsyncStorage, etc.) sem afetar o resto do código
 */
export interface IStorage {
  /**
   * Armazena um valor string
   */
  setString(key: string, value: string): void;

  /**
   * Obtém um valor string
   */
  getString(key: string): string | undefined;

  /**
   * Armazena um valor numérico
   */
  setNumber(key: string, value: number): void;

  /**
   * Obtém um valor numérico
   */
  getNumber(key: string): number | undefined;

  /**
   * Armazena um valor booleano
   */
  setBoolean(key: string, value: boolean): void;

  /**
   * Obtém um valor booleano
   */
  getBoolean(key: string): boolean | undefined;

  /**
   * Armazena um objeto (serializado como JSON)
   */
  setObject<T>(key: string, value: T): void;

  /**
   * Obtém um objeto (deserializado de JSON)
   */
  getObject<T>(key: string): T | undefined;

  /**
   * Remove um valor
   */
  delete(key: string): void;

  /**
   * Verifica se uma chave existe
   */
  contains(key: string): boolean;

  /**
   * Obtém todas as chaves
   */
  getAllKeys(): string[];

  /**
   * Limpa todo o storage
   */
  clearAll(): void;
}

/**
 * Chaves de storage padronizadas
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth/token',
  REFRESH_TOKEN: '@auth/refresh_token',
  USER: '@auth/user',
  THEME: '@app/theme',
  LANGUAGE: '@app/language',
  ONBOARDING_COMPLETED: '@app/onboarding_completed',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

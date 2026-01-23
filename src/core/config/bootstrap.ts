/**
 * Bootstrap da aplicação
 * Configuração simplificada de dependências
 */
import { 
  createMMKVStorage, 
  initializeStorage, 
  getStorageService,
  type IStorage,
} from '@/data/storage';
import { createHttpClient, IHttpClient } from '@/data/api';
import { env } from './env';

// Dependency instances
let httpClient: IHttpClient | null = null;
let initialized = false;

/**
 * Inicializa as dependências da aplicação
 * Deve ser chamado uma única vez no root do app
 */
export const bootstrapApp = (): void => {
  if (initialized) {
    console.warn('App already initialized');
    return;
  }

  // Inicializa Storage com implementação MMKV
  const storage = createMMKVStorage('app-storage');
  initializeStorage(storage);

  // Inicializa HTTP Client
  httpClient = createHttpClient(storage, env.API_URL);
  
  initialized = true;
};

/**
 * Retorna a instância do Storage
 */
export const getStorage = (): IStorage => {
  return getStorageService();
};

/**
 * Retorna a instância do HTTP Client
 */
export const getHttpClient = (): IHttpClient => {
  if (!httpClient) {
    throw new Error('App not initialized. Call bootstrapApp() first.');
  }
  return httpClient;
};

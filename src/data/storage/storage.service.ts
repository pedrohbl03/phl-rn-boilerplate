import type { IStorage } from './storage.interface';
import { createMMKVStorage } from './mmkv.storage';

/**
 * Serviço de Storage centralizado
 * Inicializa automaticamente com MMKV se não foi inicializado manualmente
 */
let storageInstance: IStorage | null = null;

/**
 * Garante que o storage está inicializado
 * Se não foi inicializado via initializeStorage, cria automaticamente com MMKV
 */
const ensureInitialized = (): IStorage => {
  if (!storageInstance) {
    storageInstance = createMMKVStorage('app-storage');
  }
  return storageInstance;
};

/**
 * Inicializa o serviço de storage com uma implementação específica
 * Deve ser chamado no bootstrap da aplicação se quiser usar implementação customizada
 * 
 * @param storage - Implementação de IStorage (ex: MMKVStorage)
 */
export const initializeStorage = (storage: IStorage): void => {
  if (storageInstance) {
    console.warn('Storage already initialized');
    return;
  }
  storageInstance = storage;
};

/**
 * Retorna a instância do storage
 * Inicializa automaticamente se necessário
 */
export const getStorageService = (): IStorage => {
  return ensureInitialized();
};

/**
 * Verifica se o storage foi inicializado
 */
export const isStorageInitialized = (): boolean => {
  return storageInstance !== null;
};

/**
 * Proxy do storage que permite acesso direto aos métodos
 * Inicializa automaticamente se necessário
 */
export const storageService: IStorage = {
  setString: (key, value) => ensureInitialized().setString(key, value),
  getString: (key) => ensureInitialized().getString(key),
  setNumber: (key, value) => ensureInitialized().setNumber(key, value),
  getNumber: (key) => ensureInitialized().getNumber(key),
  setBoolean: (key, value) => ensureInitialized().setBoolean(key, value),
  getBoolean: (key) => ensureInitialized().getBoolean(key),
  setObject: (key, value) => ensureInitialized().setObject(key, value),
  getObject: (key) => ensureInitialized().getObject(key),
  delete: (key) => ensureInitialized().delete(key),
  contains: (key) => ensureInitialized().contains(key),
  getAllKeys: () => ensureInitialized().getAllKeys(),
  clearAll: () => ensureInitialized().clearAll(),
};

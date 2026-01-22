import { createMMKV, type MMKV } from 'react-native-mmkv';
import type { IStorage } from './storage.interface';

/**
 * Instância singleton do MMKV
 * Inicializada imediatamente para estar disponível para o Zustand e outros consumidores
 */
let mmkvInstance: MMKV | null = null;

const getMMKVInstance = (): MMKV => {
  if (!mmkvInstance) {
    mmkvInstance = createMMKV({ id: 'app-storage' });
  }
  return mmkvInstance;
};

/**
 * Singleton do Storage usando MMKV
 * Pode ser acessado de qualquer lugar da aplicação
 */
class MMKVStorage implements IStorage {
  private get storage(): MMKV {
    return getMMKVInstance();
  }

  setString = (key: string, value: string): void => {
    this.storage.set(key, value);
  };

  getString = (key: string): string | undefined => {
    return this.storage.getString(key);
  };

  setNumber = (key: string, value: number): void => {
    this.storage.set(key, value);
  };

  getNumber = (key: string): number | undefined => {
    return this.storage.getNumber(key);
  };

  setBoolean = (key: string, value: boolean): void => {
    this.storage.set(key, value);
  };

  getBoolean = (key: string): boolean | undefined => {
    return this.storage.getBoolean(key);
  };

  setObject = <T>(key: string, value: T): void => {
    const jsonValue = JSON.stringify(value);
    this.storage.set(key, jsonValue);
  };

  getObject = <T>(key: string): T | undefined => {
    const jsonValue = this.storage.getString(key);
    if (jsonValue === undefined) return undefined;

    try {
      return JSON.parse(jsonValue) as T;
    } catch {
      return undefined;
    }
  };

  delete = (key: string): void => {
    this.storage.remove(key);
  };

  contains = (key: string): boolean => {
    return this.storage.contains(key);
  };

  getAllKeys = (): string[] => {
    return this.storage.getAllKeys();
  };

  clearAll = (): void => {
    this.storage.clearAll();
  };
}

/**
 * Instância singleton do Storage
 * Use esta instância em toda a aplicação
 */
export const storage = new MMKVStorage();

/**
 * Factory para criar instância do Storage (mantida para compatibilidade)
 * @deprecated Use a instância `storage` diretamente
 */
export const createStorage = (_id?: string): IStorage => {
  return storage;
};

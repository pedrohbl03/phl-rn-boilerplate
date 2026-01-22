import { createMMKV, type MMKV } from 'react-native-mmkv';
import type { IStorage } from './storage.interface';

/**
 * Implementação do Storage usando MMKV
 * Extremamente rápido e eficiente para React Native
 */
class MMKVStorage implements IStorage {
  private storage: MMKV;

  constructor(id: string = 'app-storage') {
    this.storage = createMMKV({ id });
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
 * Factory para criar instância do MMKV Storage
 */
export const createMMKVStorage = (id?: string): IStorage => {
  return new MMKVStorage(id);
};

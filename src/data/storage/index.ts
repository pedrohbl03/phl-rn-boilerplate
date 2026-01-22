export type { IStorage } from './storage.interface';
export { STORAGE_KEYS } from './storage.interface';
export { createMMKVStorage } from './mmkv.storage';
export { 
  storageService, 
  initializeStorage, 
  getStorageService,
  isStorageInitialized,
} from './storage.service';

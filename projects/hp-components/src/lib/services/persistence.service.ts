import { Injectable } from '@angular/core';

export enum StorageType {
  Session,
  local,
  Server
}

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor() { }

  static get hasStorageSupport(): boolean {
    return typeof (Storage) !== 'undefined';
  }

  set(key: string, value: any, storageType: StorageType) {
    if (typeof(value) === 'object' ) {
       value = JSON.stringify(value);
    }
    switch (storageType) {
        case StorageType.Session:
          if (PersistenceService.hasStorageSupport) {
            sessionStorage.setItem(key, value);
          }
          break;
        case StorageType.local:
          if (PersistenceService.hasStorageSupport) {
            localStorage.setItem(key, value);
          }
          break;
    }
  }

  get(key: string, storageType: StorageType ): any {
     let result = null;
    switch (storageType) {
      case StorageType.Session:
        if (PersistenceService.hasStorageSupport) {
          result = sessionStorage.getItem(key);
        }
        break;
      case StorageType.local:
        if (PersistenceService.hasStorageSupport) {
          result = localStorage.getItem(key);
        }
        break;
    }
    if (result && (result[0] === '{' || result[0] === '[')) {
       result = JSON.parse(result);
    }
    return result;
  }
}

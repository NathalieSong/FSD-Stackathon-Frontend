import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class CacheService {

  constructor() { }

  protected getCache<T>(key: string): T {
    const data = localStorage.getItem(key);
    if (data && data !== 'undefined') {
      return JSON.parse(data);
    }
    return null;
  }

  protected setCache(key: string, data: object | string) {
    if (typeof data === 'string') {
      localStorage.setItem(key, data);
    }
    localStorage.setItem(key, JSON.stringify(data));
  }

  protected removeCache(key: string) {
    localStorage.removeItem(key);
  }

  protected clear() {
    localStorage.clear();
  }
}

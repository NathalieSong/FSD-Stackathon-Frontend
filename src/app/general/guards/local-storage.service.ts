import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService extends CacheService {

  constructor() {
    super();
  }

  public saveUserProfile(data: UserProfile) {
    this.setCache('user-profile', data);
  }

  public getUserProfile(): UserProfile {
    return this.getCache<UserProfile>('user-profile');
  }

  public rmUserProfile() {
    this.removeCache('user-profile');
  }

  public clearStorage() {
    this.clear();
  }
}

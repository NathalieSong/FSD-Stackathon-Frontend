import { Injectable } from '@angular/core';
import { Buyer } from '../general/models/buyer';
import { Seller } from '../general/models/seller';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from '../general/guards/local-storage.service';
import { UserRole } from '../general/enums/user-role.enum';
import { UserProfile } from '../general/models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  roles = UserRole;

  private userBaseUrl = 'api/user';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
    private router: Router
  ) { }

  getToken(): string {
    const profile = this.storageService.getUserProfile();
    return profile ? profile.token : null;
  }

  clearToken() {
    this.storageService.rmUserProfile();
  }

  isBuyer() {
    const profile = this.storageService.getUserProfile();
    return profile ? profile.role === this.roles.BUYER : false;
  }

  isSeller() {
    const profile = this.storageService.getUserProfile();
    return profile ? profile.role === this.roles.SELLER : false;
  }

  signinAsBuyer(username: string, password: string) {
    const data = {
      username: username,
      password: password,
      role: 'buyer'
    };
    this.signin(data);
  }

  signinAsSeller(username: string, password: string) {
    const data = {
      username: username,
      password: password,
      role: 'seller'
    };
    this.signin(data);
  }

  private signin(data: any) {
    this.http.post<any>(`${this.userBaseUrl}/auth/login`, data, this.httpOptions)
    .subscribe(res => {
      const user = JSON.parse(atob(res.token.split('.')[1]));
      const profile = new UserProfile();
      profile.id = user.jti;
      profile.token = res.token;
      profile.username = user.sub;
      profile.role = user.role;
      this.storageService.saveUserProfile(profile);
    });
  }

  signout() {
    this.http.post(`${this.userBaseUrl}/auth/logout`, null, this.httpOptions)
      .subscribe(res => this.storageService.rmUserProfile());
  }

  signupAsBuyer(buyer: Buyer): Observable<Buyer> {
    return this.http.post<Buyer>(`${this.userBaseUrl}/signup/buyer`, buyer, this.httpOptions);
  }

  signupAsSeller(seller: Seller): Observable<Seller> {
    return this.http.post<Seller>(`${this.userBaseUrl}/signup/buyer`, seller, this.httpOptions);
  }
}

import { Injectable } from '@angular/core';
import { Buyer } from '../general/models/buyer';
import { Seller } from '../general/models/seller';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isBuyer = false;
  isSeller = false;

  private buyersUrl = 'api/buyers';
  private sellerUrl = 'api/sellers';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signinAsBuyer(username: string, password: string): Observable<Buyer[]> {
    return this.http.get<Buyer[]>(`${this.buyersUrl}/?username=^${username}$&password=^${password}$`)
      .pipe(
        tap(b => b.length ? this.isBuyer = true : this.isBuyer = false)
      );
  }

  signinAsSeller(username: string, password: string): Observable<Seller[]> {
    return this.http.get<Seller[]>(`${this.sellerUrl}/?username=^${username}$&password=^${password}$`)
      .pipe(
        tap(s => s.length ? this.isSeller = true : this.isSeller = false)
      );
  }

  signupAsBuyer(buyer: Buyer): Observable<Buyer> {
    return this.http.post<Buyer>(this.buyersUrl, buyer, this.httpOptions)
      .pipe(
        tap((newBuyer: Buyer) => this.isBuyer = true)
      );
  }

  signupAsSeller(seller: Seller): Observable<Seller> {
    return this.http.post<Seller>(this.sellerUrl, seller, this.httpOptions)
      .pipe(
        tap((newSeller: Seller) => this.isSeller = true)
      );
  }
}

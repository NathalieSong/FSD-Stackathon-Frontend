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

  signinAsSeller(username: string, password: string) {
    console.log('Seller ' + username + ' signed in.');
  }

  signupAsBuyer(buyer: Buyer) {
    console.log('Buyer ' + buyer.username + ' signed in.');
  }

  signupAsSeller(seller: Seller) {
    console.log('Seller ' + seller.username + ' signed in.');
  }
}

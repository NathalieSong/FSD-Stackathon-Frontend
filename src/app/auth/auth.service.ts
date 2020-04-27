import { Injectable } from '@angular/core';
import { Buyer } from '../general/models/buyer';
import { Seller } from '../general/models/seller';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  signinAsBuyer(username: string, password: string) {
    console.log('Buyer ' + username + ' signed in.');
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

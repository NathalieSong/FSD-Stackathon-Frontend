import { Injectable } from '@angular/core';
import { Buyer } from '../general/models/buyer';
import { Seller } from '../general/models/seller';
import { Admin } from '../general/models/admin';

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

  signinAsAdmin(username: string, password: string) {
    console.log('Admin ' + username + ' signed in.');
  }

  signupAsBuyer(buyer: Buyer) {
    console.log('Buyer ' + buyer.username + ' signed in.');
  }

  signupAsSeller(seller: Seller) {
    console.log('Seller ' + seller.username + ' signed in.');
  }

  signupAsAdmin(admin: Admin) {
    console.log('Admin ' + admin.username + ' signed in.');
  }
}

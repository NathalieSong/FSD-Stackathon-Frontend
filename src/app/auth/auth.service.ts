import { Injectable } from '@angular/core';

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

  signupAsBuyer(username: string, password: string) {
    console.log('Buyer ' + username + ' signed in.');
  }

  signupAsSeller(username: string, password: string) {
    console.log('Seller ' + username + ' signed in.');
  }

  signupAsAdmin(username: string, password: string) {
    console.log('Admin ' + username + ' signed in.');
  }
}

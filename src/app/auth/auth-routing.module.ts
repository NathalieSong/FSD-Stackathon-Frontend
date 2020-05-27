import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupAsBuyerComponent } from './signup/signup-as-buyer/signup-as-buyer.component';
import { SignupAsSellerComponent } from './signup/signup-as-seller/signup-as-seller.component';
import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup/signup.component';

const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'signup/buyer',
        component: SignupAsBuyerComponent
      },
      {
        path: 'signup/seller',
        component: SignupAsSellerComponent
      },
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { };

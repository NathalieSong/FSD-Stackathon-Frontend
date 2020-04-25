import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignoutComponent } from './signout/signout.component';
import { SignupComponent } from './signup/signup.component';
import { SignupAsBuyerComponent } from './signup/signup-as-buyer/signup-as-buyer.component';
import { SignupAsSellerComponent } from './signup/signup-as-seller/signup-as-seller.component';
import { SignupAsAdminComponent } from './signup/signup-as-admin/signup-as-admin.component';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SigninComponent,
    SignoutComponent,
    SignupComponent,
    SignupAsBuyerComponent,
    SignupAsSellerComponent,
    SignupAsAdminComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }

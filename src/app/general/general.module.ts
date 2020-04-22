import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignoutComponent } from './signout/signout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { SignupAsBuyerComponent } from './signup/signup-as-buyer/signup-as-buyer.component';
import { SignupAsSellerComponent } from './signup/signup-as-seller/signup-as-seller.component';
import { SignupAsAdminComponent } from './signup/signup-as-admin/signup-as-admin.component';

@NgModule({
  declarations: [
    SigninComponent,
    SignoutComponent,
    PageNotFoundComponent,
    SignupComponent,
    SignupAsBuyerComponent,
    SignupAsSellerComponent,
    SignupAsAdminComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GeneralModule { }

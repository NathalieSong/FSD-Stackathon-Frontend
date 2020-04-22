import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './general/page-not-found/page-not-found.component';
import { SigninComponent } from './general/signin/signin.component';
import { SignoutComponent } from './general/signout/signout.component';
import { SellingAuthGuard } from './general/auth/selling-auth.guard';
import { ManagementAuthGuard } from './general/auth/management-auth.guard';
import { SignupComponent } from './general/signup/signup.component';
import { SignupAsBuyerComponent } from './general/signup/signup-as-buyer/signup-as-buyer.component';
import { SignupAsSellerComponent } from './general/signup/signup-as-seller/signup-as-seller.component';
import { SignupAsAdminComponent } from './general/signup/signup-as-admin/signup-as-admin.component';

const appRoutes: Routes = [
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signout',
    component: SignoutComponent
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
    path: 'signup/admin',
    component: SignupAsAdminComponent
  },
  {
    path: 'management',
    loadChildren: () => import('./management/management.module').then(m => m.ManagementModule),
    canLoad: [ManagementAuthGuard]
  },
  {
    path: 'shopping',
    loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule)
  },
  {
    path: 'selling',
    loadChildren: () => import('./selling/selling.module').then(m => m.SellingModule),
    canLoad: [SellingAuthGuard]
  },
  {
    path: '',
    redirectTo: '/shopping',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        preloadingStrategy: PreloadAllModules
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

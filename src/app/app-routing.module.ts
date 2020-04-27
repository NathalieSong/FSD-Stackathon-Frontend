import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './general/page-not-found/page-not-found.component';
import { SellingAuthGuard } from './general/guards/selling-auth.guard';

const appRoutes: Routes = [
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingComponent } from './shopping.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { ShoppingAuthGuard } from '../general/guards/shopping-auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { CartComponent } from './cart/cart.component';

const shoppingRoutes: Routes = [
  {
    path: '',
    component: ShoppingComponent,
    children: [
      {
        path: '',
        component: HomepageComponent
      },
      {
        path: 'item-detail/:itemId',
        component: ItemDetailComponent
      },
      {
        path: 'search-result',
        component: SearchResultComponent
      },
      {
        path: 'cart',
        component: CartComponent,
        canActivate: [ShoppingAuthGuard]
      },
      {
        path: 'purchase-history',
        component: PurchaseHistoryComponent,
        canActivate: [ShoppingAuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(shoppingRoutes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { };

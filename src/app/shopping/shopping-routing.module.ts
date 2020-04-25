import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingComponent } from './shopping.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { ShoppingAuthGuard } from '../general/guards/shopping-auth.guard';
import { ListOfItemsComponent } from './list-of-items/list-of-items.component';

const shoppingRoutes: Routes = [
  {
    path: '',
    component: ShoppingComponent,
    children: [
      {
        path: '',
        component: ListOfItemsComponent
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

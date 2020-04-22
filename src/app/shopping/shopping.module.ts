import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent } from './shopping/shopping.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { ListOfItemsComponent } from './list-of-items/list-of-items.component';
import { ShoppingRoutingModule } from './shopping-routing.module';

@NgModule({
  declarations: [
    ShoppingComponent,
    PurchaseHistoryComponent,
    ListOfItemsComponent
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule
  ]
})
export class ShoppingModule { }

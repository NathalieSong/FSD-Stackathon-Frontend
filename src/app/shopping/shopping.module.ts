import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent } from './shopping.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { ListOfItemsComponent } from './list-of-items/list-of-items.component';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingService } from './shopping.service';

@NgModule({
  declarations: [
    ShoppingComponent,
    PurchaseHistoryComponent,
    ListOfItemsComponent
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule
  ],
  providers: [
    ShoppingService
  ]
})
export class ShoppingModule { }

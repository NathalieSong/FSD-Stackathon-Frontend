import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent } from './shopping.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { ListOfItemsComponent } from './list-of-items/list-of-items.component';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { DeleteWithConfirmComponent } from './delete-with-confirm/delete-with-confirm.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CustToastComponent } from './cust-toast/cust-toast.component';

@NgModule({
  declarations: [
    ShoppingComponent,
    PurchaseHistoryComponent,
    ListOfItemsComponent,
    HomepageComponent,
    SearchResultComponent,
    ItemDetailComponent,
    CartComponent,
    DeleteWithConfirmComponent,
    CheckoutComponent,
    CustToastComponent
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ShoppingModule { }

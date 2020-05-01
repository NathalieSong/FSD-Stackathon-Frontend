import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/general/models/cart-item';
import { ShoppingService } from '../shopping.service';
import * as _ from 'underscore';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  itemSelectsForm: FormGroup;
  isSelectAll = false;
  itemIdsNeedRemove = [];
  discountCode = '';
  discountPercentage = 0;
  isApplied = false;
  tax = 0;
  totalItemPrice = 0;
  isCheckingOut = false;
  toastText = '';
  isError = false;

  constructor(
    private shopService: ShoppingService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  private getCartItems(): void {
    this.shopService.getCartItems().subscribe(items => {
      this.getFormGroup(items);
      this.getCartIdFromRouter();
      this.cartItems = items;
    });
  }

  getCartIdFromRouter() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      const cartId = params.get('cartId');
      if (cartId) {
        this.itemSelectsForm.get(cartId).patchValue(true);
      }
    });
  }

  private getFormGroup(items: CartItem[]) {
    const group = {};
    items.forEach(item => group[item.id] = new FormControl(false));
    this.itemSelectsForm = this.fb.group(group);
  }

  setItemIdsNeedRemove(ids: string[]) {
    if (ids && ids.length) {
      this.itemIdsNeedRemove = ids;
    } else {
      this.itemIdsNeedRemove = this.getItemIdsSelected();
    }
  }

  onClickRemove(): void {
    this.removeCartItemByIds(this.itemIdsNeedRemove);
  }

  private removeCartItemByIds(ids: string[]) {
    const that = this;
    this.shopService.deleteCartItemByIds(ids).subscribe({
      next(items) {
        that.cartItems = that.cartItems.filter(item => ids.indexOf(item.id) === -1);
        for (const id of ids) {
          that.itemSelectsForm.removeControl(id);
        }
        that.setSelectAll();
      },
      error(err) {
        that.toastText = 'Failed to remove items from cart.';
        that.isError = true;
      }
    });
  }

  private getItemIdsSelected() {
    const itemIds = [];
    if (!this.itemSelectsForm) {
      return itemIds;
    }
    for (const item of this.cartItems) {
      if (this.itemSelectsForm.get(item.id).value) {
        itemIds.push(item.id);
      }
    }
    return itemIds;
  }

  setSelectAll() {
    const that = this;
    this.isSelectAll = !this.cartItems.some(item => !that.itemSelectsForm.get(item.id).value);
  }

  getListOfStock(stock: number) {
    return stock ? _.range(1, stock + 1) : [1];
  }

  onChangeQuantity(id: string, quantity: number) {
    this.shopService.updateCartItemQuantity(id, quantity).subscribe(item => {
      const index = this.cartItems.findIndex(cItem => cItem.id === item.id);
      this.cartItems[index].quantity = item.quantity;
    });
  }

  onSelectAll(isSelectAll: boolean) {
    this.isSelectAll = isSelectAll;
    const groupValue = {};
    for (const item of this.cartItems) {
      groupValue[item.id] = isSelectAll;
    }
    this.itemSelectsForm.setValue(groupValue);
  }

  getTaxForSelectedItems(): Observable<number> {
    this.totalItemPrice = 0;
    for (const item of this.cartItems) {
      if (this.itemSelectsForm.get(item.id).value) {
        this.totalItemPrice += item.itemPrice * item.quantity;
      }
    }
    this.totalItemPrice = this.totalItemPrice * (1 - this.discountPercentage);
    return this.shopService.getTaxOfPrice(this.totalItemPrice).pipe(
      tap(tax => this.tax = tax)
    );
  }

  onChangeDiscountCode(code: string) {
    this.discountCode = code;
    if (!this.discountCode && this.isApplied) {
      this.isApplied = false;
    }
  }

  onClickApply() {
    this.shopService.getDiscountByCode(this.discountCode)
      .subscribe(discount => {
        this.discountPercentage = discount ? discount.percentage : 0;
        this.isApplied = true;
      });
  }

  isCheckoutBtnDisabled(): boolean {
    return !this.cartItems.some(item => this.itemSelectsForm.get(item.id).value) || this.isCheckingOut;
  }

  getTotalForSelectedItems(): number {
    return this.totalItemPrice + this.tax;
  }

  checkout() {
    this.isCheckingOut = true;
    this.shopService.checkout(
      this.cartItems.filter(item => this.itemSelectsForm.get(item.id).value)
    ).subscribe(flag => {
      this.isCheckingOut = !flag;
      if (flag) {
        this.router.navigate(['/shopping/checkout']);
      } else {
        this.toastText = 'Failed to checkout';
        this.isError = true;
      }
    });
  }

}

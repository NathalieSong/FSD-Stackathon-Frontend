import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/general/models/cart-item';
import { ShoppingService } from '../shopping.service';
import * as _ from 'underscore';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

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

  constructor(private shopService: ShoppingService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  private getCartItems(): void {
    this.shopService.getCartItems().subscribe(items => {
      this.getFormGroup(items);
      this.cartItems = items;
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
    this.shopService.deleteCartItemByIds(ids).subscribe({
      next(items) {
        this.cartItems = this.cartItems.filter(item => ids.indexOf(item.id) === -1);
        for (const id of ids) {
          this.itemSelectsForm.removeControl(id);
        }
        this.setSelectAll();
      },
      error(err) {

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

  getTaxForSelectedItems(): number {
    this.totalItemPrice = 0;
    for (const item of this.cartItems) {
      if (this.itemSelectsForm.get(item.id).value) {
        this.totalItemPrice += item.itemPrice * item.quantity;
      }
    }
    this.totalItemPrice = this.totalItemPrice * (1 - this.discountPercentage);
    this.tax = this.shopService.getTaxOfPrice(this.totalItemPrice);
    return this.tax;
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

  getTotalForSelectedItems(): number {
    return this.totalItemPrice + this.tax;
  }

}

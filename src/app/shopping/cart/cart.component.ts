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
    const that = this;
    this.shopService.deleteCartItemByIds(ids).subscribe({
      next(items) {
        that.cartItems = that.cartItems.filter(item => ids.indexOf(item.id) === -1);
        ids.forEach(id => {
          that.itemSelectsForm.removeControl(id);
        });
        that.setSelectAll();
      },
      error(err) {

      }
    });
  }

  private getItemIdsSelected() {
    const itemIds = [];
    const that = this;
    if (!that.itemSelectsForm) {
      return itemIds;
    }
    this.cartItems.forEach(item => {
      if (that.itemSelectsForm.get(item.id).value) {
        itemIds.push(item.id);
      }
    });
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
    this.shopService.updateCartItemQuantity(id, quantity).subscribe();
  }

  onSelectAll(isSelectAll: boolean) {
    this.isSelectAll = isSelectAll;
    const groupValue = {};
    this.cartItems.forEach(item => {
      groupValue[item.id] = isSelectAll;
    });
    this.itemSelectsForm.setValue(groupValue);
  }

  getTaxForSelectedItems() {

  }

  getTotalForSelectedItems() {

  }

}

import { Injectable } from '@angular/core';
import { PurchaseHistoryItem } from '../general/models/purchase-history-item';
import { Item } from '../general/models/item';

@Injectable()
export class ShoppingService {
  items: Array<Item> = [];

  constructor() { }

  getPurchaseHistoryList(): Array<PurchaseHistoryItem> {
    return [];
  }

  getItems(): Array<Item> {
    this.items = [];
    return this.items;
  }

  getItemsByText(text: string): Array<Item> {
    this.items = [];
    return this.items;
  }

  getItemsByFilter(): Array<Item> {
    this.items = [];
    return this.items;
  }
}

import { Injectable } from '@angular/core';
import { PurchaseHistoryItem } from '../general/models/purchase-history-item';
import { Item } from '../general/models/item';
import { Observable, of } from 'rxjs';

@Injectable()
export class ShoppingService {
  items: Item[] = [];

  constructor() { }

  getPurchaseHistoryList(): PurchaseHistoryItem[] {
    return [];
  }

  getItems(): Item[] {
    this.items = [];
    return this.items;
  }

  getItemsByText(text: string): Item[] {
    this.items = [];
    return this.items;
  }

  getItemsByFilter(): Item[] {
    this.items = [];
    return this.items;
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}

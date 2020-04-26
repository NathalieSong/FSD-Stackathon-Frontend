import { Injectable } from '@angular/core';
import { PurchaseHistoryItem } from '../general/models/purchase-history-item';

@Injectable()
export class ShoppingService {

  constructor() { }

  getPurchaseHistoryList(): Array<PurchaseHistoryItem> {
    return [];
  }
}

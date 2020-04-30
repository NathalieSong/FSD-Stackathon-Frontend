import { Injectable } from '@angular/core';
import { PurchaseHistoryItem } from '../general/models/purchase-history-item';
import { Item } from '../general/models/item';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { ItemFilter } from '../general/models/item-filter';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private itemsUrl = 'api/items';
  private purchaseHistoryUrl = 'api/purchaseHistoryItems';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getPurchaseHistoryList(): Observable<PurchaseHistoryItem[]> {
    return this.http.get<PurchaseHistoryItem[]>(`${this.purchaseHistoryUrl}`)
    .pipe(
      map(phItems => _.sortBy(phItems, 'createdDate')),
      catchError(this.handleError<PurchaseHistoryItem[]>([]))
    );
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.itemsUrl}`)
      .pipe(
        catchError(this.handleError<Item[]>([]))
      );
  }

  getItemById(id: string): Observable<Item> {
    return this.getItems().pipe(
      map((items: Item[]) => items.find(item => item.id === id))
    );
  }

  getItemsByText(text: string): Observable<Item[]> {
    if (!text.trim()) {
      return this.getItems();
    }
    return this.http.get<Item[]>(`${this.itemsUrl}/?name=${text}`)
      .pipe(
        catchError(this.handleError<Item[]>([]))
      );
  }

  getItemsByFilter(filter: ItemFilter): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.itemsUrl}/?manufacturer=${filter.manufacturer}`)
      .pipe(
        catchError(this.handleError<Item[]>([]))
      );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}

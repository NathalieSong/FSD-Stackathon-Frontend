import { Injectable } from '@angular/core';
import { PurchaseHistoryItem } from '../general/models/purchase-history-item';
import { Item } from '../general/models/item';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { ItemFilter } from '../general/models/item-filter';
import * as _ from 'underscore';
import { CartItem } from '../general/models/cart-item';
import { Discount } from '../general/models/discount';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private itemsUrl = 'api/items';
  private purchaseHistoryUrl = 'api/purchaseHistoryItems';
  private cartItemsUrl = 'api/cartItems';
  private discountsUrl = 'api/discounts';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getTaxOfPrice(price: number): Observable<number> {
    return of(price * 0.1);
  }

  checkout(cartItems: CartItem[]): Observable<boolean> {
    return of(true);
  }

  getDiscountByCode(code: string): Observable<Discount> {
    if (!code.trim()) {
      return of();
    }
    return this.http.get<Discount[]>(`${this.discountsUrl}/?code=^${code}$`)
      .pipe(
        map((discounts: Discount[]) => discounts[0]),
        catchError(this.handleError<Discount>())
      );
  }

  getPurchaseHistoryItems(): Observable<PurchaseHistoryItem[]> {
    return this.http.get<PurchaseHistoryItem[]>(`${this.purchaseHistoryUrl}`)
    .pipe(
      map(phItems => _.sortBy(phItems, 'createdDate')),
      catchError(this.handleError<PurchaseHistoryItem[]>([]))
    );
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.cartItemsUrl}`)
    .pipe(
      map(cItems => _.sortBy(cItems, 'createdDate')),
      catchError(this.handleError<PurchaseHistoryItem[]>([]))
    );
  }

  addToCart(item: Item): Observable<string> {
    return this.http.get<Item[]>(`${this.itemsUrl}/?id=^${item.id}$`)
      .pipe(
        map(newCartItem => newCartItem[0].id)
      );
  }

  deleteCartItemByIds(ids: string[]): Observable<CartItem[]> {
    return of([]);
  }

  updateCartItemQuantity(id: string, quantity: number): Observable<CartItem> {
    return this.getCartItems().pipe(
      map((items: CartItem[]) => {
        const cItem = items.find(item => item.id === id);
        cItem.quantity = quantity;
        return cItem;
      })
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

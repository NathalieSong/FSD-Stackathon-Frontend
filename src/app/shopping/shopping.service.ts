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
import { Cart } from '../general/models/cart';
import { LocalStorageService } from '../general/guards/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private itemBaseUrl = '/item';
  private orderBaseUrl = '/order';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService
  ) { }

  getBuyerId(): string {
    const profile = this.storageService.getUserProfile();
    return profile ? profile.id : '';
  }

  getTaxOfPrice(cartItems: any): Observable<number> {
    return this.http.post<any>(`${this.orderBaseUrl}/financial/tax`, cartItems, this.httpOptions)
      .pipe(
        map(tax => tax.tax)
      );
  }

  checkout(data: any): Observable<boolean> {
    return this.http.post<any>(`${this.orderBaseUrl}/financial/checkout`, data, this.httpOptions)
      .pipe(
        map(result => true),
        catchError(this.handleError<boolean>(false))
      );
  }

  getDiscountByCode(code: string): Observable<Discount> {
    if (!code.trim()) {
      return of();
    }
    return this.http.get<Discount[]>(`${this.orderBaseUrl}/discount/code?code=${code}`)
      .pipe(
        map((discounts: Discount[]) => discounts[0]),
        catchError(this.handleError<Discount>())
      );
  }

  getPurchaseHistoryItems(): Observable<PurchaseHistoryItem[]> {
    return this.http.get<PurchaseHistoryItem[]>(`${this.orderBaseUrl}/purchaseHistory/byBuyer?buyerId=${this.getBuyerId()}`)
    .pipe(
      map(phItems => _.sortBy(phItems, 'createdDate')),
      catchError(this.handleError<PurchaseHistoryItem[]>([]))
    );
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.itemBaseUrl}/cart/byBuyer?buyerId=${this.getBuyerId()}`)
    .pipe(
      map(cItems => _.sortBy(cItems, 'createdDate')),
      catchError(this.handleError<CartItem[]>([]))
    );
  }

  addToCart(cart: Cart): Observable<string> {
    return this.http.post<Cart>(`${this.itemBaseUrl}/cart`, cart, this.httpOptions)
      .pipe(
        map(newCart => newCart.id)
      );
  }

  deleteCartItemByIds(ids: string[]): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        cartIds: ids,
        buyerId: this.getBuyerId()
      }
    };
    return this.http.delete<any>(`${this.itemBaseUrl}/cart`, httpOptions);
  }

  updateCartItemQuantity(id: string, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.itemBaseUrl}/cart/quantity`,
      {cartId: id, quantity: quantity}, this.httpOptions);
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.itemBaseUrl}/emartItem/getAll`)
      .pipe(
        catchError(this.handleError<Item[]>([]))
      );
  }

  getItemById(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.itemBaseUrl}/emartItem/byId?itemId=${id}`);
  }

  getItemsByText(text: string): Observable<Item[]> {
    if (!text.trim()) {
      return this.getItems();
    }
    return this.http.get<Item[]>(`${this.itemBaseUrl}/emartItem/byText?text=${text}`)
      .pipe(
        catchError(this.handleError<Item[]>([]))
      );
  }

  getItemsByFilter(filter: ItemFilter): Observable<Item[]> {
    return this.http.post<Item[]>(`${this.itemBaseUrl}/byFilter`, filter, this.httpOptions)
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

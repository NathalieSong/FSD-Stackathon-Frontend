import { Injectable } from '@angular/core';
import { PurchaseHistoryItem } from '../general/models/purchase-history-item';
import { Item } from '../general/models/item';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private itemsUrl = 'api/items';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getPurchaseHistoryList(): PurchaseHistoryItem[] {
    return [];
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.itemsUrl}`)
      .pipe(
        catchError(this.handleError<Item[]>([]))
      );
  }

  getItemsByText(text: string): Observable<Item[]> {
    if (!text.trim()) {
      return of([]);
    }
    return this.http.get<Item[]>(`${this.itemsUrl}/?name=${text}`)
      .pipe(
        catchError(this.handleError<Item[]>([]))
      );
  }

  getItemsByFilter(): Item[] {
    return [];
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}

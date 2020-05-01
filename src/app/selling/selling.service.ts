import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StockItem } from '../general/models/stock-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as _ from 'underscore';
import { map, catchError } from 'rxjs/operators';
import { SellingReportItem } from '../general/models/selling-report-item';
import { Item } from '../general/models/item';

@Injectable({
  providedIn: 'root'
})
export class SellingService {
  private itemsUrl = 'api/items';
  private stockItemsUrl = 'api/stockItems';
  private reportItemsUrl = 'api/sellingReportItems';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, this.httpOptions);
  }

  getStockItems(): Observable<StockItem[]> {
    return this.http.get<StockItem[]>(`${this.stockItemsUrl}`)
      .pipe(
        map(items => _.sortBy(items, 'name')),
        catchError(this.handleError<StockItem[]>([]))
      );
  }

  getReportItems(startPeriod: Date, endPeriod: Date): Observable<SellingReportItem[]> {
    return this.http.get<SellingReportItem[]>(`${this.reportItemsUrl}`)
      .pipe(
        map(items => _.sortBy(items, 'name')),
        catchError(this.handleError<SellingReportItem[]>([]))
      );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}

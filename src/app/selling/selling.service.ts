import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StockItem } from '../general/models/stock-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as _ from 'underscore';
import { map, catchError } from 'rxjs/operators';
import { SellingReportItem } from '../general/models/selling-report-item';
import { Item } from '../general/models/item';
import { Category } from '../general/models/category';
import { SubCategory } from '../general/models/sub-category';

@Injectable({
  providedIn: 'root'
})
export class SellingService {
  public stockPattern = '[0-9]*';
  public pricePattern = '[0-9\.]*';
  private itemsUrl = 'api/items';
  private stockItemsUrl = 'api/stockItems';
  private reportItemsUrl = 'api/sellingReportItems';
  private categoriesUrl = 'api/categories';
  private subCategoriesUrl = 'api/subCategories';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getSubCategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${this.subCategoriesUrl}`)
      .pipe(
        catchError(this.handleError<SubCategory[]>([]))
      );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.categoriesUrl}`)
      .pipe(
        catchError(this.handleError<Category[]>([]))
      );
  }

  getItemById(itemId: string): Observable<Item> {
    return this.http.get<Item[]>(`${this.itemsUrl}/?id=^${itemId}$`)
      .pipe(
        map((items: Item[]) => items[0])
      );
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(this.itemsUrl, item, this.httpOptions);
  }

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

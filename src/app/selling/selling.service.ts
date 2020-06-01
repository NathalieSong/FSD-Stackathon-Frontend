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
import { LocalStorageService } from '../general/guards/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SellingService {
  public stockPattern = '[0-9]*';
  public pricePattern = '[0-9\.]*';
  private itemBaseUrl = '/item';
  private orderBaseUrl = '/order';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private storageService: LocalStorageService) { }

  getSellerId() {
    const profile = this.storageService.getUserProfile();
    return profile ? profile.id : '';
  }

  getSubCategories(categoryId: string): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${this.itemBaseUrl}/subCategory/byCategory?categoryId=${categoryId}`)
      .pipe(
        catchError(this.handleError<SubCategory[]>([]))
      );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.itemBaseUrl}/category/getAll`)
      .pipe(
        catchError(this.handleError<Category[]>([]))
      );
  }

  getItemById(itemId: string): Observable<Item> {
    return this.http.get<Item>(`${this.itemBaseUrl}/emartItem/byId?itemId=${itemId}`);
  }

  updateItem(item: Item): Observable<any> {
    return this.http.put<any>(`${this.itemBaseUrl}/emartItem/update`, item, this.httpOptions);
  }

  addItem(item: Item): Observable<any> {
    return this.http.post<any>(`${this.itemBaseUrl}/emartItem/add`, item, this.httpOptions);
  }

  getStockItems(): Observable<StockItem[]> {
    return this.http.get<StockItem[]>(`${this.orderBaseUrl}/selling/stock?sellerId=${this.getSellerId()}`)
      .pipe(
        map(items => _.sortBy(items, 'name')),
        catchError(this.handleError<StockItem[]>([]))
      );
  }

  getReportItems(startPeriod: Date, endPeriod: Date): Observable<SellingReportItem[]> {
    const data = {
      startPeriod: startPeriod,
      endPeriod: endPeriod,
      sellerId: this.getSellerId()
    };
    return this.http.post<SellingReportItem[]>(`${this.orderBaseUrl}/selling/report`, data, this.httpOptions)
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

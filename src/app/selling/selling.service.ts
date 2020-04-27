import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class SellingService {

  constructor() { }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}

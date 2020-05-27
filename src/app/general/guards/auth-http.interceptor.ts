import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  urlsNotNeedAuth = [
    'user/signup',
    'user/auth/login',
    'item/emartItem/getAll',
    'item/emartItem/byId',
    'item/emartItem/byText',
    'item/emartItem/byFilter',
    'item/category/getAll',
    'item/subCategory/byCategory'
  ];

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.urlsNotNeedAuth.some((url) => {
      return request.url.indexOf(url) !== -1;
    })) {
      return next.handle(request.clone());
    }
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['auth/signin']);
      return observableThrowError('Please login first');
    }
    const authRequest = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    return next.handle(authRequest).pipe(
      catchError((err, caught) => {
        if (err.status === 403) {
          this.router.navigate(['auth/signin']);
        }
        if (err.status === 401) {
          this.authService.clearToken();
          this.router.navigate(['auth/signin']);
        }
        return observableThrowError(err);
      })
    );
  }
}

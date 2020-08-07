import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.length) {
      const requestWithAuthorizationHeader: HttpRequest<any> = req.clone({
        setHeaders: { Authorization: localStorage.getItem('token') }
      });
      return next.handle(requestWithAuthorizationHeader);
    } else {
      return next.handle(req);
    }
  }
}

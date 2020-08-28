import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, empty, of, EMPTY } from 'rxjs';
import { LocalStorageKeyNames } from '../constants/local-storage-key-names.constant';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationHeaderInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isTokenExpired()) {
      const subdomainName = localStorage.getItem(LocalStorageKeyNames.SubdomainName);
      localStorage.clear();
      this.router.navigateByUrl(`${subdomainName}/login`);
      return EMPTY;
    }
    if (localStorage.length && localStorage.getItem(LocalStorageKeyNames.Token)) {
      const requestWithAuthorizationHeader: HttpRequest<any> = req.clone({
        setHeaders: { Authorization: localStorage.getItem(LocalStorageKeyNames.Token) }
      });
      return next.handle(requestWithAuthorizationHeader);
    } else {
      return next.handle(req);
    }
  }

  isTokenExpired(): boolean {
    if (localStorage.length && localStorage.getItem(LocalStorageKeyNames.ExpirationDateTime) !== null) {
      const expirationDateTime = new Date(localStorage.getItem(LocalStorageKeyNames.ExpirationDateTime));
      const currentDateTime = new Date();
      return expirationDateTime <= currentDateTime;
    }
    return false;
  }
}

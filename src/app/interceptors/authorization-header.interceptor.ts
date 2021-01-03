import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { LocalStorageKeyNames } from '../constant/local-storage-key-names.constant';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationHeaderInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isTokenExpired()) {
      const subdomainAlias = localStorage.getItem(LocalStorageKeyNames.SubdomainAlias);
      localStorage.clear();
      this.router.navigateByUrl(`${subdomainAlias}/login`);
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

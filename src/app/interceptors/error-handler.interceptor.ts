import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => this.handleHttpError(error))
    );
  }

  private handleHttpError(error: HttpErrorResponse) {
    if (error.status === 404) {
      this.router.navigateByUrl('/404');
    }
    if (error.status === 403) {
      this.router.navigateByUrl('/403');
    }
    if (error.status === 401) {
      this.router.navigateByUrl('/401');
    }
    return EMPTY;
  }
}

import { Injectable } from '@angular/core';
import { LoginCredentials } from '../model/login-credentials.model';
import { Observable, of } from 'rxjs';
import { Token } from '../model/token.model';
import { HttpClient, HttpErrorResponse, HttpBackend } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly LOGIN_URL = 'http://localhost:8090/';

  private http: HttpClient;

  constructor(private httpBackend: HttpBackend,
              private router: Router) {
    this.http = new HttpClient(httpBackend);
  }

  loginUser(subdomainName: string, loginCredentials: LoginCredentials): Observable<Token> {
    loginCredentials.password = btoa(loginCredentials.password);
    return this.http.post<Token>(this.prepareLoginUrl(subdomainName), loginCredentials);
  }

  private prepareLoginUrl(subdomainName: string): string {
    return `${this.LOGIN_URL}${subdomainName}/login`;
  }
}

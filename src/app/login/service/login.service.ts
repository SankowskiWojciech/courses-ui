import { Injectable } from '@angular/core';
import { LoginCredentials } from '../model/login-credentials.model';
import { Observable, of } from 'rxjs';
import { Token } from '../model/token.model';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LocalStorageKeyNames } from 'src/app/constants/local-storage-key-names.constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly LOGIN_BACKEND_URL = 'http://localhost:8090/subdomain/';

  private http: HttpClient;

  constructor(private httpBackend: HttpBackend, private router: Router) {
    this.http = new HttpClient(httpBackend);
  }

  loginUser(subdomainName: string, loginCredentials: LoginCredentials): Observable<Token> {
    const loginCredentialsWithEncodedPassword = { ...loginCredentials };
    loginCredentialsWithEncodedPassword.password = btoa(loginCredentialsWithEncodedPassword.password);
    return this.http.post<Token>(this.prepareLoginUrl(subdomainName), loginCredentialsWithEncodedPassword).pipe(tap(token => {
      localStorage.setItem(LocalStorageKeyNames.UserEmailAddress, loginCredentials.userEmailAddress);
      localStorage.setItem(LocalStorageKeyNames.Token, token.tokenValue);
      localStorage.setItem(LocalStorageKeyNames.ExpirationDateTime, token.expirationDateTime.toLocaleString());
      localStorage.setItem(LocalStorageKeyNames.SubdomainName, subdomainName);
    }));
  }

  private prepareLoginUrl(subdomainName: string): string {
    return `${this.LOGIN_BACKEND_URL}${subdomainName}/login`;
  }
}

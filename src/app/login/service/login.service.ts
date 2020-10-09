import { Injectable } from '@angular/core';
import { LoginCredentials } from '../model/login-credentials.model';
import { Observable } from 'rxjs';
import { Token } from '../model/token.model';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LocalStorageKeyNames } from 'src/app/constants/local-storage-key-names.constant';
import { SUBDOMAIN_BACKEND_URL } from 'src/app/constants/backend-urls.constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http: HttpClient;

  constructor(private httpBackend: HttpBackend) {
    this.http = new HttpClient(httpBackend);
  }

  loginUser(subdomainAlias: string, loginCredentials: LoginCredentials): Observable<Token> {
    const loginCredentialsWithEncodedPassword = this.prepareLoginCredentialsWithEncodedPassword(loginCredentials);
    return this.http.post<Token>(this.prepareLoginUrl(subdomainAlias), loginCredentialsWithEncodedPassword).pipe(
      tap(token => this.setLoggingInformationInLocalStorage(loginCredentials, token, subdomainAlias))
    );
  }

  private prepareLoginUrl(subdomainAlias: string): string {
    return `${SUBDOMAIN_BACKEND_URL}/${subdomainAlias}/login`;
  }

  private setLoggingInformationInLocalStorage(loginCredentials: LoginCredentials, token: Token, subdomainAlias: string) {
    localStorage.setItem(LocalStorageKeyNames.UserEmailAddress, loginCredentials.userEmailAddress);
    localStorage.setItem(LocalStorageKeyNames.Token, token.tokenValue);
    localStorage.setItem(LocalStorageKeyNames.ExpirationDateTime, token.expirationDateTime.toLocaleString());
    localStorage.setItem(LocalStorageKeyNames.SubdomainAlias, subdomainAlias);
  }

  private prepareLoginCredentialsWithEncodedPassword(loginCredentials: LoginCredentials): LoginCredentials {
    const loginCredentialsWithEncodedPassword = { ...loginCredentials };
    loginCredentialsWithEncodedPassword.password = btoa(loginCredentialsWithEncodedPassword.password);
    return loginCredentialsWithEncodedPassword;
  }
}

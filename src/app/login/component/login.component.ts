import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCredentials } from '../model/login-credentials.model';
import { LoginService } from '../service/login.service';
import { Subdomain } from 'src/app/subdomain/model/subdomain.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Token } from '../model/token.model';
import { LocalStorageKeyNames } from 'src/app/constants/local-storage-key-names.constant';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  subdomainInformation: Subdomain;
  isLoginSuccessful = true;
  loginCredentials: LoginCredentials = {
    userEmailAddress: null,
    password: null
  };

  constructor(private loginService: LoginService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.subdomainInformation = this.route.snapshot.data.subdomainInformation;
  }

  onSubmit() {
    this.isLoginSuccessful = true;
    this.loginService.loginUser(this.subdomainInformation.alias, this.loginCredentials).subscribe(
      token => this.handleSuccessfulLogin(token, this.loginCredentials.userEmailAddress, this.subdomainInformation.alias),
      error => this.handleHttpError(error)
    );
  }

  private handleSuccessfulLogin(token: Token, userEmailAddress: string, subdomainName: string) {
    localStorage.setItem(LocalStorageKeyNames.USER_EMAIL_ADDRESS, userEmailAddress);
    localStorage.setItem(LocalStorageKeyNames.TOKEN, token.tokenValue);
    localStorage.setItem(LocalStorageKeyNames.SUBDOMAIN_NAME, subdomainName);
    this.router.navigateByUrl(`${subdomainName}/${token.accountType.toString().toLowerCase()}`)
    this.isLoginSuccessful = true;
  }

  private handleHttpError(error: HttpErrorResponse) {
    if (error.status === 404) {
      this.router.navigateByUrl('/404');
    }
    if (error.status === 403) {
      this.router.navigateByUrl('/403');
    }
    this.isLoginSuccessful = false;
  }
}

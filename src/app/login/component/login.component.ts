import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCredentials } from '../model/login-credentials.model';
import { LoginService } from '../service/login.service';
import { Subdomain } from 'src/app/subdomain/model/subdomain.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { getSubdomainInformation } from 'src/app/subdomain/state/subdomain.select';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as SubdomainActions from '../../subdomain/state/subdomain.action';
import { AccountType } from '../model/account-type.model';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private ngDestroyed$ = new Subject();

  subdomainInformation: Subdomain;
  isInvalidLoginOrPassword = false;
  loginCredentials: LoginCredentials = {
    userEmailAddress: null,
    password: null
  };

  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router, private store: Store<State>) { }

  ngOnInit(): void {
    const subdomainName = this.route.snapshot.params.subdomainName;
    this.store.select(getSubdomainInformation)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(subdomainInformation => {
        this.subdomainInformation = subdomainInformation;
        if (!this.subdomainInformation || this.subdomainInformation.alias !== subdomainName) {
          this.store.dispatch(SubdomainActions.loadSubdomainInformation({ subdomainName }));
        }
      });
  }

  loginUser() {
    this.isInvalidLoginOrPassword = false;
    this.loginService.loginUser(this.subdomainInformation.alias, this.loginCredentials).subscribe(
      token => this.handleSuccessfulLogin(token.accountType, this.subdomainInformation.alias),
      error => this.handleHttpError(error)
    );
  }

  private handleSuccessfulLogin(accountType: AccountType, subdomainName: string) {
    this.router.navigateByUrl(`${subdomainName}/${accountType.toString().toLowerCase()}`);
  }

  private handleHttpError(error: HttpErrorResponse) {
    if (error.status === 404) {
      this.router.navigateByUrl('/404');
    }
    if (error.status === 403) {
      this.router.navigateByUrl('/403');
    }
    this.isInvalidLoginOrPassword = true;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalStorageKeyNames } from 'src/app/constant/local-storage-key-names.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const subdomainAlias = next.params.subdomainAlias;
    if (!this.isUserLoggedInToSubdomain()
      || !this.isUserTryingToAccessTheSameSubdomain(subdomainAlias)
      || this.isTokenExpired()) {
      localStorage.clear();
      this.router.navigateByUrl(`${subdomainAlias}/login`);
      return false;
    }
    return true;
  }

  isUserLoggedInToSubdomain(): boolean {
    if (!localStorage.length
      || !localStorage.getItem(LocalStorageKeyNames.UserEmailAddress)
      || !localStorage.getItem(LocalStorageKeyNames.Token)
      || !localStorage.getItem(LocalStorageKeyNames.ExpirationDateTime)
      || !localStorage.getItem(LocalStorageKeyNames.SubdomainAlias)) {
      return false;
    }
    return true;
  }

  isUserTryingToAccessTheSameSubdomain(subdomainAlias: string): boolean {
    return subdomainAlias === localStorage.getItem(LocalStorageKeyNames.SubdomainAlias);
  }

  isTokenExpired(): boolean {
    const expirationDateTime = new Date(localStorage.getItem(LocalStorageKeyNames.ExpirationDateTime));
    const currentDateTime = new Date();
    return expirationDateTime <= currentDateTime;
  }
}

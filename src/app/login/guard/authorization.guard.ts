import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalStorageKeyNames } from 'src/app/constants/local-storage-key-names.constant';
import { SubdomainService } from 'src/app/subdomain/service/subdomain.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private subdomainService: SubdomainService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const subdomainName = next.params.subdomainName;
    if (!this.isUserLoggedInToSubdomain()
      || !this.isUserTryingToAccessTheSameSubdomain(subdomainName)
      || !this.isTokenNotExpired()) {
      this.router.navigateByUrl(`${subdomainName}/login`);
      return false;
    }
    return true;
  }

  isUserLoggedInToSubdomain(): boolean {
    if (!localStorage.length
      || !localStorage.getItem(LocalStorageKeyNames.UserEmailAddress)
      || !localStorage.getItem(LocalStorageKeyNames.Token)
      || !localStorage.getItem(LocalStorageKeyNames.ExpirationDateTime)
      || !localStorage.getItem(LocalStorageKeyNames.SubdomainName)) {
      return false;
    }
    return true;
  }

  isUserTryingToAccessTheSameSubdomain(subdomainName: string): boolean {
    return subdomainName === localStorage.getItem(LocalStorageKeyNames.SubdomainName);
  }

  isTokenNotExpired(): boolean {
    const expirationDateTime = new Date(localStorage.getItem(LocalStorageKeyNames.ExpirationDateTime));
    const currentDateTime = new Date();
    return expirationDateTime > currentDateTime;
  }
}

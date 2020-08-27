import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalStorageKeyNames } from 'src/app/constants/local-storage-key-names.constant';
import { SubdomainService } from 'src/app/subdomain/service/subdomain.service';
import { Subdomain } from 'src/app/subdomain/model/subdomain.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private subdomainService: SubdomainService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const subdomainName = next.params.subdomainName;
    return this.doesSubdomainExists(subdomainName)
      && this.isUserLoggedInToSubdomain(subdomainName)
      && this.isUserTryingToAccessTheSameSubdomain(subdomainName);
  }

  isUserLoggedInToSubdomain(subdomainName: string): boolean {
    if (!localStorage.length
      || !localStorage.getItem(LocalStorageKeyNames.UserEmailAddress)
      || !localStorage.getItem(LocalStorageKeyNames.Token)
      || !localStorage.getItem(LocalStorageKeyNames.SubdomainName)) {
      this.router.navigateByUrl(`${subdomainName}/login`);
      return false;
    }
    return true;
  }

  doesSubdomainExists(subdomainName: string): boolean {
    let subdomainInformaion: Subdomain;
    this.subdomainService.getSubdomainInformation(subdomainName).subscribe(
      subdomain => subdomainInformaion = subdomain
    );
    return !subdomainInformaion;
  }

  isUserTryingToAccessTheSameSubdomain(subdomainName: string): boolean {
    if (subdomainName !== localStorage.getItem(LocalStorageKeyNames.SubdomainName)) {
      this.router.navigateByUrl(`${subdomainName}/login`);
      return false;
    }
    return true;
  }
}

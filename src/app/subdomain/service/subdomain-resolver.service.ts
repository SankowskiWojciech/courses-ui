import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Subdomain } from '../model/subdomain.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubdomainService } from './subdomain.service';

@Injectable({
  providedIn: 'root'
})
export class SubdomainResolver implements Resolve<Subdomain> {

  constructor(private subdomainService: SubdomainService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Subdomain> {
    const subdomainName = route.paramMap.get('subdomainName');
    return this.subdomainService.getSubdomainInformation(subdomainName);
  }
}

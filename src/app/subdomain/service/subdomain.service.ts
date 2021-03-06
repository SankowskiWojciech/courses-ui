import { Injectable } from '@angular/core';
import { Subdomain } from '../model/subdomain.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SUBDOMAIN_BACKEND_URL } from 'src/app/constant/backend-urls.constant';

@Injectable({
  providedIn: 'root'
})
export class SubdomainService {

  constructor(private http: HttpClient) { }

  getSubdomainInformation(subdomainAlias: string): Observable<Subdomain> {
    return this.http.get<Subdomain>(`${SUBDOMAIN_BACKEND_URL}/${subdomainAlias}`);
  }
}

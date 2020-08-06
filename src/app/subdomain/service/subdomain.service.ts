import { Injectable } from '@angular/core';
import { Subdomain } from '../model/subdomain.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubdomainService {

  private readonly LOGIN_URL = 'http://localhost:8090/';

  constructor(private http: HttpClient) { }

  getSubdomainInformation(subdomainName: string): Observable<Subdomain> {
    return this.http.get<Subdomain>(`${this.LOGIN_URL}${subdomainName}`);
  }
}

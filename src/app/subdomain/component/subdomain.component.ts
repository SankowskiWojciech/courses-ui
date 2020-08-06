import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subdomain } from '../model/subdomain.model';

@Component({
  selector: 'courses-subdomain',
  templateUrl: './subdomain.component.html',
  styleUrls: ['./subdomain.component.scss']
})
export class SubdomainComponent implements OnInit {

  subdomainInformation: Subdomain;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const subdomainInformation: Subdomain = this.route.snapshot.data.subdomainInformation;
    this.subdomainInformation = subdomainInformation;
  }
}

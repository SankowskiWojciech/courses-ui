import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subdomain } from 'src/app/subdomain/model/subdomain.model';

@Component({
  selector: 'courses-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss']
})
export class TutorComponent implements OnInit {

  subdomainInformation: Subdomain;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subdomainInformation = this.route.snapshot.data.subdomainInformation;
  }

}

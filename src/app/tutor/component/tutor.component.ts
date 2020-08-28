import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subdomain } from 'src/app/subdomain/model/subdomain.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { getSubdomainInformation } from 'src/app/subdomain/state/subdomain.select';

@Component({
  selector: 'courses-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss']
})
export class TutorComponent implements OnInit {

  subdomainInformation$: Observable<Subdomain>;

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit(): void {
    const subdomainName = this.route.snapshot.params.subdomainName;
    this.subdomainInformation$ = this.store.select(getSubdomainInformation);
  }
}

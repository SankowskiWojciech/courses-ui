import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subdomain } from '../model/subdomain.model';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { getSubdomainInformation } from '../state/subdomain.selector';
import * as SubdomainActions from '../state/subdomain.action';

@Component({
  selector: 'courses-subdomain',
  templateUrl: './subdomain.component.html',
  styleUrls: ['./subdomain.component.scss']
})
export class SubdomainComponent implements OnInit {

  subdomainInformation$: Observable<Subdomain>;
  private ngDestroyed$ = new Subject();

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit(): void {
    const subdomainAlias = this.route.snapshot.params.subdomainAlias;
    this.store.dispatch(SubdomainActions.loadSubdomainInformation({ subdomainAlias }));
    this.subdomainInformation$ = this.store.select(getSubdomainInformation);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subdomain } from '../model/subdomain.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { getSubdomainInformation } from '../state/subdomain.select';
import { takeUntil } from 'rxjs/operators';
import * as SubdomainActions from '../state/subdomain.action';

@Component({
  selector: 'courses-subdomain',
  templateUrl: './subdomain.component.html',
  styleUrls: ['./subdomain.component.scss']
})
export class SubdomainComponent implements OnInit {

  subdomainInformation: Subdomain;

  private ngDestroyed$ = new Subject();

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit(): void {
    const subdomainName = this.route.snapshot.params.subdomainName;
    this.store.select(getSubdomainInformation)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(subdomainInformation => {
        this.subdomainInformation = subdomainInformation;
        if (!this.subdomainInformation) {
          this.store.dispatch(SubdomainActions.loadSubdomainInformation({ subdomainName }));
        }
      });
  }
}

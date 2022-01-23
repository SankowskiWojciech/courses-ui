import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subdomain } from 'src/app/subdomain/model/subdomain.model';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { getSubdomainInformation } from 'src/app/subdomain/state/subdomain.select';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import * as SubdomainActions from '../../subdomain/state/subdomain.action';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'courses-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss']
})
export class TutorComponent implements OnInit, OnDestroy {

  private ngDestroyed$ = new Subject();

  isScreenSmall: boolean;
  subdomainInformation$: Observable<Subdomain>;

  constructor(private route: ActivatedRoute, private store: Store<State>,
    private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.XSmall])
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((breakpointState: BreakpointState) => this.isScreenSmall = breakpointState.matches);
    const subdomainAlias = this.route.snapshot.params.subdomainAlias;
    this.store.dispatch(SubdomainActions.loadSubdomainInformation({ subdomainAlias }));
    this.subdomainInformation$ = this.store.select(getSubdomainInformation);
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}

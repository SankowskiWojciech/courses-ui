import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subdomain } from 'src/app/subdomain/model/subdomain.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { getSubdomainInformation } from 'src/app/subdomain/state/subdomain.select';
import { MediaMatcher } from '@angular/cdk/layout';
import * as SubdomainActions from '../../subdomain/state/subdomain.action';

@Component({
  selector: 'courses-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss']
})
export class TutorComponent implements OnInit, OnDestroy {

  private readonly MOBILE_QUERY = '(max-width: 600px)';
  private mobileQueryListener: () => void;

  mobileQuery: MediaQueryList;
  subdomainInformation$: Observable<Subdomain>;

  constructor(private route: ActivatedRoute, private store: Store<State>, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia(this.MOBILE_QUERY);
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', () => this.mobileQueryListener);
  }

  ngOnInit(): void {
    const subdomainAlias = this.route.snapshot.params.subdomainAlias;
    this.store.dispatch(SubdomainActions.loadSubdomainInformation({ subdomainAlias }));
    this.subdomainInformation$ = this.store.select(getSubdomainInformation);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
}

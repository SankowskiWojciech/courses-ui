import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SubdomainService } from '../service/subdomain.service';
import * as SubdomainActions from './subdomain.action';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class SubdomainEffect {

  constructor(private actions$: Actions,
              private subdomainService: SubdomainService) { }

  loadSubdomainInformation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SubdomainActions.loadSubdomainInformation),
      mergeMap(action => this.subdomainService.getSubdomainInformation(action.subdomainAlias).pipe(
        map(subdomainInformation => SubdomainActions.loadSubdomainInformationSuccess({ subdomainInformation }))
      ))
    );
  });
}

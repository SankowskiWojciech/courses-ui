import { createAction, props } from '@ngrx/store';
import { Subdomain } from '../model/subdomain.model';

export const loadSubdomainInformation = createAction(
  '[Subdomain state] Load subdomain information',
  props<{ subdomainName: string }>()
);

export const loadSubdomainInformationSuccess = createAction(
  '[Subdomain state] Load subdomain information - success',
  props<{ subdomainInformation: Subdomain }>()
);

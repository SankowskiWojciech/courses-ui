import { SubdomainState } from './subdomain.state';
import { createReducer, on } from '@ngrx/store';
import * as SubdomainActions from './subdomain.action';

const subdomainInitialState: SubdomainState = {
  subdomainInformation: null
};

export const subdomainReducer = createReducer<SubdomainState>(
  subdomainInitialState,
  on(SubdomainActions.loadSubdomainInformationSuccess, (state, action): SubdomainState => {
    return {
      ...state,
      subdomainInformation: action.subdomainInformation
    };
  })
);

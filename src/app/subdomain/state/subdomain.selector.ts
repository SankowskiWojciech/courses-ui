import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SUBDOMAIN_FEATURE_STATE_NAME } from '../constant/feature-name.constant';
import { SubdomainState } from './subdomain.state';

const getSubdomainFeatureState = createFeatureSelector<SubdomainState>(SUBDOMAIN_FEATURE_STATE_NAME);

export const getSubdomainInformation = createSelector(
  getSubdomainFeatureState,
  subdomainState => subdomainState.subdomainInformation
);

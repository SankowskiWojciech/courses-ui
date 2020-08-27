import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SubdomainState } from './subdomain.state';

const getSubdomainFeatureState = createFeatureSelector<SubdomainState>('subdomainState');

export const getSubdomainInformation = createSelector(
  getSubdomainFeatureState,
  subdomainState => subdomainState.subdomainInformation
);

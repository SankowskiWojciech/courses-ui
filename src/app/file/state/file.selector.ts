import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FILE_FEATURE_STATE_NAME } from '../constants/feature-name.constant';
import { FileState } from './file.state';

const getFileFeatureState = createFeatureSelector<FileState>(FILE_FEATURE_STATE_NAME);

export const getFilesInformation = createSelector(
  getFileFeatureState,
  fileState => fileState.filesInformation
);

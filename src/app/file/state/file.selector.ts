import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FileState } from './file.state';

const getFileFeatureState = createFeatureSelector<FileState>('fileState');

export const getFilesInformation = createSelector(
  getFileFeatureState,
  fileState => fileState.filesInformation
);

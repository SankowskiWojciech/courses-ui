import { createAction, props } from '@ngrx/store';
import { FileInformation } from '../model/file-information.model';

export const uploadNewFile = createAction(
  '[File State] Upload new file',
  props<{ file: File }>()
);

export const uploadNewFileSuccess = createAction(
  '[File State] Upload new file - success',
  props<{ fileInformation: FileInformation }>()
);

export const uploadNewFileFailure = createAction(
  '[File State] Upload new file - failure',
  props<{ errorCode: string }>()
);

export const loadFilesInformation = createAction(
  '[File State] Load files information'
);

export const loadFilesInformationSuccess = createAction(
  '[File State] Load files information - Success',
  props<{ filesInformation: FileInformation[] }>()
);

export const loadFilesInformationFailure = createAction(
  '[File State] Load files information - Failure',
  props<{ errorCode: string }>()
);

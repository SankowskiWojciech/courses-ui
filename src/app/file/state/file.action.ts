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

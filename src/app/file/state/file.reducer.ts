import { createReducer, on } from '@ngrx/store';
import { FileState } from './file.state';
import * as FileActions from './file.action';

const fileInitialState: FileState = {
  filesInformation: []
};

export const fileReducer = createReducer<FileState>(
  fileInitialState,
  on(FileActions.uploadNewFileSuccess, (state, action): FileState => {
    const updatedFilesInformation = [...state.filesInformation, action.fileInformation];
    return {
      ...state,
      filesInformation: updatedFilesInformation
    };
  }),
  on(FileActions.loadFilesInformationSuccess, (state, action): FileState => {
    return {
      ...state,
      filesInformation: action.filesInformation
    };
  }),
);

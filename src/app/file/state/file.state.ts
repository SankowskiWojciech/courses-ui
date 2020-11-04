import * as AppState from '../../state/app.state';
import { FileInformation } from '../model/file-information.model';

export interface State extends AppState.State {
  fileState: FileState;
}

export interface FileState {
  filesInformation: FileInformation[];
}

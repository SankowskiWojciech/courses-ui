import * as AppState from '../../state/app.state';

export interface State extends AppState.State {
  individualLessonState: IndividualLessonState;
}

export interface IndividualLessonState {
  showFinishedLessons: boolean;
}

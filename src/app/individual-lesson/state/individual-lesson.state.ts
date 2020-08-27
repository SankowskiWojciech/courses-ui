import * as AppState from '../../state/app.state';
import { IndividualLesson } from '../model/individual-lesson.model';

export interface State extends AppState.State {
  individualLessonState: IndividualLessonState;
}

export interface IndividualLessonState {
  showFinishedLessons: boolean;
  individualLessons: IndividualLesson[];
}

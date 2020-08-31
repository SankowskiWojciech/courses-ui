import * as AppState from '../../state/app.state';
import { IndividualLesson } from '../model/individual-lesson.model';
import { Student } from '../model/student.model';

export interface State extends AppState.State {
  individualLessonState: IndividualLessonState;
}

export interface IndividualLessonState {
  showFinishedLessons: boolean;
  individualLessons: IndividualLesson[];
  availableStudents: Student[];
  expandedIndividualLesson: IndividualLesson | null;
  filterValue: string;
}

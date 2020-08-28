import { createAction, props } from '@ngrx/store';
import { IndividualLesson } from '../model/individual-lesson.model';
import { Student } from '../model/student.model';

export const toggleShowingFinishedLessons = createAction(
  '[Individual Lesson State] Toggle showing finished lessons'
);

export const loadIndividualLessons = createAction(
  '[Individual Lesson State] Load individual lessons'
);

export const loadIndividualLessonsSuccess = createAction(
  '[Individual Lesson State] Load individual lessons - success',
  props<{ individualLessons: IndividualLesson[] }>()
);

export const loadIndividualLessonsFailure = createAction(
  '[Individual Lesson State] Load individual lessons - failure',
  props<{ error: string }>()
);

export const loadStudentsAvailableForTutor = createAction(
  '[Individual Lesson State] Load students available for tutor'
);

export const loadStudentsAvailableForTutorSuccess = createAction(
  '[Individual Lesson State] Load students available for tutor - success',
  props<{ availableStudents: Student[] }>()
);

export const loadStudentsAvailableForTutorFailure = createAction(
  '[Individual Lesson State] Load students available for tutor - failure',
  props<{ error: string }>()
);

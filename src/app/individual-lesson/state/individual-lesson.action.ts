import { createAction, props } from '@ngrx/store';
import { IndividualLesson } from '../model/individual-lesson.model';
import { Student } from '../model/student.model';
import { IndividualLessonRequestBody } from '../model/individual-lesson-request-body.model';

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

export const createNewIndividualLesson = createAction(
  '[Individual Lesson State] Create new individual lesson',
  props<{ individualLessonRequestBody: IndividualLessonRequestBody }>()
);

export const createNewIndividualLessonSuccess = createAction(
  '[Individual Lesson State] Create new individual lesson - success',
  props<{ createdIndividualLesson: IndividualLesson }>()
);

export const createNewIndividualLessonFailure = createAction(
  '[Individual Lesson State] Create new individual lesson - failure',
  props<{ error: string }>()
);

import { createReducer, on, createAction } from '@ngrx/store';
import { IndividualLessonState } from './individual-lesson.state';
import * as IndividualLessonActions from './individual-lesson.action';

const individualLessonInitialState: IndividualLessonState = {
  showFinishedLessons: false,
  individualLessons: [],
  availableStudents: []
};

export const individualLessonReducer = createReducer<IndividualLessonState>(
  individualLessonInitialState,
  on(IndividualLessonActions.toggleShowingFinishedLessons, (state): IndividualLessonState => {
    return {
      ...state,
      showFinishedLessons: !state.showFinishedLessons
    };
  }),
  on(IndividualLessonActions.loadIndividualLessonsSuccess, (state, action): IndividualLessonState => {
    return {
      ...state,
      individualLessons: action.individualLessons
    };
  }),
  on(IndividualLessonActions.loadStudentsAvailableForTutorSuccess, (state, action): IndividualLessonState => {
    return {
      ...state,
      availableStudents: action.availableStudents
    };
  }),
  on(IndividualLessonActions.createNewIndividualLessonSuccess, (state, action): IndividualLessonState => {
    const updatedIndividualLessons = [...state.individualLessons, action.createdIndividualLesson];
    return {
      ...state,
      individualLessons: updatedIndividualLessons
    };
  }),
);
